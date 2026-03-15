"use client";

import React from "react";
import { ClipboardList, Target } from "lucide-react";
import { motion } from "framer-motion";
import { formatINR } from "@/lib/financialUtils";

interface ScenarioSummaryProps {
  monthlySip: number;
  topUpRate: number; // Decimal
  annualReturn: number; // Decimal 
  years: number;
  invested: number;
  futureValue: number;
}

export const ScenarioSummary: React.FC<ScenarioSummaryProps> = ({
  monthlySip,
  topUpRate,
  annualReturn,
  years,
  invested,
  futureValue,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-12 pt-10 border-t border-slate-200"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-1.5 bg-[#224c87] rounded-full" />
        <h3 className="text-2xl font-black text-slate-800 font-[Montserrat] tracking-tight">
          Your Investment <span className="text-[#224c87]">Scenario</span>
        </h3>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Inputs Summary */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <ClipboardList className="h-5 w-5 text-[#224c87]" />
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Inputs</h4>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Monthly SIP", value: formatINR(monthlySip) },
                { label: "Annual Top-Up", value: `${(topUpRate * 100).toFixed(0)}%` },
                { label: "Expected Return", value: `${(annualReturn * 100).toFixed(1)}%` },
                { label: "Duration", value: `${years} Years` },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">{item.label}</span>
                  <span className="text-sm md:text-base font-black text-[#224c87]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="space-y-6 md:border-l md:border-slate-100 md:pl-10">
            <div className="flex items-center gap-3 mb-2">
              <Target className="h-5 w-5 text-[#da3832]" />
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Outcomes</h4>
            </div>
            <div className="space-y-6">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">Total Invested</span>
                <span className="text-xl md:text-2xl font-black text-slate-800 font-[Montserrat] tracking-tight">{formatINR(invested)}</span>
              </div>
              <div className="flex flex-col gap-1 p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                <span className="text-[10px] md:text-xs font-bold text-blue-600 uppercase tracking-wider">Est. Portfolio Value</span>
                <span className="text-2xl md:text-3xl font-black text-[#224c87] font-[Montserrat] tracking-tight leading-none mt-1">
                  {formatINR(futureValue)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
