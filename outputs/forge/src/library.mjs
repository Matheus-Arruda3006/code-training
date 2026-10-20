import {tracks} from './catalog.mjs';
import additional from './library-data.json';
export const projects=[...tracks.map(t=>({...t,trackId:t.id,number:1,fileCount:t.files.length})),...additional];
export const projectsFor=id=>projects.filter(p=>p.trackId===id).sort((a,b)=>a.number-b.number);
const cache=new Map(tracks.map(t=>[t.id,{...t,trackId:t.id,number:1}]));
export async function loadProject(id){
 if(cache.has(id))return cache.get(id);
 if(!projects.some(p=>p.id===id))throw new Error('Projeto não encontrado.');
 const response=await fetch(`/curriculum/${encodeURIComponent(id)}.json`);
 if(!response.ok)throw new Error('Não foi possível carregar os arquivos deste projeto. Tente novamente.');
 const project=await response.json();
 if(project.id!==id||!Array.isArray(project.files)||!project.files.length)throw new Error('Conteúdo do projeto inválido.');
 cache.set(id,project);return project;
}
