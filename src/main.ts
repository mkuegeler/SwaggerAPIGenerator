// SwaggerAPIGenerator
// Generates Swagger-compatible Yaml in TypeScript
// 1. run tsc
// 2. node dist/main.js
// or just 'npm run build'

import { InfoDefault, SwaggerObjectClass } from './schema';
import * as fs from "fs";

function swagger() {

  let info = InfoDefault;
  info.description = "My new API";
  let el = new SwaggerObjectClass("1.0", info);

  const file: string = './out/data.json'

  fs.writeFile(file, JSON.stringify(el), err => {
    if (err) {
      console.error(err);
      return
    }
    //file written successfully
  })

}
swagger();

