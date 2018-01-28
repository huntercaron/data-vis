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
      title="Data Vis"
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
    font-size: calc(0.2vw + 46.5%);
    ${'' /* font-size: 62.5%; */}
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

  /* syntax highlighing */

  code[class*="language-"],
  pre[class*="language-"] {
  	color: #666;
  	background: none;
  	text-shadow: 0 1px white;
  	font-family: 'Space Mono', Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  	text-align: left;
  	white-space: pre;
  	word-spacing: normal;
  	word-break: normal;
  	word-wrap: normal;
  	line-height: 1.5;

  	-moz-tab-size: 4;
  	-o-tab-size: 4;
  	tab-size: 4;

  	-webkit-hyphens: none;
  	-moz-hyphens: none;
  	-ms-hyphens: none;
  	hyphens: none;
  }

  pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
  code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
  	text-shadow: none;
  	background: #b3d4fc;
  }

  pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
  code[class*="language-"]::selection, code[class*="language-"] ::selection {
  	text-shadow: none;
  	background: #b3d4fc;
  }

  @media print {
  	code[class*="language-"],
  	pre[class*="language-"] {
  		text-shadow: none;
  	}
  }

  /* Code blocks */
  pre[class*="language-"] {
  	padding: 1em;
  	margin: .5em 0;
  	overflow: auto;
  }

  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
  	background: #f5f2f0;
  }

  /* Inline code */
  :not(pre) > code[class*="language-"] {
  	padding: .1em;
  	border-radius: .3em;
  	white-space: normal;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
  	color: slategray;
  }

  .token.punctuation {
  	color: #999;
  }

  .namespace {
  	opacity: .7;
  }

  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
  	color: #003EAA;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
  	color: #578E00;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
  	color: #a67f59;
  	background: hsla(0, 0%, 100%, .5);
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
  	color: #e33dd3;
  }

  .token.function {
  	color: #0088FF;
  }

  .token.regex,
  .token.important,
  .token.variable {
  	color: #e90;
  }

  .token.important,
  .token.bold {
  	font-weight: bold;
  }
  .token.italic {
  	font-style: italic;
  }

  .token.entity {
  	cursor: help;
  }



`
