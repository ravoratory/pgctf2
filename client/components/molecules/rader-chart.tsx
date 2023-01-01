import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts'
import color from '../../lib/color'

interface ProblemsChartProps {
  data?: any[]
}

const ProblemsChart = (props: ProblemsChartProps) => {
  const data = props.data ?? [
    { subject: 'pwnable', A: 50, fullmark: 100 },
    { subject: 'web', A: 90, fullmark: 100 },
    { subject: 'crypto', A: 20, fullmark: 100 },
    { subject: 'reversing', A: 30, fullmark: 100 },
    { subject: 'misc', A: 0, fullmark: 100 },
    { subject: 'steganography', A: 65, fullmark: 100 },
  ]
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid color={color.white} />
        <PolarAngleAxis dataKey="subject" />
        <Radar
          name="Takashi"
          dataKey="A"
          stroke={color.orange}
          fill={color.orange}
          fillOpacity={0}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default ProblemsChart
