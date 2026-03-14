"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  TooltipProps,
} from "recharts";
import { SIPYearlyData } from "@/lib/topupSipCalculator";
import { formatCompact, formatINR } from "@/lib/financialUtils";
import { BarChart3, LineChart as LineChartIcon } from "lucide-react";

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const CustomTooltip: React.FC<any> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-xl p-4 text-sm min-w-[180px]">
      <p className="font-semibold text-slate-700 mb-2">Year {label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex justify-between gap-4">
          <span style={{ color: entry.color }} className="font-medium">
            {entry.name}
          </span>
          <span className="font-bold text-slate-800">
            {formatINR(entry.value as number)}
          </span>
        </div>
      ))}
    </div>
  );
};

// ─── Growth Chart ─────────────────────────────────────────────────────────────
interface GrowthChartProps {
  data: SIPYearlyData[];
}

export const GrowthChart: React.FC<GrowthChartProps> = ({ data }) => {
  const [chartType, setChartType] = useState<"bar" | "line">("bar");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="mb-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h3 className="font-bold text-[#224c87] text-lg font-[Montserrat]">
            Portfolio Growth Over Time
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Future value vs. amount invested across each year
          </p>
        </div>

        {/* Chart View Toggle Switch */}
        <div className="flex bg-slate-100 p-1 rounded-lg self-start">
          <button
            onClick={() => setChartType("bar")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${chartType === "bar"
              ? "bg-white text-[#224c87] shadow-sm"
              : "text-slate-500 hover:text-slate-700"
              }`}
          >
            <BarChart3 className="w-4 h-4" />
            Bar
          </button>
          <button
            onClick={() => setChartType("line")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${chartType === "line"
              ? "bg-white text-[#224c87] shadow-sm"
              : "text-slate-500 hover:text-slate-700"
              }`}
          >
            <LineChartIcon className="w-4 h-4" />
            Line
          </button>
        </div>
      </div>
      <div
        className="h-[300px] w-full"
        role="img"
        aria-label="Portfolio growth line chart"
      >
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart
              data={data}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
              barCategoryGap={typeof window !== "undefined" && window.innerWidth < 768 ? "10%" : "20%"}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="year"
                tickFormatter={(v) => `Yr ${v}`}
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tickFormatter={formatCompact}
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={72}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ paddingTop: "16px", fontSize: "12px" }}
              />
              <Bar
                dataKey="sipAmount"
                name="SIP Amount"
                stackId="growth"
                fill="#da3832"
                radius={[0, 0, 4, 4]}
              />
            </BarChart>
          ) : (
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="year"
                tickFormatter={(v) => `Yr ${v}`}
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tickFormatter={formatCompact}
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={72}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ paddingTop: "16px", fontSize: "12px" }}
              />
              <Line
                type="monotone"
                dataKey="portfolioValue"
                name="Future Value"
                stroke="#224c87"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 5, fill: "#224c87" }}
              />
              <Line
                type="monotone"
                dataKey="sipAmount"
                name="SIP Amount"
                stroke="#da3832"
                strokeWidth={2.5}
                strokeDasharray="5 3"
                dot={false}
                activeDot={{ r: 5, fill: "#da3832" }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// ─── Investment vs Returns Chart ──────────────────────────────────────────────
interface InvestmentVsReturnsChartProps {
  invested: number;
  returns: number;
}

const PieTooltip: React.FC<any> = ({
  active,
  payload,
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-100 rounded-xl shadow-xl p-4 text-sm">
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex justify-between gap-4">
          <span style={{ color: entry.payload.color || entry.color }} className="font-medium">
            {entry.name}
          </span>
          <span className="font-bold text-slate-800">
            {formatINR(entry.value as number)}
          </span>
        </div>
      ))}
    </div>
  );
};

export const InvestmentVsReturnsChart: React.FC<
  InvestmentVsReturnsChartProps
> = ({ invested, returns }) => {
  const total = invested + returns;
  const investedPct = ((invested / total) * 100).toFixed(1);
  const returnsPct = ((returns / total) * 100).toFixed(1);

  const data = [
    { name: "Invested", value: invested, color: "#224c87" },
    { name: "Returns", value: returns, color: "#da3832" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-full flex flex-col">
      <div className="mb-5">
        <h3 className="font-bold text-[#224c87] text-lg font-[Montserrat]">
          Invested vs Returns
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Composition of your total portfolio
        </p>
      </div>

      <div className="h-[200px] flex-grow" role="img" aria-label="Invested vs returns pie chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<PieTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: "12px" }}
              verticalAlign="bottom"
              align="center"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Percentage breakdown */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-blue-50 rounded-xl p-3 text-center">
          <p className="text-xs text-slate-500 font-medium">Invested</p>
          <p className="text-lg font-bold text-[#224c87] font-[Montserrat]">
            {investedPct}%
          </p>
        </div>
        <div className="bg-red-50 rounded-xl p-3 text-center">
          <p className="text-xs text-slate-500 font-medium">Returns</p>
          <p className="text-lg font-bold text-[#da3832] font-[Montserrat]">
            {returnsPct}%
          </p>
        </div>
      </div>
    </div>
  );
};
