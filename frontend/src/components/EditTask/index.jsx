import { useState, useEffect, useRef } from 'react'
import { api } from '../../services/api.jsx'

import { Delete as DeleteIcon } from '../Icons/Delete'
import { ConfirmEdit as ConfirmEditIcon } from '../Icons/ConfirmEdit'

export default function EditTask({
	completed, content, created_at, id, currentTab,
	deleteFromTaskList = f => f
}) {
	const [isCompleted, setIsCompleted] = useState(completed);
	const [editing, setEditing] = useState(false);
	const checkboxRef = useRef();
	const contentRef = useRef();

	useEffect(() => {
		if (completed) checkboxRef.current.checked = true;
	}, []);

	const deleteTask = async () => {
		await api.delete(`/tasks/${id}`);
		deleteFromTaskList(id);
	}

	const editTask = () => {
		contentRef.current.contentEditable = "true";
		setEditing(true)
	}

	const confirmEdit = async () => {
		const new_content = contentRef.current.innerText;
		const response = await api.put(`/tasks/${id}`, {new_content})
		if (response.status === 200) {
			contentRef.current.contentEditable = "false";
			setEditing(false)
		}
	}

	const cancelEdit = () => {
		setEditing(false);
	}

	const toggleCheckbox = async (e) => {
		setIsCompleted(e.target.checked);
		await api.put(`/tasks/${id}/toggle_status`);
		if (currentTab !== 'all') {
			setTimeout(() => deleteFromTaskList(id), 500)
		}
	}

	return (
		<div className="w-full flex justify-evenly items-center">
			<button>
				<div className="checkbox-wrapper pr-2">
					<input ref={checkboxRef} onClick={toggleCheckbox} className="inp-cbx" id={id} type="checkbox"/>
					<label className="cbx" htmlFor={id}>
						<span>
							<svg width="16" height="10" viewBox="0 0 12 9">
								<polyline points="1 5 4 8 11 1"></polyline>
							</svg>
						</span>
					</label>
				</div>
			</button>
			<div className={`
				w-[65%] px-4 py-1 rounded
				${isCompleted ? 'bg-[#ffffff]/60' : 'bg-white'}
			`}>
				<p onClick={isCompleted ? null : editTask} ref={contentRef} className={`
					text-text font-text
					${editing ? 'cursor-text outline-none bg-slate-100 rounded' : 'truncate'}
					${isCompleted ? 'opacity-80': 'cursor-pointer'}
				`}>
					{ content }
				</p>
				<p className="text-sm text-right text-placeholder">{ created_at }</p>
			</div>
			<button onClick={editing ? confirmEdit : deleteTask} className="cursor-pointer">
				{ editing ?
					<div className="flex items-center gap-2">
						<ConfirmEditIcon />
						<DeleteIcon onclick={cancelEdit} width={25} height={25}/>
					</div>
					: <DeleteIcon width={30} height={30}/> 
				}
			</button>
		</div>
	)
}