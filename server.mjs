import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('./',import.meta.url));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8'};
export const server=http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');const name=decodeURIComponent(url.pathname);const file=path.resolve(root,'.'+(name==='/'?'/index.html':name));if(!file.startsWith(root)||!['index.html','style.css','app.js','data.js'].includes(path.relative(root,file))){res.writeHead(404);return res.end('Not found');}const data=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)],'X-Content-Type-Options':'nosniff'});res.end(data);}catch{res.writeHead(404);res.end('Not found');}});
if(process.argv[1]===fileURLToPath(import.meta.url)) server.listen(Number(process.env.PORT||3000),process.env.HOST||'0.0.0.0',()=>console.log('PapiLio archive listening on '+(process.env.HOST||'0.0.0.0')+':'+(process.env.PORT||3000)));
