import * as React from 'react'
import initialState from './initialData'
import Column from './Column'
import {
  DragDropContext,
  DropResult,
  ResponderProvided
} from 'react-beautiful-dnd'

export default function App() {
  const [state, setState] = React.useState(initialState)

  const onDragEnd: (result: DropResult, provided: ResponderProvided) => void =
    result => {}

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.columnOrder.map(columnId => {
        const column = state.columns[columnId]
        const tasks = column.taskIds.map(taskId => state.tasks[taskId])

        return <Column key={column.id} column={column} tasks={tasks} />
      })}
    </DragDropContext>
  )
}
