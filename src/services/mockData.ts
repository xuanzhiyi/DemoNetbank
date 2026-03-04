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

// Accounts (Base Currency: EUR)
export const accounts: Account[] = [
  {
    id: 'acc-001',
    name: 'Main Current Account',
    type: 'current',
    currency: 'EUR',
    balance: 3200000,
    overdraftLimit: 750000
  },
  {
    id: 'acc-002',
    name: 'Operating Account',
    type: 'current',
    currency: 'EUR',
    balance: 1850000
  },
  {
    id: 'acc-003',
    name: 'Euro Savings Account',
    type: 'savings',
    currency: 'EUR',
    balance: 6500000
  },
  {
    id: 'acc-004',
    name: 'USD Account',
    type: 'foreign',
    currency: 'USD',
    balance: 2800000
  },
  {
    id: 'acc-005',
    name: 'GBP Account',
    type: 'foreign',
    currency: 'GBP',
    balance: 1200000
  },
  {
    id: 'acc-006',
    name: 'JPY Account',
    type: 'foreign',
    currency: 'JPY',
    balance: 65000000
  },
  {
    id: 'acc-007',
    name: 'Payable Account EUR',
    type: 'payable',
    currency: 'EUR',
    balance: -380000
  },
  {
    id: 'acc-008',
    name: 'Receivable Account EUR',
    type: 'receivable',
    currency: 'EUR',
    balance: 950000
  }
]

// Cards (EUR)
export const cards: Card[] = [
  {
    id: 'card-001',
    name: 'Corporate Platinum EUR',
    balance: 185000,
    limit: 625000,
    lastTransaction: new Date()
  },
  {
    id: 'card-002',
    name: 'Corporate Gold EUR',
    balance: 92000,
    limit: 375000,
    lastTransaction: new Date(Date.now() - 86400000)
  }
]

// Loans
export const loans: Loan[] = [
  {
    id: 'loan-001',
    name: 'European Syndicated Loan',
    type: 'fixed',
    principal: 15000000,
    rate: 3.85,
    disbursementDate: new Date(2023, 0, 15),
    maturityDate: new Date(2028, 6, 15)
  },
  {
    id: 'loan-002',
    name: 'Corporate Term Facility - EUR',
    type: 'floating',
    principal: 12000000,
    rate: 3.25,
    disbursementDate: new Date(2022, 6, 1),
    maturityDate: new Date(2029, 3, 1)
  },
  {
    id: 'loan-003',
    name: 'Working Capital Line',
    type: 'floating',
    principal: 8500000,
    rate: 2.95,
    disbursementDate: new Date(2023, 6, 1),
    maturityDate: new Date(2028, 12, 1)
  },
  {
    id: 'loan-004',
    name: 'Acquisition Finance - Fixed',
    type: 'fixed',
    principal: 22000000,
    rate: 4.15,
    disbursementDate: new Date(2022, 0, 1),
    maturityDate: new Date(2029, 9, 1)
  },
  {
    id: 'loan-005',
    name: 'Real Estate Mortgage',
    type: 'fixed',
    principal: 18500000,
    rate: 3.50,
    disbursementDate: new Date(2023, 3, 1),
    maturityDate: new Date(2030, 3, 1)
  },
  {
    id: 'loan-006',
    name: 'Equipment Finance',
    type: 'floating',
    principal: 5000000,
    rate: 2.85,
    disbursementDate: new Date(2022, 9, 1),
    maturityDate: new Date(2028, 9, 1)
  }
]

// Hedges
export const hedges: Hedge[] = [
  {
    id: 'hedge-001',
    name: 'Rate Collar - Corporate Term Facility',
    type: 'collar',
    underlyingLoan: 'loan-002',
    strikePrice: 4.0
  },
  {
    id: 'hedge-002',
    name: 'Interest Rate Cap - Working Capital',
    type: 'cap',
    underlyingLoan: 'loan-003',
    strikePrice: 4.5
  },
  {
    id: 'hedge-003',
    name: 'Rate Floor - Acquisition Finance',
    type: 'floor',
    underlyingLoan: 'loan-004',
    strikePrice: 2.5
  }
]

// Collaterals
export const collaterals: Collateral[] = [
  {
    id: 'collateral-001',
    name: 'Corporate Real Estate - Munich',
    type: 'real_estate',
    value: 25000000,
    currency: 'EUR'
  },
  {
    id: 'collateral-002',
    name: 'European Investment Portfolio',
    type: 'investment',
    value: 16000000,
    currency: 'EUR'
  },
  {
    id: 'collateral-003',
    name: 'Manufacturing Equipment & Machinery',
    type: 'investment',
    value: 9500000,
    currency: 'EUR'
  },
  {
    id: 'collateral-004',
    name: 'Real Estate - Retail Properties',
    type: 'real_estate',
    value: 18000000,
    currency: 'EUR'
  },
  {
    id: 'collateral-005',
    name: 'Equity Holdings - Listed Companies',
    type: 'investment',
    value: 12500000,
    currency: 'EUR'
  }
]

// Assets (EUR)
export const assets: Asset[] = [
  { id: 'asset-001', name: 'Siemens AG', type: 'equity', value: 2800000, quantity: 15000, currency: 'EUR', percentage: 15 },
  { id: 'asset-002', name: 'BASF SE', type: 'equity', value: 2250000, quantity: 8000, currency: 'EUR', percentage: 12 },
  { id: 'asset-003', name: 'iShares EURO STOXX 50 ETF', type: 'fund', value: 3400000, quantity: 68000, currency: 'EUR', percentage: 18 },
  { id: 'asset-004', name: 'Vanguard European Bond ETF', type: 'fund', value: 2850000, quantity: 28500, currency: 'EUR', percentage: 15 },
  { id: 'asset-005', name: 'German Bundesanleihen 5Y', type: 'bond', value: 1700000, quantity: 17, currency: 'EUR', percentage: 9 },
  { id: 'asset-006', name: 'European Corporate Bond AA', type: 'bond', value: 1350000, quantity: 13, currency: 'EUR', percentage: 7 },
  { id: 'asset-007', name: 'Structured Product - Reverse Convertible', type: 'structured', value: 2000000, quantity: 20, currency: 'EUR', percentage: 11 },
  { id: 'asset-008', name: 'European Hedge Fund - Equities', type: 'fund', value: 570000, quantity: 5700, currency: 'EUR', percentage: 3 }
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
  // USD Transfers
  { id: 't-001', from: 'United States', to: 'United Kingdom', amount: 500000, currency: 'USD', date: new Date() },
  { id: 't-002', from: 'United States', to: 'Germany', amount: 750000, currency: 'USD', date: new Date(Date.now() - 3600000) },
  { id: 't-003', from: 'United States', to: 'Japan', amount: 1000000, currency: 'USD', date: new Date(Date.now() - 7200000) },
  { id: 't-008', from: 'United States', to: 'Canada', amount: 600000, currency: 'USD', date: new Date(Date.now() - 25200000) },
  { id: 't-020', from: 'Canada', to: 'United States', amount: 450000, currency: 'USD', date: new Date(Date.now() - 1800000) },

  // EUR Transfers
  { id: 't-005', from: 'Germany', to: 'France', amount: 1200000, currency: 'EUR', date: new Date(Date.now() - 14400000) },
  { id: 't-010', from: 'France', to: 'Switzerland', amount: 850000, currency: 'EUR', date: new Date(Date.now() - 32400000) },
  { id: 't-011', from: 'Germany', to: 'United Kingdom', amount: 950000, currency: 'EUR', date: new Date(Date.now() - 1200000) },
  { id: 't-012', from: 'Switzerland', to: 'Germany', amount: 680000, currency: 'EUR', date: new Date(Date.now() - 2400000) },
  { id: 't-013', from: 'France', to: 'Germany', amount: 1100000, currency: 'EUR', date: new Date(Date.now() - 3600000) },

  // GBP Transfers
  { id: 't-004', from: 'United Kingdom', to: 'Singapore', amount: 300000, currency: 'GBP', date: new Date(Date.now() - 10800000) },
  { id: 't-014', from: 'United Kingdom', to: 'United States', amount: 420000, currency: 'GBP', date: new Date(Date.now() - 5400000) },

  // JPY Transfers
  { id: 't-007', from: 'Japan', to: 'Hong Kong', amount: 250000, currency: 'JPY', date: new Date(Date.now() - 21600000) },
  { id: 't-015', from: 'Japan', to: 'Singapore', amount: 320000, currency: 'JPY', date: new Date(Date.now() - 4200000) },

  // SGD Transfers
  { id: 't-006', from: 'Singapore', to: 'Australia', amount: 200000, currency: 'SGD', date: new Date(Date.now() - 18000000) },
  { id: 't-016', from: 'Singapore', to: 'United Kingdom', amount: 280000, currency: 'SGD', date: new Date(Date.now() - 6000000) },

  // HKD Transfers
  { id: 't-009', from: 'Hong Kong', to: 'United States', amount: 400000, currency: 'HKD', date: new Date(Date.now() - 28800000) },
  { id: 't-017', from: 'Hong Kong', to: 'Singapore', amount: 150000, currency: 'HKD', date: new Date(Date.now() - 7200000) }
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

// Historical Balance Data for Account Page (EUR)
export const accountBalanceHistory = generateHistoricalBalances(3200000)

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

// Portfolio Risk Metrics (EUR)
export const riskMetrics = {
  var95: 520000,
  var995: 750000,
  expectedReturn: 8.5,
  volatility: 12.3,
  correlation: [
    [1.0, 0.65, 0.45],
    [0.65, 1.0, 0.52],
    [0.45, 0.52, 1.0]
  ]
}
