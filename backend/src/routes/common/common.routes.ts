import express from 'express';

export abstract class CommonRoutesConfig {

    app: express.Application;
    name: String;
    router: express.Router;

    constructor(app: express.Application, name: String) {
        this.app = app;
        this.name = name;
        this.router = express.Router();
        this.configureRoutes(this.router);
    }

    getName(): String {
        return this.name;
    }

    abstract configureRoutes(router: express.Router): express.Application;

}