import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import styled, { injectGlobal } from 'styled-components'
import 'normalize.css'

// importing fonts
import SpaceMonoRegular_eot from "../assets/fonts/SpaceMono-Regular.eot"
import SpaceMonoRegular_woff from "../assets/fonts/SpaceMono-Regular.woff"
import SpaceMonoRegular_woff2 from "../assets/fonts/SpaceMono-Regular.woff2"


/*
  Layout File
  this file is the base of every page
  useful for headers & navs

  this is where global styles/font loading lives
*/


// styled components
const Container = styled.div`
  height: 100%;
`

const InnerContainer = styled.div`
  height: 100%:
`

const TitleLink = styled(Link)`
  color: black;
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    text-decoration: underline;
  }
`

const HeaderContainer = styled.div`
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
`

const Circle = styled.div`
  background-color: white;
  border: 1px solid black;
  height: 30px;
  width: 30px;
  border-radius: 50%;

  transition: background 100ms ease-out;

  &:hover {
    background-color: black;
    border: 1px solid white;
  }
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


// page component
const TemplateWrapper = ({ children }) => (
  <Container>
    <Helmet
      title="boiled"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />

    <Header />

    {/*
      Children() is where your page content is inserted.
    */}
    <InnerContainer>
      {children()}
    </InnerContainer>

  </Container>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper


/* Global Site Styles
 * used for importing fonts and setting up sizes
 * also for default values
 * avoid using for anything else
 */
injectGlobal`
  *, *:before, *:after {
      box-sizing: border-box;
      -webkit-overflow-scrolling: touch;
  }

  html {
  ${'' /* Maybe Try?  font-size: calc(1.25vw + 62.5%); */}
    font-size: 62.5%;
    height: 100%;
  }

  body {
      margin: 0;
      height: 100%;

      font-size: 1.6em;
      line-height: 1.6;
      font-weight: 400;
      font-family: 'Space Mono', 'Helvetica', 'Arial', sans-serif;
      font-variant-ligatures: none;
      color: #222;
      webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      text-rendering: optimizeLegibility;
  }

  #___gatsby {
    height: 100%;
  }

  code {
    font-family: 'Space Mono', 'Helvetica', 'Arial', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Space Mono', 'Helvetica', 'Arial', sans-serif;
    margin-top: 0;
    margin-bottom: 0rem;
    font-weight: 400;
  }

  @font-face {
    font-family: 'Space Mono';
    src: url(${SpaceMonoRegular_eot});
    src: url('${SpaceMonoRegular_eot}?#iefix') format('embedded-opentype'),
      url('${SpaceMonoRegular_woff2}') format('woff2'),
      url('${SpaceMonoRegular_woff}') format('woff');
    font-weight: 400;
    font-style: normal;
    font-stretch: normal;
  }

`
