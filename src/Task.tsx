import * as React from 'react'
import { Tasks } from './initialData'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div<{ isDragging: boolean; isDragDisabled: boolean }>`
  border: 3px solid lightgrey;
  border-radius: 50%;
  padding: 8px;
  margin-right: 8px;
  background-color: ${({ isDragging, isDragDisabled }) =>
    isDragDisabled ? 'lightGrey' : isDragging ? 'lightGreen' : 'white'};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
    border-color: red;
  }
`

export default function Task({
  task,
  index
}: {
  task: Tasks[1]
  index: number
}) {
  const isDragDisabled = task.id === 'task-1'
  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
        >
          {task.content[0]}
        </Container>
      )}
    </Draggable>
  )
}
