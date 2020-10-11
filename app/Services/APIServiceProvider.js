const axios = require("axios")
const { google } = require("googleapis")
const cheerio = require("cheerio")

const config = require("../../config")

/** 
 * Fetch last month's pageviews from google analytics api
*/
async function fetchGoogleAnalytics({ view_id }) {
    if (!view_id) {
        return
    }
    
    try {
        const response = await google.analytics("v3").data.ga.get({
            "ids": "ga:" + view_id,
            "start-date": "30daysAgo",
            "end-date": "today",
            "metrics": "ga:pageviews"
        })
        
        const pageviews = response.data.totalsForAllResults["ga:pageviews"]

        return pageviews
    } catch(error) {
        console.log(error)
    }
}

/**
 * Fetch total amount of downloads
 */
async function fetchGooglePlay({ app_id }) {
    if (!app_id) {
        return
    }

    // Fetch google play entry page
    const { data: html } = await axios.get(config.api.googlePlay.routes.appDetails + app_id)

    // Scrape amount of downloads from page
    const $ = cheerio.load(html)
    
    const span = $(config.api.googlePlay.downloadsSelector).get(0)

    const downloads = span.children[0].data

    return downloads
}

/**
 * Fetch last month's downloads
 */
async function fetchNpm({ package_name }) {
    if (!package_name) {
        return
    }

    const url = config.api.npm.routes.downloadsLastMonth + "/" + package_name

    const { data: { downloads } } = await axios.get(url)

    return downloads
}

/**
 * Define (api name => method) map
 */
const apis = {
    [config.api.googleAnalytics.name]: fetchGoogleAnalytics,
    [config.api.googlePlay.name]: fetchGooglePlay,
    [config.api.npm.name]: fetchNpm,
}

/**
 * Fetch api data for apis object
 */
async function fetchMultipleAPIData(apiDataMap) {
    const result = {}

    await Promise.all(Object.entries(apiDataMap).map(async ([api, data]) => {
        if (!apis[api]) {
            return
        }

        try {
            const response = await apis[api](data)

            result[api] = {
                ...data,
                data: response
            }
        } catch (error) {
            console.error(error)
        }
    }))

    return result
}

module.exports = { apis, fetchMultipleAPIData }