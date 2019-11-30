import Router from "./router";
import Nav from "./nav";

class App {

    router: Router;
    nav: Nav;

    constructor() {
        this.router = new Router();
        this.nav = new Nav();
    }

}

const app = new App();