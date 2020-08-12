module.exports = {
    table: "assets",

    columns: [
        "id varchar(255) PRIMARY KEY",
        "project_id varchar(255) NOT NULL",
        "type varchar(255) NOT NULL",
        "filename varchar(255) NOT NULL UNIQUE",
        "url varchar(255) NOT NULL UNIQUE",
        "FOREIGN KEY(project_id) REFERENCES projects(id)",
    ]
}