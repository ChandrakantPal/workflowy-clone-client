import { gql, useMutation } from '@apollo/client'
import { FC, FormEvent, useState } from 'react'
import InputGroup from './InputGroup'

interface AddTaskProp {
  setOpen: (open: boolean) => void
  refetch: () => void
  taskId?: string
  type: 'task' | 'subTask' | 'edit'
}

const AddTask: FC<AddTaskProp> = ({ setOpen, refetch, taskId, type }) => {
  const [newTask, setNewTask] = useState('')
  const [errors, setErrors] = useState('')
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

  const [createSubTask] = useMutation(CREATE_SUBTASK, {
    update: (_, data) => {
      console.log(data)
      refetch()
      setNewTask('')
      setOpen(false)
    },
    onError: (err) => {
      console.log(err)
      setErrors('error while adding task')
    },
  })

  const createTaskSubmitHandler = (event: FormEvent) => {
    event.preventDefault()
    console.log()

    if (type === 'task') {
      createTask({
        variables: { body: newTask },
      })
    }
    if (type === 'subTask' && taskId !== '') {
      createSubTask({
        variables: {
          taskId,
          body: newTask,
        },
      })
    }
  }

  return (
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
              {type === 'task' ? 'Create Task' : 'Create Subtask'}
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
  )
}

export default AddTask

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
const CREATE_SUBTASK = gql`
  mutation createSubTask($taskId: ID!, $body: String!) {
    createSubTask(taskId: $taskId, body: $body) {
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
