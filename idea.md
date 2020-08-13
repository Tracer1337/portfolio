# My Website

## Database

### projects

All projects

```
id varchar NOT NULL UNIQUE
name varchar NOT NULL UNIQUE
website varchar
type varchar
description text
readme mediumttext
apis text
```

### assets

Store references to assets (images) of each project

```
id varchar NOT NULL UNIQUE
project_id varchar NOT NULL FOREIGN_KEY(projects.id)
type varchar NOT NULL
filename varchar NOT NULL UNIQUE
url varchar NOT NULL UNIQUE
```

### techstack_entries

Available techstack entries

```
id varchar NOT NULL UNIQUE
project_id varchar NOT NULL FOREIGN_KEY(projects.id)
name NOT NULL UNIQUE
```

### techstack_entry_images

Images for techstack entries

```
id varchar NOT NULL UNIQUE
image_url varchar(255) NOT NULL
for_name varchar(255) NOT NULL UNIQUE
```

## Pages

### Homepage

* My name

* Short text about me

* "Get in contact" button

### Projects

* All projects as cards

* Techstack as horizonzal scrollable

* Thumbnail

* When clicking on the card => Redirect to project page

* Type specific information

### Project

* Readme file of project

* all images from gallery in a carousel

### About Me

* Biography

* Links (LinkedIn, GitHub)

## Projects

### Project declaration

* Create a new project by creating a .project folder inside a GitHub repository

* When a commit to a GitHub repository is made (WebHooks):
    * Clear projects table
    * Scan all repositories for a .project folder
    * Insert all detected projects into the database
    * Convert images (thumbnail, gallery) to jpeg and store in S3 Bucket
    * Store README as html in database

    * Show on the projects page when the projects got updated last

* Make different types of projects
    * For every type
        * Amount of hours, if available (Activity Analyzer API)

    * Web-App (web-app)
        * Amount of users per month (Google Analytics API)

    * Android App (android-app)
        * Amount of downloads (Google Play API)

    * npm Package (npm-package)
        * Amount of downloads (npm API)

    * Update these statistics at 00:00 every day
    * Alternative to all API calls: Web scraping

### .project Folder

```
|-- .project
|  |-- project.json
|  |-- thumbnail.jpg
|  |-- galery
|  |  |-- 001.jpg
|  |  |-- 002.jpg
|  |  |-- ...
```

* project.json
    * JSON format

    ```js
    {
        // The display name
        "name": String,

        // Where the user can see the live version
        "website": String,

        // A short description
        "description": String,

        // The programming languages, frameworks etc. used
        "techstack": Array<{
            "image_url": String,
            "name": String
        }>,

        // The type of project
        "type": String,

        // API access information
        "apis": {
            // Activity analyzer
            "activity_analyzer": {
                "activity_id": String,
            },

            // Google Analytics
            "google_analytics": {
                "view_id": String
            },

            // Google Play
            "google_play": {
                "app_id": String
            },

            // npm
            "npm": {
                "package_name": String,
                "package_scope": String
            }
        }
    }
    ```

* thumbnail.jpg
    * An image shown in the project's card

* galery
    * Screenshots or other images which portray the project