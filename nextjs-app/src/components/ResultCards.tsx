"use client";

import React from "react";
import { TrendingUp, Wallet, Coins } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { formatINR } from "@/lib/financialUtils";

interface ResultCard {
  label: string;
  sublabel: string;
  value: number;
  icon: React.ReactNode;
  accentColor: string;
  valueColor: string;
  bgColor: string;
}

interface ResultCardsProps {
  futureValue: number;
  totalInvested: number;
  totalReturns: number;
}

const NumberTicker = ({ value }: { value: number }) => {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {formatINR(value)}
    </motion.span>
  );
};

export const ResultCards: React.FC<ResultCardsProps> = ({
  futureValue,
  totalInvested,
  totalReturns,
}) => {
  const cards: ResultCard[] = [
    {
      label: "Future Value",
      sublabel: "Est. Portfolio Value",
      value: futureValue,
      icon: <TrendingUp className="h-6 w-6" aria-hidden="true" />,
      accentColor: "from-[#FFDB58] to-[#e1ad01]",
      valueColor: "text-[#b28b00]",
      bgColor: "bg-[#FFDB58]/10",
    },
    {
      label: "Total Invested",
      sublabel: "Your contributions",
      value: totalInvested,
      icon: <Wallet className="h-6 w-6" aria-hidden="true" />,
      accentColor: "from-[#224c87] to-[#1a3a6b]",
      valueColor: "text-[#224c87]",
      bgColor: "bg-blue-50/50",
    },
    {
      label: "Total Returns",
      sublabel: "Wealth estimation",
      value: totalReturns,
      icon: <Coins className="h-6 w-6" aria-hidden="true" />,
      accentColor: "from-emerald-500 to-emerald-600",
      valueColor: "text-emerald-700",
      bgColor: "bg-emerald-50/50",
    },
  ];

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      role="region"
      aria-label="Investment projection summary"
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`group bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}
        >
          <div className={`h-2 w-full bg-gradient-to-r ${card.accentColor}`} />
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-5">
              <div className={`${card.bgColor} ${card.valueColor} p-3 rounded-2xl`}>
                {card.icon}
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                {card.label}
              </p>
            </div>
            
            <div 
              className={`text-xl sm:text-lg md:text-2xl lg:text-3xl font-black ${card.valueColor} font-[Montserrat] tracking-tight mb-2 flex overflow-hidden break-all`}
              aria-label={`${card.label}: ${formatINR(card.value)}`}
            >
              <NumberTicker value={card.value} />
            </div>
            
            <div className="flex items-center gap-2">
              <div className="h-1 w-6 bg-slate-200 rounded-full" />
              <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">{card.sublabel}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
