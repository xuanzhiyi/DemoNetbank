import { Account } from '../../types'
import { DollarSign, Wallet } from 'lucide-react'

interface AccountListProps {
  accounts: Account[]
}

const typeColors: Record<string, string> = {
  current: 'bg-blue-50 text-blue-700',
  savings: 'bg-green-50 text-green-700',
  foreign: 'bg-purple-50 text-purple-700',
  payable: 'bg-orange-50 text-orange-700',
  receivable: 'bg-cyan-50 text-cyan-700'
}

const typeLabels: Record<string, string> = {
  current: 'Current Account',
  savings: 'Savings Account',
  foreign: 'Foreign Currency',
  payable: 'Payable Account',
  receivable: 'Receivable Account'
}

export default function AccountList({ accounts }: AccountListProps) {
  // Group accounts by type
  const groupedAccounts = accounts.reduce((acc, account) => {
    if (!acc[account.type]) acc[account.type] = []
    acc[account.type].push(account)
    return acc
  }, {} as Record<string, Account[]>)

  return (
    <div className="space-y-6">
      {Object.entries(groupedAccounts).map(([type, typeAccounts]) => (
        <div key={type}>
          <h3 className="text-lg font-semibold text-navy-900 mb-4 flex items-center gap-2">
            <Wallet size={20} className="text-pink-500" />
            {typeLabels[type]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {typeAccounts.map((account) => (
              <div key={account.id} className="card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-navy-900">{account.name}</h4>
                    <p className={`text-xs font-medium px-2 py-1 rounded w-fit mt-1 ${typeColors[type]}`}>
                      {account.currency}
                    </p>
                  </div>
                  <DollarSign size={24} className="text-pink-500" />
                </div>

                <div className="space-y-2 border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">Balance</span>
                    <span className={`font-bold ${account.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {account.currency} {Math.abs(account.balance).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  {account.overdraftLimit && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">Overdraft Limit</span>
                      <span className="text-navy-600 font-semibold">
                        {account.currency} {account.overdraftLimit.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
