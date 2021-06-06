import { FC } from 'react'
import { SubTask, Task } from '../types'
import { DotsHorizontalIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

interface TaskProps {
  task: Task
}

export const TaskComponent: FC<TaskProps> = ({ task }) => {
  return (
    <div className="flex items-center justify-evenly">
      <DotsHorizontalIcon className="object-contain w-5 mx-1" />
      {task.subTasks.length > 0 && (
        <ChevronRightIcon className="object-contain w-5 mx-1" />
      )}
      <div className="flex items-center justify-center w-4 h-4 bg-gray-300 rounded-full hover:bg-gray-400">
        <Link to={`/task/${task.id}`} className="text-2xl text-black">
          •
        </Link>
      </div>
      <p className="mx-1">{task.body}</p>
    </div>
  )
}
