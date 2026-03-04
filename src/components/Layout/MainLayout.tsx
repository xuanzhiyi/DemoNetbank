import { ReactNode } from 'react'
import BottomNav from '../Navigation/BottomNav'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-navy-500 px-4 py-4 shadow-md" style={{ color: '#F0F0F0' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#F0F0F0' }}>DemoNetbank</h1>
            <p className="text-sm" style={{ opacity: 0.8 }}>Corporate Banking Platform</p>
          </div>
          <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center font-bold">
            AC
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
