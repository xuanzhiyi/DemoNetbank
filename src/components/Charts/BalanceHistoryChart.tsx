import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { HistoricalBalance } from '../../types'
import { TrendingUp } from 'lucide-react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface BalanceHistoryChartProps {
  data: HistoricalBalance[]
}

export default function BalanceHistoryChart({ data }: BalanceHistoryChartProps) {
  const chartData = {
    labels: data.map(d => d.date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })),
    datasets: [
      {
        label: 'Account Balance',
        data: data.map(d => d.balance),
        borderColor: '#1a237e',
        backgroundColor: 'rgba(26, 35, 126, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#e91e63',
        pointBorderColor: '#1a237e',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
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
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `Balance: $${context.parsed.y.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value: any) {
            return '$' + (value / 1000000).toFixed(1) + 'M'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-navy-900 mb-6 flex items-center gap-2">
        <TrendingUp size={20} className="text-pink-500" />
        12-Month Balance History
      </h3>
      <div className="relative h-80">
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
}
