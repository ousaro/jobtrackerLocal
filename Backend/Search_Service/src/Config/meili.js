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

const deleteIndex = async (indexName) => {
  try {
    const index = getIndex(indexName);
    await index.delete();
    console.log(`[✅] Deleted index: ${indexName}`);
  } catch (error) {
    console.error(`[❌] Error deleting index ${indexName}:`, error.message);
  }
};

const deleteDocument = async (indexName, documentId) => {
  try {
    const index = getIndex(indexName);
    await index.deleteDocument(documentId);
    console.log(`[✅] Deleted document ${documentId} from index: ${indexName}`);
  } catch (error) {
    console.error(`[❌] Error deleting document ${documentId} from index ${indexName}:`, error.message);
  }
};

//deleteIndex("users")


module.exports = {
  meili,
  getIndex,
  deleteIndex,
  deleteDocument,
};
