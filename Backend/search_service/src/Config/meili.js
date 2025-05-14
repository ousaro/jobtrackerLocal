const { MeiliSearch } = require('meilisearch');
require('dotenv').config();

const meili = new MeiliSearch({
  host: process.env.MEILI_HOST,
  apiKey: process.env.MEILI_KEY
});

/**
 * Get a specific index (e.g., 'users', 'contacts', 'applications')
 */
const getIndex = (indexName) => meili.index(indexName);


module.exports = {
  meili,
  getIndex,
};
