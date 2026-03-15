"use client";

import React, { useMemo } from "react";
import { TrendingUp, Plus, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { formatINR } from "@/lib/financialUtils";
import { calculateTopUpSip } from "@/lib/topupSipCalculator";

interface TopUpImpactProps {
  monthlySip: number;
  annualReturn: number; // Decimal
  years: number;
  topUpRate: number; // Decimal (for context, even though we use 0 for baseline)
  currentFutureValue: number;
}

export const TopUpImpact: React.FC<TopUpImpactProps> = ({
  monthlySip,
  annualReturn,
  years,
  currentFutureValue,
}) => {
  const normalSipValue = useMemo(() => {
    // Calculate with 0 top-up rate
    const res = calculateTopUpSip(monthlySip, annualReturn, years, 0);
    return res.futureValue;
  }, [monthlySip, annualReturn, years]);

  const extraWealth = currentFutureValue - normalSipValue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mt-12 pt-10 border-t border-slate-200"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-1.5 bg-[#da3832] rounded-full" />
        <h3 className="text-2xl font-black text-slate-800 font-montserrat tracking-tight">
          Impact of <span className="text-[#da3832]">Top-Up Strategy</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Comparison Cards */}
        <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Without Top-Up</span>
            <div className="space-y-1">
              <p className="text-xl md:text-2xl font-black text-slate-800 font-montserrat tracking-tight line-through opacity-50">
                {formatINR(normalSipValue)}
              </p>
              <p className="text-xs font-bold text-slate-400 italic">Standard SIP Growth</p>
            </div>
          </div>

          <div className="bg-[#224c87] p-6 rounded-[2rem] border border-[#224c87] shadow-xl shadow-blue-900/10 flex flex-col justify-between text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-125 transition-transform duration-500" />
            <span className="text-[10px] font-black text-blue-200/60 uppercase tracking-widest mb-4 relative z-10">With Top-Up</span>
            <div className="space-y-1 relative z-10">
              <p className="text-xl md:text-2xl font-black font-montserrat tracking-tight">
                {formatINR(currentFutureValue)}
              </p>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3 w-3 text-emerald-400" />
                <p className="text-xs font-bold text-blue-200 italic">Accelerated Growth</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wealth Generated Highlight */}
        <div className="lg:col-span-12">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm"
          >
            <div className="flex items-center gap-5">
              <div className="bg-emerald-500 text-white p-4 rounded-2xl shadow-lg shadow-emerald-500/20">
                <Plus className="h-6 w-6" />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-sm font-black text-emerald-800 uppercase tracking-widest leading-none mb-1">Extra Wealth Generated</h4>
                <p className="text-xs font-bold text-emerald-600/70 italic">By choosing a Top-Up strategy</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-8 py-4 rounded-2xl border border-emerald-200/50 shadow-inner">
              <ArrowRight className="h-6 w-6 text-emerald-500 hidden md:block" />
              <span className="text-2xl md:text-3xl font-black text-emerald-700 font-montserrat tracking-tight">
                {formatINR(extraWealth)}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
