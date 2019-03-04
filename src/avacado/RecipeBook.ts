/**
 * @param  {string} name
 * @param  {Date} date
 */

export default class RecipeBook {

    date: Date
    name: string

    constructor(date: Date, name: string) {
        this.date = date
        this.name = name
    }

    greeting() {
        return `Recipe Book: ${this.name}, Created: ${this.date.toLocaleDateString()}`
    }
    
}