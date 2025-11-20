"use client";

import { useCallback, useState } from "react";
import {
  Upload,
  FileSpreadsheet,
  FileJson,
  FileText,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { DataRow } from "@/types/chart";

interface FileUploadProps {
  onDataLoaded: (data: DataRow[], columns: string[], fileName: string) => void;
}

export function FileUpload({ onDataLoaded }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const processFile = useCallback(
    async (file: File) => {
      setIsLoading(true);
      try {
        const fileExtension = file.name.split(".").pop()?.toLowerCase();

        if (fileExtension === "csv") {
          // Parse CSV
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
          // Parse Excel
          const arrayBuffer = await file.arrayBuffer();
          const workbook = XLSX.read(arrayBuffer, { type: "array" });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet);

          if (jsonData && jsonData.length > 0) {
            const columns = Object.keys(jsonData[0] as Record<string, unknown>);
            onDataLoaded(jsonData as DataRow[], columns, file.name);
          }
        } else if (fileExtension === "json") {
          // Parse JSON
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
      }
    },
    [onDataLoaded]
  );

  return (
    <>
      <Card
        className={`border-2 border-dashed transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="p-12 flex flex-col items-center justify-center text-center">
          <div className="mb-4">
            <Upload className="w-12 h-12 text-muted-foreground" />
          </div>

          <h3 className="text-xl font-semibold mb-2">Upload Your Data</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Drag and drop or click to upload CSV, Excel (XLSX/XLS), or JSON
            files
          </p>

          <div className="flex gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>CSV</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Excel</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileJson className="w-4 h-4" />
              <span>JSON</span>
            </div>
          </div>

          <label htmlFor="file-upload">
            <Button disabled={isLoading} asChild>
              <span>{isLoading ? "Processing..." : "Select File"}</span>
            </Button>
            <input
              id="file-upload"
              type="file"
              accept=".csv,.xlsx,.xls,.json"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>
      </Card>

      <div className="mt-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-primary" />
          <p className="text-sm font-medium">Or try sample data:</p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => loadSampleData("sample-sales-data.csv", "csv")}
            disabled={isLoading}
          >
            <FileText className="w-4 h-4 mr-2" />
            Sales Data (CSV)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => loadSampleData("sample-products-data.json", "json")}
            disabled={isLoading}
          >
            <FileJson className="w-4 h-4 mr-2" />
            Products Data (JSON)
          </Button>
        </div>
      </div>
    </>
  );
}
