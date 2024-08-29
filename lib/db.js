import sql from 'mssql';

const config = {
    user: 'sa',
    password: 'YourStrong@Passw0rd',
    server: 'localhost',
    database: 'Innovations',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
};

let pool;

export const connectToDatabase = async () => {
    if (!pool) {
        pool = await sql.connect(config);
    }
    return pool;
};
