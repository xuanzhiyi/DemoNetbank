import { MapContainer, TileLayer, Popup, CircleMarker, Polyline } from 'react-leaflet'
import L from 'leaflet'
import { Transfer } from '../../types'
import { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'

interface WorldMapProps {
  transfers: Transfer[]
  selectedCurrency: string
}

// Country coordinates (latitude, longitude)
const countryCoordinates: Record<string, [number, number]> = {
  'United States': [37.0902, -95.7129],
  'Canada': [56.1304, -106.3468],
  'United Kingdom': [55.3781, -3.4360],
  'Germany': [51.1657, 10.4515],
  'France': [46.2276, 2.2137],
  'Switzerland': [46.8182, 8.2275],
  'Japan': [36.2048, 138.2529],
  'Hong Kong': [22.3193, 114.1694],
  'Singapore': [1.3521, 103.8198],
  'Australia': [-25.2744, 133.7751],
}

export default function WorldMap({ transfers, selectedCurrency }: WorldMapProps) {
  const [filteredTransfers, setFilteredTransfers] = useState<Transfer[]>([])
  const [animatingTransfers, setAnimatingTransfers] = useState<string[]>([])

  useEffect(() => {
    // Filter transfers by selected currency
    const filtered = transfers.filter(t => t.currency === selectedCurrency)
    setFilteredTransfers(filtered)

    // Animate transfers one by one
    const timer = setInterval(() => {
      setAnimatingTransfers(prev => {
        const next = [...prev]
        if (next.length >= filtered.length) {
          return []
        }
        if (filtered[next.length]) {
          next.push(filtered[next.length].id)
        }
        return next
      })
    }, 500)

    return () => clearInterval(timer)
  }, [selectedCurrency, transfers])

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden border border-gray-300">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ width: '100%', height: '100%' }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          maxZoom={6}
        />

        {/* Country markers */}
        {Object.entries(countryCoordinates).map(([country, [lat, lng]]) => {
          const countryTransfers = filteredTransfers.filter(
            t => t.from === country || t.to === country
          )
          const isActive = countryTransfers.length > 0
          const incomingCount = countryTransfers.filter(t => t.to === country).length
          const outgoingCount = countryTransfers.filter(t => t.from === country).length

          return (
            <CircleMarker
              key={country}
              center={[lat, lng]}
              radius={isActive ? 12 : 8}
              fillColor={isActive ? '#e91e63' : '#1a237e'}
              color={isActive ? '#c2185b' : '#0d1b5e'}
              weight={2}
              opacity={0.8}
              fillOpacity={0.7}
            >
              <Popup>
                <div className="text-sm font-semibold">
                  <p>{country}</p>
                  {incomingCount > 0 && <p className="text-green-600">↓ {incomingCount} incoming</p>}
                  {outgoingCount > 0 && <p className="text-pink-600">↑ {outgoingCount} outgoing</p>}
                </div>
              </Popup>
            </CircleMarker>
          )
        })}

        {/* Transfer flow lines */}
        {filteredTransfers.map((transfer) => {
          const fromCoords = countryCoordinates[transfer.from]
          const toCoords = countryCoordinates[transfer.to]

          if (!fromCoords || !toCoords) return null

          const isAnimating = animatingTransfers.includes(transfer.id)

          return (
            <Polyline
              key={transfer.id}
              positions={[fromCoords, toCoords]}
              color={isAnimating ? '#e91e63' : '#1a237e'}
              weight={isAnimating ? 3 : 2}
              opacity={isAnimating ? 0.8 : 0.4}
              dashArray={isAnimating ? '5, 5' : 'none'}
              lineCap="round"
              lineJoin="round"
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold">{transfer.from} → {transfer.to}</p>
                  <p className="text-gray-700">
                    {transfer.currency} {transfer.amount.toLocaleString('en-US', {
                      maximumFractionDigits: 0
                    })}
                  </p>
                  <p className="text-xs text-gray-500">
                    {transfer.date.toLocaleDateString()}
                  </p>
                </div>
              </Popup>
            </Polyline>
          )
        })}
      </MapContainer>

      {/* Info overlay */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 z-10 max-w-xs">
        <h4 className="font-semibold text-navy-900 mb-2">Transfer Flows</h4>
        <p className="text-sm text-gray-600">
          {selectedCurrency}: {filteredTransfers.length} transfer{filteredTransfers.length !== 1 ? 's' : ''}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Total: {(
            filteredTransfers.reduce((sum, t) => sum + t.amount, 0) / 1000000
          ).toFixed(2)}M
        </p>
        <p className="text-xs text-pink-600 font-medium mt-3">
          🔴 = Active transfer routes
        </p>
      </div>

      {/* No data message */}
      {filteredTransfers.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75 z-10">
          <p className="text-gray-600 text-center">
            No transfers found for {selectedCurrency}<br />
            <span className="text-xs text-gray-500">Select a different currency</span>
          </p>
        </div>
      )}
    </div>
  )
}
