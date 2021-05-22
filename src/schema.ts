// Interface defintions
export interface Contact {
    email: string;
}

const ContactDefault: Contact = {
    email: "hello@example.com"
}

export interface License {
    name: string;
    url: string;
}

const LicenseDefault: License = {
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

const InfoDefault: Info = {
    description: "This is a Swagger API",
    version: "1.0.0",
    title: "API",
    contact: ContactDefault,
    license: LicenseDefault

};

export interface SwaggerInterface {
    swagger: string;
    info: Info;
}

// Class definitions
export class SwaggerObjectClass implements SwaggerInterface {
    public swagger: string;
    public info: Info;
    constructor(swagger: string = "2.0", info: Info = InfoDefault) {
        this.swagger = swagger;
        this.info = info;
    }
}





