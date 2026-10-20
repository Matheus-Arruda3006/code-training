import fs from 'node:fs';
import path from 'node:path';
import {tracks} from '../src/catalog.mjs';
import {newProjects} from '../curriculum/compiler.mjs';
import {projectReadme} from '../src/lib.mjs';
const projects=newProjects(tracks);
fs.mkdirSync('public/curriculum',{recursive:true});
for(const p of projects){
 const dir=path.join('projects',p.trackId,p.id.split('--')[1]);
 fs.mkdirSync(dir,{recursive:true});
 const guide=projectReadme(p);
 for(const f of [...p.files,{name:'README.md',code:guide}])fs.writeFileSync(path.join(dir,f.name),f.code+'\n');
 fs.writeFileSync(`public/curriculum/${p.id}.json`,JSON.stringify(p));
}
const metadata=projects.map(({id,trackId,number,project,title,name,description,area,level,tags,minutes,color,mark,files})=>({id,trackId,number,project,title,name,description,area,level,tags,minutes,color,mark,fileCount:files.length}));
fs.writeFileSync('src/library-data.json',JSON.stringify(metadata));
const all=[...tracks.map(t=>({...t,trackId:t.id,number:1})),...projects];
fs.mkdirSync('backend/resources',{recursive:true});
fs.writeFileSync('backend/resources/project-ids.json',JSON.stringify(all.map(p=>p.id)));
fs.writeFileSync('backend/resources/catalog.json',JSON.stringify({tracks:tracks.map(({files,...t})=>t),projects:all.map(({files,...p})=>({...p,fileCount:files.length}))}));
console.log(`${projects.length} novos projetos, ${all.length} no total; ${projects.length/8+1} por trilha.`);
