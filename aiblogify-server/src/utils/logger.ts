import pino from 'pino';
import pretty from 'pino-pretty';
import dayjs from 'dayjs';

const stream = pretty({
    customPrettifiers: {
        time: () => `[${dayjs().format('YYYY-MM-DD HH:mm:ss')}]`
    }
});


const logger = pino(stream);

export default logger;
