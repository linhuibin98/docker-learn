import type { IncomingMessage, ServerResponse } from "node:http";
import {join} from 'node:path';
import {stat} from 'node:fs/promises';
import {createReadStream, existsSync} from 'node:fs';
import {parse as urlParse} from "node:url";

import mime from 'mime';

const publicPath = join(__dirname, 'static');
const tryExts = ['.html'];

async function tryFileFormPublic(filePath: string): Promise<string | undefined> {
    let resFilePath;
    // 1. 尝试直接判断该路径是否存在
    if (existsSync(filePath)) {
        const basePathStat = await stat(filePath);
        if (basePathStat.isDirectory()) { // 如果是目录, 尝试读取该目录下的 index.html
            const indexHtmlPath = join(filePath, 'index.html');
            if (existsSync(indexHtmlPath)) {
                resFilePath = indexHtmlPath;
            }
        } else { // 文件，直接返回
            resFilePath = filePath;
        }
    } else {
        // 2. 尝试忽略后缀读取文件
        for (const ext of tryExts) {
            const filePathExt = filePath + ext;
            if (existsSync(filePathExt)) {
                resFilePath = filePathExt;
                break;
            }
        }
    }
    return resFilePath;
}

async function serverHandler(req: IncomingMessage, res: ServerResponse) {
    const url = urlParse(req.url || '');
    // decodeURIComponent 解码 url.pathname
    const basePath = join(publicPath, decodeURIComponent(url.pathname || '/'));
    
    let resFilePath = await tryFileFormPublic(basePath);

    if (!resFilePath) { // 没有 则跳转到 404
        resFilePath = join(publicPath, '404.html');
    }
    const stats = await stat(resFilePath);
    // TODO 处理 req header range
    const streamOpts = {};
    const stream = createReadStream(resFilePath, streamOpts);
    const headers = {
        'Content-Length': stats.size,
        'Content-Range': `bytes */${stats.size}`,
        'Accept-Ranges': 'bytes'
    };
    const contentType = mime.getType(resFilePath);
    if (contentType) {
        headers['Content-Type'] = contentType;
    }
    res.writeHead(200, headers);
    return stream.pipe(res);
}

export default serverHandler;