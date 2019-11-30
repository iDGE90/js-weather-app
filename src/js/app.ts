class App {

    name = 'Igor';

    constructor() {
        console.log(this.hello());
    }

    hello(): string {
        return 'Hello ' + this.name;
    }

}

const app = new App();