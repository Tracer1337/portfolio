const Collection = require("./Collection.js")
const { queryAsync, quotedList } = require("../app/utils")

const requiredProps = ["table", "columns", "id"]

/**
 * Class representing a Model. Strictly bound to the database.
 * 
 * @attribute {String} table - The name of the table bound to the model
 * @attribute {String[]} columns - The column names of the table in the correct order
 */
class Model {
    /**
     * Create models from database rows
     */
    static async createModels(model, rows) {
        return new Collection(await Promise.all(rows.map(async row => {
            const instance = new model(row)

            if (instance.init) {
                await instance.init()
            }

            return instance
        })))
    }

    /**
     * Select all matches for the given SQL selector and return a
     * collection containing models for all rows in the query result
     */
    static async where(selector) {
        // Get matches from database
        const query = `SELECT * FROM ${this.table} WHERE ${selector}`
        const results = await queryAsync(query)

        // Create models from results
        return await Model.createModels(this.model, results)
    }

    /**
     * Create a model from the first match for 'column = value'
     */
    static async findBy(column, value) {
        return (await Model.where.call(this, `${column} = '${value}'`))[0]
    }

    /**
     * Create a collection from all matches for 'column = value'
     */
    static async findAllBy(column, value) {
        return await Model.where.call(this, `${column} = '${value}'`)
    }

    /**
     * Create a collection of all columns with distinct column value
     */
    static async findDistinct(column) {
        const query = `SELECT DISTINCT ${column} FROM ${this.table}`
        let results = await queryAsync(query)

        // Filter entries with same column value
        results = results.filter((row, index) => index === results.findIndex(_row => row[column] === _row[column]))

        // Create models from results
        const models = await Promise.all(results.map(async entry => {
            return await Model.findBy.call(this, column, entry[column])
        }))

        return new Collection(models)
    }

    /**
     * Convert column-values to strings
     * (Intention: Object => [object Object] - Should be JSON.stringified)
     */
    stringifyValues() {
        const result = {}
        
        this.columns.map(column => {
            const value = this[column]

            if (typeof value === "object") {
                result[column] = JSON.stringify(value)
            } else {
                result[column] = value
            }
        })

        return result
    }

    /**
     * Store the model into the database
     */
    async store() {
        const values = Object.values(this.stringifyValues())
        const query = `INSERT INTO ${this.table} VALUES ${quotedList(values)}`
        await queryAsync(query)
    }

    /**
     * Update the model in the database
     */
    async update() {
        const values = this.stringifyValues()
        const query = `UPDATE ${this.table} SET ${this.columns.map(column => `${column} = '${values[column]}'`).join(",")} WHERE id = '${this.id}'`
        await queryAsync(query)
    }

    /**
     * Delete the model from the database
     */
    async delete() {
        const query = `DELETE FROM ${this.table} WHERE id = '${this.id}'`
        await queryAsync(query)
    }

    /**
     * Create a new instance of the model and pass all attributes of this
     */
    clone() {
        return new this.constructor(this)
    }
    
    /**
     * Create a model
     */
    constructor(props) {
        // Check if the required attributes are defined
        requiredProps.forEach(attribute => {
            if (!props[attribute]) {
                throw new Error(`The attribute "${attribute}" is missing in model "${this.constructor.name}"`)
            }
        })

        // Assign props to this
        for(let key in props) {
            this[key] = props[key]
        }
    }
}

module.exports = Model