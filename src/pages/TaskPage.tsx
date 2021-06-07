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
  const { data, loading, error, refetch } = useQuery(GET_TASK, {
    variables: {
      taskId: id,
    },
  })
  console.log({ error, data })

  if (loading) return <p>Loading...</p>
  if (!authenticated) return <Redirect to="/login" />
  return (
    <div className="w-full h-screen mt-20">
      <div className="flex flex-col items-start w-2/3 mx-auto">
        <p className="text-2xl font-bold text-center">
          {data?.getTask.task.body}
        </p>
        {data?.getTask?.subTasks &&
          data?.getTask?.subTasks.map((task: Task) => (
            <TaskComponent key={task.id} task={task} />
          ))}
        <PlusIcon
          className="object-contain w-5"
          onClick={() => setOpen(true)}
        />
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
