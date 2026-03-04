import { Loan, AmortizationSchedule } from '../types'

export function generateAmortizationSchedule(loan: Loan, quarters: number = 20): AmortizationSchedule[] {
  const schedule: AmortizationSchedule[] = []
  let balance = loan.principal
  const quarterlyRate = loan.rate / 100 / 4

  for (let i = 1; i <= quarters; i++) {
    // Calculate interest for this quarter
    const interest = balance * quarterlyRate

    // Calculate principal payment (equal principal payments)
    const principal = loan.principal / quarters

    // Update balance
    balance -= principal
    balance = Math.max(0, balance) // Prevent negative balance

    schedule.push({
      period: `Q${i}`,
      principal: Math.round(principal),
      interest: Math.round(interest),
      balance: Math.round(Math.max(0, balance))
    })
  }

  return schedule
}

export function getAmortizationRange(loan: Loan): { start: Date; end: Date; quarters: number } {
  const start = new Date()
  const maturityDate = loan.maturityDate

  // Calculate months until maturity
  const monthsToMaturity =
    (maturityDate.getFullYear() - start.getFullYear()) * 12 +
    (maturityDate.getMonth() - start.getMonth())

  // Default to 5 years (20 quarters), but use full term if shorter
  const months = Math.min(monthsToMaturity, 60)
  const quarters = Math.ceil(months / 3)

  const end = new Date(start)
  end.setMonth(end.getMonth() + months)

  return { start, end, quarters }
}
