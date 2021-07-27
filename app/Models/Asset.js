const Model = require("../../lib/Model.js")
const Storage = require("../Facades/StorageFacade.js")

class Asset extends Model {
    static findBy = Model.findBy.bind({ model: Asset, table: "assets" })
    static findAllBy = Model.findAllBy.bind({ model: Asset, table: "assets" })
    static where = Model.where.bind({ model: Asset, table: "assets" })

    constructor(values) {
        super({
            table: "assets",
            columns: ["id", "model_ref", "type", "filename", "path"],
            ...values
        })
    }

    async delete() {
        try {
            await Storage.deleteFile(this.filename)
        } catch {}

        await super.delete()
    }

    toJSON() {
        return {
            id: this.id,
            type: this.type,
            filename: this.filename,
            path: this.path
        }
    }
}

module.exports = Asset