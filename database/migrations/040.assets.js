module.exports = {
    table: "assets",

    columns: [
        "id varchar(255) PRIMARY KEY",
        "model_id varchar(255) NOT NULL",
        "type varchar(255) NOT NULL",
        "filename varchar(255) NOT NULL UNIQUE",
        "path varchar(255) NOT NULL UNIQUE"
    ]
}