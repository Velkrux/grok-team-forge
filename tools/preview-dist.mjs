import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,sep,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../dist/',import.meta.url)),mount='/grok-team-forge/',port=Number(process.argv[2]||4182);
createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');if(!url.pathname.startsWith(mount)){res.writeHead(404);res.end('Not found');return;}const relative=decodeURIComponent(url.pathname.slice(mount.length))||'index.html',path=resolve(root,relative);if(!path.startsWith(resolve(root)+sep)){res.writeHead(403);res.end();return;}const data=await readFile(path);res.writeHead(200,{'Content-Type':({'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml'})[extname(path)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);}catch{res.writeHead(404);res.end();}}).listen(port,'127.0.0.1',()=>console.log(`Static project-subpath preview: http://localhost:${port}${mount}?mode=bridge`));
