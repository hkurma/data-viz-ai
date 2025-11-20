"use client";

import { useState } from "react";
import { FileUpload } from "@/components/file-upload";
import { ChatInterface, Message } from "@/components/chat-interface";
import { ChartRenderer } from "@/components/chart-renderer";
import { ChartConfig, DataRow } from "@/types/chart";
import { Button } from "@/components/ui/button";
import { X, Table, BarChart3 } from "lucide-react";
import { DataTable } from "@/components/data-table";

export default function VizPage() {
  const [data, setData] = useState<DataRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig | null>(null);
  const [chartKey, setChartKey] = useState(0);
  const [viewMode, setViewMode] = useState<"chat" | "data">("chat");
  const [fileName, setFileName] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I can help you create visualizations from your data. Tell me what you'd like to see, for example:\n\n• Show me a bar chart of sales by region\n• Create a line chart of revenue over time\n• Make a pie chart of product distribution",
    },
  ]);

  const handleDataLoaded = (
    newData: DataRow[],
    newColumns: string[],
    fileName: string
  ) => {
    setData(newData);
    setColumns(newColumns);
    setFileName(fileName);
    // Reset chart config when new data is loaded
    setChartConfig(null);
    setChartKey(0);
  };

  const handleChartRequested = (config: ChartConfig) => {
    setChartConfig(config);
    setChartKey((prev) => prev + 1);
  };

  const handleClearData = () => {
    setData([]);
    setColumns([]);
    setFileName("");
    setChartConfig(null);
    setChartKey(0);
    setViewMode("chat");
    setMessages([
      {
        role: "assistant",
        content:
          "Hi! I can help you create visualizations from your data. Tell me what you'd like to see, for example:\n\n• Show me a bar chart of sales by region\n• Create a line chart of revenue over time\n• Make a pie chart of product distribution",
      },
    ]);
  };

  return (
    <>
      {data.length === 0 ? (
        <div className="max-w-4xl mx-auto">
          <FileUpload onDataLoaded={handleDataLoaded} />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{fileName}</h2>
              <p className="text-sm text-muted-foreground">
                {data.length} rows, {columns.length} columns
              </p>
            </div>
            <div className="flex gap-2">
              {viewMode === "chat" ? (
                <Button variant="outline" onClick={() => setViewMode("data")}>
                  <Table className="w-4 h-4" />
                  Data
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setViewMode("chat")}>
                  <BarChart3 className="w-4 h-4" />
                  Chat
                </Button>
              )}
              <Button variant="outline" onClick={handleClearData}>
                <X className="w-4 h-4" />
                Clear
              </Button>
            </div>
          </div>

          {viewMode === "chat" ? (
            <div className="grid lg:grid-cols-2 gap-6">
              <ChatInterface
                columns={columns}
                data={data}
                messages={messages}
                setMessages={setMessages}
                onChartRequested={handleChartRequested}
              />
              <ChartRenderer
                key={chartKey}
                chartConfig={chartConfig}
                data={data}
              />
            </div>
          ) : (
            <DataTable columns={columns} data={data} />
          )}
        </div>
      )}
    </>
  );
}
