import { useLocation, useNavigate } from 'react-router-dom'
import { CreditCard, TrendingUp, Globe, PieChart, HelpCircle } from 'lucide-react'

interface NavItem {
  path: string
  label: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { path: '/account', label: 'Account', icon: <CreditCard size={24} /> },
  { path: '/loan-hedge', label: 'Loan&Hedge', icon: <TrendingUp size={24} /> },
  { path: '/fx', label: 'FX', icon: <Globe size={24} /> },
  { path: '/asset-wealth', label: 'Asset & Wealth', icon: <PieChart size={24} /> },
  { path: '/help', label: 'Help', icon: <HelpCircle size={24} /> },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="w-full">
        <div className="flex items-center h-20">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                location.pathname === item.path ||
                (item.path === '/account' && location.pathname === '/')
                  ? 'text-pink-500 border-t-2 border-pink-500'
                  : 'text-gray-600 hover:text-navy-500'
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
