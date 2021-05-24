// SwaggerAPIGenerator
// Generates Swagger-compatible Yaml in TypeScript
// 1. run tsc
// 2. node dist/main.js
// or just 'npm run build'

import { InfoDefault, TagsDefault, 
           PathsDefault, GetDefaults, Get, DefinitionsDefault, 
                  PropertiesDefault, SwaggerObjectClass } from './schema';
import * as fs from "fs";
import svg from './svg.json';

function swagger() {

  let swg = "swagger";
  let info = InfoDefault;
  info.description = "My new API";
  let tags = TagsDefault;
   
  let ElementList = {};
  let DefinitionsList = {};
  let AttributesList = {};
  
  const file: string = './out/data.json';
  let get: Get;

  // Looping through JSON
  for (const key in svg) {
      var attributes = svg[key as keyof typeof svg];
      get = {
        tags: GetDefaults.tags,
        summary: GetDefaults.summary,
        operationId: GetDefaults.operationId,
        description: GetDefaults.description,
        produces: GetDefaults.produces,
        responses: GetDefaults.responses
      }; 
      ElementList = Object.assign(ElementList, PathsDefault(key,get));

      for (const a in attributes) {
        AttributesList = Object.assign(AttributesList, PropertiesDefault(a, {type:"string", 
               example: attributes[a as keyof typeof attributes]}))
      }
      DefinitionsList = Object.assign(DefinitionsList, DefinitionsDefault(key,"object", AttributesList));
      AttributesList = {};
   
  }

  let el = new SwaggerObjectClass(swg, info,tags, ElementList, DefinitionsList);

  fs.writeFile(file, JSON.stringify(el), err => {
    if (err) {
      console.error(err);
      return
    }
    //file written successfully
  })

}

swagger();

