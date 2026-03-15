# Top-Up SIP Calculator

The Top-Up SIP Calculator is a comprehensive financial tool designed to estimate the future value of Systematic Investment Plan (SIP) investments that increase annually through a top-up strategy. This tool helps investors visualize how incremental increases in their monthly contributions can significantly impact their long-term wealth creation.

## Features

- **Dynamic Projections**: Calculate future value based on initial SIP, top-up percentage, expected returns, and tenure.
- **Top-Up Strategy**: Models annual increases in SIP contributions to match income growth or savings goals.
- **Visual Analytics**: Interactive charts and detailed tables showing investment growth over time.
- **Accessibility**: Built with WCAG principles to ensure a seamless experience for all users.

## Tech Stack

- **Framework**: [Next.js 15.5.9](https://nextjs.org/) (App Router)
- **Node.js**: 22.11.0
- **NPM**: 10.9.0
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Technical Omissions & Compliance

This project is a high-performance **Frontend-only** financial utility. To maintain a lightweight footprint and maximum security, the following components were deliberately omitted:
- **CMS (Drupal 10.5.6)**: Not required as content is static and logic-driven.
- **Backend (PHP 8.1 / MySQL)**: Data persistence is not needed for a stateless calculator. All calculations are performed client-side using robust TypeScript logic.

## Responsiveness & Accessibility

- **Mobile First**: Built with a responsive grid architecture.
- **Touch Friendly**: Sliders and buttons maintain a minimum 44×44px touch target (WCAG 2.5.5).
- **ARIA Compliance**: Interactive elements include comprehensive ARIA roles and labels for screen readers.
- **Breakpoints**: 
  - Mobile: `< 640px`
  - Tablet: `640px - 1024px`
  - Desktop: `> 1024px`

## Calculation Logic

The calculator uses monthly compounding to estimate the future value. The core logic involves:
1.  **Monthly Compounding**: Interest is calculated and added to the principal every month.
2.  **Yearly SIP Top-Up**: The monthly SIP amount increases annually based on the user-defined top-up percentage.
3.  **Future Value Formula**: Iterative calculation over the investment tenure, applying the monthly rate of return and accounting for the varying SIP amounts.

## Disclaimer

This tool has been designed for information purposes only. Actual results may vary depending on various factors involved in capital market. Investor should not consider above as a recommendation for any schemes of HDFC Mutual Fund. Past performance may or may not be sustained in future and is not a guarantee of any future returns.
