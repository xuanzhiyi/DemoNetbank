import { Asset } from '../../types'

interface AssetsListProps {
  assets: Asset[]
}

const typeColors: Record<string, { bg: string; text: string; label: string }> = {
  equity: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Equity' },
  fund: { bg: 'bg-purple-50', text: 'text-purple-700', label: 'Fund' },
  bond: { bg: 'bg-green-50', text: 'text-green-700', label: 'Bond' },
  structured: { bg: 'bg-orange-50', text: 'text-orange-700', label: 'Structured' }
}

export default function AssetsList({ assets }: AssetsListProps) {
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)

  // Group by type
  const grouped = assets.reduce((acc, asset) => {
    if (!acc[asset.type]) acc[asset.type] = []
    acc[asset.type].push(asset)
    return acc
  }, {} as Record<string, Asset[]>)

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-navy-900 mb-6">Holdings Breakdown</h3>

      <div className="space-y-8">
        {Object.entries(grouped).map(([type, typeAssets]) => (
          <div key={type}>
            <h4 className="font-semibold text-navy-800 mb-4">{typeColors[type].label}</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-700">Name</th>
                    <th className="text-right py-2 px-3 font-semibold text-gray-700">Quantity</th>
                    <th className="text-right py-2 px-3 font-semibold text-gray-700">Value</th>
                    <th className="text-right py-2 px-3 font-semibold text-gray-700">% of Portfolio</th>
                  </tr>
                </thead>
                <tbody>
                  {typeAssets.map((asset) => (
                    <tr key={asset.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-3">
                        <span className="font-medium text-navy-900">{asset.name}</span>
                      </td>
                      <td className="text-right py-3 px-3 text-gray-700">
                        {asset.quantity.toLocaleString()}
                      </td>
                      <td className="text-right py-3 px-3 font-semibold text-navy-900">
                        ${(asset.value / 1000000).toFixed(2)}M
                      </td>
                      <td className="text-right py-3 px-3">
                        <div className="flex items-center justify-end gap-2">
                          <span className="font-semibold text-pink-600">{asset.percentage.toFixed(1)}%</span>
                          <div className="w-16 bg-gray-200 rounded h-2">
                            <div
                              className="bg-gradient-to-r from-navy-500 to-pink-500 h-2 rounded"
                              style={{ width: `${asset.percentage}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
