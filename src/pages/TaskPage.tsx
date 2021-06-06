import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router'
import { TaskComponent } from '../components/TaskComponent'
import { SubTask } from '../types'

interface ParamTypes {
  id: string
}

const TaskPage = () => {
  const { id } = useParams<ParamTypes>()
  const { data, loading, error } = useQuery(GET_TASK, {
    variables: {
      taskId: id,
    },
  })
  console.log({ data, loading, error })

  return (
    <div className="w-full h-screen mt-20">
      <div className="flex flex-col items-start w-2/3 mx-auto">
        <p className="text-2xl font-bold text-center">{data?.getTask.body}</p>
        {data?.getTask?.subTasks &&
          data.getTask.subTasks.map((task: SubTask) => (
            <p>{task.subTaskTitle}</p>
          ))}
      </div>
    </div>
  )
}

export default TaskPage

const GET_TASK = gql`
  query ($taskId: ID!) {
    getTask(taskId: $taskId) {
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
