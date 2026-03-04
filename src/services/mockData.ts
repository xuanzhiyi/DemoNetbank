import { Account, Card, HistoricalBalance, Loan, Hedge, Collateral, Asset, CurrencyPair, Staff, Meeting, Transfer } from '../types'

// Generate monthly historical data for past year
export const generateHistoricalBalances = (startBalance: number): HistoricalBalance[] => {
  const data: HistoricalBalance[] = []
  const now = new Date()

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const variation = (Math.random() - 0.5) * 50000
    data.push({
      date,
      balance: startBalance + variation + (11 - i) * 10000
    })
  }

  return data
}

// Accounts
export const accounts: Account[] = [
  {
    id: 'acc-001',
    name: 'Main Current Account',
    type: 'current',
    currency: 'USD',
    balance: 2500000,
    overdraftLimit: 500000
  },
  {
    id: 'acc-002',
    name: 'Operating Account',
    type: 'current',
    currency: 'USD',
    balance: 1200000
  },
  {
    id: 'acc-003',
    name: 'Savings Account',
    type: 'savings',
    currency: 'USD',
    balance: 5000000
  },
  {
    id: 'acc-004',
    name: 'EUR Account',
    type: 'foreign',
    currency: 'EUR',
    balance: 800000
  },
  {
    id: 'acc-005',
    name: 'GBP Account',
    type: 'foreign',
    currency: 'GBP',
    balance: 500000
  },
  {
    id: 'acc-006',
    name: 'JPY Account',
    type: 'foreign',
    currency: 'JPY',
    balance: 50000000
  },
  {
    id: 'acc-007',
    name: 'Payable Account',
    type: 'payable',
    currency: 'USD',
    balance: -250000
  },
  {
    id: 'acc-008',
    name: 'Receivable Account',
    type: 'receivable',
    currency: 'USD',
    balance: 750000
  }
]

// Cards
export const cards: Card[] = [
  {
    id: 'card-001',
    name: 'Corporate Platinum',
    balance: 150000,
    limit: 500000,
    lastTransaction: new Date()
  },
  {
    id: 'card-002',
    name: 'Corporate Gold',
    balance: 75000,
    limit: 300000,
    lastTransaction: new Date(Date.now() - 86400000)
  }
]

// Loans
export const loans: Loan[] = [
  {
    id: 'loan-001',
    name: 'Term Loan A - Fixed Rate',
    type: 'fixed',
    principal: 10000000,
    rate: 4.5,
    disbursementDate: new Date(2021, 0, 15),
    maturityDate: new Date(2026, 0, 15)
  },
  {
    id: 'loan-002',
    name: 'Revolving Credit Facility',
    type: 'floating',
    principal: 5000000,
    rate: 3.75,
    disbursementDate: new Date(2022, 6, 1),
    maturityDate: new Date(2027, 6, 1)
  },
  {
    id: 'loan-003',
    name: 'Bridge Loan',
    type: 'fixed',
    principal: 3000000,
    rate: 5.2,
    disbursementDate: new Date(2023, 0, 1),
    maturityDate: new Date(2025, 0, 1)
  }
]

// Hedges
export const hedges: Hedge[] = [
  {
    id: 'hedge-001',
    name: 'Rate Collar - Loan A',
    type: 'collar',
    underlyingLoan: 'loan-002',
    strikePrice: 4.0
  },
  {
    id: 'hedge-002',
    name: 'Interest Rate Cap',
    type: 'cap',
    underlyingLoan: 'loan-002',
    strikePrice: 5.5
  }
]

// Collaterals
export const collaterals: Collateral[] = [
  {
    id: 'collateral-001',
    name: 'Real Estate - Office Building',
    type: 'real_estate',
    value: 15000000,
    currency: 'USD'
  },
  {
    id: 'collateral-002',
    name: 'Investment Portfolio',
    type: 'investment',
    value: 8000000,
    currency: 'USD'
  },
  {
    id: 'collateral-003',
    name: 'Equipment',
    type: 'investment',
    value: 2000000,
    currency: 'USD'
  }
]

// Assets
export const assets: Asset[] = [
  { id: 'asset-001', name: 'Apple Inc.', type: 'equity', value: 2500000, quantity: 10000, currency: 'USD', percentage: 15 },
  { id: 'asset-002', name: 'Microsoft Corp.', type: 'equity', value: 2000000, quantity: 5000, currency: 'USD', percentage: 12 },
  { id: 'asset-003', name: 'MSCI World ETF', type: 'fund', value: 3000000, quantity: 50000, currency: 'USD', percentage: 18 },
  { id: 'asset-004', name: 'Vanguard Bond ETF', type: 'fund', value: 2500000, quantity: 25000, currency: 'USD', percentage: 15 },
  { id: 'asset-005', name: 'US Treasury Bond 5Y', type: 'bond', value: 1500000, quantity: 15, currency: 'USD', percentage: 9 },
  { id: 'asset-006', name: 'Corporate Bond AA', type: 'bond', value: 1200000, quantity: 12, currency: 'USD', percentage: 7 },
  { id: 'asset-007', name: 'Structured Product - Autocallable', type: 'structured', value: 1800000, quantity: 18, currency: 'USD', percentage: 11 },
  { id: 'asset-008', name: 'Hedge Fund - Multi-Strategy', type: 'fund', value: 500000, quantity: 5, currency: 'USD', percentage: 3 }
]

// Currency Pairs
export const currencyPairs: CurrencyPair[] = [
  { pair: 'EURUSD', bid: 1.0945, ask: 1.0950, spread: 0.0005, lastUpdate: new Date(), change: 0.0020, changePercent: 0.18 },
  { pair: 'GBPUSD', bid: 1.2750, ask: 1.2755, spread: 0.0005, lastUpdate: new Date(), change: -0.0015, changePercent: -0.12 },
  { pair: 'USDJPY', bid: 149.50, ask: 149.55, spread: 0.05, lastUpdate: new Date(), change: 0.50, changePercent: 0.33 },
  { pair: 'AUDUSD', bid: 0.6580, ask: 0.6585, spread: 0.0005, lastUpdate: new Date(), change: 0.0010, changePercent: 0.15 },
  { pair: 'NZDUSD', bid: 0.6120, ask: 0.6125, spread: 0.0005, lastUpdate: new Date(), change: 0.0005, changePercent: 0.08 },
  { pair: 'USDCAD', bid: 1.3650, ask: 1.3655, spread: 0.0005, lastUpdate: new Date(), change: -0.0020, changePercent: -0.15 },
  { pair: 'USDCHF', bid: 0.8850, ask: 0.8855, spread: 0.0005, lastUpdate: new Date(), change: 0.0030, changePercent: 0.34 },
  { pair: 'CNHUSD', bid: 7.0850, ask: 7.0860, spread: 0.001, lastUpdate: new Date(), change: 0.0050, changePercent: 0.07 }
]

// Transfers (for FX map)
export const transfers: Transfer[] = [
  { id: 't-001', from: 'United States', to: 'United Kingdom', amount: 500000, currency: 'USD', date: new Date() },
  { id: 't-002', from: 'United States', to: 'Germany', amount: 750000, currency: 'USD', date: new Date(Date.now() - 3600000) },
  { id: 't-003', from: 'United States', to: 'Japan', amount: 1000000, currency: 'USD', date: new Date(Date.now() - 7200000) },
  { id: 't-004', from: 'United Kingdom', to: 'Singapore', amount: 300000, currency: 'GBP', date: new Date(Date.now() - 10800000) },
  { id: 't-005', from: 'Germany', to: 'France', amount: 450000, currency: 'EUR', date: new Date(Date.now() - 14400000) },
  { id: 't-006', from: 'Singapore', to: 'Australia', amount: 200000, currency: 'SGD', date: new Date(Date.now() - 18000000) },
  { id: 't-007', from: 'Japan', to: 'Hong Kong', amount: 250000, currency: 'JPY', date: new Date(Date.now() - 21600000) },
  { id: 't-008', from: 'United States', to: 'Canada', amount: 600000, currency: 'USD', date: new Date(Date.now() - 25200000) },
  { id: 't-009', from: 'Hong Kong', to: 'United States', amount: 400000, currency: 'HKD', date: new Date(Date.now() - 28800000) },
  { id: 't-010', from: 'France', to: 'Switzerland', amount: 350000, currency: 'EUR', date: new Date(Date.now() - 32400000) }
]

// Staff
export const staffDirectory: Staff[] = [
  {
    id: 'staff-001',
    name: 'Sarah Johnson',
    role: 'relationship_manager',
    email: 'sarah.johnson@netbank.com',
    phone: '+1-212-555-0101',
    office: 'New York',
    avatar: '👩‍💼'
  },
  {
    id: 'staff-002',
    name: 'Michael Chen',
    role: 'product_expert',
    specialization: 'Loans & Hedging',
    email: 'michael.chen@netbank.com',
    phone: '+1-212-555-0102',
    office: 'New York',
    avatar: '👨‍💼'
  },
  {
    id: 'staff-003',
    name: 'Emma Rodriguez',
    role: 'product_expert',
    specialization: 'FX & Trade Finance',
    email: 'emma.rodriguez@netbank.com',
    phone: '+1-212-555-0103',
    office: 'New York',
    avatar: '👩‍💼'
  },
  {
    id: 'staff-004',
    name: 'David Wilson',
    role: 'product_expert',
    specialization: 'Asset Management',
    email: 'david.wilson@netbank.com',
    phone: '+1-212-555-0104',
    office: 'New York',
    avatar: '👨‍💼'
  },
  {
    id: 'staff-005',
    name: 'Lisa Anderson',
    role: 'relationship_manager',
    email: 'lisa.anderson@netbank.com',
    phone: '+1-212-555-0105',
    office: 'London',
    avatar: '👩‍💼'
  }
]

// Meetings
export const meetings: Meeting[] = [
  {
    id: 'meeting-001',
    date: new Date(Date.now() - 86400000 * 7),
    staff: staffDirectory[0],
    topic: 'Quarterly Review',
    notes: 'Discussed account performance and upcoming financing needs',
    type: 'past'
  },
  {
    id: 'meeting-002',
    date: new Date(Date.now() - 86400000 * 14),
    staff: staffDirectory[1],
    topic: 'Loan Restructuring',
    notes: 'Reviewed options for refinancing existing Term Loan A',
    type: 'past'
  },
  {
    id: 'meeting-003',
    date: new Date(Date.now() - 86400000 * 30),
    staff: staffDirectory[2],
    topic: 'FX Strategy Review',
    notes: 'Analyzed hedging requirements for international operations',
    type: 'past'
  },
  {
    id: 'meeting-004',
    date: new Date(Date.now() + 86400000 * 3),
    staff: staffDirectory[3],
    topic: 'Portfolio Rebalancing',
    notes: 'Scheduled: Discuss allocation adjustments',
    type: 'upcoming'
  },
  {
    id: 'meeting-005',
    date: new Date(Date.now() + 86400000 * 10),
    staff: staffDirectory[0],
    topic: 'Credit Facility Review',
    notes: 'Scheduled: Annual credit facility review',
    type: 'upcoming'
  }
]

// Historical Balance Data for Account Page
export const accountBalanceHistory = generateHistoricalBalances(2500000)

// Allocation Data
export const allocationData = {
  geographic: {
    'North America': 45,
    'Europe': 30,
    'Asia Pacific': 20,
    'Emerging Markets': 5
  },
  sector: {
    'Technology': 25,
    'Financials': 20,
    'Healthcare': 15,
    'Industrials': 15,
    'Energy': 10,
    'Consumer': 10,
    'Other': 5
  },
  rating: {
    'AAA': 15,
    'AA': 25,
    'A': 35,
    'BBB': 20,
    'Below BBB': 5
  }
}

// Portfolio Risk Metrics
export const riskMetrics = {
  var95: 450000,
  var995: 650000,
  expectedReturn: 8.5,
  volatility: 12.3,
  correlation: [
    [1.0, 0.65, 0.45],
    [0.65, 1.0, 0.52],
    [0.45, 0.52, 1.0]
  ]
}
