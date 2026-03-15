import { NextRequest, NextResponse } from "next/server";
import { calculateTopUpSip } from "@/lib/topupSipCalculator";

export interface CalculateRequestBody {
  monthlyInvestment: number;
  topUpPercentage: number;
  expectedReturn: number;
  years: number;
  inflationRate?: number;
}

export async function POST(req: NextRequest) {
  try {
    const body: CalculateRequestBody = await req.json();

    const {
      monthlyInvestment,
      topUpPercentage,
      expectedReturn,
      years,
    } = body;

    // Basic validation
    if (
      typeof monthlyInvestment !== "number" ||
      typeof topUpPercentage !== "number" ||
      typeof expectedReturn !== "number" ||
      typeof years !== "number"
    ) {
      return NextResponse.json(
        { error: "Invalid input: all fields must be numbers." },
        { status: 400 }
      );
    }

    if (monthlyInvestment <= 0 || years <= 0 || expectedReturn <= 0) {
      return NextResponse.json(
        { error: "Investment amount, years, and return rate must be positive." },
        { status: 400 }
      );
    }

    // Convert percentages to decimals for the calculation function
    const annualReturnDecimal = expectedReturn / 100;
    const topUpRateDecimal = topUpPercentage / 100;

    const result = calculateTopUpSip(
      monthlyInvestment,
      annualReturnDecimal,
      years,
      topUpRateDecimal
    );

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
