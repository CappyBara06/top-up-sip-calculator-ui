"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Calculator, ArrowRight, TrendingUp } from "lucide-react";
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
    // Smooth scroll to results on mobile
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      document.getElementById("results-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* ── Header ───────────────────────────────────── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#224c87] via-[#1a3a6b] to-[#0f2447] text-white py-12 shadow-xl">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#da3832]/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 w-96 h-0.5 bg-white/5 -translate-x-1/2 -translate-y-1/2 rotate-45 pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/15 p-3.5 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg">
                <Calculator className="h-8 w-8 text-white" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold font-[Montserrat] tracking-tight leading-tight">
                  Top-Up SIP Calculator
                </h1>
                <p className="text-blue-200/90 font-medium text-base mt-1.5 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" aria-hidden="true" />
                  Estimate future value of increasing SIP investments
                </p>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          {result && (
            <div className="mt-8 flex flex-wrap gap-6 text-sm">
              {[
                { label: "Monthly SIP", value: `₹${formState.monthlyInvestment.toLocaleString("en-IN")}` },
                { label: "Top-Up p.a.", value: `${formState.topUpPercentage}%` },
                { label: "Duration", value: `${formState.years} Yrs` },
                { label: "Expected Return", value: `${formState.expectedReturn}%` },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 backdrop-blur-sm">
                  <span className="text-blue-200 font-medium">{s.label}:</span>
                  <span className="font-bold text-white">{s.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ── Main Content ─────────────────────────────── */}
      <main className="flex-grow container mx-auto px-4 md:px-6 max-w-7xl py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* Left column – Input form */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <InputForm
              initialState={DEFAULT_STATE}
              onCalculate={handleCalculate}
              isLoading={isLoading}
            />
          </div>

          {/* Right column – Results */}
          <div
            id="results-section"
            className="lg:col-span-8 order-1 lg:order-2 space-y-6"
          >
            {result ? (
              <>
                {/* Section heading */}
                <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-800 font-[Montserrat]">
                    Projection Overview
                  </h2>
                  <ArrowRight
                    className="h-5 w-5 text-[#da3832] mt-0.5"
                    aria-hidden="true"
                  />
                </div>

                {/* Result cards */}
                <ResultCards
                  futureValue={result.futureValue}
                  totalInvested={result.invested}
                  totalReturns={result.returns}
                />

                {/* Returns Pie Chart & Goal Progress */}
                <div
                  className={`grid grid-cols-1 gap-6 ${
                    formState.goalAmount > 0 ? "md:grid-cols-2" : ""
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
              </>
            ) : (
              <div className="h-96 flex items-center justify-center text-slate-400">
                <p>Loading results…</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── Footer / Disclaimer ───────────────────────── */}
      <footer className="border-t border-slate-200 bg-white mt-8">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl py-8 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl px-5 py-3 max-w-3xl">
            <span className="font-bold shrink-0">⚠ Disclaimer:</span>
            <span className="text-left leading-relaxed">
              This tool is for informational purposes only. Actual investment
              outcomes may vary depending on market conditions, tax implications,
              and inflation. Mutual Fund investments are subject to market risks;
              read all scheme-related documents carefully before investing.
            </span>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            © {new Date().getFullYear()} Top-Up SIP Calculator. Not financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
