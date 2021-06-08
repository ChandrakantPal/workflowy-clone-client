import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import { Redirect } from 'react-router'

import { PlusIcon } from '@heroicons/react/outline'

import { useAuthState } from '../context/Auth'
import Modal from '../components/Modal'
import { TaskComponent } from '../components/TaskComponent'
import { Task } from '../types'
import AddTask from '../components/AddTask'

const Home = () => {
  const [open, setOpen] = useState(false)
  const { authenticated } = useAuthState()

  const { data, loading, error, refetch } = useQuery(GET_TASKS, {
    fetchPolicy: 'cache-and-network',
  })
  console.log(error)

  if (loading)
    return (
      <p className="flex items-center justify-center w-screen h-screen">
        Loading...
      </p>
    )
  if (!authenticated) return <Redirect to="/login" />
  return (
    <div className="w-full h-screen mt-20">
      <div className="w-full px-4 md:px-0 md:mx-auto md:w-2/3">
        {data?.getTasks?.map((task: Task) => (
          <TaskComponent key={task.id} task={task} refetch={refetch} />
        ))}
        <div className="pl-6 ml-16 md:ml-32">
          <PlusIcon
            className="object-contain w-5 mx-1 cursor-pointer"
            onClick={() => setOpen(true)}
          />
        </div>
      </div>
      {open && (
        <Modal close={() => setOpen(false)}>
          <AddTask type="task" refetch={refetch} setOpen={setOpen} />
        </Modal>
      )}
    </div>
  )
}

export default Home

const GET_TASKS = gql`
  {
    getTasks {
      id
      body
      createdAt
      username
      isDone
      isRoot
      subTasks {
        subTaskId
      }
    }
  }
`
