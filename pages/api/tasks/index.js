import { connectToDatabase } from '../../../lib/db';
import sql from 'mssql';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { goalID } = req.query;
            const pool = await connectToDatabase();
            
            let query = 'SELECT * FROM Tasks';
            if (goalID) {
                query += ' WHERE goalID = @goalID';
            }
            query += ' ORDER BY taskID DESC'; // Add ORDER BY clause
            
            const request = pool.request();
            if (goalID) {
                request.input('goalID', sql.Int, parseInt(goalID));
            }
            
            const result = await request.query(query);
            res.status(200).json(result.recordset);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching tasks' });
        }
    }

    if (req.method === 'POST') {
        const { goalID, name } = req.body;
        const pool = await connectToDatabase();
        if (goalID === undefined || !name) return res.status(400).json({ error: 'goalID and name are required' });
    
        const dateCreated = new Date();
        const status = 'In progress';  
        const priority = 0;            
    
        try {
            await pool.request()
                .input('goalID', sql.Int, goalID)
                .input('name', sql.NVarChar, name)
                .input('dateCreated', sql.DateTime, dateCreated)
                .input('status', sql.NVarChar, status)
                .input('priority', sql.Int, priority)
                .query('INSERT INTO Tasks (goalID, name, dateCreated, status, priority) VALUES (@goalID, @name, @dateCreated, @status, @priority)');
            return res.status(201).json({ message: 'Task created successfully' });
        } catch (error) {
            console.error('Database query error:', error);
            return res.status(500).json({ error: 'An error occurred while creating the task' });
        }
    }
}