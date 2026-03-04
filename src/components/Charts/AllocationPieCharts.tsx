import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Plugin
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
  geographic: ['#001E9E', '#e91e63', '#2196f3', '#4caf50'],
  sector: ['#001E9E', '#e91e63', '#2196f3', '#ff9800', '#4caf50', '#9c27b0', '#607d8b'],
  rating: ['#4caf50', '#2196f3', '#ff9800', '#f44336', '#9c27b0']
}

// Plugin to draw center text
const centerTextPlugin: Plugin = {
  id: 'centerText',
  afterDraw(chart: any) {
    const width = chart.width
    const height = chart.height
    const ctx = chart.ctx

    ctx.restore()

    const fontSize = (height / 200).toFixed(2)
    ctx.font = `bold ${fontSize}em sans-serif`
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#001E9E'

    // Find the largest value
    const data = chart.data.datasets[0].data
    const labels = chart.data.labels
    let maxIndex = 0
    let maxValue = data[0]

    for (let i = 1; i < data.length; i++) {
      if (data[i] > maxValue) {
        maxValue = data[i]
        maxIndex = i
      }
    }

    const text = labels[maxIndex]
    const x = Math.round((width - ctx.measureText(text).width) / 2)
    const y = height / 2

    ctx.fillText(text, x, y)
  }
}

ChartJS.register(centerTextPlugin)

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
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 12,
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 30, 158, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#e91e63',
        borderWidth: 1,
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
        <div className="relative h-72 flex items-center justify-center">
          <Doughnut
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
        <div className="relative h-72 flex items-center justify-center">
          <Doughnut
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
        <div className="relative h-72 flex items-center justify-center">
          <Doughnut
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
