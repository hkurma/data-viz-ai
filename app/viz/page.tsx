"use client";

import { useState } from "react";
import { FileUpload } from "@/components/file-upload";
import { ChatInterface, Message } from "@/components/chat-interface";
import { ChartRenderer } from "@/components/chart-renderer";
import { ChartConfig, DataRow } from "@/types/chart";
import { X, Table2, MessageSquare, FileText, Rows3 } from "lucide-react";
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
    <div className="animate-fade-in-up">
      {data.length === 0 ? (
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-3">Upload Your Data</h1>
            <p className="text-muted">
              Start by uploading a data file or try our sample datasets
            </p>
          </div>
          <FileUpload onDataLoaded={handleDataLoaded} />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Data Info Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl glass">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-semibold line-clamp-1">{fileName}</h2>
                <div className="flex items-center gap-3 text-sm text-muted">
                  <span className="flex items-center gap-1">
                    <Rows3 className="w-3.5 h-3.5" />
                    {data.length.toLocaleString()} rows
                  </span>
                  <span className="flex items-center gap-1">
                    <Table2 className="w-3.5 h-3.5" />
                    {columns.length} columns
                  </span>
                </div>
              </div>
            </div>

            {/* View Toggle & Actions */}
            <div className="flex items-center gap-2">
              {/* View Toggle */}
              <div className="flex rounded-xl bg-surface border border-border p-1">
                <button
                  onClick={() => setViewMode("chat")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === "chat"
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </button>
                <button
                  onClick={() => setViewMode("data")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === "data"
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <Table2 className="w-4 h-4" />
                  Data
                </button>
              </div>

              {/* Clear Button */}
              <button
                onClick={handleClearData}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border hover:border-red-500/50 hover:bg-red-500/5 text-muted hover:text-red-500 transition-all"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
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
    </div>
  );
}
