import { Recipe } from './Recipe'
export class RecipeBook {

    name: string
    recipes: Array<Recipe>

    constructor(name: string, recipes: Array<Recipe>) {
        this.name = name
        this.recipes = recipes
    }

    greeting() {
        return `Recipe Book: ${this.name}, Created: ${new Date().toLocaleDateString()}`
    }
    
}