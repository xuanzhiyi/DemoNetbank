import { currencyPairs, transfers } from '../services/mockData'
import SpotPrices from '../components/FX/SpotPrices'
import WorldMap from '../components/FX/WorldMap'
import { useState } from 'react'
import { Globe } from 'lucide-react'

export default function FX() {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD')

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-navy-900 mb-2">Foreign Exchange</h2>
        <p className="text-gray-600">Monitor currency transfers, rates, and FX hedges</p>
      </div>

      {/* Currency Filter */}
      <div className="card">
        <label className="block text-sm font-semibold text-navy-900 mb-2 flex items-center gap-2">
          <Globe size={16} className="text-pink-500" />
          Filter by Currency
        </label>
        <select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          className="input-field"
        >
          <option value="USD">US Dollar (USD)</option>
          <option value="EUR">Euro (EUR)</option>
          <option value="GBP">British Pound (GBP)</option>
          <option value="JPY">Japanese Yen (JPY)</option>
          <option value="CNH">Chinese Yuan (CNH)</option>
          <option value="SGD">Singapore Dollar (SGD)</option>
          <option value="HKD">Hong Kong Dollar (HKD)</option>
        </select>
        <p className="text-sm text-gray-500 mt-2">Showing transfers in {selectedCurrency}</p>
      </div>

      {/* World Map */}
      <div className="card">
        <h3 className="text-lg font-semibold text-navy-900 mb-4 flex items-center gap-2">
          <Globe size={20} className="text-pink-500" />
          Global Payment Flows
        </h3>
        <WorldMap transfers={transfers} selectedCurrency={selectedCurrency} />
      </div>

      {/* Spot Prices */}
      <SpotPrices pairs={currencyPairs} />

      {/* FX Hedges */}
      <div className="card">
        <h3 className="text-lg font-semibold text-navy-900 mb-4">FX Hedges & Swaps</h3>
        <p className="text-gray-600 text-center py-8">FX hedges and swaps details coming soon...</p>
      </div>
    </div>
  )
}
