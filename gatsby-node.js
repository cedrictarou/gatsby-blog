const path = require(`path`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const blogresult = await graphql(`
    query {
      allContentfulBlogPost(sort: { publishDate: DESC }) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);
  if (blogresult.errors) {
    reporter.panicOnBuild(`GraphQLのクエリエラーが発生しました`);
    return;
  }

  blogresult.data.allContentfulBlogPost.edges.forEach(({ node }) => {
    createPage({
      path: `blog/post/${node.slug}/`,
      component: path.resolve(`./src/templates/blogpost-template.js`),
    });
  });
};