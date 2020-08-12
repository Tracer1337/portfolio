module.exports = {
    table: "techstack_entry_images",

    columns: [
        "id varchar(255) PRIMARY KEY",
        "for_name varchar(255) NOT NULL UNIQUE",
        "image_url varchar(255) NOT NULL"
    ]
}