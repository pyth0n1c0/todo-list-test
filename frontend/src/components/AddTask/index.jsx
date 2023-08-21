import { useRef } from 'react';
import { api } from '../../services/api.jsx';
import { Add as AddIcon } from '../Icons/Add';

export default function AddTask({
	addInTaskList = f => f,
}) {
	const inputRef = useRef();

	const addTask = async () => {
		const content = inputRef.current.value;
		try {
			const response = await api.post('/tasks', {content});
			inputRef.current.value = '';
			addInTaskList(response.data);
		} catch  {
			//
		}
	}

	return (
		<div className="flex items-center gap-2">
			<input ref={inputRef} className="
				w-[90%] p-2 font-text text-base text-text rounded outline-none 
				placeholder:text-placeholder placeholder:text-sm
				sm:p-3 sm:text-lg sm:placeholder:text-base"
				type="text" placeholder="Digite a tarefa..."/>
			<button onClick={addTask} className="bg-emphasis p-3 rounded-lg hover:bg-title sm:flex items-center gap-2 text-white font-title sm:after:content-['Adicionar']">
				<AddIcon width="20" height="20"/>
			</button>
		</div>
	)
}