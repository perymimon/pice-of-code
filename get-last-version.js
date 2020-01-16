/*dedicate code for grumi*/
const axios = require('axios').default;
const { logger } = require('../lib/logger');

async function getLastVersion(scriptName) {
    try {
        const lastCodeText = (await axios.get(`http://rumcdn.geoedge.be/${scriptName}`)).data;
        return (lastCodeText.match(/wver:"([\d.]+)"/) || [])[1];
    } catch (e) {
        logger.debug(`requesting ${scriptName} fail`);
        return null;
    }
}

module.exports = getLastVersion;

