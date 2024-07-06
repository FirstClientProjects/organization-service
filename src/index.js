require('dotenv').config();
const express = require('express');
const cors = require('cors');

require('./config/db');
const logger = require('./utils/logger');
const organizationRoutes = require('./api/routes/organizationRoutes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '20mb' }));

app.use('/api/v1/organization', organizationRoutes);

const PORT = process.env.PORT || 6005;

app.listen(PORT, () => {
    logger.info(`Server is listening on port ${PORT}`);
});