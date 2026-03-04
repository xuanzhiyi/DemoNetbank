import { assets, allocationData, riskMetrics } from '../services/mockData'
import AssetsList from '../components/AssetWealth/AssetsList'
import AllocationCharts from '../components/Charts/AllocationPieCharts'
import PortfolioEvaluation from '../components/AssetWealth/PortfolioEvaluation'

export default function AssetWealth() {
  const portfolioValue = assets.reduce((sum, asset) => sum + asset.value, 0)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-navy-900 mb-2">Asset & Wealth Management</h2>
        <p className="text-gray-600">Monitor your investments, allocations, and portfolio performance</p>
      </div>

      {/* Portfolio Overview */}
      <PortfolioEvaluation
        totalValue={portfolioValue}
        gainLoss={285000}
        gainLossPercent={10.2}
        riskMetrics={riskMetrics}
      />

      {/* Allocation Charts */}
      <AllocationCharts data={allocationData} />

      {/* Assets List */}
      <AssetsList assets={assets} />
    </div>
  )
}
