const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/register', (req, res) => {
    const users = readUsers();
    const { username, email } = req.body;
    
    // Check if user exists
    if (users.some(user => user.username === username)) {
        return res.json({ success: false, message: 'Username already exists' });
    }

    // Add new user
    users.push({
        ...req.body,
        id: Date.now()
    });
    
    writeUsers(users);
    res.json({ success: true, message: 'Registration successful' });
});

app.post('/login', (req, res) => {
    const users = readUsers();
    const { username, password } = req.body;
    
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.json({ success: false, message: 'Invalid credentials' });
    }
    
    res.json({ success: true, message: 'Login successful' });
});

// Helper functions
function readUsers() {
    try {
        const data = fs.readFileSync('users.json');
        return JSON.parse(data).users;
    } catch (error) {
        return [];
    }
}

function writeUsers(users) {
    fs.writeFileSync('users.json', JSON.stringify({ users }, null, 2));
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});