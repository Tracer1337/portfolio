const Model = require("../../lib/Model.js")
const Storage = require("../Facades/StorageFacade.js")

class Asset extends Model {
    static findBy = Model.findBy.bind({ model: Asset, table: "assets" })
    static findAllBy = Model.findAllBy.bind({ model: Asset, table: "assets" })
    static where = Model.where.bind({ model: Asset, table: "assets" })

    constructor(values) {
        super({
            table: "assets",
            columns: ["id", "project_id", "type", "filename", "url"],
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
            project_id: this.project_id,
            type: this.type,
            filename: this.filename,
            url: this.url
        }
    }
}

module.exports = Asset