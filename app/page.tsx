"use client";

import Image from "next/image";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import getTimeSeriesIntraday, { TimeSeriesIntradayTypes, defaultTimeSeriesData } from "@/hooks/getTimeSeriesIntraday";

// Global Top 5 Stocks in Tech Sector
// https://companiesmarketcap.com/tech/largest-tech-companies-by-market-cap/
const top5TechStocks = [
  { symbol: "AAPL", name: "Apple", logo: "https://companiesmarketcap.com/img/company-logos/64/AAPL.webp" },
  { symbol: "MSFT", name: "Microsoft", logo: "https://companiesmarketcap.com/img/company-logos/64/MSFT.webp" },
  { symbol: "NVDA", name: "NVIDIA", logo: "https://companiesmarketcap.com/img/company-logos/64/NVDA.webp" },
  { symbol: "GOOG", name: "Alphabet (Google)", logo: "https://companiesmarketcap.com/img/company-logos/64/GOOG.webp" },
  { symbol: "AMZN", name: "Amazon", logo: "https://companiesmarketcap.com/img/company-logos/64/AMZN.webp" },
];

// Global Top 5 Stocks in Healthcare Sector
// https://companiesmarketcap.com/healthcare/largest-healthcare-companies-by-market-cap/
const top5HealthcareStocks = [
  { symbol: "UNH", name: "UnitedHealth", logo: "https://companiesmarketcap.com/img/company-logos/64/UNH.webp" },
  { symbol: "ELV", name: "Elevance Health", logo: "https://companiesmarketcap.com/img/company-logos/64/LLY.webp" },
  { symbol: "HCA", name: "HCA Healthcare", logo: "https://companiesmarketcap.com/img/company-logos/64/HCA.webp" },
  { symbol: "CI", name: "Cigna", logo: "https://companiesmarketcap.com/img/company-logos/64/CI.webp" },
  { symbol: "MCK", name: "McKesson", logo: "https://companiesmarketcap.com/img/company-logos/64/MCK.webp" },
];

// Global Top 5 Stocks in Financial Sector
// https://companiesmarketcap.com/financial-services/largest-financial-service-companies-by-market-cap/
const top5FinancialStocks = [
  { symbol: "JPM", name: "JPMorgan Chase", logo: "https://companiesmarketcap.com/img/company-logos/64/JPM.webp" },
  { symbol: "V", name: "Visa", logo: "https://companiesmarketcap.com/img/company-logos/64/V.webp" },
  { symbol: "MA", name: "Mastercard", logo: "https://companiesmarketcap.com/img/company-logos/64/MA.webp" },
  { symbol: "BAC", name: "Bank of America", logo: "https://companiesmarketcap.com/img/company-logos/64/BAC.webp" },
  { symbol: "1398.HK", name: "ICBC", logo: "https://companiesmarketcap.com/img/company-logos/64/1398.HK.webp" },
];

export default function Home() {
  const [sector, setSector] = useState<string>("");
  const [stocks, setStocks] = useState<{ symbol: string, name: string, logo: string }[]>([]);
  const [timeSeriesData01, setTimeSeriesData01] = useState<TimeSeriesIntradayTypes>({} as TimeSeriesIntradayTypes);
  const [timeSeriesData02, setTimeSeriesData02] = useState<TimeSeriesIntradayTypes>({} as TimeSeriesIntradayTypes);
  const [timeSeriesData03, setTimeSeriesData03] = useState<TimeSeriesIntradayTypes>({} as TimeSeriesIntradayTypes);
  const [timeSeriesData04, setTimeSeriesData04] = useState<TimeSeriesIntradayTypes>({} as TimeSeriesIntradayTypes);
  const [timeSeriesData05, setTimeSeriesData05] = useState<TimeSeriesIntradayTypes>({} as TimeSeriesIntradayTypes);

  const selectedStocks = useMemo(() => {
    switch (sector) {
      case "tech":
        return top5TechStocks;
      case "healthcare":
        return top5HealthcareStocks;
      case "financial":
        return top5FinancialStocks;
      default:
        return [];
    }
  }, [sector]);

  const fetchStockData = useCallback(async () => {
    const dataPromises = selectedStocks.map(stock =>
      getTimeSeriesIntraday(stock.symbol, "5min")
    );

    const results = await Promise.all(dataPromises);

    setTimeSeriesData01(results[0] || defaultTimeSeriesData);
    setTimeSeriesData02(results[1] || defaultTimeSeriesData);
    setTimeSeriesData03(results[2] || defaultTimeSeriesData);
    setTimeSeriesData04(results[3] || defaultTimeSeriesData);
    setTimeSeriesData05(results[4] || defaultTimeSeriesData);
  }, [selectedStocks]);

  useEffect(() => {
    setStocks(selectedStocks);

    if (selectedStocks.length > 0) {
      fetchStockData();
    }
  }, [selectedStocks, fetchStockData]);

  const handleSectorChange = useCallback((value: string) => {
    setSector(value);
  }, []);

  console.log(stocks, timeSeriesData01, timeSeriesData02, timeSeriesData03, timeSeriesData04, timeSeriesData05);

  return (
    <main className="w-full min-h-screen max-w-[95vw] mx-auto py-8 flex flex-col">
      <div className="w-full flex justify-end">
        <Select onValueChange={handleSectorChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tech">Tech</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="financial">Financial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="py-8 gap-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {stocks.map(stock => (
          <Card key={stock.symbol}>
            <CardHeader>
              <Image src={stock.logo} alt={stock.name} width={64} height={64} />
            </CardHeader>
            <CardContent>
              <CardTitle>{stock.name}</CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>

    </main>
  );
}
