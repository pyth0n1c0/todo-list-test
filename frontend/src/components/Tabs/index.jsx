import { useState } from 'react';
import { api } from '../../services/api.jsx'

export default function Tabs({ updateTaskList = f => f}) {
	const [currentTab, setCurrentTab] = useState('all');

	const changeTab = async (tab) => {
		setCurrentTab(tab);
		if (tab === 'all') {
			const response = await api.get('/tasks/all')
			updateTaskList(response.data, tab)
		} else {
			const response = await api.post('/tasks/type', {"completed": tab}, {
				headers: {"content-type": "application/json"}
			});
			updateTaskList(response.data, tab)
		}
	}

	return (
		<div>
			<div className="flex justify-evenly h-full text-white text-xs font-title sm:text-base">
				<div onClick={() => changeTab('all')} className={`flex items-center gap-1 p-0.5 rounded-t-lg cursor-pointer xm:p-1 sm:gap-2 sm:py-1 sm:px-2 ${currentTab === 'all'? 'bg-violet-700' : 'hover:bg-violet-500'}`}><span className="inline-block w-2 h-2 rounded-full bg-violet-600"></span>Todas</div>
				<div className="w-0.5 bg-violet-600 rounded-t sm:w-1"></div>
				<div onClick={() => changeTab(0)} className={`flex items-center gap-1 p-0.5 rounded-t-lg cursor-pointer xm:p-1 sm:gap-2 sm:py-1 sm:px-2 ${currentTab === 0? 'bg-violet-700' : 'hover:bg-violet-500'}`}><span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>Em andamento</div>
				<div className="w-0.5 bg-violet-600 rounded-t sm:w-1"></div>
				<div onClick={() => changeTab(1)} className={`flex items-center gap-1 p-0.5 rounded-t-lg cursor-pointer xm:p-1 sm:gap-2 sm:py-1 sm:px-2 ${currentTab === 1? 'bg-violet-700' : 'hover:bg-violet-500'}`}><span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>Concluídas</div>
			</div>
			<div className="h-0.5 w-full bg-violet-600 rounded sm:h-1"></div>
    </div>
	)
}