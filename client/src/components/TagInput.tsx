
import React, { useEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import { XIcon } from 'lucide-react'

interface Props {
	placeholder: string
	onValueChange?: (value: string[]) => void
}

interface TagProps {
	value: string
	onClick: () => void
}

const TagInput: React.FC<Props> = ({ placeholder, onValueChange }) => {
	const [values, setValues] = useState<string[]>([])
	const inputRef = useRef<HTMLInputElement>(null)
	const tagsRef = useRef<string[]>([])

	useEffect(() => {
		if (onValueChange) {
			onValueChange(tagsRef.current)
		}
	}, [values, onValueChange])

	const addTag = (tag: string) => {
		if (!tagsRef.current.includes(tag)) {
			tagsRef.current.push(tag)
			setValues([...tagsRef.current]) // Trigger re-render for initial render
		}
	}

	const removeTag = (tag: string) => {
		tagsRef.current = tagsRef.current.filter(value => value !== tag)
		setValues([...tagsRef.current]) // Trigger re-render for initial render
	}

	return (
		<div className='flex flex-col'>
			<div className='my-4 flex h-max w-full flex-wrap gap-2'>
				{tagsRef.current.length !== 0 &&
					tagsRef.current.map((v, i) => (
						<Tag key={i} value={v} onClick={() => removeTag(v)} />
					))}
			</div>
			<Input
				ref={inputRef}
				placeholder={placeholder}
				onKeyDown={event => {
					if (event.key === 'Enter' && inputRef.current) {
						addTag(inputRef.current.value)
						inputRef.current.value = ''
					}
				}}
			/>
		</div>
	)
}

const Tag: React.FC<TagProps> = ({ value, onClick }) => {
	return (
		<div className='flex items-center justify-center gap-2 rounded-md bg-muted p-1 text-muted-foreground'>
			<p className='text-md'>{value}</p>
			<XIcon size={15} onClick={onClick} className='text-white cursor-pointer' />
		</div>
	)
}

export default TagInput
