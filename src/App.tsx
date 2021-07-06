import * as React from 'react'
import initialState, { Columns, Tasks } from './initialData'
import Column from './Column'
import {
  DragDropContext,
  DragStart,
  DropResult,
  ResponderProvided
} from 'react-beautiful-dnd'

export default function App() {
  const [tasks] = React.useState<Tasks>(initialState.tasks)
  const [columns, setColumns] = React.useState<Columns>(initialState.columns)
  const [columnOrder] = React.useState(initialState.columnOrder)

  const onDragEnd: (result: DropResult, provided: ResponderProvided) => void =
    ({ destination, source, draggableId }) => {
      // if the object fell off limits
      if (!destination) return

      // if the user dropped the item back where it started
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      )
        return

      const column = columns[source.droppableId]
      const newTaskIds = Array.from(column.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn: Columns[1] = { ...column, taskIds: newTaskIds }
      setColumns({ ...columns, [newColumn.id]: newColumn })
    }

  const onDragStart: (initial: DragStart, provided: ResponderProvided) => void =
    (initial, provided) => {}

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      {columnOrder.map(columnId => {
        const column = columns[columnId]
        const tasksArray = column.taskIds.map(taskId => tasks[taskId])

        return <Column key={column.id} column={column} tasks={tasksArray} />
      })}
    </DragDropContext>
  )
}
