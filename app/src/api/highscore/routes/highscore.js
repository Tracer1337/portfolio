'use strict';

/**
 * highscore router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::highscore.highscore');
