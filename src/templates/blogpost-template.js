import React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronLeft,
  faChevronRight,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";

import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS } from "@contentful/rich-text-types";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

const options = {
  renderNode: {
    [BLOCKS.HEADER_2]: (node, children) => (
      <h2>
        <FontAwesomeIcon icon={faCheckSquare} />
        {children}
      </h2>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <GatsbyImage
        image={node.data.target.gatsbyImageData}
        alt={
          node.data.target.description
            ? node.data.target.description
            : node.data.target.title
        }
      />
    ),
  },
};

export default ({ data, pageContext, location }) => (
  <Layout>
    <Seo
      pagetitle={data.contentfulBlogPost.title}
      pagedesc={`${documentToPlainTextString(
        JSON.parse(data.contentfulBlogPost.content.raw)
      ).slice(0, 70)}...`}
      pagepath={location.pathname}
      pageimg={`https:${data.contentfulBlogPost.eyecatch.file.url}`}
      pageimgw={data.contentfulBlogPost.eyecatch.file.details.image.width}
      pageimgh={data.contentfulBlogPost.eyecatch.file.details.image.height}
    />
    <div>
      <div className='eyecatch'>
        <figure>
          <GatsbyImage
            image={data.contentfulBlogPost.eyecatch.gatsbyImageData}
            alt={data.contentfulBlogPost.eyecatch.description}
          />
        </figure>
      </div>
      <article className='content'>
        <div className='container'>
          <h1 className='bar'>{data.contentfulBlogPost.title}</h1>
          <aside className='info'>
            <time dateTime={data.contentfulBlogPost.publishDate}>
              <FontAwesomeIcon icon={faClock} />
              {data.contentfulBlogPost.publishDateJP}
            </time>
            <div className='cat'>
              <FontAwesomeIcon icon={faFolderOpen} />
              <ul>
                {data.contentfulBlogPost.category.map((cat) => (
                  <li className={cat.categorySlug} key={cat.id}>
                    {cat.category}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <div className='postbody'>
            {renderRichText(data.contentfulBlogPost.content, options)}
          </div>
          <ul className='postlink'>
            {pageContext.next && (
              <li className='prev'>
                <Link to={`/blog/post/${pageContext.next.slug}/`} rel='prev'>
                  <FontAwesomeIcon icon={faChevronLeft} />
                  <span>{pageContext.next.title}</span>
                </Link>
              </li>
            )}
            {pageContext.previous && (
              <li className='next'>
                <Link
                  to={`/blog/post/${pageContext.previous.slug}/`}
                  rel='next'
                >
                  <span>{pageContext.previous.title}</span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </article>
    </div>
  </Layout>
);

export const query = graphql`
  query ($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      title
      publishDateJP: publishDate(formatString: "YYYYY年MM月DD日")
      publishDate
      category {
        category
        categorySlug
        id
      }
      eyecatch {
        gatsbyImageData(layout: FULL_WIDTH)
        description
        file {
          details {
            image {
              width
              height
            }
          }
          url
        }
      }
      content {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            gatsbyImageData(layout: FULL_WIDTH)
            title
            description
          }
        }
      }
    }
  }
`;
