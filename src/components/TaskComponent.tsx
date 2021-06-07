import { FC, useEffect, useState } from 'react'
import { Task } from '../types'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PencilIcon,
  CheckIcon,
} from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { gql, useLazyQuery } from '@apollo/client'
import { DeleteTask } from './DeleteTask'

interface TaskProps {
  task: Task
  refetch?: () => void
}

export const TaskComponent: FC<TaskProps> = ({ task, refetch }) => {
  const [expand, setExpand] = useState(false)
  const [subTask, setSubTask] = useState<Task[]>([])
  const [GetSubTasks] = useLazyQuery(GET_SUB_TASKS, {
    onCompleted: (data) => {
      console.log(data)
      setSubTask(data.getSubTasks)
    },
    fetchPolicy: 'cache-and-network',
  })

  const fetchSubTasks = () => {
    GetSubTasks({ variables: { subTaskIds: task.subTasks } })
  }

  useEffect(() => {
    if (expand) {
      GetSubTasks({ variables: { subTaskIds: task.subTasks } })
    }
  }, [GetSubTasks, expand, task.subTasks])

  console.log({ expand, subTask, task })

  return (
    <div className="flex flex-col w-full ml-10">
      <div className="flex items-center group">
        <div className="flex items-center justify-end w-28">
          <DeleteTask taskId={task.id} refetch={refetch} />
          <PencilIcon className="object-contain w-5 mx-1 opacity-0 cursor-pointer group-hover:opacity-100" />
          <CheckIcon className="object-contain w-5 mx-1 opacity-0 cursor-pointer group-hover:opacity-100" />
          {task.subTasks.length > 0 &&
            (expand ? (
              <ChevronDownIcon
                className="object-contain w-5 mx-1 cursor-pointer"
                onClick={() => setExpand((prevExpand) => !prevExpand)}
              />
            ) : (
              <ChevronRightIcon
                className="object-contain w-5 mx-1 cursor-pointer"
                onClick={() => setExpand((prevExpand) => !prevExpand)}
              />
            ))}
        </div>
        <div className="flex items-center justify-center w-4 h-4 bg-gray-300 rounded-full hover:bg-gray-400">
          <Link to={`/task/${task.id}`} className="text-2xl text-black">
            •
          </Link>
        </div>
        <p className="mx-1 justify-items-end">{task.body}</p>
      </div>
      {expand &&
        subTask.length > 0 &&
        subTask.map((item) => (
          <TaskComponent key={item.id} task={item} refetch={fetchSubTasks} />
        ))}
    </div>
  )
}

const GET_SUB_TASKS = gql`
  query getSubTasks($subTaskIds: [IdList!]!) {
    getSubTasks(subTaskIds: $subTaskIds) {
      id
      body
      createdAt
      username
      subTasks {
        subTaskId
        subTaskTitle
      }
    }
  }
`
