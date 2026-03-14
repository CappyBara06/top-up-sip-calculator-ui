"use client";

import React from "react";
import { Target, CheckCircle, AlertCircle } from "lucide-react";
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
    <div
      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-full"
      role="region"
      aria-label="Goal progress tracker"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-50 p-2 rounded-xl">
          <Target className="h-5 w-5 text-[#224c87]" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-bold text-[#224c87] text-lg font-[Montserrat]">
            Goal Progress
          </h3>
          <p className="text-xs text-slate-400">
            Track your investment target
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-slate-500">
            Projected: {formatINR(futureValue)}
          </span>
          <span className="text-[#224c87] font-semibold">
            Goal: {formatINR(goalAmount)}
          </span>
        </div>

        <div
          className="h-5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner"
          role="progressbar"
          aria-valuenow={Math.round(percentage)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${percentage.toFixed(1)}% of goal achieved`}
        >
          <div
            className="h-full bg-gradient-to-r from-[#224c87] via-[#3a6fb5] to-[#da3832] transition-all duration-1000 ease-out rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {isAchieved ? (
              <CheckCircle
                className="h-4 w-4 text-emerald-500"
                aria-hidden="true"
              />
            ) : (
              <AlertCircle
                className="h-4 w-4 text-amber-500"
                aria-hidden="true"
              />
            )}
            <span
              className={`text-sm font-semibold ${
                isAchieved ? "text-emerald-600" : "text-amber-600"
              }`}
            >
              {isAchieved ? "Goal Achieved! 🎉" : `${percentage.toFixed(1)}% Achieved`}
            </span>
          </div>
        </div>
      </div>

      {/* Status Card */}
      <div className="mt-5">
        {isAchieved ? (
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
            <p className="text-sm font-semibold text-emerald-700">
              🎉 You will exceed your goal by
            </p>
            <p className="text-xl font-bold text-emerald-600 font-[Montserrat] mt-1">
              {formatINR(futureValue - goalAmount)}
            </p>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-center">
            <p className="text-sm font-semibold text-amber-700">
              Remaining to reach goal
            </p>
            <p className="text-xl font-bold text-amber-600 font-[Montserrat] mt-1">
              {formatINR(shortfall)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
