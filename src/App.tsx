import * as React from 'react'
import initialState, { Columns, Tasks } from './initialData'
import Column from './Column'
import {
  DragDropContext,
  DragStart,
  Droppable,
  DropResult,
  ResponderProvided
} from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
`

const InnerList = React.memo(
  ({
    tasksMap,
    column,
    isDropDisabled,
    index
  }: {
    tasksMap: Tasks
    column: Columns[1]
    isDropDisabled: boolean
    index: number
  }) => {
    console.log('rerender', tasksMap, column, isDropDisabled, index)
    const tasksArray = column.taskIds.map(taskId => tasksMap[taskId])

    return (
      <Column
        column={column}
        isDropDisabled={isDropDisabled}
        index={index}
        tasks={tasksArray}
      />
    )
  }
)

export default function App() {
  const [tasks] = React.useState<Tasks>(initialState.tasks)
  const [columns, setColumns] = React.useState<Columns>(initialState.columns)
  const [columnOrder, setColumnOrder] = React.useState(initialState.columnOrder)
  const [homeIndex, setHomeIndex] = React.useState<number | null>(null)

  const onDragEnd: (result: DropResult, provided: ResponderProvided) => void =
    ({ destination, source, draggableId, type }) => {
      setHomeIndex(null)
      // if the object fell off limits
      if (!destination) return

      // if the user dropped the item back where it started
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      )
        return

      if (type === 'column') {
        const newColumnOrder = Array.from(columnOrder)
        newColumnOrder.splice(source.index, 1)
        newColumnOrder.splice(destination.index, 0, draggableId)

        setColumnOrder(newColumnOrder)
        return
      }

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
    (initial, provided) => {
      setHomeIndex(columnOrder.indexOf(initial.source.droppableId))
    }

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {provided => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {columnOrder.map((columnId, i) => {
              const column = columns[columnId]

              const isDropDisabled = homeIndex === null ? false : i < homeIndex
              return (
                <InnerList
                  key={column.id}
                  column={column}
                  tasksMap={tasks}
                  isDropDisabled={isDropDisabled}
                  index={i}
                />
              )
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
}
