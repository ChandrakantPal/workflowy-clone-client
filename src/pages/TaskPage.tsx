import { gql, useQuery } from '@apollo/client'
import { PlusIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { Redirect, useParams } from 'react-router'
import AddTask from '../components/AddTask'
import Modal from '../components/Modal'
import { TaskComponent } from '../components/TaskComponent'
import { useAuthState } from '../context/Auth'
import { Task } from '../types'

interface ParamTypes {
  id: string
}

const TaskPage = () => {
  const [open, setOpen] = useState(false)
  const { authenticated } = useAuthState()

  const { id } = useParams<ParamTypes>()
  console.log({ id })

  const { data, loading, error, refetch } = useQuery(GET_TASK, {
    variables: {
      taskId: id,
    },
    fetchPolicy: 'cache-and-network',
  })
  console.log({ error, data })

  if (loading)
    return (
      <p className="flex items-center justify-center w-screen h-screen">
        Loading...
      </p>
    )

  if (error) {
    return `Error ${error}`
  }

  if (!authenticated) return <Redirect to="/login" />
  return (
    <div className="w-full h-screen mt-20">
      <div className="w-full px-4 md:px-0 md:mx-auto md:w-2/3">
        <p className="pl-8 text-xl font-bold text-left md:text-2xl md:pl-32">
          {data?.getTask.task.body}
        </p>
        {data?.getTask?.subTasks &&
          data?.getTask?.subTasks.map((task: Task) => (
            <TaskComponent key={task.id} task={task} refetch={refetch} />
          ))}
        <div className="pl-6 ml-16 md:pl-2 md:ml-36">
          <PlusIcon
            className="object-contain w-5 mx-1 cursor-pointer"
            onClick={() => setOpen(true)}
          />
        </div>
      </div>
      {open && id !== '' && (
        <Modal close={() => setOpen(false)}>
          <AddTask
            type="subTask"
            refetch={refetch}
            setOpen={setOpen}
            taskId={id}
          />
        </Modal>
      )}
    </div>
  )
}

export default TaskPage

const GET_TASK = gql`
  query ($taskId: ID!) {
    getTask(taskId: $taskId) {
      task {
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
      subTasks {
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
  }
`
