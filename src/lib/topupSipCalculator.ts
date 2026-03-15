/**
 * Yearly breakdown of the SIP investment performance.
 */
export interface SIPYearlyData {
  /** The year number (1, 2, 3...) */
  year: number;
  /** The monthly SIP amount active during this year */
  sipAmount: number;
  /** The total estimated portfolio value at the end of this year */
  portfolioValue: number;
  /** The total cumulative principal amount invested up to the end of this year */
  totalInvested: number;
}

/**
 * The final calculation result for a Top-Up SIP investment.
 */
export interface CalculationResult {
  /** Total estimated future value of the investment */
  futureValue: number;
  /** Total principal amount invested over the entire tenure */
  invested: number;
  /** Total estimated earnings (Future Value - Invested) */
  returns: number;
  /** Array of yearly snapshots for chart visualization and tables */
  yearlyData: SIPYearlyData[];
}

/**
 * Calculates the future value of a Top-Up SIP investment.
 * 
 * This function accounts for:
 * 1. Monthly Compounding: Interest is calculated monthly using (annual return / 12).
 * 2. Yearly SIP Top-Up: The monthly SIP amount increases annually by a fixed percentage.
 * 3. Future Value Calculation: Uses an iterative approach to model real-world monthly contributions
 *    and interest accumulation, ensuring that each installment compounds appropriately.
 *
 * @param monthlySip   - Starting monthly SIP amount in currency units.
 * @param annualReturn - Expected annual rate of return as a decimal (e.g., 0.12 for 12%).
 * @param years        - Total investment duration in years.
 * @param topUpRate    - Annual SIP increase rate as a decimal (e.g., 0.10 for 10%).
 * 
 * @returns An object containing the final future value, total invested amount, 
 *          total returns, and a yearly data breakdown.
 */
export function calculateTopUpSip(
  monthlySip: number,
  annualReturn: number,
  years: number,
  topUpRate: number
): CalculationResult {
  // Convert the annual return percentage to a monthly interest rate
  const monthlyRate = annualReturn / 12;

  let currentSip = monthlySip;
  let totalInvested = 0;

  // Initialize data with year 0 state
  const yearlyData: SIPYearlyData[] = [
    { year: 0, sipAmount: 0, portfolioValue: 0, totalInvested: 0 },
  ];

  // Process each year of the investment tenure
  for (let year = 1; year <= years; year++) {
    let runningPortfolioValue = yearlyData[year - 1].portfolioValue;

    // Simulate 12 monthly installments and interest accrual for the current year
    for (let month = 1; month <= 12; month++) {
      // Each month: Add the SIP contribution and apply monthly interest
      runningPortfolioValue = (runningPortfolioValue + currentSip) * (1 + monthlyRate);
    }

    // Accumulate total capital invested during this year
    totalInvested += currentSip * 12;

    // Store the year-end snapshot
    yearlyData.push({
      year,
      sipAmount: Math.round(currentSip),
      portfolioValue: Math.round(runningPortfolioValue),
      totalInvested: Math.round(totalInvested)
    });

    // Increment the SIP amount for the start of the next year
    currentSip = currentSip * (1 + topUpRate);
  }


  // Use the running calculation for the exact totalFutureValue so everything matches perfectly
  // The differential formula above calculates the exact same thing but for the final year.
  // I will use `yearlyData[years].portfolioValue` as the futureValue to ensure charts and final numbers match.
  const finalFutureValue = Math.round(yearlyData[years].portfolioValue);
  const finalInvested = Math.round(totalInvested);
  const finalReturns = finalFutureValue - finalInvested;

  return {
    futureValue: finalFutureValue,
    invested: finalInvested,
    returns: finalReturns,
    yearlyData,
  };
}
