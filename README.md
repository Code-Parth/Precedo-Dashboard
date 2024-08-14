# Precedo Dashboard

Precedo Dashboard is a web application built with Next.js, React, and Recharts for visualizing time series data. This project includes various components and hooks to create interactive and customizable charts.

## Key Components

### Hooks

- **getTimeSeriesIntraday**: A hook for fetching intraday time series data.

### If the API has reached its limit and is not working

uncomment the following lines in `app/page.tsx` to handle this scenario properly.

- [Line 6](https://github.com/Code-Parth/Precedo-Dashboard/blob/dc1ef99a927d38ab723dfd1d8b24fd13c9be1fa2/app/page.tsx#L6)
- [Line 92](https://github.com/Code-Parth/Precedo-Dashboard/blob/dc1ef99a927d38ab723dfd1d8b24fd13c9be1fa2/app/page.tsx#L92)
- [Line 173](https://github.com/Code-Parth/Precedo-Dashboard/blob/dc1ef99a927d38ab723dfd1d8b24fd13c9be1fa2/app/page.tsx#L173)

### Add a search functionality:
Implement a search functionality that allows users to search for specific stock symbols. Create a dedicated page for each symbol where users can access more detailed information about the selected stock. You can refer to past commits for examples or relevant code snippets.

## Getting Started

### Prerequisites
-  Node.js
-  pnpm (or npm/yarn)

### Installation
  - Clone the repository:
    ```bash
    git clone https://github.com/Code-Parth/precedo-dashboard.git
    cd precedo-dashboard
    ```
  - Install dependencies:
    ```bash
    pnpm install
    ```
  - Create a `.env.local` file and add your environment variables.
    ```
    NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=<YOUR_API_KEY>
    ```
    To obtain your API key, visit the Alpha Vantage support page: https://www.alphavantage.co/support/

### Running the Development Server

```bash
pnpm dev
```

Open [`http://localhost:3000`](http://localhost:3000) with your browser to see the result.

### Building for Production

```
pnpm build
```
