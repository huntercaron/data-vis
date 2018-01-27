import React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  position: fixed;
  top: 2%;
  left: 2%;
`

const Circle = styled.div`
  background-color: white;
  border: 1px solid black;
  height: 30px;
  width: 30px;
  border-radius: 50%;
`


// components
function Header () {
  return (
    <HeaderContainer>
      <TitleLink to="/">
          <Circle/>
      </TitleLink>
    </HeaderContainer>
  )
}
