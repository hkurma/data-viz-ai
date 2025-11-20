import { ChartOptions } from "chart.js";

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartConfig {
  type: "bar" | "line" | "pie" | "doughnut";
  title: string;
  data: ChartData;
  options?: ChartOptions;
}

export type DataRow = Record<string, string | number | boolean | null>;

