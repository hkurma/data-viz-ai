import Link from "next/link";
import {
  Upload,
  MessageSquare,
  Download,
  Shield,
  Lock,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-16 animate-fade-in-up">
        <div className="relative inline-block mb-8">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl animate-float">
            <svg 
              className="w-12 h-12 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
              />
            </svg>
          </div>
          <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/30 to-purple-600/30 rounded-3xl blur-2xl -z-10" />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Transform Data into
          <br />
          <span className="gradient-text">Beautiful Charts</span>
        </h1>
        
        <p className="text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload your data and chat with AI to generate stunning visualizations instantly. 
          No coding required. Your data stays private.
        </p>
        
        <Link href="/viz">
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg shadow-xl hover:shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5">
            <Sparkles className="w-5 h-5" />
            Start Visualizing
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
          </button>
        </Link>
      </section>

      {/* How it Works */}
      <section className="py-16 animate-fade-in-up animation-delay-200">
        <h2 className="text-3xl font-bold text-center mb-4">How it works</h2>
        <p className="text-muted text-center mb-12 max-w-xl mx-auto">
          Three simple steps to turn your raw data into professional visualizations
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Upload,
              step: "01",
              title: "Upload Your Data",
              description: "Drop CSV, Excel, or JSON files. Works with datasets of any size.",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              icon: MessageSquare,
              step: "02",
              title: "Chat with AI",
              description: "Describe what you want in plain English. AI understands your intent.",
              gradient: "from-violet-500 to-purple-500",
            },
            {
              icon: Download,
              step: "03",
              title: "Export & Share",
              description: "Download high-quality PNG images for reports and presentations.",
              gradient: "from-pink-500 to-rose-500",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl glass hover-lift"
            >
              <div className="absolute top-4 right-4 text-5xl font-black text-muted/10 group-hover:text-accent/20 transition-colors">
                {item.step}
              </div>
              
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-16 animate-fade-in-up animation-delay-300">
        <div className="relative p-8 md:p-12 rounded-3xl glass overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold">Your Privacy Matters</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              {[
                {
                  icon: Lock,
                  title: "Client-Side Processing",
                  description: "All file processing happens in your browser. Your data never leaves your device.",
                },
                {
                  icon: Zap,
                  title: "Minimal Data Sharing",
                  description: "Only column names and a 10-row preview are sent to AI. Full dataset stays local.",
                },
                {
                  icon: Shield,
                  title: "No Storage",
                  description: "We don't use any database. Data clears when you close or refresh the page.",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center shrink-0 border border-border">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center animate-fade-in-up animation-delay-400">
        <h2 className="text-3xl font-bold mb-4">Ready to visualize your data?</h2>
        <p className="text-muted mb-8">No signup required. Start creating charts in seconds.</p>
        <Link href="/viz">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-white transition-all duration-200">
            Try it now
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </section>
    </div>
  );
}
