const Model = require("../../lib/Model.js")

class TechstackEntry extends Model {
    static findBy = Model.findBy.bind({ model: TechstackEntry, table: "techstack_entries" })
    static findAllBy = Model.findAllBy.bind({ model: TechstackEntry, table: "techstack_entries" })
    static where = Model.where.bind({ model: TechstackEntry, table: "techstack_entries" })

    constructor(values) {
        super({
            table: "techstack_entries",
            columns: ["id", "project_id", "name"],
            ...values
        })
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            project_id: this.project_id,
            image_url: this.image_url
        }
    }
}

module.exports = TechstackEntry