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
} from "recharts";
import { motion } from "framer-motion";
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
    <div className="bg-white/95 backdrop-blur-md border border-slate-100/60 rounded-[1.5rem] shadow-2xl p-4 text-sm min-w-[200px]">
      <p className="font-black text-slate-800 mb-3 border-b border-slate-100 pb-2">Year {label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex justify-between gap-6 py-1">
          <span style={{ color: entry.color }} className="font-bold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
            {entry.name}
          </span>
          <span className="font-black text-slate-900">
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
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-10"
    >
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h3 className="font-black text-[#224c87] text-xl md:text-2xl font-[Montserrat] tracking-tight">
            Portfolio Velocity
          </h3>
          <p className="text-xs md:text-sm font-bold text-slate-400 mt-1 uppercase tracking-wider">
            Projected value vs. Cumulative contributions
          </p>
        </div>

        {/* Chart View Toggle Switch */}
        <div className="flex bg-slate-100/80 p-1.5 rounded-2xl self-start border border-slate-200/40">
          <button
            onClick={() => setChartType("bar")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${chartType === "bar"
              ? "bg-white text-[#224c87] shadow-xl"
              : "text-slate-500 hover:text-slate-700"
              }`}
          >
            <BarChart3 className="w-4 h-4" />
            Bar
          </button>
          <button
            onClick={() => setChartType("line")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${chartType === "line"
              ? "bg-white text-[#224c87] shadow-xl"
              : "text-slate-500 hover:text-slate-700"
              }`}
          >
            <LineChartIcon className="w-4 h-4" />
            Line
          </button>
        </div>
      </div>
      <div
        className="h-[350px] w-full"
        role="img"
        aria-label="Portfolio growth chart"
      >
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart
              data={data}
              margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
              barCategoryGap={typeof window !== "undefined" && window.innerWidth < 768 ? "15%" : "25%"}
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
                fontSize={typeof window !== "undefined" && window.innerWidth < 768 ? 9 : 11}
                fontWeight="700"
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                tickFormatter={formatCompact}
                stroke="#94a3b8"
                fontSize={10}
                fontWeight="700"
                tickLine={false}
                axisLine={false}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
              <Legend
                iconType="circle"
                iconSize={10}
                wrapperStyle={{ paddingTop: "32px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.1em" }}
              />
              <Bar
                dataKey="totalInvested"
                name="Invested"
                stackId="growth"
                fill="#da3832"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="portfolioValue"
                name="Future Value"
                stackId="none"
                fill="#224c87"
                radius={[6, 6, 0, 0]}
                opacity={0.8}
              />
            </BarChart>
          ) : (
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
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
                fontSize={typeof window !== "undefined" && window.innerWidth < 768 ? 9 : 11}
                fontWeight="700"
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                tickFormatter={formatCompact}
                stroke="#94a3b8"
                fontSize={10}
                fontWeight="700"
                tickLine={false}
                axisLine={false}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={10}
                wrapperStyle={{ paddingTop: "32px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.1em" }}
              />
              <Line
                type="monotone"
                dataKey="portfolioValue"
                name="Future Value"
                stroke="#224c87"
                strokeWidth={4}
                dot={false}
                activeDot={{ r: 6, fill: "#224c87", stroke: "#fff", strokeWidth: 3 }}
              />
              <Line
                type="monotone"
                dataKey="totalInvested"
                name="Invested"
                stroke="#da3832"
                strokeWidth={3}
                strokeDasharray="8 4"
                dot={false}
                activeDot={{ r: 6, fill: "#da3832", stroke: "#fff", strokeWidth: 3 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
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
    <div className="bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl shadow-2xl p-4 text-sm font-black">
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex justify-between gap-6 py-1">
          <span style={{ color: entry.payload.color || entry.color }} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.payload.color || entry.color }} />
            {entry.name}
          </span>
          <span className="text-slate-900">
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
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10 h-full flex flex-col"
    >
      <div className="mb-8">
        <h3 className="font-black text-[#224c87] text-xl md:text-2xl font-[Montserrat] tracking-tight">
          Portfolio Mix
        </h3>
        <p className="text-xs md:text-sm font-bold text-slate-400 mt-1 uppercase tracking-wider">
          Capital vs. Yield breakdown
        </p>
      </div>

      <div className="h-[250px] flex-grow" role="img" aria-label="Portfolio mix pie chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
              animationBegin={200}
              animationDuration={1200}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<PieTooltip />} />
            <Legend
              iconType="circle"
              iconSize={10}
              wrapperStyle={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.1em" }}
              verticalAlign="bottom"
              align="center"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Percentage breakdown */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-[#224c87]/5 rounded-[1.5rem] p-4 text-center border border-[#224c87]/5">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Capital</p>
          <p className="text-xl md:text-2xl font-black text-[#224c87] font-[Montserrat]">
            {investedPct}%
          </p>
        </div>
        <div className="bg-[#da3832]/5 rounded-[1.5rem] p-4 text-center border border-[#da3832]/5">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Profit</p>
          <p className="text-xl md:text-2xl font-black text-[#da3832] font-[Montserrat]">
            {returnsPct}%
          </p>
        </div>
      </div>
    </motion.div>
  );
};
