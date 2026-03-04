import { accounts, cards, accountBalanceHistory } from '../services/mockData'
import AccountList from '../components/Account/AccountList'
import CardsSummary from '../components/Account/CardsSummary'
import BalanceHistoryChart from '../components/Charts/BalanceHistoryChart'

export default function Account() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-navy-900 mb-2">Account Overview</h2>
        <p className="text-gray-600">View and manage your accounts, cards, and balances</p>
      </div>

      {/* Cards Summary */}
      <CardsSummary cards={cards} />

      {/* Accounts List */}
      <AccountList accounts={accounts} />

      {/* Balance History Chart */}
      <BalanceHistoryChart data={accountBalanceHistory} />
    </div>
  )
}
