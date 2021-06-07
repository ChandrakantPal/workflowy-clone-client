import { gql, useMutation } from '@apollo/client'
import { CheckIcon, XIcon } from '@heroicons/react/outline'
import { FC } from 'react'

interface TaskDoneProp {
  taskId: string
  refetch?: () => void
  isDone: boolean
}

export const TaskDone: FC<TaskDoneProp> = ({ taskId, refetch, isDone }) => {
  const [TaskDone] = useMutation(TASK_DONE, {
    onCompleted: (data) => {
      console.log('done', { data })
      refetch()
    },
  })

  const taskdone = () => {
    TaskDone({
      variables: { taskId },
    })
  }
  return (
    <>
      {isDone ? (
        <XIcon
          className="object-contain w-5 mx-1 opacity-0 cursor-pointer group-hover:opacity-100"
          onClick={taskdone}
        />
      ) : (
        <CheckIcon
          className="object-contain w-5 mx-1 opacity-0 cursor-pointer group-hover:opacity-100"
          onClick={taskdone}
        />
      )}
    </>
  )
}

const TASK_DONE = gql`
  mutation markDone($taskId: ID!) {
    markDone(taskId: $taskId) {
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
