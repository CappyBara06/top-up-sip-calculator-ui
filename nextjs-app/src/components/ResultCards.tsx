"use client";

import React from "react";
import { TrendingUp, Wallet, Coins } from "lucide-react";
import { formatINR } from "@/lib/financialUtils";

interface ResultCard {
  label: string;
  sublabel: string;
  value: number;
  icon: React.ReactNode;
  accentColor: string;
  valueColor: string;
}

interface ResultCardsProps {
  futureValue: number;
  totalInvested: number;
  totalReturns: number;
}

export const ResultCards: React.FC<ResultCardsProps> = ({
  futureValue,
  totalInvested,
  totalReturns,
}) => {
  const cards: ResultCard[] = [
    {
      label: "Future Value",
      sublabel: "Total accumulated wealth",
      value: futureValue,
      icon: <TrendingUp className="h-5 w-5" aria-hidden="true" />,
      accentColor: "from-[#FFDB58] to-[#e1ad01]",
      valueColor: "text-[#Fbc101]"
    },
    {
      label: "Total Invested",
      sublabel: "Your capital investment",
      value: totalInvested,
      icon: <Wallet className="h-5 w-5" aria-hidden="true" />,
      accentColor: "from-[#224c87] to-[#1a3a6b]",
      valueColor: "text-[#224c87]",
    },
    {
      label: "Total Returns",
      sublabel: "Wealth gained from returns",
      value: totalReturns,
      icon: <Coins className="h-5 w-5" aria-hidden="true" />,
      accentColor: "from-emerald-500 to-emerald-600",
      valueColor: "text-emerald-600",
    },
  ];

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      role="region"
      aria-label="Investment projection summary"
    >
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
        >
          <div className={`h-1.5 w-full bg-gradient-to-r ${card.accentColor}`} />
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {card.label}
              </p>
              <div className={`${card.valueColor} opacity-70`}>{card.icon}</div>
            </div>
            <p
              className={`text-2xl font-bold ${card.valueColor} font-[Montserrat] leading-tight`}
              aria-label={`${card.label}: ${formatINR(card.value)}`}
            >
              {formatINR(card.value)}
            </p>
            <p className="text-xs text-slate-400 mt-1">{card.sublabel}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
