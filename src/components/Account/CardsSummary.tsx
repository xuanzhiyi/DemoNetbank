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
          <div key={card.id} className="bg-gradient-to-br from-navy-500 to-navy-700 text-white rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-sm opacity-80">Card Name</p>
                <h4 className="text-lg font-bold">{card.name}</h4>
              </div>
              <div className="w-12 h-8 bg-white opacity-20 rounded flex items-center justify-center">
                <span className="text-xs font-bold">MC</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-white border-opacity-20 pt-4">
              <div>
                <p className="text-xs opacity-75 uppercase tracking-wide">Balance</p>
                <p className="text-xl font-bold">${(card.balance / 1000).toFixed(1)}k</p>
              </div>
              <div>
                <p className="text-xs opacity-75 uppercase tracking-wide">Limit</p>
                <p className="text-xl font-bold">${(card.limit / 1000).toFixed(1)}k</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white border-opacity-20">
              <div className="flex justify-between items-center">
                <span className="text-xs opacity-75">Available</span>
                <span className="text-sm font-bold">${((card.limit - card.balance) / 1000).toFixed(1)}k</span>
              </div>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mt-2">
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
