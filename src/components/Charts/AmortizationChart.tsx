import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Loan, AmortizationSchedule } from '../../types'
import { generateAmortizationSchedule, getAmortizationRange } from '../../utils/amortization'
import { TrendingDown } from 'lucide-react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface AmortizationChartProps {
  loan: Loan
}

export default function AmortizationChart({ loan }: AmortizationChartProps) {
  const range = getAmortizationRange(loan)
  const schedule = generateAmortizationSchedule(loan, range.quarters)

  const chartData = {
    labels: schedule.map(s => s.period),
    datasets: [
      {
        label: 'Principal Payment',
        data: schedule.map(s => s.principal),
        backgroundColor: '#1a237e',
        borderColor: '#0d1b5e',
        borderWidth: 1,
        barPercentage: 0.8,
        categoryPercentage: 0.9
      },
      {
        label: 'Interest Payment',
        data: schedule.map(s => s.interest),
        backgroundColor: '#e91e63',
        borderColor: '#c2185b',
        borderWidth: 1,
        barPercentage: 0.8,
        categoryPercentage: 0.9
      }
    ]
  }

  const options = {
    indexAxis: 'x' as const,
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(26, 35, 126, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#e91e63',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: function(context: any) {
            return context.dataset.label + ': $' + context.parsed.y.toLocaleString('en-US', { maximumFractionDigits: 0 })
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          font: {
            size: 11
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        stacked: true,
        ticks: {
          callback: function(value: any) {
            return '$' + (value / 1000).toFixed(0) + 'k'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      }
    }
  }

  // Calculate summary statistics
  const totalPrincipal = schedule.reduce((sum, s) => sum + s.principal, 0)
  const totalInterest = schedule.reduce((sum, s) => sum + s.interest, 0)

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-semibold text-navy-900 mb-6 flex items-center gap-2">
          <TrendingDown size={20} className="text-pink-500" />
          {loan.name} - Amortization Schedule
        </h3>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-navy-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm mb-1">Loan Amount</p>
            <p className="text-2xl font-bold text-navy-900">${(loan.principal / 1000000).toFixed(1)}M</p>
          </div>
          <div className="bg-pink-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm mb-1">Total Interest</p>
            <p className="text-2xl font-bold text-pink-600">${(totalInterest / 1000000).toFixed(2)}M</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm mb-1">Term</p>
            <p className="text-2xl font-bold text-green-700">{range.quarters} Quarters</p>
          </div>
        </div>

        {/* Chart */}
        <div className="relative h-80 mb-6">
          <Bar data={chartData} options={options} />
        </div>

        {/* Period Info */}
        <div className="border-t border-gray-200 pt-4 text-sm text-gray-600">
          <p>
            <span className="font-semibold text-navy-900">Schedule Period: </span>
            {range.start.toLocaleDateString()} to {range.end.toLocaleDateString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">Based on {range.quarters} quarterly payments</p>
        </div>
      </div>

      {/* Detailed Payment Table */}
      <div className="card">
        <h4 className="font-semibold text-navy-900 mb-4">Payment Schedule Details</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-3 font-semibold text-gray-700">Period</th>
                <th className="text-right py-3 px-3 font-semibold text-gray-700">Principal</th>
                <th className="text-right py-3 px-3 font-semibold text-gray-700">Interest</th>
                <th className="text-right py-3 px-3 font-semibold text-gray-700">Total Payment</th>
                <th className="text-right py-3 px-3 font-semibold text-gray-700">Remaining Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-3 font-medium text-navy-900">{row.period}</td>
                  <td className="text-right py-3 px-3 text-navy-600 font-semibold">
                    ${row.principal.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-3 text-pink-600 font-semibold">
                    ${row.interest.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-3 text-gray-900 font-semibold">
                    ${(row.principal + row.interest).toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-3 text-gray-700">
                    ${row.balance.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Summary */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-sm font-semibold">
          <span className="text-gray-700">Total Payments:</span>
          <span className="text-navy-900">${(totalPrincipal + totalInterest).toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
