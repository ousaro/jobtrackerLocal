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
const createFilter = async(index, filter) => {
  await index.updateFilterableAttributes(filter);
};


// creating a id filter for all indexes
const createIdFilter = async(filter) => {
  for (const index of ['users', 'contacts', 'applications', 'interviews']) {
    const indexInstance = meili.index(index);
    await createFilter(indexInstance, [filter]);
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

//deleteIndex('contacts')

// createIdFilter('id')
//   .then(() => {
//     console.log('Filter created successfully');
//   })
//   .catch((error) => {
//     console.error('Error creating filter:', error);
//   });

module.exports = {
  meili,
  getIndex,
};
