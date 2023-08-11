import { Add as AddIcon } from '../Icons/Add';

export default function AddTask() {
	return (
		<div className="flex items-center gap-2">
			<input className="
				w-[90%] p-2 font-text text-base text-text rounded outline-none 
				placeholder:text-placeholder placeholder:text-sm
				sm:p-3 sm:text-lg sm:placeholder:text-base"
				type="text" placeholder="Digite a tarefa..."/>
			<button className="bg-emphasis p-3 rounded-lg hover:bg-title sm:flex items-center gap-2 text-white font-title sm:after:content-['Adicionar']">
				<AddIcon width="20" height="20"/>
			</button>
		</div>
	)
}