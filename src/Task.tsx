import * as React from 'react'
import { Tasks } from './initialData'
import styled from 'styled-components'

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`

export default function Task({ task }: { task: Tasks[1] }) {
  return <Container>{task.content}</Container>
}
