"use client";

import React from "react";
import { Target, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { formatINR } from "@/lib/financialUtils";

interface GoalProgressProps {
  futureValue: number;
  goalAmount: number;
}

export const GoalProgress: React.FC<GoalProgressProps> = ({
  futureValue,
  goalAmount,
}) => {
  const percentage = Math.min((futureValue / goalAmount) * 100, 100);
  const isAchieved = futureValue >= goalAmount;
  const shortfall = goalAmount - futureValue;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10 h-full flex flex-col"
      role="region"
      aria-label="Goal progress tracker"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-[#224c87]/10 p-3 rounded-2xl">
          <Target className="h-6 w-6 text-[#224c87]" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-black text-[#224c87] text-xl md:text-2xl font-montserrat tracking-tight">
            Goal Milestone
          </h3>
          <p className="text-xs md:text-sm font-bold text-slate-400 mt-1 uppercase tracking-wider">
            Tracking your financial target
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-6 flex-grow">
        <div className="flex justify-between text-[11px] md:text-xs font-black uppercase tracking-widest text-slate-400">
          <span>
            Projected: <span className="text-slate-800 ml-1">{formatINR(futureValue)}</span>
          </span>
          <span className="text-[#224c87]">
            Target: <span className="ml-1">{formatINR(goalAmount)}</span>
          </span>
        </div>

        <div
          className="h-6 md:h-8 w-full bg-slate-100/80 rounded-full overflow-hidden shadow-inner border border-slate-200/20"
          role="progressbar"
          aria-valuenow={Math.round(percentage)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${percentage.toFixed(1)}% of goal achieved`}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
            className="h-full bg-gradient-to-r from-[#224c87] via-[#1a3a6b] to-[#da3832] rounded-full relative"
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </motion.div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isAchieved ? (
              <CheckCircle
                className="h-5 w-5 text-emerald-500"
                aria-hidden="true"
              />
            ) : (
              <AlertCircle
                className="h-5 w-5 text-[#da3832]"
                aria-hidden="true"
              />
            )}
            <span
              className={`text-sm md:text-base font-black ${
                isAchieved ? "text-emerald-700" : "text-[#da3832]"
              }`}
            >
              {isAchieved ? "Goal Surpassed! 🎉" : `${percentage.toFixed(1)}% Achieved`}
            </span>
          </div>
        </div>
      </div>

      {/* Status Card */}
      <div className="mt-8">
        {isAchieved ? (
          <div className="bg-emerald-50/50 border border-emerald-100/60 rounded-[1.5rem] p-6 text-center">
            <p className="text-[10px] md:text-xs font-black text-emerald-700 uppercase tracking-widest mb-2">
              Wealth Surplus Projection
            </p>
            <p className="text-2xl md:text-3xl font-black text-emerald-700 font-montserrat tracking-tight">
              +{formatINR(futureValue - goalAmount)}
            </p>
          </div>
        ) : (
          <div className="bg-[#da3832]/5 border border-[#da3832]/10 rounded-[1.5rem] p-6 text-center">
            <p className="text-[10px] md:text-xs font-black text-[#da3832] uppercase tracking-widest mb-2">
              Shortfall Estimation
            </p>
            <p className="text-2xl md:text-3xl font-black text-[#da3832] font-montserrat tracking-tight">
              {formatINR(shortfall)}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
