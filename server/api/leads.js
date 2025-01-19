import db from '../db.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const newLead = {
        ...req.body,
        receivedAt: new Date().toISOString()
      };

      // Insert new lead using parameterized query
      const stmt = db.prepare(`
        INSERT INTO leads (name, email, phone, message, receivedAt)
        VALUES (@name, @email, @phone, @message, @receivedAt)
      `);
      
      const result = stmt.run(newLead);
      
      if (result.changes > 0) {
        res.status(200).json({ success: true });
      } else {
        throw new Error('Failed to insert lead');
      }
    } catch (error) {
      console.error('Error saving lead:', error);
      
      // Handle unique constraint violation
      if (error.message.includes('UNIQUE constraint failed')) {
        res.status(409).json({
          success: false,
          error: 'Lead with this email already exists'
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Failed to save lead'
        });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
