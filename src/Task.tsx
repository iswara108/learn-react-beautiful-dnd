import * as React from 'react'
import { Tasks } from './initialData'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div<{ isDragging: boolean; isDragDisabled: boolean }>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${({ isDragging, isDragDisabled }) =>
    isDragDisabled ? 'lightGrey' : isDragging ? 'lightGreen' : 'white'};
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
          {task.content}
        </Container>
      )}
    </Draggable>
  )
}
