"use client";

import { useRef } from "react";
import { BarChart, LineChart, PieChart, Download, Sparkles } from "lucide-react";
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
      <div className="h-[600px] rounded-2xl glass flex flex-col items-center justify-center text-center p-8">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-surface flex items-center justify-center border border-border">
            <BarChart className="w-10 h-10 text-muted" />
          </div>
          <div className="absolute -inset-2 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl -z-10" />
        </div>
        
        <h3 className="text-xl font-bold mb-3">No Chart Yet</h3>
        <p className="text-muted max-w-sm leading-relaxed">
          Chat with the AI assistant to create beautiful visualizations from your data.
        </p>
        
        <div className="flex items-center gap-4 mt-8 text-sm text-muted">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border">
            <BarChart className="w-4 h-4" />
            Bar
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border">
            <LineChart className="w-4 h-4" />
            Line
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border">
            <PieChart className="w-4 h-4" />
            Pie
          </div>
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: "'Outfit', sans-serif",
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales:
      chartConfig.type === "bar" || chartConfig.type === "line"
        ? {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  family: "'Outfit', sans-serif",
                },
              },
            },
            y: {
              grid: {
                color: "rgba(128, 128, 128, 0.1)",
              },
              ticks: {
                font: {
                  family: "'Outfit', sans-serif",
                },
              },
            },
          }
        : undefined,
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

  const getChartGradient = () => {
    switch (chartConfig.type) {
      case "bar":
        return "from-blue-500 to-cyan-500";
      case "line":
        return "from-emerald-500 to-teal-500";
      case "pie":
      case "doughnut":
        return "from-pink-500 to-rose-500";
      default:
        return "from-indigo-500 to-purple-500";
    }
  };

  return (
    <div className="h-[600px] rounded-2xl glass flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getChartGradient()} flex items-center justify-center shadow-lg`}>
            {getChartIcon()}
          </div>
          <div>
            <h3 className="font-semibold line-clamp-1">{chartConfig.title}</h3>
            <p className="text-xs text-muted capitalize">{chartConfig.type} chart</p>
          </div>
        </div>
        
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border hover:border-accent/50 hover:bg-surface-hover transition-all text-sm font-medium"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Chart */}
      <div className="flex-1 p-5 min-h-0">
        <div className="relative h-full">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-full blur-xl pointer-events-none" />
          
          {chartConfig.type === "bar" && (
            <Bar ref={chartRef} data={chartConfig.data} options={defaultOptions} />
          )}
          {chartConfig.type === "line" && (
            <Line ref={chartRef} data={chartConfig.data} options={defaultOptions} />
          )}
          {chartConfig.type === "pie" && (
            <Pie ref={chartRef} data={chartConfig.data} options={defaultOptions} />
          )}
          {chartConfig.type === "doughnut" && (
            <Doughnut ref={chartRef} data={chartConfig.data} options={defaultOptions} />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border flex items-center justify-center gap-2 text-xs text-muted">
        <Sparkles className="w-3 h-3 text-accent" />
        Generated with AI
      </div>
    </div>
  );
}
