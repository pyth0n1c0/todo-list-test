import { useState, useEffect } from 'react';
import { api } from './services/api.jsx'

import Tabs from './components/Tabs'
import AddTask from './components/AddTask'
import EditTask from './components/EditTask'

export default function TODOList() {
  const [tasks, setTasks] = useState([]);
  const [msg, setMsg] = useState(true);
  const [currentTab, setCurrentTab] = useState('all');

  useEffect(() => {
    const getTaskList = async () => {
      const response = await api.get('/tasks/all');
      if (!response.data.msg) {
        setTasks(response.data.map(data =>
          <EditTask
            key={data.id}
            deleteFromTaskList={deleteFromTaskList}
            currentTab={currentTab}
            {...data}
          />));
        setMsg(false);
      }
    }
    getTaskList();
  }, [])

  const addInTaskList = (data) => {
    setMsg(false);
    setTasks(prevState => [
      ...prevState,
      <EditTask
        key={data.id}
        deleteFromTaskList={deleteFromTaskList}
        currentTab={currentTab}
        {...data}
      />
    ])
  }

  const deleteFromTaskList = (id) => {
    setTasks(prevState => {
      if (prevState.length === 1) {
        setMsg(true);
      }
      return [...prevState.filter(item => item.key != id)];
    })
  }

  const updateTaskList = (tasks, tab) => {
    if (tasks.length > 0) {
      setTasks(
        tasks.map(task =>
          <EditTask
            key={task.id}
            deleteFromTaskList={deleteFromTaskList}
            currentTab={tab}
            {...task}
          />
        )
      )
      setMsg(false)
    } else {
      setMsg(true);
      setTasks(null);
    }
    setCurrentTab(tab)
  }

  return (
    <article className="h-[90%] max-h-[31.25rem] w-[90%] max-w-[31.25rem] bg-bg rounded-lg sm:max-h-[37.5rem]">
      <div className="h-full p-4 sm:px-8">
        <Tabs updateTaskList={updateTaskList}/>
        <h1 className="text-white font-title text-4xl text-center mt-8 mb-10 sm:text-5xl">
          TODO <span className="text-title ml-1">List</span>
        </h1>
        <div className="h-full overflow-y-hidden  px-2 sm:px-4">
        { currentTab === 1
          ? null
          : <AddTask
              addInTaskList={addInTaskList}
              deleteFromTaskList={deleteFromTaskList}
            />
        }
            <div className="h-[40%] flex flex-col items-center gap-4 my-8 py-2 overflow-y-scroll sm:h-[55%]">
              { msg
                ? <div className="text-white font-title text-2xl mt-8">Sem tarefas</div>
                : tasks
              }
            </div>
        </div>
       </div>
    </article>
  )
}
