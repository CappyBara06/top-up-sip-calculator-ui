"use client";

import React, { useState } from "react";
import { Calculator, Info } from "lucide-react";

const InfoTooltip = ({ text }: { text: string }) => (
  <div className="relative flex items-center group ml-1.5">
    <Info className="w-4 h-4 text-slate-400 hover:text-[#224c87] cursor-help transition-colors" />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2.5 bg-slate-800 text-white text-xs leading-relaxed rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-center shadow-xl font-medium pointer-events-none">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
    </div>
  </div>
);

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
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <label
            htmlFor={id}
            className="text-sm font-medium text-slate-700 leading-snug"
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
          className="w-24 text-right text-sm font-semibold text-[#224c87] bg-blue-50 border border-blue-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#224c87] focus:border-transparent transition"
        />
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-label={`${label} slider`}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 appearance-none rounded-full cursor-pointer"
          style={{
            background: `linear-gradient(to right, #224c87 0%, #224c87 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`,
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-400 font-medium">
        <span>
          {prefix}
          {minLabel}
        </span>
        <span>
          {prefix}
          {maxLabel}
          {unit}
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
      className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden sticky top-6"
    >
      {/* Form Header */}
      <div className="bg-gradient-to-r from-[#224c87] to-[#1a3a6b] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Calculator className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <h2 className="text-white font-bold text-lg font-[Montserrat]">
            Input Parameters
          </h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Required Fields */}
        <SliderField
          id="monthlyInvestment"
          label="Monthly SIP Amount (₹)"
          value={state.monthlyInvestment}
          min={500}
          max={100000}
          step={500}
          minLabel="500"
          maxLabel="1,00,000"
          prefix="₹"
          infoText="The fixed amount you plan to invest every month to start."
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
          infoText="The percentage by which you will increase your SIP amount each year. This helps beat inflation and accelerates wealth creation."
          onChange={(v) => update("topUpPercentage", v)}
        />

        <SliderField
          id="expectedReturn"
          label="Expected Annual Return (%)"
          value={state.expectedReturn}
          min={1}
          max={30}
          step={0.5}
          minLabel="1%"
          maxLabel="30%"
          infoText="The estimated yearly growth rate of your investment portfolio. Historically, equity mutual funds generate 10-15%."
          onChange={(v) => update("expectedReturn", v)}
        />

        <SliderField
          id="years"
          label="Investment Duration (Years)"
          value={state.years}
          min={1}
          max={40}
          step={1}
          minLabel="1 Yr"
          maxLabel="40 Yrs"
          infoText="The total duration you plan to continue investing. Longer durations benefit exponentially from compounding."
          onChange={(v) => update("years", v)}
        />

        {/* Optional Fields Toggle */}
        <div className="pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={toggleAssumptions}
            className="flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-[#224c87] transition-colors focus:outline-none focus:underline"
            aria-expanded={showAssumptions}
          >
            {showAssumptions ? "Hide Assumptions ▲" : "Show Assumptions ▼"}
          </button>
        </div>

        {/* Optional Fields Content */}
        <div
          className={`space-y-4 transition-all duration-500 ease-in-out ${
            showAssumptions ? "max-h-[500px] opacity-100 mt-4 overflow-visible" : "max-h-0 opacity-0 m-0 overflow-hidden"
          }`}
        >
          <SliderField
            id="inflationRate"
            label="Inflation Rate (%)"
            value={state.inflationRate}
            min={0}
            max={15}
            step={0.5}
            minLabel="0%"
            maxLabel="15%"
            infoText="The estimated annual rate at which the cost of living increases. (Primarily used as an assumption metric)"
            onChange={(v) => update("inflationRate", v)}
          />

          <div className="space-y-2">
            <div className="flex items-center">
              <label
                htmlFor="goalAmount"
                className="text-sm font-medium text-slate-700"
              >
                Target Goal Amount (₹)
              </label>
              <InfoTooltip text="A specific financial target you want to reach. We will track your projected wealth against this goal." />
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
              className="w-full text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#224c87] focus:border-transparent transition placeholder:text-slate-300"
            />
            <p id="goalAmount-hint" className="text-xs text-slate-400">
              Leave empty if you don&apos;t have a specific goal.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#224c87] hover:bg-[#1a3a6b] active:scale-[0.98] text-white font-bold py-4 rounded-xl text-base shadow-lg shadow-blue-900/20 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed font-[Montserrat] mt-2"
        >
          {isLoading ? "Calculating..." : "Calculate Investment Growth"}
        </button>
      </div>
    </form>
  );
};
