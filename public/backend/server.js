import express from 'express';
import mysql from 'mysql2';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? 'http://localhost:3000' 
        : 'http://localhost:4173',
    credentials: true
}));

app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(join(__dirname, '../../dist')));

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test database connection
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to database');
});

// API Routes
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    const studentNumberRegex = /^\d{2}-\d{4}-\d{3}$/;
    if (!studentNumberRegex.test(username)) {
        return res.status(400).json({ error: 'Invalid student number format' });
    }

    try {
        const [rows] = await db.promise().execute(
            'SELECT * FROM students WHERE student_number = ?',
            [username]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const student = rows[0];
        const passwordMatch = await bcrypt.compare(password, student.password_hash);
        
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { studentId: student.id, studentNumber: student.student_number },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../../dist/index.html'));
});

// Handle other routes
app.get('*', (req, res) => {
    const route = req.path;
    let htmlFile = 'index.html';

    if (route.includes('/home')) {
        htmlFile = 'home.html';
    } else if (route.includes('/guest')) {
        htmlFile = 'guest.html';
    } else if (route.includes('/student')) {
        htmlFile = 'student.html';
    }

    res.sendFile(join(__dirname, '../../dist', htmlFile));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});