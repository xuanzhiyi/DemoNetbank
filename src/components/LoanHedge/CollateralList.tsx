import { Collateral } from '../../types'
import { Lock } from 'lucide-react'

interface CollateralListProps {
  collaterals: Collateral[]
}

const typeColors: Record<string, string> = {
  investment: 'bg-blue-50 text-blue-700',
  real_estate: 'bg-amber-50 text-amber-700'
}

const typeLabels: Record<string, string> = {
  investment: 'Investment',
  real_estate: 'Real Estate'
}

export default function CollateralList({ collaterals }: CollateralListProps) {
  const totalValue = collaterals.reduce((sum, c) => sum + c.value, 0)

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-navy-900 flex items-center gap-2">
        <Lock size={20} className="text-pink-500" />
        Collaterals
      </h3>

      <div className="card bg-gradient-to-br from-navy-50 to-white">
        <p className="text-gray-600 text-sm mb-1">Total Collateral Value</p>
        <p className="text-3xl font-bold text-navy-900">€{(totalValue / 1000000).toFixed(1)}M</p>
      </div>

      <div className="space-y-3">
        {collaterals.map((collateral) => (
          <div key={collateral.id} className="card">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-navy-900 text-sm">{collateral.name}</h4>
                <p className={`text-xs font-medium px-2 py-1 rounded w-fit mt-1 ${typeColors[collateral.type]}`}>
                  {typeLabels[collateral.type]}
                </p>
              </div>
              <span className="font-bold text-pink-600">€{(collateral.value / 1000000).toFixed(1)}M</span>
            </div>
            <div className="text-xs text-gray-500">
              {collateral.currency}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
