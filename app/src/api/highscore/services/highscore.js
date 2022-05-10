'use strict';

/**
 * highscore service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::highscore.highscore');
