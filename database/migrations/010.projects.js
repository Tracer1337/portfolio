module.exports = {
    table: "projects",

    columns: [
        "id varchar(255) PRIMARY KEY",
        "name varchar(255) NOT NULL UNIQUE",
        "website varchar(255)",
        "type varchar(255)",
        "description text",
        "readme mediumtext",
        "apis text"
    ]
}