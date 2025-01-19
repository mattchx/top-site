import express from 'express';
import cors from 'cors';
import leadsHandler from './api/leads.js';

const app = express();
const port = 3001;

app.use(cors({
  origin: 'http://localhost:4321',
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Mount leads API endpoint
app.post('/api/leads', leadsHandler);

app.listen(port, () => {
  console.log(`Lead collection API running at http://localhost:${port}`);
});
