import React from 'react';
import styled from 'styled-components'


// styled-components
const Content = styled.div`
  margin-bottom: 6rem;
  margin-top: 4rem;

  p,h1,h2,h3,h4 {
    max-width: 550px;
    margin: auto;
  }

  h1,h2,h3,h4 {
    margin: 3rem auto 0.8rem auto;
  }

  img {
    max-width: 650px;
    margin: 3rem;
    margin-left: -50px;
  }
`


// page template component
export default function Post({ data }) {
  const post = data.markdownRemark;

  return (
    <div>
      <h3>{post.title}</h3>
      <Content dangerouslySetInnerHTML={{ __html: post.html }}/>
    </div>
  );
};


// template query
export const aboutPageQuery = graphql`
  query PostPage($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
