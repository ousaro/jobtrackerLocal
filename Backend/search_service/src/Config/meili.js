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

// creating filter for search
const createFilter = async (indexes, filters) => {
  for (const index of indexes) {
    const indexInstance = meili.index(index);

    // Get current filterable attributes
    const current = await indexInstance.getFilterableAttributes();

    // Merge existing and new filters (remove duplicates)
    const newFilters = [...new Set([...current, ...filters])];

    // Update the index with the new filterable attributes
    await indexInstance.updateFilterableAttributes(newFilters);
  }
};


const deleteIndex = async (indexName) => {
  const index = meili.index(indexName);
  await index.delete();
};

(async () => {
  for(const index of ['users','contacts','applications','interviews']){
     meili.createIndex(index).then((index) => {
      console.log(`Index ${index} created successfully`)     
    })
    .catch((error)=>{
      console.error(`Error creating index ${index}:`, error)
    })
  }

})();


(async () => {
  await createFilter(['interviews'],['date','dateTime','type']);
  console.log('Interview Filter created successfully');
})();

(async () => {
  await createFilter(['users', 'contacts', 'applications', 'interviews'],['createdAt', 'updatedAt']);
  console.log('User, Contact, Application, and Interview Filters created successfully');
})();


//deleteIndex('applications')



module.exports = {
  meili,
  getIndex,
};
