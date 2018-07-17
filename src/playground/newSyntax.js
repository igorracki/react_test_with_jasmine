class OldSyntax {
    constructor() {
        this.name = "jim";
        this.getGreeting = this.getGreeting.bind(this);
    }

    getGreeting() {
        return `Hi, my name is ${this.name}`;
    }
}

const oldSyntax = new OldSyntax();
const getGreeting = oldSyntax.getGreeting;
console.log(getGreeting());

// ----------
class NewSyntax {
    name = 'jim';

    getGreeting = () => {
        return `Hi, my name is ${this.name}`;
    }
}

const newSyntax = new NewSyntax();
const newGreeting = newSyntax.getGreeting;
console.log(newGreeting());