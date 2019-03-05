import { MeasurementType } from './MeasurementType'
import { PortionType } from './PortionType'
import { Ingredient } from './Ingredient';
import { isArray } from 'util';
/**
 * @param  {string} name
 * @param  {Array<Ingredient>} ingredients
 * @param  {string} instructions
 * @param  {string} description?
 */
export class Recipe {

    id: string
    ingredients: Array<Ingredient>
    name: string
    description: string
    instructions: string
    [key: string]: any;

    constructor(id: string, name: string, ingredients: Array<Ingredient>, instructions: string, description?: string) {
        this.id = id
        this.name = name
        this.ingredients = ingredients
        this.instructions = instructions
        this.description = description || ''
    }

    addIngredient(ingredient: Ingredient): void {
        this.ingredients.push(ingredient)
    }

    removeIngredient(index: number): any {
        let removed = this.ingredients.splice(index, 1)[0]
        return {
            removed,
            ingredients: this.ingredients
        }
    }

    setIngredients(ingredients: Array<Ingredient> | Ingredient): void {
        if (isArray(ingredients)) {
            this.ingredients = ingredients
        } else {
            this.ingredients = [ingredients]
        }
    }
    


}