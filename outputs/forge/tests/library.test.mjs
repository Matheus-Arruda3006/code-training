import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {tracks} from '../src/catalog.mjs';
import {specs} from '../curriculum/specs.mjs';
import {newProjects} from '../curriculum/compiler.mjs';
import {projectReadme,noteFor} from '../src/lib.mjs';
const projects=newProjects(tracks);
test('53 projetos por trilha e 52 problemas distintos, sem IDs duplicados',()=>{
 assert.equal(specs.length,52);
 assert.equal(new Set(specs.map(s=>s.body)).size,52);
 assert.equal(new Set(projects.map(p=>p.id)).size,416);
 for(const t of tracks)assert.equal(projects.filter(p=>p.trackId===t.id).length+1,53);
 const ids=JSON.parse(fs.readFileSync('backend/resources/project-ids.json'));
 assert.deepEqual(new Set(ids),new Set([...tracks,...projects].map(p=>p.id)));
});
test('projetos completos correspondem aos downloads e notas cobrem cada linha',()=>{
 for(const p of projects){
  assert.ok(p.files.length>=4,p.id);
  assert.ok(p.steps.length>=5);
  const actual=JSON.parse(fs.readFileSync('public/curriculum/'+p.id+'.json'));
  assert.deepEqual(actual,p);
  for(const f of p.files){
   assert.ok(!/TODO|IMPLEMENT_ME/.test(f.code));
   assert.equal(fs.readFileSync('projects/'+p.trackId+'/'+p.id.split('--')[1]+'/'+f.name,'utf8'),f.code+'\n');
   f.code.split('\n').forEach((_,i)=>assert.ok(!noteFor(f.notes,i+1).startsWith('Leia esta linha'),p.id+'/'+f.name+':'+(i+1)));
  }
  assert.ok(projectReadme(p).includes(p.extension));
  assert.ok(projectReadme(p).includes(p.fields[0].name));
 }
});
test('catálogo da API preserva todas as linguagens e referências',()=>{
 const catalog=JSON.parse(fs.readFileSync('backend/resources/catalog.json'));
 assert.equal(catalog.tracks.length,8);
 assert.equal(catalog.projects.length,424);
 for(const p of catalog.projects)assert.ok(tracks.some(t=>t.id===p.trackId));
});
