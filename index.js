const metalsmith = require("metalsmith");
require("dotenv").config();

const getData = require("./src/getData/getData");
const processData = require("./src/processData/processData");
// const createComponents = require("./src/components/createComponents");
const createStyleVariables = require("./src/styles/createStyleVariables");
const processTemplate = require("./src/processTemplate/processTemplate");

const config = {
  token: process.env.FIGMA_TOKEN,
  fileKey: process.env.FIGMA_FILE_KEY,
  canvases: 'Components,Desktop',
  useCache: true,
  cacheData: true,
  siteName: 'Site da Enactus',
  sanityID: 'Sanity ID here',
  brandPrimary: '#ce003c',
  siteUrl: 'https://enactusufmg.com.br'
};

metalsmith(__dirname)
  .source("template")
  .destination("output")
  .metadata(config)
  .clean(true)
  .use(getData)
  .use(processData)
  .use(createStyleVariables)
  // .use(createComponents)
  // .use(createCmsSchema)
  .use(processTemplate)
  // Cleaning files that shouldn't go to output
  .use(function(files, metalsmith, done) {
    delete files.data
    delete files['cached.json']
    // delete files['processed.json']
    // console.log(files, metalsmith);
    done();
  })
  .build(function(err) {
    if (err) throw err;
  });
