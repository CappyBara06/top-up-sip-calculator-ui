"use client";

import React from "react";
import { Lightbulb, CheckCircle2, AlertCircle, TrendingUp, Info } from "lucide-react";
import { motion } from "framer-motion";

interface InvestmentInsightsProps {
  years: number;
  topUpRate: number; // Decimal (e.g., 0.1 for 10%)
  annualReturn: number; // Decimal (e.g., 0.12 for 12%)
  invested: number;
  futureValue: number;
  goalAmount: number;
}

interface Insight {
  id: string;
  message: string;
  type: "success" | "info" | "warning";
  icon: React.ReactNode;
}

export const InvestmentInsights: React.FC<InvestmentInsightsProps> = ({
  years,
  topUpRate,
  annualReturn,
  invested,
  futureValue,
  goalAmount,
}) => {
  const generateInsights = (): Insight[] => {
    const insights: Insight[] = [];

    // 0. Neutral Educational Insight (Always Visible)
    insights.push({
      id: "neutral-market",
      message: "Investment outcomes depend on market conditions and actual returns may vary from the assumed rate used in this calculation.",
      type: "info",
      icon: <Info className="h-5 w-5" />,
    });

    // 1. Investment Horizon Insight
    if (years >= 15) {
      insights.push({
        id: "duration-long",
        message: "Long investment horizons allow compounding to significantly increase wealth over time under current assumptions.",
        type: "success",
        icon: <TrendingUp className="h-5 w-5" />,
      });
    }

    // 2. Top-Up Growth Insight
    if (topUpRate >= 0.10) {
      insights.push({
        id: "topup-high",
        message: "A higher annual top-up increases contributions each year, which may result in accelerated portfolio growth.",
        type: "success",
        icon: <CheckCircle2 className="h-5 w-5" />,
      });
    }

    // 3. Compounding Insight
    if (futureValue - invested > invested) {
      insights.push({
        id: "returns-exceed-capital",
        message: "Compounding illustrates a major role in this scenario, where estimated returns eventually exceed the total invested capital.",
        type: "success",
        icon: <Lightbulb className="h-5 w-5" />,
      });
    }

    // 4. Goal Progress Insight
    if (goalAmount > 0) {
      if (futureValue < goalAmount) {
        insights.push({
          id: "goal-shortfall",
          message: "Based on current assumptions, the investment scenario may fall short of the target goal.",
          type: "warning",
          icon: <AlertCircle className="h-5 w-5" />,
        });
      } else {
        insights.push({
          id: "goal-reached",
          message: "This investment scenario meets or exceeds the target goal under the current assumptions.",
          type: "success",
          icon: <CheckCircle2 className="h-5 w-5" />,
        });
      }
    }

    return insights;
  };

  const insights = generateInsights();

  if (insights.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="mt-12 pt-10 border-t border-slate-200"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-1.5 bg-[#da3832] rounded-full" />
        <h3 className="text-2xl font-black text-slate-800 font-[Montserrat] tracking-tight">
          Investment <span className="text-[#da3832]">Insights</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            className={`flex flex-col gap-4 p-6 rounded-[2rem] border transition-all duration-300 shadow-sm hover:shadow-lg ${
              insight.type === "success"
                ? "bg-emerald-50/50 border-emerald-100 text-emerald-900"
                : insight.type === "warning"
                ? "bg-amber-50/50 border-amber-100 text-amber-900"
                : "bg-blue-50/50 border-blue-100 text-[#224c87]"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                insight.type === "success"
                  ? "bg-emerald-100 text-emerald-600"
                  : insight.type === "warning"
                  ? "bg-amber-100 text-amber-600"
                  : "bg-blue-100 text-[#224c87]"
              }`}
            >
              {insight.icon}
            </div>
            <p className="text-sm font-bold leading-relaxed">{insight.message}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
