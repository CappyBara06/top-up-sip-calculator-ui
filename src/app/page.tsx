"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Calculator, ArrowRight, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { InputForm, CalculatorState } from "@/components/InputForm";
import { ResultCards } from "@/components/ResultCards";
import { GrowthChart, InvestmentVsReturnsChart } from "@/components/GrowthChart";
import { GoalProgress } from "@/components/GoalProgress";
import { calculateTopUpSip, CalculationResult } from "@/lib/topupSipCalculator";

const DEFAULT_STATE: CalculatorState = {
  monthlyInvestment: 10000,
  topUpPercentage: 10,
  expectedReturn: 12,
  years: 15,
  inflationRate: 0,
  goalAmount: 10000000,
};

export default function Home() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [formState, setFormState] = useState<CalculatorState>(DEFAULT_STATE);
  const [isLoading, setIsLoading] = useState(false);

  const runCalculation = useCallback((state: CalculatorState) => {
    setIsLoading(true);
    // Convert percentages to decimals for the calculation function
    const annualReturnDecimal = state.expectedReturn / 100;
    const topUpRateDecimal = state.topUpPercentage / 100;

    const res = calculateTopUpSip(
      state.monthlyInvestment,
      annualReturnDecimal,
      state.years,
      topUpRateDecimal
    );
    setResult(res);
    setIsLoading(false);
  }, []);

  // Calculate on mount with defaults
  useEffect(() => {
    runCalculation(DEFAULT_STATE);
  }, [runCalculation]);

  const handleCalculate = (state: CalculatorState) => {
    setFormState(state);
    runCalculation(state);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-[Inter]">
      {/* ── Header ───────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#224c87] via-[#1a3a6b] to-[#0f2447] text-white py-10 md:py-16 shadow-2xl">
        {/* Decorative blobs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-0 left-0 w-56 h-56 bg-[#da3832]/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl pointer-events-none"
        />

        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4 md:gap-6">
              <div className="bg-white/10 p-4 md:p-5 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
                <Calculator className="h-8 w-8 md:h-10 md:w-10 text-white" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-extrabold font-[Montserrat] tracking-tight leading-tight">
                  Top-Up <span className="text-[#da3832]">SIP</span> Calculator
                </h1>
                <p className="text-blue-100/80 font-medium text-sm md:text-lg mt-2 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#da3832]" aria-hidden="true" />
                  Strategize your wealth growth with annual increments
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats bar - Grid for better wrapping */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Monthly SIP", value: `₹${formState.monthlyInvestment.toLocaleString("en-IN")}` },
                  { label: "Top-Up p.a.", value: `${formState.topUpPercentage}%` },
                  { label: "Duration", value: `${formState.years} Yrs` },
                  { label: "Expected Return", value: `${formState.expectedReturn}%` },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col gap-1 bg-white/10 rounded-2xl px-5 py-3 backdrop-blur-md border border-white/5">
                    <span className="text-blue-200/70 text-[10px] md:text-xs font-semibold uppercase tracking-wider">{s.label}</span>
                    <span className="font-bold text-white text-sm md:text-base">{s.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* ── Main Content ─────────────────────────────── */}
      <main className="flex-grow container mx-auto px-4 md:px-8 max-w-7xl py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start">

          {/* Left column – Input form (Now Order 1) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-4 order-1 w-full"
          >
            <InputForm
              initialState={DEFAULT_STATE}
              onCalculate={handleCalculate}
              isLoading={isLoading}
            />
          </motion.div>

          {/* Right column – Results (Now Order 2) */}
          <div
            id="results-section"
            className="lg:col-span-8 order-2 space-y-8 md:space-y-12"
          >
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8 md:space-y-12"
                >
                  {/* Section heading */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-800 font-[Montserrat] tracking-tight">
                      Investment <span className="text-[#224c87]">Projection</span>
                    </h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-[#224c87] to-[#da3832] rounded-full hidden md:block" />
                  </div>

                  {/* Result cards */}
                  <div className="w-full overflow-hidden">
                    <ResultCards
                      futureValue={result.futureValue}
                      totalInvested={result.invested}
                      totalReturns={result.returns}
                    />
                  </div>

                  {/* Returns Pie Chart & Goal Progress */}
                  <div
                    className={`grid grid-cols-1 gap-8 ${formState.goalAmount > 0 ? "md:grid-cols-2" : ""
                      }`}
                  >
                    <InvestmentVsReturnsChart
                      invested={result.invested}
                      returns={result.returns}
                    />
                    {formState.goalAmount > 0 && (
                      <GoalProgress
                        futureValue={result.futureValue}
                        goalAmount={formState.goalAmount}
                      />
                    )}
                  </div>

                  {/* Growth chart – full width */}
                  <GrowthChart data={result.yearlyData} />
                </motion.div>
              ) : (
                <div className="h-96 flex flex-col items-center justify-center text-slate-400 gap-4">
                  <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
                  <p className="font-medium">Synthesizing your financial future…</p>
                </div>
              )}
            </AnimatePresence>

            {/* Assumptions Disclosure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 pt-10 border-t border-slate-200"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-8 w-1.5 bg-[#224c87] rounded-full" />
                <h3 className="text-2xl font-black text-slate-800 font-[Montserrat] tracking-tight">
                  Calculation <span className="text-[#224c87]">Assumptions</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Returns are compounded monthly",
                  "SIP amount increases annually according to the top-up percentage",
                  "Returns are assumed to remain constant for calculation purposes",
                  "Calculated figures are for illustrative purposes only",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-2 h-2 bg-[#da3832] rounded-full shrink-0 shadow-[0_0_8px_#da3832]" />
                    <p className="text-sm font-semibold text-slate-600 leading-tight">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* ── Footer / Disclaimer ───────────────────────── */}
      <footer className="border-t border-slate-200 bg-white pt-12 pb-16">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl text-center">
          <div className="inline-flex flex-col md:flex-row items-center gap-4 bg-slate-50 border border-slate-200/60 p-6 md:p-8 rounded-[2rem] max-w-4xl mx-auto shadow-sm">
            <div className="bg-amber-100 text-amber-700 p-3 rounded-2xl shrink-0">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-800 mb-1">Financial Disclaimer</p>
              <p className="text-[10px] md:text-xs text-slate-500 leading-relaxed font-medium">
                This tool has been designed for information purposes only. Actual results may vary depending on various factors involved in capital market.
                Investor should not consider above as a recommendation for any schemes of HDFC Mutual Fund.
                Past performance may or may not be sustained in future and is not a guarantee of any future returns.
              </p>
            </div>
          </div>
          <p className="mt-8 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Top-Up SIP Calculator • Premium FinTech UI
          </p>
        </div>
      </footer>
    </div>
  );
}
