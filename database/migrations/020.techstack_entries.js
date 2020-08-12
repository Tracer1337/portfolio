module.exports = {
    table: "techstack_entries",

    columns: [
        "id varchar(255) PRIMARY KEY",
        "project_id varchar(255) NOT NULL",
        "name varchar(255) NOT NULL UNIQUE",
        "FOREIGN KEY(project_id) REFERENCES projects(id)",
    ]
}