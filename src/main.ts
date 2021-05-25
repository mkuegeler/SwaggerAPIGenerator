// SwaggerAPIGenerator
// Generates Swagger-compatible Yaml in TypeScript
// 1. run tsc
// 2. node dist/main.js
// or just 'npm run build'

import {
  InfoDefault, TagsDefault,
  PathsDefault, GetDefaults, Get, DefinitionsDefault,
  PropertiesDefault, SwaggerObjectClass
} from './schema';
import * as fs from 'fs';

// Get general configuration settings
import config from './config.json'

// const DataFolder = config.DataFolder;
const SourceFile = `${config.main.DataFolder}/${config.main.SourceFile}`;
const ResultFile = `${config.main.DataFolder}/${config.main.ResultFile}`;
const Description = config.main.Description;
const Version = config.main.Version;

function Swaggerize() {


  const inFile = fs.readFileSync(SourceFile,'utf-8');
  const inJson = JSON.parse(inFile);

  let swg = Version;
  let info = InfoDefault;
  info.description = Description;
  let tags = TagsDefault;

  let ElementList = {};
  let DefinitionsList = {};
  let AttributesList = {};


  let get: Get;

  // Looping through JSON
  for (const key in inJson) {
    var attributes = inJson[key as keyof typeof inJson];
    get = {
      tags: GetDefaults.tags,
      summary: GetDefaults.summary,
      operationId: GetDefaults.operationId,
      description: GetDefaults.description,
      produces: GetDefaults.produces,
      responses: GetDefaults.responses
    };
    ElementList = Object.assign(ElementList, PathsDefault(key, get));

    for (const a in attributes) {
      AttributesList = Object.assign(AttributesList, PropertiesDefault(a, {
        type: "string",
        example: attributes[a as keyof typeof attributes]
      }))
    }
    DefinitionsList = Object.assign(DefinitionsList, DefinitionsDefault(key, "object", AttributesList));
    AttributesList = {};

  }

  let el = new SwaggerObjectClass(swg, info, tags, ElementList, DefinitionsList);

  fs.writeFile(ResultFile, JSON.stringify(el), err => {
    if (err) {
      console.error(err);
      return
    } 
    //file written successfully
  })

}

Swaggerize();

