import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

// Define the chart configuration schema
const chartConfigSchema = z.object({
  explanation: z
    .string()
    .describe(
      "A brief explanation of the visualization being created and why it's appropriate"
    ),
  chartConfig: z
    .object({
      type: z
        .enum(["bar", "line", "pie", "doughnut"])
        .describe("The type of chart to display"),
      title: z.string().describe("The title of the chart"),
      data: z.object({
        labels: z
          .array(z.string())
          .describe("The labels for the chart data points"),
        datasets: z.array(
          z.object({
            label: z.string().describe("The label for this dataset"),
            data: z.array(z.number()).describe("The numerical data values"),
            backgroundColor: z
              .union([z.string(), z.array(z.string())])
              .describe("Background colors"),
            borderColor: z
              .union([z.string(), z.array(z.string())])
              .optional()
              .describe("Border colors"),
            borderWidth: z.number().optional().describe("Border width"),
          })
        ),
      }),
    })
    .describe("The Chart configuration"),
});

export async function POST(req: Request) {
  try {
    const { message, columns, dataPreview } = await req.json();

    // Create a system prompt that helps the AI understand the data structure
    const systemPrompt = `
      You are a data visualization assistant. 
    
      The user has uploaded data with the following columns: ${columns.join(
        ", "
      )}.

      Here's a preview of the data: ${JSON.stringify(dataPreview, null, 2)}

      When the user asks for a visualization:
      1. Provide a brief, helpful explanation of what visualization you're creating and why
      2. Create an appropriate chart configuration

      Use appropriate colors for the chart type:
      - For bar/line charts: use a single color
      - For pie/doughnut charts: use an array of different colors

      Common color schemes:
      - Blue: "rgba(54, 162, 235, 0.8)"
      - Red: "rgba(255, 99, 132, 0.8)"
      - Green: "rgba(75, 192, 192, 0.8)"
      - Yellow: "rgba(255, 205, 86, 0.8)"
      - Purple: "rgba(153, 102, 255, 0.8)"
      - Orange: "rgba(255, 159, 64, 0.8)"

      For aggregations, group by the appropriate column and calculate sums, averages, or counts as needed.
    `;

    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: chartConfigSchema,
      system: systemPrompt,
      prompt: message,
      temperature: 0.7,
    });

    return Response.json({
      message: object.explanation,
      chartConfig: object.chartConfig,
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return Response.json(
      {
        message: "We have encountered an error. Try again!",
        chartConfig: null,
      },
      { status: 500 }
    );
  }
}
