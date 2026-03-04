// Account Types
export interface Account {
  id: string
  name: string
  type: 'current' | 'savings' | 'foreign' | 'payable' | 'receivable'
  currency: string
  balance: number
  overdraftLimit?: number
}

export interface Card {
  id: string
  name: string
  balance: number
  limit: number
  lastTransaction: Date
}

export interface HistoricalBalance {
  date: Date
  balance: number
}

// Loan Types
export interface Loan {
  id: string
  name: string
  type: 'floating' | 'fixed' | 'collar' | 'cap'
  principal: number
  rate: number
  maturityDate: Date
  disbursementDate: Date
}

export interface Hedge {
  id: string
  name: string
  type: 'collar' | 'cap' | 'floor'
  underlyingLoan: string
  strikePrice: number
}

export interface Collateral {
  id: string
  name: string
  type: 'investment' | 'real_estate'
  value: number
  currency: string
}

export interface AmortizationSchedule {
  period: string
  principal: number
  interest: number
  balance: number
}

// Asset Types
export interface Asset {
  id: string
  name: string
  type: 'equity' | 'fund' | 'bond' | 'structured'
  value: number
  quantity: number
  currency: string
  percentage: number
}

export interface Portfolio {
  totalValue: number
  currency: string
  gainLoss: number
  gainLossPercent: number
  benchmark: string
  benchmarkValue: number
}

export interface RiskMetrics {
  var95: number
  var995: number
  expectedReturn: number
  volatility: number
  correlation?: number[][]
}

export interface Allocation {
  geographic: Record<string, number>
  sector: Record<string, number>
  rating: Record<string, number>
}

// FX Types
export interface CurrencyPair {
  pair: string
  bid: number
  ask: number
  spread: number
  lastUpdate: Date
  change: number
  changePercent: number
}

export interface Transfer {
  id: string
  from: string
  to: string
  amount: number
  currency: string
  date: Date
}

export interface FXHedge {
  id: string
  name: string
  type: 'forward' | 'option' | 'swap'
  currency: string
  notional: number
  rate: number
}

// Help/Support Types
export interface Staff {
  id: string
  name: string
  role: 'relationship_manager' | 'product_expert'
  specialization?: string
  email: string
  phone: string
  office: string
  avatar?: string
}

export interface Meeting {
  id: string
  date: Date
  staff: Staff
  topic: string
  notes?: string
  type: 'past' | 'upcoming'
}

export interface MeetingRequest {
  purpose: 'account' | 'loans' | 'fx' | 'assets' | 'general'
  preferredStaff?: string
  date: Date
  message: string
}

export interface Document {
  id: string
  name: string
  type: 'trade_confirmation' | 'loan_contract' | 'statement' | 'confirmation' | 'agreement'
  category: 'trading' | 'lending' | 'account' | 'legal'
  date: Date
  size: number // in KB
  fileType: 'pdf' | 'docx' | 'xlsx' | 'txt'
}

// User Types
export interface User {
  id: string
  name: string
  company: string
  role: string
  email: string
  phone: string
}
