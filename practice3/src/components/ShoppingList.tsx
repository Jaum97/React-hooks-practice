import React, { useReducer, useRef } from 'react'

const ShoppingList: React.FC = () => {
	const inputRef: React.MutableRefObject<any> = useRef()
	const [list, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case 'add':
				return [...state, { id: state.length, name: action.name }]
			case 'remove':
				return state.filter((item: any, index: any) => index !== action.index)
			case 'clear':
				return []
			default:
				return state
		}
	}, [])

	function handleSubmit(event: any) {
		event.preventDefault()
		dispatch({
			type: 'add',
			name: inputRef.current.value
		})
		inputRef.current.value = null
	}
	return (
		<>
			<form onSubmit={handleSubmit}>
				<input ref={inputRef} />
			</form>
			<button onClick={() => dispatch({ type: 'clear' })}>clear</button>
			<ul>
				{list.map((item: any, index: any) => (
					<li key={item.id}>
						{item.name}
						<button onClick={() => dispatch({ type: 'remove', index })}>x</button>
					</li>
				))}
			</ul>
		</>
	)
}

export default ShoppingList
