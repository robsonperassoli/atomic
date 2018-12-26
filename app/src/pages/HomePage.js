import React from 'react'
import { Segment, Menu } from 'semantic-ui-react'
import styled from 'styled-components'
import { AppLayout } from '../layouts'

const tasks = [1,2,3,4,5,6,7]

const Container = styled.div`
  margin-top: 20px;
`

const HomePage = () => (
    <AppLayout>
      <Container>
        <Menu attached='top' widths={7} size='huge'>
          <Menu.Item name='sunday' active={false} onClick={() => null}>Sun</Menu.Item>
          <Menu.Item name='monday' active={false} onClick={() => null}>Mon</Menu.Item>
          <Menu.Item name='tuesday' active={false} onClick={() => null}>Tue</Menu.Item>
          <Menu.Item name='wednesday' active onClick={() => null}>Wed</Menu.Item>
          <Menu.Item name='thursday' active={false} onClick={() => null}>Thu</Menu.Item>
          <Menu.Item name='friday' active={false} onClick={() => null}>Fri</Menu.Item>
          <Menu.Item name='saturday' active={false} onClick={() => null}>Sat</Menu.Item>
        </Menu>

        {tasks.map((task, i) => (
            <Segment key={task} attached>
              Description {task}
            </Segment>
        ))}

        <Segment attached='bottom'>3:20</Segment>
      </Container>
    </AppLayout>
)

export default HomePage
