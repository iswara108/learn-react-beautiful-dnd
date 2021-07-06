import * as React from 'react'
import initialState, { Columns, Tasks } from './initialData'
import Column from './Column'
import {
  DragDropContext,
  DragStart,
  DropResult,
  ResponderProvided
} from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
`

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

      const start = columns[source.droppableId]
      const finish = columns[destination.droppableId]

      if (start === finish) {
        console.log('match', start, finish)
        const newTaskIds = Array.from(start.taskIds)
        newTaskIds.splice(source.index, 1)
        newTaskIds.splice(destination.index, 0, draggableId)

        const newColumn: Columns[1] = { ...start, taskIds: newTaskIds }
        setColumns({ ...columns, [newColumn.id]: newColumn })
      } else {
        console.log('no match', start, finish)
        const startTaskIds = Array.from(start.taskIds)
        startTaskIds.splice(source.index, 1)

        const newStart = { ...start, taskIds: startTaskIds }

        const finishTaskIds = Array.from(finish.taskIds)
        finishTaskIds.splice(destination.index, 0, draggableId)

        const newFinish = { ...finish, taskIds: finishTaskIds }

        setColumns({
          ...columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        })
      }
    }

  const onDragStart: (initial: DragStart, provided: ResponderProvided) => void =
    (initial, provided) => {}

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Container>
        {columnOrder.map(columnId => {
          const column = columns[columnId]
          const tasksArray = column.taskIds.map(taskId => tasks[taskId])

          return <Column key={column.id} column={column} tasks={tasksArray} />
        })}
      </Container>
    </DragDropContext>
  )
}
