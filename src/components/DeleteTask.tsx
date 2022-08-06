import { gql, useMutation } from '@apollo/client'
import { TrashIcon } from '@heroicons/react/outline'
import { FC, useState } from 'react'
import Modal from './Modal'

interface DeleteTaskProp {
  taskId: string
  refetch?: () => void
}

const DeleteTask: FC<DeleteTaskProp> = ({ taskId, refetch }) => {
  const [open, setOpen] = useState(false)

  const [DeleteTask] = useMutation(DELETE_TASK, {
    onCompleted: (data) => {
      // console.log('delete', { data })
      refetch()
      setOpen(false)
    },
  })

  const deleteTaskNode = () => {
    DeleteTask({
      variables: { taskId },
    })
  }

  return (
    <>
      <TrashIcon
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
                    className="mb-2 text-lg font-medium leading-6 text-gray-900"
                    id="modal-headline"
                  >
                    Are you sure you want to delete this task?
                  </h3>
                  <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      onClick={deleteTaskNode}
                      className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-picton-blue hover:bg-picton-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-picton-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default DeleteTask

const DELETE_TASK = gql`
  mutation deleteTask($taskId: ID!) {
    deleteTask(taskId: $taskId)
  }
`
