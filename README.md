# AI Viz - Data Visualization with AI

Create beautiful visualizations from your data using natural language. Upload CSV, Excel, or JSON files and chat with an AI assistant to generate charts instantly.

## Features

- 📊 **Multiple File Formats**: Support for CSV, Excel (XLSX/XLS), and JSON files
- 💬 **Natural Language Interface**: Chat with AI to create visualizations
- 📈 **Multiple Chart Types**: Bar charts, line charts, pie charts, and doughnut charts
- 🎨 **Beautiful UI**: Modern, responsive interface with dark mode support
- 💾 **Client-Side Processing**: All data processing happens in your browser - no data is stored
- 📥 **Export Charts**: Download your visualizations as PNG images

## Security & Privacy

- All file processing happens client-side in your browser
- Only column names and a preview of your data (first 10 rows) are sent to OpenAI
- No data is stored in any database
- Data is cleared when you upload a new file or refresh the page

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **File Parsing**: xlsx (Excel), papaparse (CSV)
- **AI**: Vercel AI SDK with OpenAI

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd ai-viz
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Add your OpenAI API key to `.env`:

```bash
OPENAI_API_KEY=your_actual_api_key_here
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Upload Data**: Click or drag-and-drop to upload your CSV, Excel, or JSON file
   - Or try the sample data buttons to load pre-loaded datasets
2. **Chat**: Ask the AI assistant to create visualizations, for example:
   - "Show me a bar chart of sales by region"
   - "Create a line chart of revenue over time"
   - "Make a pie chart showing product distribution"
3. **View & Download**: See your chart rendered instantly and download it as needed

## Sample Data

The application includes large sample datasets (10,000 records each) you can try immediately:

- **Sales Data (CSV)**: 10,000 sales records across regions, products, months, and years
  - Columns: Region, Product, Sales, Units, Month, Year
  - Try: "Show me a bar chart of total sales by region"
  - Try: "Create a line chart of average sales by month"
  - Try: "Show me a pie chart of product distribution"
  
- **Products Data (JSON)**: 10,000 product records with categories, pricing, and inventory
  - Fields: product, category, price, quantity, revenue
  - Try: "Create a pie chart of revenue by category"
  - Try: "Show total quantity by category in a bar chart"
  - Try: "Display average price by category"

Click the sample data buttons on the upload screen to load these datasets instantly. The large datasets allow you to test performance and create meaningful visualizations.

## Example Prompts

- "Show a bar chart of [column] by [category]"
- "Create a line chart showing [metric] over time"
- "Make a pie chart of [field] distribution"
- "Display a doughnut chart of [data] breakdown"
- "Compare [field1] and [field2] in a bar chart"

## Project Structure

```bash
ai-viz/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts       # AI chat endpoint
│   ├── viz/
│   │   └── page.tsx           # Data Visualization page 
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/
│   ├── file-upload.tsx        # File upload component
│   ├── chat-interface.tsx     # Chat UI
│   ├── chart-renderer.tsx     # Chart.js wrapper
│   ├── theme-toggle.tsx       # Light/Dark mode toggle component
│   ├── data-table.tsx         # Data table
│   ├── error-handler.tsx      # Global error handler
│   └── ui/                    # UI components
├── lib/
│   └── utils.ts               # Utils
├── types/
│   └── chart.ts               # TypeScript types
└── public/                    # Static assets
    ├── sample-sales-data.csv  # Sample CSV data
    └── sample-products-data.json   # Sample JSON data
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
