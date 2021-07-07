import * as React from 'react'
import styled from 'styled-components'
import Task from './Task'
import { Columns, Tasks } from './initialData'
import { Draggable, Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  width: 220px;
  background-color: white;
  display: flex;
  flex-direction: column;
`

const Title = styled.h3`
  padding: 8px;
`

const TaskList = styled.div<{ isDraggingOver: boolean }>`
  flex: 1;
  padding: 8px;
  transition: background-color, 0.2s ease;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? 'lightGrey' : 'inherit'};
  min-height: 100px;
`

const InnerList = React.memo(({ tasks }: { tasks: Tasks[1][] }) => (
  <>
    {tasks.map((task, i) => (
      <Task key={task.id} task={task} index={i} />
    ))}
  </>
))

export default function Column({
  column,
  tasks,
  isDropDisabled,
  index
}: {
  column: Columns[1]
  tasks: Tasks[1][]
  isDropDisabled: boolean
  index: number
}) {
  console.log('col', column)
  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{column.title}</Title>
          <Droppable
            droppableId={column.id}
            // type={column.id === 'column-3' ? 'done' : 'active'}
            isDropDisabled={isDropDisabled}
            type="task"
          >
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <InnerList tasks={tasks} />
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  )
}
