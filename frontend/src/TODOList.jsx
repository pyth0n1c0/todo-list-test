import Abas from './components/Abas'
import AddTask from './components/AddTask'
import EditTask from './components/EditTask'

export default function TODOList() {
  return (
    <article className="h-[90%] max-h-[37.5rem] w-[90%] max-w-[31.25rem] bg-bg rounded-lg">
      <div className="p-4 sm:px-8">
        <Abas />
        <h1 className="
          text-white font-title text-4xl text-center mt-8 mb-10 sm:text-5xl">
          TODO <span className="text-title ml-1">List</span>
        </h1>
        <div className="px-2 sm:px-4">
          <AddTask />
          <div className="flex flex-col items-center my-8">
            <EditTask />
          </div>
        </div>
       </div>
    </article>
  )
}
