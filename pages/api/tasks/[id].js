import { connectToDatabase } from '../../../lib/db';
import sql from 'mssql';

export default async function handler(req, res) {
    const { id } = req.query;

    try {
        const pool = await connectToDatabase();

        if (req.method === 'PUT') {
            const { status } = req.body;
            if (!status || !id) return res.status(400).json({ error: 'Status and ID are required' });

            await pool.request()
                .input('status', sql.NVarChar, status)
                .input('taskID', sql.Int, id)
                .query('UPDATE Tasks SET status = @status WHERE taskID = @taskID');
            return res.status(200).json({ message: 'Task status updated successfully' });
        }

        if (req.method === 'DELETE') {
            await pool.request()
                .input('taskID', sql.Int, id)
                .query('DELETE FROM Tasks WHERE taskID = @taskID');
            
            return res.status(200).json({ message: 'Task deleted successfully' });
        }

        res.setHeader('Allow', ['PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error('Error in tasks API handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
