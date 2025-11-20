import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Upload,
  MessageSquare,
  Download,
  Shield,
  Lock,
  Zap,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Data Viz AI</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Upload your data and chat with AI to generate beautiful charts
          instantly. No coding required.
        </p>
        <Link href="/viz">
          <Button size="lg" className="text-lg px-8 py-6">
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      {/* How it Works */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Upload Your Data</h3>
            <p className="text-muted-foreground">
              Upload CSV, Excel, or JSON files. Or try our sample datasets with
              10,000 records.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Chat with AI</h3>
            <p className="text-muted-foreground">
              Describe the visualization you want in natural language. AI
              understands your intent.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. View & Download</h3>
            <p className="text-muted-foreground">
              See your chart rendered instantly. Download as PNG for
              presentations or reports.
            </p>
          </div>
        </div>
      </div>

      {/* Data Privacy */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Data Privacy</h2>
        <div className="space-y-8">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-primary mt-1.5 shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Your Data Stays Private
              </h3>
              <p className="text-muted-foreground">
                All file processing happens client-side in your browser. Your
                data never gets stored on our servers.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-primary mt-1.5 shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Minimal Data Sharing
              </h3>
              <p className="text-muted-foreground">
                Only column names and a preview (first 10 rows) are sent to
                OpenAI to generate chart configurations. Your full dataset never
                leaves your browser.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary mt-1.5 shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">
                No Database Storage
              </h3>
              <p className="text-muted-foreground">
                We don&apos;t use any database. All data is kept in memory
                during your session and is cleared when you refresh or close the
                page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
