module.exports = {
    table: "projects",

    columns: [
        "id varchar(255) PRIMARY KEY",
        "name varchar(255) NOT NULL UNIQUE",
        "slug varchar(255) NOT NULL UNIQUE",
        "website varchar(255)",
        "type varchar(255) NOT NULL",
        "description text",
        "readme mediumtext",
        "position integer NOT NULL"
    ]
}
