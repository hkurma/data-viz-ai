# Data Viz AI

Transform your data into beautiful charts using AI. Upload CSV, Excel, or JSON files and describe the visualization you want in plain English.

![Data Viz AI](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)

## ✨ Features

- **📊 Multi-Format Support** — CSV, Excel (XLSX/XLS), and JSON files
- **💬 AI-Powered** — Describe charts in natural language
- **📈 Chart Types** — Bar, line, pie, and doughnut charts
- **🎨 Modern UI** — Custom-built components with glass morphism effects
- **🌓 Dark/Light Mode** — Beautiful themes with smooth transitions
- **🔒 Privacy First** — All processing happens in your browser
- **📥 Export** — Download charts as high-quality PNG images

## 🛡️ Privacy & Security

Your data stays private:

- ✅ File parsing happens entirely client-side
- ✅ Only column names + 10 row preview sent to AI
- ✅ No database, no storage
- ✅ Data cleared on page refresh

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Charts | Chart.js + react-chartjs-2 |
| Data Parsing | xlsx, papaparse |
| AI | Vercel AI SDK + OpenAI |
| Fonts | Outfit, JetBrains Mono |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd data-viz-ai

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Add your OPENAI_API_KEY to .env

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

### 1. Upload Your Data

Drop a file or click to browse. Supports:
- CSV files
- Excel spreadsheets (.xlsx, .xls)
- JSON arrays

Or try the **sample datasets** with 10,000 records each.

### 2. Chat with AI

Ask for visualizations in plain English:

```
"Show me a bar chart of sales by region"
"Create a line chart of revenue over time"
"Make a pie chart of product distribution"
"Compare units sold across categories"
```

### 3. Export & Share

Click the **Export** button to download your chart as a PNG image.

## 📊 Sample Data

Two large datasets included for testing:

| Dataset | Format | Records | Columns |
|---------|--------|---------|---------|
| Sales Data | CSV | 10,000 | Region, Product, Sales, Units, Month, Year |
| Products Data | JSON | 10,000 | product, category, price, quantity, revenue |

### Example Prompts for Sales Data
- "Bar chart of total sales by region"
- "Line chart of average sales by month"
- "Pie chart showing product distribution"

### Example Prompts for Products Data
- "Pie chart of revenue by category"
- "Bar chart of total quantity by category"
- "Doughnut chart of average price by category"

## 📁 Project Structure

```
data-viz-ai/
├── app/
│   ├── api/chat/route.ts    # AI chat endpoint
│   ├── viz/page.tsx         # Visualization page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css          # Design system & styles
├── components/
│   ├── file-upload.tsx      # Drag & drop uploader
│   ├── chat-interface.tsx   # AI chat UI
│   ├── chart-renderer.tsx   # Chart.js wrapper
│   ├── data-table.tsx       # Sortable data table
│   ├── theme-toggle.tsx     # Dark/light toggle
│   └── error-handler.tsx    # Global error handler
├── types/
│   └── chart.ts             # TypeScript definitions
└── public/
    ├── icon.svg             # App icon
    ├── sample-sales-data.csv
    └── sample-products-data.json
```

## 🎨 Design System

Custom-built UI with:

- **Colors**: Indigo-purple gradient accents
- **Effects**: Glass morphism, subtle grid backgrounds
- **Typography**: Outfit (headings), JetBrains Mono (data)
- **Animations**: Fade-in, float, pulse glow effects
- **Components**: All hand-crafted with Tailwind CSS

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please submit a Pull Request.
