import * as React from 'react'
import { Tasks } from './initialData'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div<{ isDragging: boolean }>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${({ isDragging }) =>
    isDragging ? 'lightGreen' : 'white'};
`

export default function Task({
  task,
  index
}: {
  task: Tasks[1]
  index: number
}) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  )
}
