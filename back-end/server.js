require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth.routes')
const bookRoutes = require('./routes/book.routes')
const borrowRoutes = require('./routes/borrow.routes')
const publisherRoutes = require('./routes/publisher.routes')
const staffRoutes = require('./routes/staff.routes')
const connectDB = require('./config/db');
const createDefaultAdmin = require('./initializers/createDefaultAdmin');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();
createDefaultAdmin();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/library/books', bookRoutes);
app.use('/api/library/borrows', borrowRoutes);
app.use('/api/library/publishers', publisherRoutes);
app.use('/api/management/staff', staffRoutes);
app.use('/api/management/readers', require('./routes/reader.routes'));

// Serve Frontend Static Files
const frontendPath = path.join(__dirname, '../front-end/dist');
app.use(express.static(frontendPath));

// Handle SPA routing - send all non-API requests to index.html
app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📚 Frontend available at http://localhost:${PORT}`);
    console.log(`🔌 API available at http://localhost:${PORT}/api`);
});