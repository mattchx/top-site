import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3001;
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const leadsFilePath = path.join(__dirname, '../data', 'leads.json');

app.use(cors({
  origin: 'http://localhost:4321',
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

app.post('/api/leads', (req, res) => {
  try {
    const newLead = {
      ...req.body,
      receivedAt: new Date().toISOString()
    };

    // Read existing leads
    const leadsData = fs.existsSync(leadsFilePath)
      ? JSON.parse(fs.readFileSync(leadsFilePath, 'utf8'))
      : [];
    
    // Add new lead
    leadsData.push(newLead);
    
    // Ensure directory exists
    if (!fs.existsSync(path.dirname(leadsFilePath))) {
      fs.mkdirSync(path.dirname(leadsFilePath), { recursive: true });
    }

    // Save updated leads
    fs.writeFileSync(leadsFilePath, JSON.stringify(leadsData, null, 2));
    
    // Verify file was written
    if (!fs.existsSync(leadsFilePath)) {
      throw new Error('Failed to write leads file');
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving lead:', error);
    res.status(500).json({ success: false, error: 'Failed to save lead' });
  }
});

app.listen(port, () => {
  console.log(`Lead collection API running at http://localhost:${port}`);
});
