export function rabinKarpSearch(text: string, pattern: string): boolean {
	const prime: number = 101
	const textLength: number = text.length
	const patternLength: number = pattern.length
	const patternHash: number = hash(pattern)
	let textHash: number = hash(text.slice(0, patternLength))
	for (let i = 0; i <= textLength - patternLength; i++) {
		if (textHash === patternHash && text.slice(i, i + patternLength) === pattern) {
			return true
		}
		textHash = rehash(text, textHash, i, patternLength, prime)
	}
	return false
}

function hash(str: string): number {
	let hashValue: number = 0
	const prime: number = 101
	for (let i = 0; i < str.length; i++) {
		hashValue += str.charCodeAt(i) * Math.pow(prime, i)
	}
	return hashValue
}

function rehash(text: string, prevHash: number, startIndex: number, patternLength: number, prime: number): number {
	const newHash: number = (prevHash - text.charCodeAt(startIndex)) / prime
	const newCharIndex: number = startIndex + patternLength
	const newHashValue: number = newHash + text.charCodeAt(newCharIndex) * Math.pow(prime, patternLength - 1)
	return newHashValue
}
