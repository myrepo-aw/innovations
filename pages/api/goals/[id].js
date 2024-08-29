import { connectToDatabase } from '../../../lib/db';
import sql from 'mssql';

export default async function handler(req, res) {
    const { id } = req.query;

    try {
        const pool = await connectToDatabase();

        if (req.method === 'PUT') {
            const { name } = req.body;
            if (!name || !id) return res.status(400).json({ error: 'name and ID are required' });

            await pool.request()
                .input('name', sql.NVarChar, name)
                .input('goalID', sql.Int, id)
                .query('UPDATE Goals SET name = @name WHERE goalID = @goalID');
            return res.status(200).json({ message: 'Goal updated successfully' });
        }

        if (req.method === 'DELETE') {
            // Delete dependent records first
            await pool.request()
                .input('goalID', sql.Int, id)
                .query('DELETE FROM Tasks WHERE goalID = @goalID');
            
            // Now delete the goal
            await pool.request()
                .input('goalID', sql.Int, id)
                .query('DELETE FROM Goals WHERE goalID = @goalID');
            
            return res.status(200).json({ message: 'Goal deleted successfully' });
        }

        res.setHeader('Allow', ['PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error('Error in goals API handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
