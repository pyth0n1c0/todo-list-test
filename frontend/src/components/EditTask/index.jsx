import { Delete as DeleteIcon } from '../Icons/Delete'

export default function EditTask() {
	return (
		<div className="w-full flex justify-center items-center gap-4 ">
			<div className="checkbox-wrapper">
				<input className="inp-cbx" id="cbx" type="checkbox"/>
				<label className="cbx" htmlFor="cbx">
					<span>
						<svg width="16" height="10" viewBox="0 0 12 9">
							<polyline points="1 5 4 8 11 1"></polyline>
						</svg>
					</span>
				</label>
			</div>
			<div className="w-[65%] px-4 py-1 rounded bg-white">
				<p className="text-text font-text truncate">Nome da tarefa fica aqui porra, vai se fuder</p>
				<p className="text-sm text-right text-placeholder">10/08/23</p>
			</div>
			<div className="cursor-pointer fill-[#f20c0c]">
				<DeleteIcon width={30} height={30}/>
			</div>	
		</div>
	)
}