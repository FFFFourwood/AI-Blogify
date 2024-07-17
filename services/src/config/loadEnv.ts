import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const loadEnvironmentVariables = () => {
    const environment = process.env.NODE_ENV || 'local';
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const envFilePath = path.resolve(__dirname, `../../.env.${environment}`);
    dotenv.config({ path: envFilePath });

    console.log(`Environment variables loaded from ${envFilePath}`);
};

export default loadEnvironmentVariables;
