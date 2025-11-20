"use client";

import { useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { BarChart, LineChart, PieChart, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import { ChartConfig, DataRow } from "@/types/chart";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartRendererProps {
  chartConfig: ChartConfig | null;
  data: DataRow[];
}

export function ChartRenderer({ chartConfig }: ChartRendererProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null);

  if (!chartConfig) {
    return (
      <Card className="flex flex-col items-center justify-center text-center h-[600px]">
        <CardContent className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <BarChart className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Visualization Yet</h3>
          <p className="text-muted-foreground max-w-md">
            Chat with the assistant to create visualizations from your data. Try
            asking for a bar chart, line chart, or pie chart.
          </p>
        </CardContent>
      </Card>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: chartConfig.title,
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    ...chartConfig.options,
  };

  const handleDownload = () => {
    if (chartRef.current) {
      const canvas = chartRef.current.canvas;
      if (canvas) {
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `${chartConfig.title.replace(/\s+/g, "_")}.png`;
        link.href = url;
        link.click();
      }
    }
  };

  const getChartIcon = () => {
    switch (chartConfig.type) {
      case "bar":
        return <BarChart className="w-5 h-5" />;
      case "line":
        return <LineChart className="w-5 h-5" />;
      case "pie":
      case "doughnut":
        return <PieChart className="w-5 h-5" />;
      default:
        return <BarChart className="w-5 h-5" />;
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getChartIcon()}
          {chartConfig.title}
        </CardTitle>
        <CardAction>
          <Button variant="outline" size="icon" onClick={handleDownload}>
            <Download className="w-4 h-4" />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex-1 min-h-0">
        {chartConfig.type === "bar" && (
          <Bar
            ref={chartRef}
            data={chartConfig.data}
            options={defaultOptions}
          />
        )}
        {chartConfig.type === "line" && (
          <Line
            ref={chartRef}
            data={chartConfig.data}
            options={defaultOptions}
          />
        )}
        {chartConfig.type === "pie" && (
          <Pie
            ref={chartRef}
            data={chartConfig.data}
            options={defaultOptions}
          />
        )}
        {chartConfig.type === "doughnut" && (
          <Doughnut
            ref={chartRef}
            data={chartConfig.data}
            options={defaultOptions}
          />
        )}
      </CardContent>
    </Card>
  );
}
