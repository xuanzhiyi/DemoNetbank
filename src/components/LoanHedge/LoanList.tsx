import { Loan, Hedge } from '../../types'
import { TrendingDown } from 'lucide-react'

interface LoanListProps {
  loans: Loan[]
  hedges: Hedge[]
  selectedLoanId: string
  onSelectLoan: (id: string) => void
}

const typeColors: Record<string, { bg: string; text: string; label: string }> = {
  fixed: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Fixed Rate' },
  floating: { bg: 'bg-orange-50', text: 'text-orange-700', label: 'Floating Rate' },
  collar: { bg: 'bg-purple-50', text: 'text-purple-700', label: 'Collar' },
  cap: { bg: 'bg-green-50', text: 'text-green-700', label: 'Cap' }
}

export default function LoanList({ loans, hedges, selectedLoanId, onSelectLoan }: LoanListProps) {
  const daysToMaturity = (loan: Loan) => {
    const today = new Date()
    const diff = loan.maturityDate.getTime() - today.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  const loanHedges = hedges.filter(h => h.underlyingLoan === selectedLoanId)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-navy-900 mb-4 flex items-center gap-2">
          <TrendingDown size={20} className="text-pink-500" />
          Loans & Borrowings
        </h3>

        <div className="space-y-4">
          {loans.map((loan) => (
            <div
              key={loan.id}
              onClick={() => onSelectLoan(loan.id)}
              className={`card cursor-pointer transition-all ${selectedLoanId === loan.id ? 'ring-2 ring-pink-500' : ''}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-navy-900">{loan.name}</h4>
                  <p className={`text-xs font-medium px-2 py-1 rounded w-fit mt-1 ${typeColors[loan.type].bg} ${typeColors[loan.type].text}`}>
                    {typeColors[loan.type].label}
                  </p>
                </div>
                <span className="text-pink-600 font-bold">{loan.rate.toFixed(2)}%</span>
              </div>

              <div className="grid grid-cols-3 gap-2 border-t border-gray-200 pt-3 text-sm">
                <div>
                  <p className="text-gray-600 text-xs">Principal</p>
                  <p className="font-semibold text-navy-900">€{(loan.principal / 1000000).toFixed(1)}M</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs">Days to Maturity</p>
                  <p className="font-semibold text-navy-900">{daysToMaturity(loan)}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs">Maturity Date</p>
                  <p className="font-semibold text-navy-900">{loan.maturityDate.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Associated Hedges */}
      {loanHedges.length > 0 && (
        <div>
          <h4 className="font-semibold text-navy-900 mb-3">Associated Hedges</h4>
          <div className="space-y-3">
            {loanHedges.map((hedge) => (
              <div key={hedge.id} className="card bg-purple-50 border border-purple-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-semibold text-purple-900">{hedge.name}</h5>
                    <p className="text-sm text-purple-700">{typeColors[hedge.type]?.label} @ {hedge.strikePrice.toFixed(2)}%</p>
                  </div>
                  <span className="badge-pink">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
