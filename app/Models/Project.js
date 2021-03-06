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
            columns: ["id", "name", "slug", "website", "type", "description", "readme", "position"],
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
        this.assets = await Asset.findAllBy("model_ref", this.id)
    }

    async store() {
        await super.store()
        
        if (this.techstack) {
            await this.techstack.store()
        }

        if (this.assets) {
            await this.assets.store()
        }
    }

    async delete() {
        if (this.assets) {
            await this.assets.delete()
        }

        if (this.techstack) {
            await this.techstack.delete()
        }
        
        await super.delete()
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            slug: this.slug,
            website: this.website,
            type: this.type,
            description: this.description,
            readme: this.readme,
            assets: this.assets,
            position: this.position,
            techstack: this.techstack
        }
    }
}

module.exports = Project
