import app from './app';
import logger from './utils/logger';
import loadEnvironmentVariables from './config/loadEnv';

loadEnvironmentVariables();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
