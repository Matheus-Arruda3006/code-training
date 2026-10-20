import fs from 'node:fs';
import path from 'node:path';
import {tracks} from '../src/catalog.mjs';
import {projectReadme,zipFiles} from '../src/lib.mjs';
import './build-curriculum.mjs';
fs.mkdirSync('backend/resources',{recursive:true});
for(const dir of ['bootstrap/cache','storage/framework/cache/data','storage/framework/sessions','storage/framework/views','storage/logs']){
 fs.mkdirSync('backend/'+dir,{recursive:true});fs.writeFileSync('backend/'+dir+'/.gitkeep','');
}
for(const t of tracks){
 const dir=path.join('projects',t.id);fs.mkdirSync(dir,{recursive:true});
 for(const f of [...t.files,{name:'README.md',code:projectReadme(t)}])fs.writeFileSync(path.join(dir,f.name),f.code+'\n');
}
const roots=['src','backend','tests','projects','curriculum','public/curriculum'];
const included=['package.json','pnpm-lock.yaml','index.html','vite.config.ts','postcss.config.mjs','README.md','VALIDACAO.md','.gitignore','.env.example','compose.yaml','scripts/export-projects.mjs'];
included.push('scripts/build-curriculum.mjs');
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(['vendor','node_modules','dist','bin','obj','__pycache__'].includes(e.name)||e.name==='.env'||e.name.startsWith('.phpunit')||e.name.endsWith('.sqlite')||e.name.endsWith('.log')||e.name.endsWith('.pyc'))continue;const f=path.join(dir,e.name);if(f.replaceAll('\\','/').startsWith('backend/bootstrap/cache/')&&e.name!=='.gitkeep')continue;if(e.isDirectory())walk(f);else included.push(f);}}
roots.forEach(walk);
const files=[...new Set(included)].filter(f=>fs.existsSync(f)).map(f=>({name:f.replaceAll('\\','/'),code:fs.readFileSync(f,'utf8')}));
fs.mkdirSync('public',{recursive:true});
fs.writeFileSync('public/forge-source.zip',Buffer.from(await zipFiles(files).arrayBuffer()));
console.log(`424 projetos exportados; ${files.length} arquivos no pacote da plataforma.`);
