//This file was added by Kevin to automatically create the database if it doesn't yet exist

import * as mysql from 'mysql2/promise';

export async function ensureDatabaseExists() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',//set to your actual MySQL username
        password: '1234',//set to your actual MySQL [assword]
    });

    await connection.query('CREATE DATABASE IF NOT EXISTS react440_phase1');
    await connection.end();
}