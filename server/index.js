const express = require('express');
const path = require('path');
const connectDB = require('./db');
const User = require('./models/User');
const roles = require('./roles');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB Atlas
connectDB();

// Serve static files from React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Roles route
const rolesRoutes = require('./routes/roles');
app.use('/api/roles', rolesRoutes);
// User routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);


// Catch-all handler: for any request that doesn't match API routes, serve React index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
