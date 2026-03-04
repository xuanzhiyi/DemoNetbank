import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout'
import Account from './pages/Account'
import LoanHedge from './pages/LoanHedge'
import FX from './pages/FX'
import AssetWealth from './pages/AssetWealth'
import Help from './pages/Help'

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Account />} />
          <Route path="/account" element={<Account />} />
          <Route path="/loan-hedge" element={<LoanHedge />} />
          <Route path="/fx" element={<FX />} />
          <Route path="/asset-wealth" element={<AssetWealth />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
