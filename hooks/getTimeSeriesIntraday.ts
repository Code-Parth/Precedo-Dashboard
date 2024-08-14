export interface TimeSeriesIntradayTypes {
    "Meta Data": MetaData;
    "Time Series (60min)": { [key: string]: TimeSeries5Min };
}

export interface MetaData {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": Date;
    "4. Interval": string;
    "5. Output Size": string;
    "6. Time Zone": string;
}

export interface TimeSeries5Min {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
}

export const defaultTimeSeriesData: TimeSeriesIntradayTypes = {
    "Meta Data": {
        "1. Information": "",
        "2. Symbol": "",
        "3. Last Refreshed": new Date(),
        "4. Interval": "",
        "5. Output Size": "",
        "6. Time Zone": ""
    },
    "Time Series (60min)": {}
};

export default async function getTimeSeriesIntraday(
    symbol: string,
    interval: "1min" | "5min" | "15min" | "30min" | "60min"
) {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}&datatype=json`);
        const data: TimeSeriesIntradayTypes = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching intraday time series:", error);
        return null;
    }
}
