class Database {
    constructor() {
        this.greeting = 'Hello';
        this.name = 'world';
    }

    getName() {
        return this.name
    }

    getGreeting() {
        return this.greeting
    }

    getMessage() {
        return `${this.greeting}, ${this.name}`
    }

    getItem() {
        return {
            greeting: this.getGreeting(),
            name: this.getName(),
            message: this.getMessage()
        }
    }

    changeName(newName) {
        this.name = newName;
        return this.name
    }

    changeGreeting(newGreeting) {
        this.greeting = newGreeting;
        return this.greeting

    }
}

const my_db = new Database();

module.exports.database = my_db;