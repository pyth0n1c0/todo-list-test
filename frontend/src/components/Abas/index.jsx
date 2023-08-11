export default function Abas() {
	return (
		<>
			<div className="flex justify-evenly h-full text-white text-xs font-title sm:text-base">
				<div className="flex items-center gap-1 p-0.5 rounded-t-lg bg-violet-700 xm:p-1 sm:gap-2 sm:py-1 sm:px-2"><span className="inline-block w-2 h-2 rounded-full bg-violet-600"></span>Todas</div>
				<div className="w-0.5 bg-violet-600 rounded-t sm:w-1"></div>
				<div className="flex items-center gap-1 p-0.5 rounded-t-lg xm:p-1 sm:gap-2 sm:py-1 sm:px-2"><span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>Em andamento</div>
				<div className="w-0.5 bg-violet-600 rounded-t sm:w-1"></div>
				<div className="flex items-center gap-1 p-0.5 rounded-t-lg xm:p-1 sm:gap-2 sm:py-1 sm:px-2"><span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>Concluídas</div>
			</div>
			<div className="h-0.5 w-full bg-violet-600 rounded sm:h-1"></div>
    </>
	)
}