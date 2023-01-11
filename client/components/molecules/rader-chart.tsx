import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts'
import color from '../../theme/color'

interface ProblemsChartProps {
  data?: any[]
}

const ProblemsChart = (props: ProblemsChartProps) => {
  const data = props.data
  console.log(data)
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid color={color.white} />
        <PolarAngleAxis dataKey="subject" />
        <Radar
          name=""
          dataKey="ratio"
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
