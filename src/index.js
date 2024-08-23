import express from 'express';
import config from './config/config.js';
import router from './router/router.js';

const app = express();

app.use(express.json());
app.use('/api', router);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});