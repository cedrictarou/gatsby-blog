import React from "react";
import Layout from "../components/layout";
import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Seo from "../components/seo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const BlogTemp = ({ data, location, pageContext }) => (
  <Layout>
    <Seo
      pagetitle='ブログ'
      pagedesc='ESSENTIALSのブログです'
      patepath={location.pathname}
    />
    <section className='content bloglist'>
      <div className='container'>
        <h1 className='bar'>RECENT POSTS</h1>
        <div className='posts'>
          {data.allContentfulBlogPost.edges.map(({ node }) => (
            <article className='post' key={node.id}>
              <Link to={`/blog/post/${node.slug}/`}>
                <figure>
                  <GatsbyImage
                    image={node.eyecatch.gatsbyImageData}
                    style={{ height: "100%" }}
                    alt={node.description}
                  />
                </figure>
                <h3>{node.title}</h3>
              </Link>
            </article>
          ))}
        </div>

        <ul className='pagenation'>
          {!pageContext.isFirst && (
            <li className='prev'>
              <Link
                to={
                  pageContext.currentPage === 2
                    ? `/blog/`
                    : `/blog/${pageContext.currentPage - 1}`
                }
                rel='prev'
              >
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>前のページ</span>
              </Link>
            </li>
          )}
          {!pageContext.isLast && (
            <li className='next'>
              <Link to={`/blog/${pageContext.currentPage + 1}`} rel='next'>
                <span>次のページ</span>
                <FontAwesomeIcon icon={faChevronRight} />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </section>
  </Layout>
);

export const query = graphql`
  query ($skip: Int!, $limit: Int!) {
    allContentfulBlogPost(
      sort: { publishDate: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          title
          id
          eyecatch {
            gatsbyImageData(layout: CONSTRAINED, width: 500, height: 200)
            description
          }
          slug
        }
      }
    }
  }
`;
export default BlogTemp;
