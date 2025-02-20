const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function updateStudentPasswords() {
    try {
        // Create database connection
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        // Get all students
        const [students] = await connection.execute('SELECT student_number FROM students');

        // Update each student's password
        for (const student of students) {
            const defaultPassword = 'UPHSD' + student.student_number; // You can change this pattern
            const saltRounds = 10;
            const password_hash = await bcrypt.hash(defaultPassword, saltRounds);

            await connection.execute(
                'UPDATE students SET password_hash = ? WHERE student_number = ?',
                [password_hash, student.student_number]
            );

            console.log(`Updated password for student: ${student.student_number}`);
        }

        console.log('All passwords updated successfully');
        await connection.end();
    } catch (error) {
        console.error('Error updating passwords:', error);
    }
}

updateStudentPasswords();