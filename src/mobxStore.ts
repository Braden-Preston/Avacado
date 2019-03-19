import keys from './keys'
import firebase from 'firebase';
import { initFirestorter, Collection, Document } from 'firestorter';
import { RecipeBook, Recipe, Ingredient } from './avacado';
import { observable, action, isObservable, computed, toJS } from 'mobx'
import 'firebase/firestore';

// Start Firebase with Config
firebase.initializeApp(keys.firebase);

// Start MobX Observers of Firestore
initFirestorter({ firebase: firebase });

const a = new Ingredient(1, 'cup', 'cocoa')
const b = new Ingredient(2, 'pinch', 'cinnamon')
const c = new Ingredient(3, 'tbsp', 'nutmeg')
const recipe = new Recipe('ID', 'Hot Cocoa', [a, b], 'Pepare with love! :)', 'A warm morning delight')
const recipe2 = new Recipe('ID', 'Madagascar Cofee', [a, b], 'Shaken not stirred', 'Very nice stuff!')

export const defaultConfig = {
    // recipeBook: new RecipeBook('Sweets & Treats 3', [recipe, recipe2])
}
/**
 * @param  {} `users/${'3SRvQoY7u0E7WA1qUCpz'}/recipeBook`
 * @param  {any} ;constructor(config?
 */
export class MobxStore {

    [key: string]: any;
    
    @observable recipeBook = new Collection(`users/${'3SRvQoY7u0E7WA1qUCpz'}/recipeBook`);

    @observable recipes = this.recipeBook.docs;

    @observable currentDocID = 'ID';

    @computed get currentDocument() {
        return new Document(`users/${'3SRvQoY7u0E7WA1qUCpz'}/recipeBook/${this.currentDocID}`)
    }
    @computed get recipes2() {
        let recipes = new Array()
        this.recipeBook.docs.map((doc: any) => {
            const { name, ingredients, instructions, description } = doc.data
            // console.log({ name, ingredients, instructions, description })
            recipes.push(new Recipe(doc.id, name, ingredients, instructions, description))
        });
        // this.recipeBook.docs.map((accumulator: any, currentValue: any) => {
        //     console.log('tes',currentValue)
        //     const { name, ingredients, instructions, description } = currentValue.data
        //     return accumulator.push(new Recipe(name, ingredients, instructions, description))
        // });
        return recipes
    };

    constructor(config?: any) {

        // Load Default Configuration
        let properties = config || defaultConfig
        for (var property in properties) {
            if (properties.hasOwnProperty(property)) {
                this[property] = properties[property]
            }
        }

    }

    @action.bound setDocID(id: string) {
        this.currentDocID = id
    }

    @action.bound async addRecipe(cats: string) {
        try {
            await this.recipeBook.add({
                name: "A New Recipe",
                description: "A wonderful new recipe!",
                prep_time: "15",
                tags: ['snack', 'dinner'],
                img_url: "https://imgur.io/icing.png",
                favorite: true,
                ingredients: [a.toString(), b.toString()],
                instructions: "Here is a basic set of instructions..."
            });
        }
        catch (err) {
            console.error(err)
        }
    }

    @action.bound async deleteAllRecipes(cats: string) {
        try {
            this.recipes.map((doc: any) => {
                doc.delete()
            })
        }
        catch (err) {
            console.error(err)
        }
    }

}