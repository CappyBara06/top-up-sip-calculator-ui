"use client";

import React, { useState } from "react";
import { Calculator, Info, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const InfoTooltip = ({ text }: { text: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex items-center ml-1.5">
      <button
        type="button"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 -m-1 focus:outline-none"
        aria-label="More information"
      >
        <Info className={`w-4 h-4 transition-colors ${isOpen ? "text-[#224c87]" : "text-slate-400"}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 bg-slate-900 text-white text-xs leading-relaxed rounded-2xl shadow-2xl z-[100] text-center font-medium pointer-events-none"
          >
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export interface CalculatorState {
  monthlyInvestment: number;
  topUpPercentage: number;
  expectedReturn: number;
  years: number;
  inflationRate: number;
  goalAmount: number;
}

interface SliderFieldProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  minLabel: string;
  maxLabel: string;
  unit?: string;
  prefix?: string;
  infoText?: string;
  onChange: (val: number) => void;
}

const SliderField: React.FC<SliderFieldProps> = ({
  id,
  label,
  value,
  min,
  max,
  step,
  minLabel,
  maxLabel,
  unit = "",
  prefix = "",
  infoText,
  onChange,
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center">
          <label
            htmlFor={id}
            className="text-sm md:text-base font-bold text-slate-700 leading-snug"
          >
            {label}
          </label>
          {infoText && <InfoTooltip text={infoText} />}
        </div>
        <input
          id={id}
          type="number"
          value={value}
          step={step}
          min={min}
          max={max}
          aria-label={label}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            if (!isNaN(v)) onChange(v);
          }}
          className="w-24 md:w-28 text-right text-sm md:text-base font-bold text-[#224c87] bg-blue-50/50 border border-blue-200/60 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#224c87]/20 focus:border-[#224c87] transition-all"
        />
      </div>
      <div className="relative pt-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-label={`${label} slider`}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2.5 md:h-3 appearance-none rounded-full cursor-pointer touch-none"
          style={{
            background: `linear-gradient(to right, #224c87 0%, #224c87 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`,
          }}
        />
      </div>
      <div className="flex justify-between text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-wider">
        <span>
          {prefix}{minLabel}
        </span>
        <span>
          {prefix}{maxLabel}{unit}
        </span>
      </div>
    </div>
  );
};

interface InputFormProps {
  initialState: CalculatorState;
  onCalculate: (state: CalculatorState) => void;
  isLoading?: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({
  initialState,
  onCalculate,
  isLoading = false,
}) => {
  const [state, setState] = useState<CalculatorState>(initialState);
  const [showAssumptions, setShowAssumptions] = useState(false);

  const toggleAssumptions = () => {
    setShowAssumptions(!showAssumptions);
  };

  const update = (key: keyof CalculatorState, val: number) =>
    setState((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(state);
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Top-Up SIP Calculator inputs"
      className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden lg:sticky lg:top-8"
    >
      {/* Form Header */}
      <div className="bg-gradient-to-r from-[#224c87] to-[#1a3a6b] px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
            <Calculator className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-white font-black text-xl font-[Montserrat] tracking-tight">
              Parameters
            </h2>
            <p className="text-blue-200/60 text-xs font-bold uppercase tracking-widest mt-0.5">Define your goal</p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Required Fields */}
        <div className="space-y-8">
          <SliderField
            id="monthlyInvestment"
            label="Monthly SIP Amount (₹)"
            value={state.monthlyInvestment}
            min={500}
            max={100000}
            step={500}
            minLabel="500"
            maxLabel="1L"
            prefix="₹"
            infoText="The starting monthly investment amount for your SIP."
            onChange={(v) => update("monthlyInvestment", v)}
          />

          <SliderField
            id="topUpPercentage"
            label="Annual Top-Up (%)"
            value={state.topUpPercentage}
            min={0}
            max={50}
            step={1}
            minLabel="0%"
            maxLabel="50%"
            infoText="Increase your SIP amount annually. Helps wealth grow faster than inflation."
            onChange={(v) => update("topUpPercentage", v)}
          />

          <SliderField
            id="expectedReturn"
            label="Expected Returns (%)"
            value={state.expectedReturn}
            min={1}
            max={30}
            step={0.5}
            minLabel="1%"
            maxLabel="30%"
            infoText="The annual growth rate you expect. Equity funds often average 12-15%."
            onChange={(v) => update("expectedReturn", v)}
          />

          <SliderField
            id="years"
            label="Investment Tenure (Yrs)"
            value={state.years}
            min={1}
            max={40}
            step={1}
            minLabel="1"
            maxLabel="40"
            infoText="The number of years you plan to stay invested."
            onChange={(v) => update("years", v)}
          />
        </div>

        {/* Optional Fields Toggle */}
        <div className="pt-2">
          <button
            type="button"
            onClick={toggleAssumptions}
            className="flex items-center justify-between w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 hover:text-[#224c87] transition-all focus:outline-none"
            aria-expanded={showAssumptions}
          >
            <span>Advanced Assumptions</span>
            {showAssumptions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        {/* Optional Fields Content */}
        <AnimatePresence>
          {showAssumptions && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 0 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="space-y-6 overflow-hidden"
            >
              <div className="pt-4 space-y-8">
                <SliderField
                  id="inflationRate"
                  label="Est. Inflation (%)"
                  value={state.inflationRate}
                  min={0}
                  max={15}
                  step={0.5}
                  minLabel="0%"
                  maxLabel="15%"
                  infoText="Expected annual increase in cost of living."
                  onChange={(v) => update("inflationRate", v)}
                />

                <div className="space-y-3">
                  <div className="flex items-center">
                    <label
                      htmlFor="goalAmount"
                      className="text-sm md:text-base font-bold text-slate-700"
                    >
                      Target Wealth Goal (₹)
                    </label>
                    <InfoTooltip text="Set a milestone to track your progress against." />
                  </div>
                  <input
                    id="goalAmount"
                    type="number"
                    value={state.goalAmount || ""}
                    placeholder="e.g. 10000000"
                    aria-describedby="goalAmount-hint"
                    onChange={(e) =>
                      update("goalAmount", parseFloat(e.target.value) || 0)
                    }
                    className="w-full text-sm font-bold bg-slate-50 border border-slate-200/60 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#224c87]/20 focus:border-[#224c87] transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#224c87] hover:bg-[#1a3a6b] text-white font-black py-5 rounded-[1.5rem] text-base md:text-lg shadow-2xl shadow-blue-900/40 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed font-[Montserrat] tracking-tight"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Calculating...</span>
            </div>
          ) : (
            "Visualize Growth"
          )}
        </motion.button>
      </div>
    </form>
  );
};
