const {getIndex} = require("../Config/meili");
const axios = require("axios");

const highlightPerType = {
  users: ['fullName'],
  contacts: ['fullName', 'phone'],
  applications: ['position_title',"company_name","location","status"],
  interviews: ['type',"dateTime","date"],
}

const filterableFields = {
  id: 'string',
  createdAt: 'date',
  updatedAt: 'date',
  dateTime: 'date',
  date: 'date',
  type: 'string',
  status: 'string',
  position_title: 'string',
  company_name: 'string',
  location: 'string',
  fullName: 'string',
  phone: 'string',

};

const buildFiltersFromQuery = (query) => {
  const filters = [];

  for (const key in query) {
    const value = query[key];
    if (!filterableFields[key]) continue;

    const fieldType = filterableFields[key];

    // Handle range syntax like createdAfter or createdBefore
    if (fieldType === 'date') {
      if (key.endsWith('After')) {
        const field = key.replace(/After$/, '');
        filters.push(`${field} >= "${value}"`);
      } else if (key.endsWith('Before')) {
        const field = key.replace(/Before$/, '');
        filters.push(`${field} <= "${value}"`);
      } else {
        filters.push(`${key} = "${value}"`);
      }
    } else {
      filters.push(`${key} = "${value}"`);
    }
  }

  return filters;
};


const searchByType = async (req, res) => {
    const { type } = req.params; // users, contacts, applications, interviews
    const query = req.query.q || '';
    try {
      const index = getIndex(type);

      const filters = buildFiltersFromQuery(req.query);
      console.log(`[🔍] Searching ${type} with query: ${query}`);
      
      const result = await index.search(query, {
        limit: 10,
        attributesToHighlight: highlightPerType[type], 
        ...(filters.length > 0 && { filter: filters }),
      });
  
      const hits = result.hits.map(hit => ({
        id: hit.id,
        _score: hit._rankingScore,
        highlight: hit._formatted,
      }));

      console.log(`[✅] Search result for ${type}:`, result.hits);
  
      res.json(hits);
    } catch (err) {
      console.error(`[❌] Search error on ${type}:`, err.message);
      res.status(500).json({ error: 'Search failed' });
    }
}

const searchByTypeWithId = async (req, res) => {
  const { type, id } = req.params; // users, contacts, applications
  console.log(`[🔍] Searching ${type} with ID: ${id}`);
  const query = req.query.q || '';
  try {
    const index = getIndex(type);
    const filters = buildFiltersFromQuery(req.query);
    const result = await index.search(query, {
      limit: 10,
      attributesToHighlight: highlightPerType[type], // adjust per type
      ...(filters.length > 0 && { filter: filters }),
    });

    

    const hits = result.hits.map(hit => ({
      id: hit.id,
      _score: hit._rankingScore,
      highlight: hit._formatted,
    }));

    console.log(`[✅] Search result for ${type}:`, result.hits);

    res.json(hits);
  } catch (err) {
    console.error(`[❌] Search error on ${type}:`, err.message);
    res.status(500).json({ error: 'Search failed' });
  }
}

const reindexAll =  async (req, res) => {
  try {
    // Fetch from original services (you can secure these calls with service tokens)
    const [usersRes, contactsRes, appsRes,interviewsRes] = await Promise.all([
      axios.get('http://user-service/users'),
      axios.get('http://contact-service/contacts'),
      axios.get('http://app-service/applications'),
      axios.get('http://interview-service/interviews')
    ]);

    const users = usersRes.data;
    const contacts = contactsRes.data;
    const apps = appsRes.data;
    const interviews = interviewsRes.data;

    await getIndex('users').addDocuments(users);
    await getIndex('contacts').addDocuments(contacts);
    await getIndex('applications').addDocuments(apps);
    await getIndex('interviews').addDocuments(interviews);

    res.json({ message: 'Reindexed all data successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Reindex failed' });
  }
}

const deleteDocument = async (req, res) => {
  const { type, id } = req.params;
  
  try {
    const index = getIndex(type);
    await index.deleteDocument(id);
    
    console.log(`[✅] Successfully deleted document ${id} from ${type} index`);
    res.json({ message: `Document ${id} deleted successfully from ${type} index` });
  } catch (err) {
    console.error(`[❌] Error deleting document ${id} from ${type} index:`, err.message);
    res.status(500).json({ error: 'Failed to delete document' });
  }
}


module.exports = {
    searchByType,
    searchByTypeWithId,
    reindexAll,
    deleteDocument
}