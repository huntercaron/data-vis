import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Button from '../components/Button'


// styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-left: 2rem;
  padding-top: 7rem;
`

const Subtitle = styled.div`
  text-align: left;
`

const List = styled.ul`

`

const LinkContainer = styled.li`

`

const LinkText = styled(Link)`
  font-style: italic;
  color: black;
  text-transform: capitalize;

  &:hover {
    text-decoration: none;
  }
`

const Col = styled.div`
  padding-bottom: 3rem;
  font-size: 1.8rem;
`


// components
function PageLink(props) {
  return (
    <LinkContainer>
      <LinkText to={props.to}>
        {props.title}
      </LinkText>
    </LinkContainer>
  )
}


// page component
export default function IndexPage({ data }) {
  const pages = data.allMarkdownRemark.edges;
  const sketches = data.allFile.edges;

  return (
    <Container>

      <Col>
        <Subtitle>P5 Sketches:</Subtitle>

        <List>
          {sketches.map( ({ node: page }, i) => (
            <PageLink
              to={page.fields.slug}
              title={page.fields.title}
              key={page.id}
            />
          ))}
        </List>
      </Col>


      <Col>
        <Subtitle>Text Posts:</Subtitle>

        <List>
          {pages.map( ({ node: page }, i) => (
            <PageLink
              to={page.frontmatter.path}
              title={page.frontmatter.title}
              key={page.id}
            />
          ))}
        </List>
      </Col>


    </Container>
  )
}

// data query
export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            path
            date(formatString: "DD MMMM, YYYY")
          }
        }
      }
    }
    allFile (sort: { fields: [birthtime], order: DESC },
      filter: { name: { regex: "/.p5/" }}) {
      edges {
        node {
          name
          id
          birthtime(formatString: "DD MMMM, YYYY")
          fields {
            slug
            title
          }
        }
      }
    }
  }
`;
