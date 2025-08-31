
"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, Line, LineChart, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const salesByCatData = [
  { category: "Food", sales: 18600, fill: "hsl(var(--chart-1))" },
  { category: "Apparel", sales: 30500, fill: "hsl(var(--chart-2))" },
  { category: "Cosmetics", sales: 23700, fill: "hsl(var(--chart-3))" },
  { category: "Home Goods", sales: 7300, fill: "hsl(var(--chart-4))" },
]

const salesByCatConfig = {
  sales: {
    label: "Sales (₹)",
  },
  "Food": {
    label: "Food",
    color: "hsl(var(--chart-1))",
  },
  "Apparel": {
    label: "Apparel",
    color: "hsl(var(--chart-2))",
  },
  "Cosmetics": {
    label: "Cosmetics",
    color: "hsl(var(--chart-3))",
  },
  "Home Goods": {
    label: "Home Goods",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

const salesOverTimeData = [
  { month: "January", sales: 12453 },
  { month: "February", sales: 15342 },
  { month: "March", sales: 18956 },
  { month: "April", sales: 21087 },
  { month: "May", sales: 25678 },
  { month: "June", sales: 23145 },
]

const salesOverTimeConfig = {
  sales: {
    label: "Sales (₹)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function SalesAnalytics() {
  return (
    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Sales by Category</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={salesByCatConfig}>
            <BarChart
              accessibilityLayer
              data={salesByCatData}
              layout="vertical"
              margin={{
                left: 10,
              }}
            >
              <YAxis
                dataKey="category"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) =>
                  salesByCatConfig[value as keyof typeof salesByCatConfig]?.label
                }
              />
              <XAxis dataKey="sales" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="sales"
                layout="vertical"
                radius={5}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sales Over Time</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={salesOverTimeConfig}>
            <LineChart
              accessibilityLayer
              data={salesOverTimeData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
               <YAxis
                tickFormatter={(value) => `₹${value / 1000}k`}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                dataKey="sales"
                type="monotone"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
