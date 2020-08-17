const Model = require("../../lib/Model.js")

class Icon extends Model {
    static findBy = Model.findBy.bind({ model: Icon, table: "techstack_entry_icon" })
    static findAllBy = Model.findAllBy.bind({ Icon: Icon, table: "techstack_entry_icon" })
    static where = Model.where.bind({ model: Icon, table: "techstack_entry_icon" })

    constructor(values) {
        super({
            table: "techstack_entry_icon",
            columns: ["id", "for_name", "icon"],
            ...values
        })
    }

    toJSON() {
        return this.icon
    }
}

module.exports = Icon