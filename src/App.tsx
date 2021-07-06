import * as React from 'react'
import initialState from './initialData'
import Column from './Column'

export default function App() {
  const [state, setState] = React.useState(initialState)

  return (
    <>
      {state.columnOrder.map(columnId => {
        const column = state.columns[columnId]
        const tasks = column.taskIds.map(taskId => state.tasks[taskId])

        return <Column key={column.id} column={column} tasks={tasks} />
      })}
    </>
  )
}
