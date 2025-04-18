const {getIndex} = require("../Config/meili");
const axios = require("axios");


const searchByType = async (req, res) => {
    const { type } = req.params; // users, contacts, applications
    const query = req.query.q || '';
    try {
      const index = getIndex(type);
      const result = await index.search(query, {
        limit: 10,
        attributesToHighlight: ['name', 'email', 'company'], // adjust per type
      });
  
      const hits = result.hits.map(hit => ({
        id: hit.id,
        _score: hit._rankingScore,
        highlight: hit._formatted,
      }));
  
      res.json(hits);
    } catch (err) {
      console.error(`[❌] Search error on ${type}:`, err.message);
      res.status(500).json({ error: 'Search failed' });
    }
}


const reindexAll =  async (req, res) => {
  try {
    // Fetch from original services (you can secure these calls with service tokens)
    const [usersRes, contactsRes, appsRes] = await Promise.all([
      axios.get('http://user-service/users'),
      axios.get('http://contact-service/contacts'),
      axios.get('http://app-service/applications')
    ]);

    const users = usersRes.data;
    const contacts = contactsRes.data;
    const apps = appsRes.data;

    await getIndex('users').addDocuments(users);
    await getIndex('contacts').addDocuments(contacts);
    await getIndex('applications').addDocuments(apps);

    res.json({ message: 'Reindexed all data successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Reindex failed' });
  }
}


module.exports = {
    searchByType,
    reindexAll
}