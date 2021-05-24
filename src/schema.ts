// Interface defintions
export interface Contact {
    email: string;
}

export const ContactDefault: Contact = {
    email: "hello@example.com"
}

export interface License {
    name: string;
    url: string;
}

export const LicenseDefault: License = {
    name: "Apache 2.0",
    url: "http://www.apache.org/licenses/LICENSE-2.0.html"
}

export interface Info {
    description: string;
    version: string;
    title: string;
    contact: Contact;
    license: License;
}

export const InfoDefault: Info = {
    description: "This is a Swagger API",
    version: "1.0.0",
    title: "API",
    contact: ContactDefault,
    license: LicenseDefault

};

export interface Tags {
    name: string;
    description: string;
}

export const TagsDefault: Tags[] = [{
    name: "developers",
    description: "Operations available to regular developers"
}]


export interface Get {
    tags: string[],
    summary: string,
    operationId: string,
    description: string,
    produces: string[],
    responses: object
}

export const GetDefaults: Get = {
    tags: ["developers"], 
    summary: "displays attributes of element",
    operationId: "attributes-of",
    description:"Passing in options",
    produces: [ "application/json" ],
    responses: {}
};

export interface Paths {
    (name: string, get: Get): object;

}

export const PathsDefault: Paths = function(name:string,get: Get) {
    get.operationId = `${get.operationId}-${name}`;
    get.responses = Responses(name);
    return {[`/${name}`]: { get: get}};
}

export function Responses(p:string) {
    return {
        "200": {
            "description": "result with sample values if any",
            "schema": {
                "$ref": `#/definitions/${p}`
            }
        },
        "400": {
            "description": "bad input parameter"
        }
    };
}

export interface Definitions {
    (name: string, type: string, properties: object): object;

}

export const DefinitionsDefault: Definitions = function(name:string, type:string, properties: object) {
    return {[`${name}`]: { type: type, properties: properties}};
}

export interface Property {
    type: string,
    example: string
}

export interface Properties {
    (name: string, properties: Property): object;

}

export const PropertiesDefault: Properties = function(name:string, properties: Property) {
    return {[`${name}`]: properties};
}



export interface SwaggerInterface {
    swagger: string,
    info: Info,
    tags: Tags[],
    paths: object;
}

// Class definitions
export class SwaggerObjectClass implements SwaggerInterface {
    public swagger: string;
    public info: Info;
    public tags: Tags[];
    public paths: object;
    public definitions: object;
    constructor(
        swagger: string = "2.0",
        info: Info = InfoDefault,
        tags: Tags[] = TagsDefault,
        paths: object = PathsDefault("a",GetDefaults),
        definitions: object = DefinitionsDefault("a","object", {})
    ) {
        this.swagger = swagger;
        this.info = info;
        this.tags = tags;
        this.paths = paths;
        this.definitions = definitions;
    }
}





