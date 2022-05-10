'use strict';

/**
 *  highscore controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::highscore.highscore');
