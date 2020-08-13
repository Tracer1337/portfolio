const { v4: uuid } = require("uuid")

const Model = require("../../lib/Model.js")
const Collection = require("../../lib/Collection.js")
const TechstackEntry = require("./TechstackEntry.js")
const Asset = require("./Asset.js")

class Project extends Model {
    static findBy = Model.findBy.bind({ model: Project, table: "projects" })
    static findAllBy = Model.findAllBy.bind({ model: Project, table: "projects" })
    static where = Model.where.bind({ model: Project, table: "projects" })

    constructor(values) {
        super({
            table: "projects",
            columns: ["id", "name", "website", "type", "description", "readme", "apis"],
            ...values
        })
    }

    async setTechstack(entries) {
        this.techstack = new Collection(
            entries.map(name => new TechstackEntry({
                id: uuid(),
                project_id: this.id,
                name: name
            }))
        )
    }

    async setAssets(assets) {
        this.assets = new Collection(assets)
    }

    async init() {
        this.techstack = await TechstackEntry.findAllBy("project_id", this.id)
        this.assets = await Asset.findAllBy("project_id", this.id)

        this.apis = typeof this.apis === "string" ? JSON.parse(this.apis) : this.apis
    }

    async store() {
        await super.store()
        
        await this.techstack.store()
        await this.assets.store()
    }

    async delete() {
        await this.assets.delete()
        await this.techstack.delete()
        
        await super.delete()
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            website: this.website,
            type: this.type,
            description: this.description,
            readme: this.readme,
            apis: this.apis
        }
    }
}

module.exports = Project