// SwaggerAPIGenerator
// Generates Swagger-compatible Yaml in TypeScript
// 1. run tsc
// 2. node dist/main.js
// or just 'npm run build'

import { InfoDefault, TagsDefault, PathsDefault, GetDefaults, Get, SwaggerObjectClass } from './schema';
import * as fs from "fs";
import svg from './svg.json';

function swagger() {

  let swg = "swagger";
  let info = InfoDefault;
  info.description = "My new API";
  let tags = TagsDefault;
   
  let ElementList = {};
  // let newList = {};
      // var clone1: Get = {
      //   tags: GetDefaults.tags,
      //   summary: GetDefaults.summary,
      //   operationId: GetDefaults.operationId,
      //   description: GetDefaults.description,
      //   produces: GetDefaults.produces,
      //   responses: GetDefaults.responses
      // }; 

      // ElementList = Object.assign(ElementList, PathsDefault("a",clone1));

      // var clone2: Get = {
      //   tags: GetDefaults.tags,
      //   summary: GetDefaults.summary,
      //   operationId: GetDefaults.operationId,
      //   description: GetDefaults.description,
      //   produces: GetDefaults.produces,
      //   responses: GetDefaults.responses
      // }; 
      // ElementList = Object.assign(ElementList, PathsDefault("animate",clone2));

      // var clone3: Get = {
      //   tags: GetDefaults.tags,
      //   summary: GetDefaults.summary,
      //   operationId: GetDefaults.operationId,
      //   description: GetDefaults.description,
      //   produces: GetDefaults.produces,
      //   responses: GetDefaults.responses
      // }; 
      // ElementList = Object.assign(ElementList, PathsDefault("animateMotion",clone3));
   
  // animateMotion
  // let el = new SwaggerObjectClass();

  const file: string = './out/data.json';
  let get: Get;

  // Looping through JSON
  for (const key in svg) {
     // console.log(key);
    // if (key === 'a') {
      // var n = svg[key as keyof typeof svg];
      get = {
        tags: GetDefaults.tags,
        summary: GetDefaults.summary,
        operationId: GetDefaults.operationId,
        description: GetDefaults.description,
        produces: GetDefaults.produces,
        responses: GetDefaults.responses
      }; 

      ElementList = Object.assign(ElementList, PathsDefault(key,get));
    //}
  }

  let el = new SwaggerObjectClass(swg, info,tags, ElementList);

  fs.writeFile(file, JSON.stringify(el), err => {
    if (err) {
      console.error(err);
      return
    }
    //file written successfully
  })

}

// console.log(svg.a);

swagger();

