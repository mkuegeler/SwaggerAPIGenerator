// Generates Swagger-compatible Json
// 1. run tsc
// 2. node dist/main.js

import { SwaggerObjectClass } from './schema';

function swagger() {

  return new SwaggerObjectClass().info;

}

console.log(swagger());

