import { connectToDatabase } from '../../../lib/db';
import sql from 'mssql';

export default async function handler(req, res) {
    try {
        const pool = await connectToDatabase();

        if (req.method === 'GET') {
            const resultGoals = await pool.request().query('SELECT * FROM Goals ORDER BY goalID DESC');
            const goals = resultGoals.recordset;

            const resultTasks = await pool.request()
                .query(`
                    SELECT goalID, COUNT(*) AS taskCount, 
                           SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) AS completedTaskCount 
                    FROM Tasks 
                    GROUP BY goalID
                `);
            const taskCounts = resultTasks.recordset;

            const goalsWithTaskCounts = goals.map(goal => {
                const taskInfo = taskCounts.find(task => task.goalID === goal.goalID) || { taskCount: 0, completedTaskCount: 0 };
                return { 
                    ...goal, 
                    taskCount: taskInfo.taskCount,
                    completedTaskCount: taskInfo.completedTaskCount 
                };
            });

            return res.status(200).json(goalsWithTaskCounts);
        } 

        if (req.method === 'POST') {
            const { name } = req.body;
            if (!name) return res.status(400).json({ error: 'name is required' });

            await pool.request()
                .input('name', sql.NVarChar, name)
                .query('INSERT INTO Goals (name) VALUES (@name)');
            return res.status(201).json({ message: 'Goal created successfully' });
        }

        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error('Error in goals API handler:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
