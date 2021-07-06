import * as React from 'react'
import styled from 'styled-components'
import Task from './Task'
import { Columns, Tasks } from './initialData'
const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
`

const Title = styled.h3`
  padding: 8px;
`

const TaskList = styled.div`
  padding: 8px;
`

export default function Column({
  column,
  tasks
}: {
  column: Columns[1]
  tasks: Tasks[1][]
}) {
  return (
    <Container>
      <Title>{column.title}</Title>
      <TaskList>
        {tasks.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </TaskList>
    </Container>
  )
}
