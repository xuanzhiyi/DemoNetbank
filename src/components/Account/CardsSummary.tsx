import { Card } from '../../types'
import { CreditCard } from 'lucide-react'

interface CardsSummaryProps {
  cards: Card[]
}

export default function CardsSummary({ cards }: CardsSummaryProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-navy-900 flex items-center gap-2">
        <CreditCard size={20} className="text-pink-500" />
        Payment Cards
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="bg-navy-500 rounded-lg p-6 shadow-lg" style={{ color: '#F0F0F0' }}>
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-sm" style={{ opacity: 0.8 }}>Card Name</p>
                <h4 className="text-lg font-bold">{card.name}</h4>
              </div>
              <div className="w-12 h-8 rounded flex items-center justify-center" style={{ backgroundColor: 'rgba(240, 240, 240, 0.2)' }}>
                <span className="text-xs font-bold">MC</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4" style={{ borderTop: '1px solid rgba(240, 240, 240, 0.2)' }}>
              <div>
                <p className="text-xs uppercase tracking-wide" style={{ opacity: 0.75 }}>Balance</p>
                <p className="text-xl font-bold">€{(card.balance / 1000).toFixed(1)}k</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide" style={{ opacity: 0.75 }}>Limit</p>
                <p className="text-xl font-bold">€{(card.limit / 1000).toFixed(1)}k</p>
              </div>
            </div>

            <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(240, 240, 240, 0.2)' }}>
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ opacity: 0.75 }}>Available</span>
                <span className="text-sm font-bold">€{((card.limit - card.balance) / 1000).toFixed(1)}k</span>
              </div>
              <div className="w-full rounded-full h-2 mt-2" style={{ backgroundColor: 'rgba(240, 240, 240, 0.2)' }}>
                <div
                  className="bg-pink-400 h-2 rounded-full"
                  style={{ width: `${(card.balance / card.limit) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
