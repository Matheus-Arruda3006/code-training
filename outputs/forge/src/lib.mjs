export function readLocal(key, fallback) { try {return JSON.parse(localStorage.getItem(key)) ?? fallback;} catch {return fallback;} }
export function writeLocal(key, value) { try {localStorage.setItem(key, JSON.stringify(value)); return true;} catch {return false;} }
export function download(name, value, type='text/plain;charset=utf-8') {
 const url=URL.createObjectURL(value instanceof Blob?value:new Blob([value],{type}));
 const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
// ZIP sem compressão: evita serviços externos e preserva os arquivos exatos.
export function zipFiles(files) {
 const enc=new TextEncoder(), parts=[], central=[];let offset=0;
 const crc=bytes=>{let c=0xffffffff;for(const b of bytes){c^=b;for(let i=0;i<8;i++)c=(c>>>1)^((c&1)?0xedb88320:0);}return (c^0xffffffff)>>>0;};
 const header=(size,values)=>{const a=new Uint8Array(size),v=new DataView(a.buffer);for(const [at,n,width] of values) width===2?v.setUint16(at,n,true):v.setUint32(at,n,true);return a;};
 for(const f of files){const name=enc.encode(f.name),data=enc.encode(f.code),checksum=crc(data);
 const h=header(30,[[0,0x04034b50,4],[4,20,2],[6,0x800,2],[14,checksum,4],[18,data.length,4],[22,data.length,4],[26,name.length,2]]);
 const c=header(46,[[0,0x02014b50,4],[4,20,2],[6,20,2],[8,0x800,2],[16,checksum,4],[20,data.length,4],[24,data.length,4],[28,name.length,2],[42,offset,4]]);
 parts.push(h,name,data);central.push(c,name);offset+=h.length+name.length+data.length;
 }
 const size=central.reduce((n,p)=>n+p.length,0),end=header(22,[[0,0x06054b50,4],[8,files.length,2],[10,files.length,2],[12,size,4],[16,offset,4]]);
 return new Blob([...parts,...central,end],{type:'application/zip'});
}
export function explainLine(line) {
 const s=line.trim();
 if(!s)return 'Linha em branco: separa responsabilidades visualmente, sem alterar a execução.';
 if(/^(import |from |using |#include)/.test(s))return 'Importa as dependências usadas neste arquivo. A origem e o nome determinam quais símbolos ficam disponíveis.';
 if(/^(\/\/|# |\/\*|\*)/.test(s))return 'Comentário de documentação: registra a intenção e não é executado.';
 if(/^(if |if\(|if\s*\()/.test(s))return 'Verifica uma condição antes de prosseguir. Observe quais entradas levam ao ramo de falha.';
 if(/\bthrow\b|raise /.test(s))return 'Interrompe este caminho com uma falha explícita. O chamador precisa tratar ou propagar esse erro.';
 if(/\breturn\b/.test(s))return 'Devolve o resultado ao chamador e encerra este caminho da função.';
 if(/\byield\b/.test(s))return 'Produz um valor e suspende a execução; o próximo consumo retoma deste ponto.';
 if(/\bassert|check\(|rejects\(/.test(s))return 'Verifica uma propriedade do comportamento. Uma falha deve interromper o teste, tornando a regressão visível.';
 if(/\bawait\b/.test(s))return 'Espera a operação assíncrona sem bloquear o event loop. Repare no estado reservado antes dessa suspensão.';
 if(/for\s*\(|for |while\s*\(/.test(s))return 'Percorre o conjunto indicado. Identifique a condição de término e o estado alterado em cada iteração.';
 if(/^(}|\);|\]|\);|\}\);|<\/)/.test(s))return 'Fecha o bloco ou a estrutura aberta anteriormente, delimitando seu escopo.';
 if(/^(def |class |public |export |record |bool |int main|function |async function|static )/.test(s))return 'Declara um contrato ou uma unidade de comportamento. A assinatura indica entradas, saída e visibilidade.';
 if(/=/.test(s))return 'Inicializa ou atualiza um valor. Use o contexto abaixo para identificar o invariante preservado por essa atribuição.';
 return 'Esta instrução participa do bloco descrito abaixo. Confira seus argumentos, o estado lido e o efeito produzido antes de avançar.';
}
export function noteFor(notes, line) {return notes.find(([range])=>{const [a,b]=range.split('–').map(Number);return line>=a&&line<=(b||a);})?.[1] || 'Leia esta linha junto ao bloco anterior: ela conclui a estrutura ou expressão em andamento.';}
export function projectReadme(t){const contract=t.fields?'## Contrato de dados\n\nTSV com cabeçalho e até 200 registros. Cada campo é um inteiro dentro dos limites inclusivos. Na API .NET, envie as linhas como arrays em data.\n\n| Índice | Campo | Mínimo | Máximo |\n|---|---|---|---|\n'+t.fields.map((f,i)=>'| '+i+' | '+f.name+' | '+f.min+' | '+f.max+' |').join('\n')+'\n\n':'';const steps=t.steps?'## Roteiro guiado\n\n'+t.steps.map((s,i)=>(i+1)+'. '+s).join('\n\n')+'\n\n':'';const api=t.apiExample?'\nEm outro terminal, com o servidor iniciado:\n\n'+t.apiExample+'\nNo Windows PowerShell, use curl.exe no lugar do alias curl.\n':'';return `# ${t.project}\n\nLinguagem: ${t.name}\n\n## Pré-requisitos\n${t.prerequisite}\n\n## 1. Problema\n${t.challenge}\n\n## 2. Decisão de arquitetura\n${t.concept}\n\n${contract}${steps}## 3. Crie os arquivos\n${t.files.map(f=>`- ${f.name}`).join('\n')}\n\n## 4. Execute na pasta do projeto\n\`\`\`sh\n${t.run}\n\`\`\`\n\n${api}\n## 5. Resultado esperado\n\`\`\`\n${t.expected}\n\`\`\`\n\n## 6. Critérios de aceite\n${t.acceptance.map(a=>'- '+a).join('\n')}\n\n## 7. Leitura do código\n${t.files.map(f=>`### ${f.name}\n${f.notes.map(([r,n])=>`Linhas ${r}: ${n}`).join('\n\n')}`).join('\n\n')}\n\n## 8. Limites\n${t.tradeoff}\n\n## 9. Apresente no portfólio\n${t.market||''}\n\n${t.extension?'Extensão sugerida: '+t.extension:''}\n\nExplique o problema, registre a execução dos testes e mostre os contratos de entrada e saída. Inclua uma decisão descartada, a análise de complexidade e as limitações acima. Implemente uma extensão sua e documente como a validou.\n`;}
