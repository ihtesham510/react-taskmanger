import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
type Props = {
	children: React.ReactNode
	content?: String
	jsx?: React.ReactNode
}
const ToolTip: React.FC<Props> = ({ children, content, jsx }) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>{children}</TooltipTrigger>
				<TooltipContent>
					{jsx}
					<p>{content}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default ToolTip
