/*
  this is where the pages are generated
*/
const path = require("path");
const fs = require("fs");
const p5Convert = require("p5-global2instance");
const babel = require("babel-core");
const { createFilePath } = require(`gatsby-source-filesystem`);

const sketchPath = "./src/sketches/";
const sketchOutputPath = "./src/sketches/output/";

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
	const { createNodeField } = boundActionCreators;

	if (node.name) {
		if (node.name.includes("p5") && node.internal.mediaType === `application/javascript`) {

      createNodeField({
    		node,
    		name: `slug`,
    		value: node.name.replace(".p5", "")
    	});

			fs.readFile("./src/sketches/" + node.relativePath, "utf8",(err, data) => {
          createNodeField({
            node,
            name: "code",
            value: data
          });

					let firstLine = data.split('\n')[0];

					if (firstLine.includes("TITLE:")) {
						createNodeField({
							node,
							name: `title`,
							value: firstLine.substring(firstLine.indexOf("TITLE:") + 7)
						});
					} else {
						createNodeField({
							node,
							name: `title`,
							value: node.name.replace(".p5", "")
							//maybe use .replace(/-/g, " ")
						});
					}
					
					let transformedData = babel.transform(data, { "presets": ["env"] }).code;

					let sketch = p5Convert(transformedData);

					
					
					fs.writeFile(
						sketchOutputPath + node.name.replace(".p5", "") + ".js",
						sketch
					, (err) => { if (err) console.log(err) });
				}
			);
		}
	}

  if (node.internal.type === `MarkdownRemark`) {
  	let slug = createFilePath({ node, getNode, basePath: `content` });
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
            fields {
              slug
            }
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
				path: node.fields.slug,
				component: path.resolve(`src/templates/sketch.js`),
        context: {
          slug: node.fields.slug
        }
			});
		});

		result.data.allMarkdownRemark.edges.forEach(({ node }) => {
			createPage({
				path: node.fields.slug,
				component: path.resolve(`src/templates/post.js`),
        context: {
          slug: node.fields.slug
        }
			});
		});
	});
};


exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === "build-html") {
    config.loader("null", {
      test: /p5/,
      loader: "null-loader",
    });
  }
};
