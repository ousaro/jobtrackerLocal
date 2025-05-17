const {getIndex} = require("../Config/meili");
const axios = require("axios");

const highlightPerType = {
  users: ['fullName'],
  contacts: ['fullName', 'phone'],
  applications: ['position_title'],
  interviews: ['companyName'],
}

const searchByType = async (req, res) => {
    const { type } = req.params; // users, contacts, applications
    const query = req.query.q || '';
    try {
      const index = getIndex(type);
      const result = await index.search(query, {
        limit: 10,
        attributesToHighlight: highlightPerType[type], // adjust per type
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
    const result = await index.search(query, {
      limit: 10,
      attributesToHighlight: highlightPerType[type], // adjust per type
      filter: `id = "${id}"`
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