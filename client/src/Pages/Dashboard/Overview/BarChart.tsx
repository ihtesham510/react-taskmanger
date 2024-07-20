import { Bar, BarChart, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
interface Props {
	statusCounts: number[]
}
export default function BarCharter({ statusCounts }: Props) {
	const chartData = [
		{ status: 'completed', tasks: statusCounts[0], fill: 'var(--color-completed)' },
		{ status: 'ongoing', tasks: statusCounts[1], fill: 'var(--color-ongoing)' },
		{ status: 'todo', tasks: statusCounts[2], fill: 'var(--color-todo)' },
		{ status: 'cancelled', tasks: statusCounts[3], fill: 'var(--color-cancelled)' },
		{ status: 'paused', tasks: statusCounts[4], fill: 'var(--color-paused)' },
	]

	const chartConfig = {
		Tasks: {
			label: 'Tasks',
		},
		completed: {
			label: 'Completed',
			color: 'hsl(var(--chart-1))',
		},
		ongoing: {
			label: 'On Going',
			color: 'hsl(var(--chart-2))',
		},
		todo: {
			label: 'To do',
			color: 'hsl(var(--chart-3))',
		},
		cancelled: {
			label: 'Cancelled',
			color: 'hsl(var(--chart-4))',
		},
		paused: {
			label: 'Paused',
			color: 'hsl(var(--chart-5))',
		},
	} satisfies ChartConfig

	return (
		<Card className='m-2 lg:w-[50%]'>
			<CardHeader>
				<CardTitle>Task Chart - Mixed</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={chartData}
						layout='vertical'
						margin={{
							left: 20,
						}}
					>
						<YAxis
							dataKey='status'
							type='category'
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={value => chartConfig[value as keyof typeof chartConfig]?.label}
						/>
						<XAxis dataKey='tasks' type='number' hide />
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						<Bar dataKey='tasks' layout='vertical' radius={5} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
