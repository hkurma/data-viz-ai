"use client";

import { useCallback, useState } from "react";
import {
  Upload,
  FileSpreadsheet,
  FileJson,
  FileText,
  Sparkles,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { DataRow } from "@/types/chart";

interface FileUploadProps {
  onDataLoaded: (data: DataRow[], columns: string[], fileName: string) => void;
}

export function FileUpload({ onDataLoaded }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingFile, setLoadingFile] = useState<string>("");

  const processFile = useCallback(
    async (file: File) => {
      setIsLoading(true);
      setLoadingFile(file.name);
      try {
        const fileExtension = file.name.split(".").pop()?.toLowerCase();

        if (fileExtension === "csv") {
          const text = await file.text();
          Papa.parse(text, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => {
              if (results.data && results.data.length > 0) {
                const columns = Object.keys(
                  results.data[0] as Record<string, unknown>
                );
                onDataLoaded(results.data as DataRow[], columns, file.name);
              }
            },
          });
        } else if (fileExtension === "xlsx" || fileExtension === "xls") {
          const arrayBuffer = await file.arrayBuffer();
          const workbook = XLSX.read(arrayBuffer, { type: "array" });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet);

          if (jsonData && jsonData.length > 0) {
            const columns = Object.keys(jsonData[0] as Record<string, unknown>);
            onDataLoaded(jsonData as DataRow[], columns, file.name);
          }
        } else if (fileExtension === "json") {
          const text = await file.text();
          const jsonData = JSON.parse(text);
          const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];

          if (dataArray.length > 0) {
            const columns = Object.keys(dataArray[0]);
            onDataLoaded(dataArray, columns, file.name);
          }
        }
      } catch (error) {
        console.error("Error processing file:", error);
        alert("Error processing file. Please check the format and try again.");
      } finally {
        setIsLoading(false);
        setLoadingFile("");
      }
    },
    [onDataLoaded]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        processFile(files[0]);
      }
    },
    [processFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        processFile(files[0]);
      }
    },
    [processFile]
  );

  const loadSampleData = useCallback(
    async (fileName: string, fileType: "csv" | "json") => {
      setIsLoading(true);
      setLoadingFile(fileName);
      try {
        const response = await fetch(`/${fileName}`);
        const text = await response.text();

        if (fileType === "csv") {
          Papa.parse(text, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => {
              if (results.data && results.data.length > 0) {
                const columns = Object.keys(
                  results.data[0] as Record<string, unknown>
                );
                onDataLoaded(results.data as DataRow[], columns, fileName);
              }
            },
          });
        } else if (fileType === "json") {
          const jsonData = JSON.parse(text);
          const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];

          if (dataArray.length > 0) {
            const columns = Object.keys(dataArray[0]);
            onDataLoaded(dataArray as DataRow[], columns, fileName);
          }
        }
      } catch (error) {
        console.error("Error loading sample data:", error);
        alert("Error loading sample data. Please try again.");
      } finally {
        setIsLoading(false);
        setLoadingFile("");
      }
    },
    [onDataLoaded]
  );

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 ${
          isDragging
            ? "border-accent bg-accent/5 scale-[1.02]"
            : "border-border hover:border-accent/50 hover:bg-surface"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {/* Decorative gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        
        <div className="relative p-12 flex flex-col items-center justify-center text-center">
          <div className={`mb-6 p-4 rounded-2xl transition-all duration-300 ${
            isDragging ? "bg-accent/10 scale-110" : "bg-surface"
          }`}>
            {isLoading ? (
              <Loader2 className="w-12 h-12 text-accent animate-spin" />
            ) : (
              <Upload className={`w-12 h-12 transition-colors ${
                isDragging ? "text-accent" : "text-muted"
              }`} />
            )}
          </div>

          <h3 className="text-2xl font-bold mb-3">
            {isLoading ? "Processing..." : "Upload Your Data"}
          </h3>
          
          {isLoading ? (
            <p className="text-muted mb-6">{loadingFile}</p>
          ) : (
            <p className="text-muted mb-6 max-w-md">
              Drag and drop your file here, or click to browse
            </p>
          )}

          {/* File type badges */}
          <div className="flex gap-3 mb-8">
            {[
              { icon: FileText, label: "CSV", color: "text-emerald-500" },
              { icon: FileSpreadsheet, label: "Excel", color: "text-blue-500" },
              { icon: FileJson, label: "JSON", color: "text-amber-500" },
            ].map((type) => (
              <div
                key={type.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border"
              >
                <type.icon className={`w-4 h-4 ${type.color}`} />
                <span className="text-sm font-medium">{type.label}</span>
              </div>
            ))}
          </div>

          <label htmlFor="file-upload" className="cursor-pointer">
            <span className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              isLoading
                ? "bg-muted/20 text-muted cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5"
            }`}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Select File
                </>
              )}
            </span>
            <input
              id="file-upload"
              type="file"
              accept=".csv,.xlsx,.xls,.json"
              onChange={handleFileSelect}
              disabled={isLoading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Sample Data Section */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="font-semibold">Try with sample data</span>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => loadSampleData("sample-sales-data.csv", "csv")}
            disabled={isLoading}
            className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-surface border border-border hover:border-accent/50 hover:bg-surface-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileText className="w-5 h-5 text-emerald-500" />
            <div className="text-left">
              <div className="font-medium text-sm">Sales Data</div>
              <div className="text-xs text-muted">CSV • 10,000 records</div>
            </div>
            {isLoading && loadingFile === "sample-sales-data.csv" ? (
              <Loader2 className="w-4 h-4 animate-spin text-accent ml-2" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-muted group-hover:text-accent ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
          
          <button
            onClick={() => loadSampleData("sample-products-data.json", "json")}
            disabled={isLoading}
            className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-surface border border-border hover:border-accent/50 hover:bg-surface-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileJson className="w-5 h-5 text-amber-500" />
            <div className="text-left">
              <div className="font-medium text-sm">Products Data</div>
              <div className="text-xs text-muted">JSON • E-commerce catalog</div>
            </div>
            {isLoading && loadingFile === "sample-products-data.json" ? (
              <Loader2 className="w-4 h-4 animate-spin text-accent ml-2" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-muted group-hover:text-accent ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
