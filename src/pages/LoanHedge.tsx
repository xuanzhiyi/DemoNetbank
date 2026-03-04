import { loans, hedges, collaterals } from '../services/mockData'
import LoanList from '../components/LoanHedge/LoanList'
import CollateralList from '../components/LoanHedge/CollateralList'
import AmortizationChart from '../components/Charts/AmortizationChart'
import { useState } from 'react'

export default function LoanHedge() {
  const [selectedLoanId, setSelectedLoanId] = useState<string>(loans[0].id)
  const selectedLoan = loans.find(l => l.id === selectedLoanId)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-navy-900 mb-2">Loans & Hedges</h2>
        <p className="text-gray-600">Manage your loans, hedges, and collateral</p>
      </div>

      {/* Loans and Hedges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <LoanList loans={loans} hedges={hedges} selectedLoanId={selectedLoanId} onSelectLoan={setSelectedLoanId} />
        </div>
        <div>
          <CollateralList collaterals={collaterals} />
        </div>
      </div>

      {/* Amortization Chart */}
      {selectedLoan && <AmortizationChart loan={selectedLoan} />}
    </div>
  )
}
