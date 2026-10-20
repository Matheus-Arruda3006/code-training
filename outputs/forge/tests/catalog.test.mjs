import test from 'node:test';
import assert from 'node:assert/strict';
import {tracks} from '../src/catalog.mjs';
import {zipFiles,noteFor,projectReadme} from '../src/lib.mjs';
test('oito trilhas com arquivos, explicações e comandos completos',()=>{
 assert.equal(new Set(tracks.map(t=>t.id)).size,8);
 for(const t of tracks){assert.ok(t.files.length>=1);assert.ok(t.run);assert.equal(t.acceptance.length,3);
 for(const f of t.files){assert.ok(f.code.trim());assert.ok(f.notes.length);assert.equal(f.code.includes('TODO'),false);}
 assert.ok(projectReadme(t).includes(t.run));}
});
test('notas selecionam corretamente intervalos e linhas isoladas',()=>{
 const notes=[['1','import'],['3–8','body']];assert.equal(noteFor(notes,1),'import');assert.equal(noteFor(notes,5),'body');
});
test('ZIP preserva UTF-8 e estrutura de arquivos',async()=>{
 const bytes=new Uint8Array(await zipFiles([{name:'ação.txt',code:'Olá, mundo!'}]).arrayBuffer());
 const view=new DataView(bytes.buffer);assert.equal(view.getUint32(0,true),0x04034b50);
 assert.equal(view.getUint32(bytes.length-22,true),0x06054b50);assert.equal(view.getUint16(bytes.length-12,true),1);
 assert.ok(new TextDecoder().decode(bytes).includes('Olá, mundo!'));
});
