/*
  this is where the pages are generated
*/
const path = require("path");
const fs = require("fs");
const p5Convert = require("p5-global2instance");
const { createFilePath } = require(`gatsby-source-filesystem`);

const sketchPath = "./src/sketches/";
const sketchOutputPath = "./src/sketches/output/";

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
	const { createNodeField } = boundActionCreators;

	if (node.name) {
		if (node.name.includes("p5") && node.internal.mediaType === `application/javascript`) {
			fs.readFile(
				"./src/sketches/" + node.relativePath,
				"utf8",
				(err, data) => {
          createNodeField({
            node,
            name: "code",
            value: data
          });

					let sketch = p5Convert(data);
					fs.writeFile(
						sketchOutputPath + node.name.replace(".p5", "") + ".js",
						sketch
					, (err) => { if (err) console.log(err) });
				}
			);
		}
	}

  if (node.internal.type === `MarkdownRemark`) {
  	const slug = createFilePath({ node, getNode, basePath: `content` });
  	createNodeField({
  		node,
  		name: `slug`,
  		value: slug
  	});
  }

};

exports.createPages = ({ boundActionCreators, graphql }) => {
	const { createPage } = boundActionCreators;

	return graphql(`
		{
			allFile(filter: { name: { regex: "/p5/" } }) {
				edges {
					node {
						name
					}
				}
			}
			allMarkdownRemark {
				edges {
					node {
						fields {
							slug
						}
					}
				}
			}
		}
	`).then(result => {

		if (result.errors) {
			result.errors.forEach(e => console.error(e.toString()));
			return Promise.reject(result.errors);
		}

		result.data.allFile.edges.forEach(({ node }) => {
			createPage({
				path: node.name.replace(".p5", ""),
				component: path.resolve(`src/templates/sketch.js`)
			});
		});

		result.data.allMarkdownRemark.edges.forEach(({ node }) => {
			createPage({
				path: node.fields.slug,
				component: path.resolve(`src/templates/post.js`)
			});
		});
	});
};

// exports.createPages = ({ boundActionCreators, graphql }) => {
//  const { createPage } = boundActionCreators;
//
//  return graphql(`
//    {
//      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
//        edges {
//          node {
//            frontmatter {
//              templateKey
//              path
//            }
//          }
//        }
//      }
//    }
//  `).then(result => {
//    if (result.errors) {
//      result.errors.forEach(e => console.error(e.toString()));
//      return Promise.reject(result.errors);
//    }
//    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
//      createPage({
//        path: node.frontmatter.path,
//        component: path.resolve(`src/templates/${String(node.frontmatter.templateKey)}.js`),
//        context: {} // additional data can be passed via context
//      });
//    });
//  });
// };
