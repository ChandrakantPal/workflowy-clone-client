import { FC, useEffect, useState } from 'react'
import { Task } from '../types'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { gql, useLazyQuery } from '@apollo/client'
import { DeleteTask } from './DeleteTask'
import classNames from 'classnames'
import { TaskDone } from './TaskDone'
import { EditTask } from './EditTask'

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
    <div className="flex flex-col flex-wrap w-full ml-2 md:ml-10">
      <div className="flex items-center group">
        <div className="flex items-center justify-start w-auto md:justify-end md:w-28">
          <DeleteTask taskId={task.id} refetch={refetch} />
          <EditTask taskId={task.id} refetch={refetch} body={task.body} />
          <TaskDone taskId={task.id} refetch={refetch} isDone={task.isDone} />
          {task.subTasks.length > 0 &&
            (expand ? (
              <ChevronDownIcon
                className="object-contain w-3 mx-0.5 md:w-5 md:mx-1 cursor-pointer"
                onClick={() => setExpand((prevExpand) => !prevExpand)}
              />
            ) : (
              <ChevronRightIcon
                className="object-contain w-3 mx-0.5 md:w-5 md:mx-1 cursor-pointer"
                onClick={() => setExpand((prevExpand) => !prevExpand)}
              />
            ))}
        </div>
        <div className="flex items-center justify-center w-3 h-3 bg-gray-300 rounded-full md:w-4 md:h-4 hover:bg-gray-400">
          <Link to={`/task/${task.id}`} className="text-black md:text-2xl">
            •
          </Link>
        </div>
        <p
          className={classNames(
            'mx-1 md:justify-items-end justify-items-start md:text-base text-xs',
            {
              'line-through': task.isDone,
            }
          )}
        >
          {task.body}
        </p>
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
      isDone
      isRoot
      subTasks {
        subTaskId
        # subTaskTitle
      }
    }
  }
`
