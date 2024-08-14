"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

interface ChartDataTypes {
    time: string
    "1. open": number
    "2. high": number
    "3. low": number
    "4. close": number
    "5. volume": number
}

const chartConfig = {
    "1. open": {
        label: "Open",
        color: "hsl(var(--chart-1))",
    },
    "2. high": {
        label: "High",
        color: "hsl(var(--chart-2))",
    },
    "3. low": {
        label: "Low",
        color: "hsl(var(--chart-3))",
    },
    "4. close": {
        label: "Close",
        color: "hsl(var(--chart-4))",
    },
    "5. volume": {
        label: "Volume",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

function transformChartData(rawData: Record<string, {
    "1. open": string,
    "2. high": string,
    "3. low": string,
    "4. close": string,
    "5. volume": string
}>): ChartDataTypes[] {
    return Object.entries(rawData).map(([time, data]) => ({
        time,
        "1. open": parseFloat(data["1. open"]),
        "2. high": parseFloat(data["2. high"]),
        "3. low": parseFloat(data["3. low"]),
        "4. close": parseFloat(data["4. close"]),
        "5. volume": parseInt(data["5. volume"], 10)
    }));
}

export function LineChartComponent1(
    { title, description, rawChartData }: {
        title: string,
        description: string,
        rawChartData: Record<string, {
            "1. open": string,
            "2. high": string,
            "3. low": string,
            "4. close": string,
            "5. volume": string
        }>
    }
) {
    const chartData = transformChartData(rawChartData);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Line
                            dataKey="1. open"
                            type="monotone"
                            stroke="hsl(var(--chart-1))"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="2. high"
                            type="monotone"
                            stroke="hsl(var(--chart-2))"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="3. low"
                            type="monotone"
                            stroke="hsl(var(--chart-3))"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="4. close"
                            type="monotone"
                            stroke="hsl(var(--chart-4))"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="5. volume"
                            type="monotone"
                            stroke="hsl(var(--chart-5))"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Showing data for the last 6 months
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}