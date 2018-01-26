/*
  this is where the pages are generated
*/
const path = require('path');
const fs = require('fs');
const p5Convert = require('p5-global2instance');

const staticImagePath = "./static/assets/";
const sketchPath = "./src/sketches/"
const sketchOutputPath = "./src/sketches/output/"


exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  if (node.internal.mediaType == "image/png" || node.internal.mediaType === `image/jpeg`) {
    if (!fs.existsSync(staticImagePath)){
      fs.mkdirSync(staticImagePath);
    }

    fs.createReadStream("./src/content/" + node.relativePath).pipe(fs.createWriteStream(staticImagePath + node.base));
  }


  if (node.name) {
    if (node.name.includes('p5')) {
      console.log("\n")
      console.log(node.name.slice(0, -3));

      fs.readFile("./src/sketches/" + node.relativePath, 'utf8', (err, data) => {

        let sketch = p5Convert(data);

        fs.writeFile(sketchOutputPath + node.name.slice(0, -3) + '.js', sketch);

      })

    }
  }
  //
  // if (node.name.includes('p5')) {
  //   console.log(node.name);
  // }
}

exports.createPages = ({ boundActionCreators, graphql }) => {
 const { createPage } = boundActionCreators;

 return graphql(`
   {
     allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
       edges {
         node {
           frontmatter {
             templateKey
             path
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
   result.data.allMarkdownRemark.edges.forEach(({ node }) => {
     createPage({
       path: node.frontmatter.path,
       component: path.resolve(`src/templates/${String(node.frontmatter.templateKey)}.js`),
       context: {} // additional data can be passed via context
     });
   });
 });
};
