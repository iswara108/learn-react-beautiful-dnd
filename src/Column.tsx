import * as React from 'react'
import styled from 'styled-components'
import Task from './Task'
import { Columns, Tasks } from './initialData'
import { Droppable } from 'react-beautiful-dnd'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  width: 220px;

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
    isDraggingOver ? 'skyBlue' : 'white'};
  min-height: 100px;
`

export default function Column({
  column,
  tasks,
  isDropDisabled
}: {
  column: Columns[1]
  tasks: Tasks[1][]
  isDropDisabled: boolean
}) {
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable
        droppableId={column.id}
        // type={column.id === 'column-3' ? 'done' : 'active'}
        isDropDisabled={isDropDisabled}
      >
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, i) => (
              <Task key={task.id} task={task} index={i} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  )
}
