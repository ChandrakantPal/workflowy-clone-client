import { gql, useMutation } from '@apollo/client'
import { PencilIcon } from '@heroicons/react/outline'
import { FC, FormEvent, useState } from 'react'
import InputGroup from './InputGroup'
import Modal from './Modal'

interface EditTaskProp {
  taskId: string
  body: string
  refetch: () => void
}

export const EditTask: FC<EditTaskProp> = ({ taskId, body, refetch }) => {
  const [editBody, setEditBody] = useState(() => body)
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState('')

  const [TaskEdit] = useMutation(EDIT_TASK, {
    update: (_, data) => {
      console.log(data)
      refetch()
      setEditBody('')
      setOpen(false)
    },
    onError: (err) => {
      console.log(err)
      setErrors(err.graphQLErrors[0].message)
    },
  })

  const createTaskSubmitHandler = (event: FormEvent) => {
    event.preventDefault()
    TaskEdit({
      variables: { taskId, body: editBody },
    })
  }

  return (
    <>
      <PencilIcon
        className="object-contain w-5 mx-1 opacity-50 cursor-pointer md:opacity-0 group-hover:opacity-100"
        onClick={() => setOpen(true)}
      />
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
                    Edit Task
                  </h3>
                  <form onSubmit={createTaskSubmitHandler}>
                    <InputGroup
                      type="text"
                      value={editBody}
                      placeholder="edit task"
                      setValue={setEditBody}
                      error={errors}
                    />
                    <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-picton-blue hover:bg-picton-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-picton-blue sm:ml-3 sm:w-auto sm:text-sm"
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
    </>
  )
}

const EDIT_TASK = gql`
  mutation editTask($taskId: ID!, $body: String!) {
    editTask(taskId: $taskId, body: $body) {
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
