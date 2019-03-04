import { MeasurementType } from './MeasurementType'
import { PortionType } from './PortionType'

/**
 * @param  {PortionType} portion
 * @param  {MeasurementType} measurement
 * @param  {string} name
 */

export default class Ingredient {

    measurement: MeasurementType
    portion: PortionType
    name: string
    [key: string]: any;

    constructor(portion: PortionType, measurement: MeasurementType, name: string) {
        this.portion = portion
        this.measurement = measurement
        this.name = name
    }

    get(key: string): any {
        if (this[key]) {
            return this[key]
        } else {
            throw new Error(`Could not return property "${key}" for Ingredient`)
        }
    }

    set(key: string, value: any): any {
        let property = this[key]
        if(property) {
            if (typeof property === typeof value) {
                this[key] = value
            } else {
                throw new Error(`"${value}" is not of required type [${typeof property}]`)
            }
        } else {
            throw new Error(`"${key}" is not a valid property key`)
        }
    }

}