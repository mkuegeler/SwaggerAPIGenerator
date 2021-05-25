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
import writeYamlFile from 'write-yaml-file';

// Get general configuration settings
import config from './config.json'

const SourceJson = `${config.main.DataFolder}/${config.main.SourceFile}.json`;
const ResultJson = `${config.main.DataFolder}/${config.main.ResultFile}.json`;
const ResultYaml = `${config.main.DataFolder}/${config.main.ResultFile}.yaml`;

const Description = config.main.Description;
const Version = config.main.Version;

function main() {


  const inFile = fs.readFileSync(SourceJson, 'utf-8');
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
      summary: `${GetDefaults.summary}: ${key}`,
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
  
  fs.writeFile(ResultJson, JSON.stringify(el), err => {
    if (err) {
      console.error(err);
      return
    } else {
      Json2Yaml(ResultYaml, JSON.parse(fs.readFileSync(ResultJson, 'utf-8')));
    }
    //file written successfully
  })

}

function Json2Yaml(f: string, o: object) {
  writeYamlFile(f, o).then(() => {
    console.log('done')
  });
}

main();




