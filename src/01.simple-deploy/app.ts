import http from 'node:http';
import path from 'node:path';

import serverHandler from './server-handler';

const PORT = 3000;

const server = http.createServer((req, res) => {
    serverHandler(req, res, {
        staticPath: './static'
    });
});

server.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
});

