# My Website

## Database

## Pages

### Homepage

* My name

* Short text about me

* "Get in contact" button

### Projects

* List all projects as cards

* Show most important information

* Display the thumbnail

* When clicking on the card => Redirect to project page

* Make different types of projects
    * For every type
        * Show lines of code (GitHub API)
        * Show amount of hours, if available (Activity Analyzer API)

    * Web-App
        * Show amount of users per month (Google Analytics API)

    * Android App
        * Show amount of downloads (Google Play API)

    * npm Package
        * Show amount of downloads (npm API)

### Project Page

* Show Readme file of project

* Show all images from gallery in a carousel

## Projects

### Project declaration

* Create a new project by creating a .portfolio folder inside a GitHub repository

* When a commit to a GitHub repository is made (WebHooks):
    * Clear projects table
    * Scan all repositories for a .portfolio folder
    * Insert all detected projects into the database

### .portfolio Folder

```
|-- .portfolio
|  |-- .project
|  |-- thumbnail.jpg
|  |-- galery
|  |  |-- 001.jpg
|  |  |-- 002.jpg
|  |  |-- ...
```

* .project
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
        }>
    }
    ```

* thumbnail.jpg
    * An image shown in the project's card on the projects page

* galery
    * Screenshots or other images which show the project