import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface AllocationChartsProps {
  data: {
    geographic: Record<string, number>
    sector: Record<string, number>
    rating: Record<string, number>
  }
}

const chartColors = {
  geographic: ['#1a237e', '#e91e63', '#2196f3', '#4caf50'],
  sector: ['#1a237e', '#e91e63', '#2196f3', '#ff9800', '#4caf50', '#9c27b0', '#607d8b'],
  rating: ['#4caf50', '#2196f3', '#ff9800', '#f44336', '#9c27b0']
}

export default function AllocationCharts({ data }: AllocationChartsProps) {
  const createChartData = (labels: string[], values: number[], colors: string[]) => ({
    labels,
    datasets: [{
      data: values,
      backgroundColor: colors,
      borderColor: '#ffffff',
      borderWidth: 2
    }]
  })

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(26, 35, 126, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        callbacks: {
          label: function(context: any) {
            return context.label + ': ' + context.parsed + '%'
          }
        }
      }
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Geographic Allocation */}
      <div className="card">
        <h3 className="text-lg font-semibold text-navy-900 mb-4">Geographic Allocation</h3>
        <div className="relative h-72">
          <Pie
            data={createChartData(
              Object.keys(data.geographic),
              Object.values(data.geographic),
              chartColors.geographic
            )}
            options={chartOptions}
          />
        </div>
      </div>

      {/* Sector Allocation */}
      <div className="card">
        <h3 className="text-lg font-semibold text-navy-900 mb-4">Industry Sector Allocation</h3>
        <div className="relative h-72">
          <Pie
            data={createChartData(
              Object.keys(data.sector),
              Object.values(data.sector),
              chartColors.sector
            )}
            options={chartOptions}
          />
        </div>
      </div>

      {/* Rating Allocation */}
      <div className="card">
        <h3 className="text-lg font-semibold text-navy-900 mb-4">Credit Rating Allocation</h3>
        <div className="relative h-72">
          <Pie
            data={createChartData(
              Object.keys(data.rating),
              Object.values(data.rating),
              chartColors.rating
            )}
            options={chartOptions}
          />
        </div>
      </div>
    </div>
  )
}
