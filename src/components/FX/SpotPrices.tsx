import { CurrencyPair } from '../../types'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface SpotPricesProps {
  pairs: CurrencyPair[]
}

export default function SpotPrices({ pairs }: SpotPricesProps) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-navy-900 mb-6">Major Currency Pairs - Spot Rates</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-semibold text-navy-900">Pair</th>
              <th className="text-right py-3 px-2 font-semibold text-navy-900">Bid</th>
              <th className="text-right py-3 px-2 font-semibold text-navy-900">Ask</th>
              <th className="text-right py-3 px-2 font-semibold text-navy-900">Spread</th>
              <th className="text-right py-3 px-2 font-semibold text-navy-900">Change %</th>
              <th className="text-center py-3 px-2 font-semibold text-navy-900">Trend</th>
            </tr>
          </thead>
          <tbody>
            {pairs.map((pair) => (
              <tr key={pair.pair} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2">
                  <span className="font-semibold text-navy-900">{pair.pair}</span>
                </td>
                <td className="text-right py-3 px-2 text-gray-900">{pair.bid.toFixed(4)}</td>
                <td className="text-right py-3 px-2 text-gray-900">{pair.ask.toFixed(4)}</td>
                <td className="text-right py-3 px-2 text-gray-600 text-xs">
                  {pair.spread.toFixed(4)}
                </td>
                <td className={`text-right py-3 px-2 font-semibold ${pair.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {pair.changePercent >= 0 ? '+' : ''}{pair.changePercent.toFixed(2)}%
                </td>
                <td className="text-center py-3 px-2">
                  {pair.changePercent >= 0 ? (
                    <TrendingUp size={16} className="text-green-600 mx-auto" />
                  ) : (
                    <TrendingDown size={16} className="text-red-600 mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 mt-4">Last updated: {new Date().toLocaleTimeString()}</p>
    </div>
  )
}
