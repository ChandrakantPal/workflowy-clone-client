import { FC, useEffect, useState } from 'react'
import { Task } from '../types'
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { gql, useLazyQuery } from '@apollo/client'
import DeleteTask from './DeleteTask'
import classNames from 'classnames'
import TaskDone from './TaskDone'
import EditTask from './EditTask'

interface TaskProps {
  task: Task
  refetch?: () => void
}

export const TaskComponent: FC<TaskProps> = ({ task, refetch }) => {
  const [expand, setExpand] = useState(false)
  const [subTask, setSubTask] = useState<Task[]>([])
  const [GetSubTasks] = useLazyQuery(GET_SUB_TASKS, {
    onCompleted: (data) => {
      // console.log(data)
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

  // console.log({ expand, subTask, task })

  return (
    <div className="flex flex-col mb-2 ml-8 md:w-full md:ml-12">
      <div className="flex flex-wrap items-center group">
        <div className="flex items-center w-auto justify-evenly md:justify-end md:w-28">
          <DeleteTask taskId={task.id} refetch={refetch} />
          <EditTask taskId={task.id} refetch={refetch} body={task.body} />
          <TaskDone taskId={task.id} refetch={refetch} isDone={task.isDone} />
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
          <Link to={`/task/${task.id}`} className="text-black md:text-2xl">
            •
          </Link>
        </div>
        <p
          className={classNames(
            'mx-1 md:justify-items-end justify-items-start md:text-base text-sm flex-1',
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
