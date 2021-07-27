const Model = require("../../lib/Model.js")
const Icon = require("./Icon.js")

class TechstackEntry extends Model {
    static findBy = Model.findBy.bind({ model: TechstackEntry, table: "techstack_entries" })
    static findAllBy = Model.findAllBy.bind({ model: TechstackEntry, table: "techstack_entries" })
    static findDistinct = Model.findDistinct.bind({ model: TechstackEntry, table: "techstack_entries" })
    static where = Model.where.bind({ model: TechstackEntry, table: "techstack_entries" })

    constructor(values) {
        super({
            table: "techstack_entries",
            columns: ["id", "project_id", "name"],
            ...values
        })
    }

    async init() {
        // Get icon
        this.icon = await Icon.findBy("for_name", this.name)
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            project_id: this.project_id,
            icon: this.icon
        }
    }
}

module.exports = TechstackEntry