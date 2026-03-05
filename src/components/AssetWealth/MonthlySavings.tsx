import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'
import { PiggyBank, TrendingUp, Target, Calendar } from 'lucide-react'
import { SavingsSummary } from '../../types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

interface MonthlySavingsProps {
  data: SavingsSummary
}

export default function MonthlySavings({ data }: MonthlySavingsProps) {
  const fmt = (v: number) =>
    v >= 1_000_000
      ? `€${(v / 1_000_000).toFixed(2)}M`
      : `€${(v / 1_000).toFixed(0)}K`

  const chartData = {
    labels: data.monthlyEntries.map((e) => e.month),
    datasets: [
      {
        label: 'Contribution',
        data: data.monthlyEntries.map((e) => e.contribution),
        backgroundColor: 'rgba(0, 30, 158, 0.75)',
        borderRadius: 4,
        stack: 'stack'
      },
      {
        label: 'Interest Earned',
        data: data.monthlyEntries.map((e) => e.interestEarned),
        backgroundColor: 'rgba(233, 30, 99, 0.75)',
        borderRadius: 4,
        stack: 'stack'
      }
    ]
  }

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      tooltip: {
        callbacks: {
          label: (ctx: any) =>
            `${ctx.dataset.label}: €${ctx.parsed.y.toLocaleString()}`
        }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        ticks: {
          callback: (v: string | number) =>
            typeof v === 'number' ? `€${(v / 1000).toFixed(0)}K` : v
        }
      }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-navy-900">Monthly Savings</h3>
        <p className="text-sm text-gray-500 mt-1">Euro Savings Account — 12-month overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-gray-600 text-sm mb-2 flex items-center gap-1">
            <PiggyBank size={16} />
            Current Balance
          </p>
          <p className="text-2xl font-bold text-navy-900">{fmt(data.currentBalance)}</p>
          <p className="text-xs text-gray-500 mt-1">{data.currency}</p>
        </div>

        <div className="card">
          <p className="text-gray-600 text-sm mb-2 flex items-center gap-1">
            <Calendar size={16} />
            Monthly Contribution
          </p>
          <p className="text-2xl font-bold text-navy-900">{fmt(data.monthlyContribution)}</p>
          <p className="text-xs text-gray-500 mt-1">Average / month</p>
        </div>

        <div className="card">
          <p className="text-gray-600 text-sm mb-2 flex items-center gap-1">
            <TrendingUp size={16} />
            Annual Interest Rate
          </p>
          <p className="text-2xl font-bold text-green-600">{data.annualInterestRate.toFixed(2)}%</p>
          <p className="text-xs text-gray-500 mt-1">p.a.</p>
        </div>

        <div className="card">
          <p className="text-gray-600 text-sm mb-2 flex items-center gap-1">
            <TrendingUp size={16} />
            Interest Earned (12M)
          </p>
          <p className="text-2xl font-bold text-pink-600">{fmt(data.totalInterestEarned)}</p>
          <p className="text-xs text-gray-500 mt-1">Last 12 months</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="card">
        <h4 className="font-semibold text-navy-900 mb-4">Monthly Contributions & Interest</h4>
        <div className="h-64">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Savings Goals */}
      <div className="card">
        <h4 className="font-semibold text-navy-900 mb-5 flex items-center gap-2">
          <Target size={18} />
          Savings Goals
        </h4>
        <div className="space-y-5">
          {data.goals.map((goal) => {
            const pct = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)
            const remaining = goal.targetAmount - goal.currentAmount
            const targetLabel = goal.targetDate.toLocaleString('default', {
              month: 'short',
              year: 'numeric'
            })
            return (
              <div key={goal.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-medium text-navy-900 text-sm">{goal.name}</span>
                  <span className="text-xs text-gray-500">Target: {targetLabel}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>{fmt(goal.currentAmount)} of {fmt(goal.targetAmount)}</span>
                  <span className={remaining <= 0 ? 'text-green-600 font-semibold' : 'text-gray-500'}>
                    {remaining <= 0 ? 'Achieved!' : `${fmt(remaining)} remaining`}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-navy-500 to-pink-500 transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-right text-xs font-semibold text-pink-600 mt-1">{pct.toFixed(1)}%</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Monthly Breakdown Table */}
      <div className="card">
        <h4 className="font-semibold text-navy-900 mb-4">Monthly Breakdown</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Month</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Contribution</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Interest Earned</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">End Balance</th>
              </tr>
            </thead>
            <tbody>
              {[...data.monthlyEntries].reverse().map((entry, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-3 font-medium text-navy-900">{entry.month}</td>
                  <td className="text-right py-3 px-3 text-navy-900">
                    €{entry.contribution.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-3 text-green-600 font-medium">
                    +€{entry.interestEarned.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-3 font-semibold text-navy-900">
                    {fmt(entry.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
