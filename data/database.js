/**
 * Database class
 */
class Database {
    constructor() {
        this.greeting = 'Hello';
        this.name = 'world';
    }


    /**
     * Get current name
     * @returns {string|*}
     */
    getName() {
        return this.name
    }


    /**
     * Get current greeting
     * @returns {string|*}
     */
    getGreeting() {
        return this.greeting
    }


    /**
     * Get message (greeting + name)
     * @returns {string}
     */
    getMessage() {
        return `${this.greeting}, ${this.name}`
    }


    /**
     * Get item (name, greeting, message)
     * @returns {{greeting: string|*, name: string|*, message: string}}
     */
    getItem() {
        return {
            greeting: this.getGreeting(),
            name: this.getName(),
            message: this.getMessage()
        }
    }


    /**
     * Change current name
     * @param newName
     * @returns {string|*}
     */
    changeName(newName) {
        this.name = newName;
        return this.name
    }


    /**
     * Change current greeting
     * @param newGreeting
     * @returns {string|*}
     */
    changeGreeting(newGreeting) {
        this.greeting = newGreeting;
        return this.greeting

    }
}

const my_db = new Database();

module.exports.database = my_db;