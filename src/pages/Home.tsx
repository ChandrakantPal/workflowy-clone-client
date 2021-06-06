import { gql, useMutation, useQuery } from '@apollo/client'
import { FormEvent, useState } from 'react'
import { Redirect } from 'react-router'

import { PlusIcon } from '@heroicons/react/outline'

import { useAuthState } from '../context/Auth'
import Modal from '../components/Modal'
import InputGroup from '../components/InputGroup'
import { TaskComponent } from '../components/TaskComponent'
import { Task } from '../types'

const Home = () => {
  const [newTask, setNewTask] = useState('')
  const [errors, setErrors] = useState('')
  const [open, setOpen] = useState(false)
  const { authenticated } = useAuthState()

  const { data, loading, error, refetch } = useQuery(GET_TASKS)

  const [createTask] = useMutation(CREATE_TASK, {
    update: (_, data) => {
      console.log(data)
      refetch()
      setNewTask('')
      setOpen(false)
    },
    onError: (err) => {
      console.log(err.graphQLErrors[0].message)
      setErrors('error while adding task')
    },
  })

  const createTaskSubmitHandler = (event: FormEvent) => {
    event.preventDefault()
    createTask({
      variables: { body: newTask },
    })
  }

  if (!authenticated) return <Redirect to="/login" />
  return (
    <div className="w-full h-screen mt-20">
      <div className="flex flex-col items-start w-2/3 mx-auto">
        {data?.getTasks?.map((task: Task) => (
          <TaskComponent task={task} />
        ))}
        <PlusIcon
          className="object-contain w-5"
          onClick={() => setOpen(true)}
        />
      </div>
      {open && (
        <Modal close={() => setOpen(false)}>
          <div
            className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="w-full px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
              <div className="justify-center sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-900"
                    id="modal-headline"
                  >
                    Create Task
                  </h3>
                  <form onSubmit={createTaskSubmitHandler}>
                    <InputGroup
                      type="text"
                      value={newTask}
                      placeholder="add task"
                      setValue={setNewTask}
                      error={errors}
                    />
                    <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setOpen(false)}
                        className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
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
        subTaskTitle
      }
    }
  }
`

const CREATE_TASK = gql`
  mutation createTask($body: String!) {
    createTask(body: $body) {
      id
      body
      createdAt
      username
      isDone
      isRoot
      subTasks {
        subTaskId
        subTaskTitle
      }
    }
  }
`
