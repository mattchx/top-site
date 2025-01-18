import fs from 'fs';
import path from 'path';

const leadsFilePath = path.join(process.cwd(), 'data', 'leads.json');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const newLead = {
        ...req.body,
        receivedAt: new Date().toISOString()
      };

      // Read existing leads
      const leadsData = fs.existsSync(leadsFilePath)
        ? JSON.parse(fs.readFileSync(leadsFilePath))
        : [];
      
      // Add new lead
      leadsData.push(newLead);
      
      // Save updated leads
      fs.writeFileSync(leadsFilePath, JSON.stringify(leadsData, null, 2));
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error saving lead:', error);
      res.status(500).json({ success: false, error: 'Failed to save lead' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
