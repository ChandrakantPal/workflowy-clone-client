import { gql, useMutation } from '@apollo/client'
import { CheckIcon, XIcon } from '@heroicons/react/outline'
import { FC } from 'react'

interface TaskDoneProp {
  taskId: string
  refetch?: () => void
  isDone: boolean
}

const TaskDone: FC<TaskDoneProp> = ({ taskId, refetch, isDone }) => {
  const [MarkDone] = useMutation(TASK_DONE, {
    onCompleted: (data) => {
      // console.log('done', { data })
      refetch()
    },
  })

  const taskdone = () => {
    MarkDone({
      variables: { taskId },
    })
  }
  return (
    <>
      {isDone ? (
        <XIcon
          className="object-contain w-5 mx-1 opacity-50 cursor-pointer md:opacity-0 group-hover:opacity-100"
          onClick={taskdone}
        />
      ) : (
        <CheckIcon
          className="object-contain w-5 mx-1 opacity-50 cursor-pointer md:opacity-0 group-hover:opacity-100"
          onClick={taskdone}
        />
      )}
    </>
  )
}

export default TaskDone

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
