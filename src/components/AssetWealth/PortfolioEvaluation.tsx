import { RiskMetrics } from '../../types'
import { BarChart3, TrendingUp, AlertCircle } from 'lucide-react'

interface PortfolioEvaluationProps {
  totalValue: number
  gainLoss: number
  gainLossPercent: number
  riskMetrics: RiskMetrics
}

export default function PortfolioEvaluation({
  totalValue,
  gainLoss,
  gainLossPercent,
  riskMetrics
}: PortfolioEvaluationProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Value */}
      <div className="card">
        <p className="text-gray-600 text-sm mb-2 flex items-center gap-1">
          <BarChart3 size={16} />
          Total Portfolio Value
        </p>
        <p className="text-3xl font-bold text-navy-900">€{(totalValue / 1000000).toFixed(1)}M</p>
        <p className="text-xs text-gray-500 mt-2">Euro</p>
      </div>

      {/* Gain/Loss */}
      <div className="card">
        <p className="text-gray-600 text-sm mb-2 flex items-center gap-1">
          <TrendingUp size={16} />
          Unrealized Gain
        </p>
        <p className={`text-3xl font-bold ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          €{(gainLoss / 1000000).toFixed(2)}M
        </p>
        <p className={`text-xs font-semibold mt-2 ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {gainLoss >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}%
        </p>
      </div>

      {/* VaR 95% */}
      <div className="card">
        <p className="text-gray-600 text-sm mb-2 flex items-center gap-1">
          <AlertCircle size={16} />
          VaR (95%)
        </p>
        <p className="text-3xl font-bold text-orange-600">${(riskMetrics.var95 / 1000000).toFixed(2)}M</p>
        <p className="text-xs text-gray-500 mt-2">Max loss (95% confidence)</p>
      </div>

      {/* VaR 99.5% */}
      <div className="card">
        <p className="text-gray-600 text-sm mb-2 flex items-center gap-1">
          <AlertCircle size={16} />
          VaR (99.5%)
        </p>
        <p className="text-3xl font-bold text-red-600">${(riskMetrics.var995 / 1000000).toFixed(2)}M</p>
        <p className="text-xs text-gray-500 mt-2">Max loss (99.5% confidence)</p>
      </div>

      {/* Expected Return */}
      <div className="card">
        <p className="text-gray-600 text-sm mb-2">Expected Annual Return</p>
        <p className="text-3xl font-bold text-navy-900">{riskMetrics.expectedReturn.toFixed(2)}%</p>
        <p className="text-xs text-gray-500 mt-2">12-month projection</p>
      </div>

      {/* Volatility */}
      <div className="card">
        <p className="text-gray-600 text-sm mb-2">Portfolio Volatility</p>
        <p className="text-3xl font-bold text-pink-600">{riskMetrics.volatility.toFixed(2)}%</p>
        <p className="text-xs text-gray-500 mt-2">Annual volatility</p>
      </div>

      {/* Benchmark Comparison */}
      <div className="card">
        <p className="text-gray-600 text-sm mb-2">vs. Benchmark</p>
        <p className="text-3xl font-bold text-green-600">+3.5%</p>
        <p className="text-xs text-gray-500 mt-2">Outperformance</p>
      </div>

      {/* Risk Rating */}
      <div className="card">
        <p className="text-gray-600 text-sm mb-2">Risk Profile</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 space-y-1">
            <p className="text-lg font-bold text-navy-900">Moderate</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-2 rounded-full" style={{ width: '55%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
