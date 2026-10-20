import {specs} from './specs.mjs';

// Este compilador é ferramenta editorial. Os downloads contêm código independente,
// sem DSL, sem gerador e sem dependência de um serviço da Forge.
export function tokens(body){
 const result=[];let note='';
 for(const line of body.split('\n')){
   if(line.trim().startsWith('//')){note=line.trim().slice(2).trim();continue;}
   for(const raw of line.match(/[^{};]+[{};]?|[{}]/g)||[]){const text=raw.trim();if(!text)continue;result.push({text,note});note='';}
 }
 return result;
}
const describe=(text,s)=>{
 const readable=text.replace(/cell\(([^,]+),(\d+)\)/g,(_,row,col)=>`${s.fields[Number(col)].name}[${row}]`).replace(/;$/,'');
 if(text.startsWith('let '))return `Inicialize a variável local: ${readable.slice(4)}. Ela guarda estado intermediário desta regra.`;
 if(text.startsWith('vector '))return `Crie um vetor de inteiros inicializado com zeros (${readable.slice(7)}); nenhum estado deve vazar entre chamadas.`;
 if(text.startsWith('for '))return `Repita ${readable.slice(4,-1).trim()}; o limite final é exclusivo. O índice identifica a posição, não um ID de negócio.`;
 if(text.startsWith('if '))return `Verifique ${readable.slice(3,-1).trim()}. Este ramo só altera o estado quando a condição é verdadeira.`;
 if(text.startsWith('while '))return `Continue enquanto ${readable.slice(6,-1).trim()}; as atualizações no corpo precisam aproximar a condição de término.`;
 if(text.startsWith('emit '))return `Acrescente ${readable.slice(5)} à resposta, preservando a ordem definida no contrato de saída.`;
 if(text.startsWith('fail'))return 'Interrompa a operação com erro de validação; a resposta parcial não pode ser apresentada como sucesso.';
 if(text==='}')return 'Finalize o bloco atual. Variáveis e alterações pertencem à responsabilidade descrita nas linhas anteriores.';
 if(text.startsWith('else'))return 'Trate explicitamente o caminho alternativo; ele só executa quando a condição anterior é falsa.';
 return `Atualize o estado com ${readable}. Confira o invariante e o exemplo de mesa no roteiro do projeto.`;
};
function expression(expr,lang){
 let x=expr.replace(/cell\(/g,'cell(data,').replace(/\bdiv\(/g,'quotient(');
 if(lang==='python')x=x.replace(/&&/g,'and').replace(/\|\|/g,'or');
 if(['java','csharp','dotnet'].includes(lang))x=x.replace(/\[([^\]]+)\]/g,'[(int)($1)]');
 return x;
}
export function compileBody(s,lang){
 let indent=lang==='python'?1:1;const lines=[],notes=[];
 const put=(code,note)=>{lines.push('    '.repeat(indent)+code);notes.push([String(lines.length),note]);};
 for(const token of tokens(s.body)){
   let t=token.text,note=token.note||describe(t,s);
   if(t==='}'){indent--;if(lang!=='python')put('}',note);continue;}
   const opens=t.endsWith('{');let match;
   if((match=t.match(/^for (\w+) in (.*?)\.\.(.*?) \{$/))){const [,name,start,end]=match;
     t=lang==='python'?`for ${name} in range(${expression(start,lang)}, ${expression(end,lang)}):`:
       `for (${['javascript','typescript'].includes(lang)?'let':'int'} ${name} = (int)(${expression(start,lang)}); ${name} < ${expression(end,lang)}; ${name}++) {`;
     if(['javascript','typescript'].includes(lang))t=t.replace('(int)','');
   }else if((match=t.match(/^vector (\w+) (.*);$/))){const [,name,size]=match,expr=expression(size,lang);
     t=lang==='python'?`${name} = [0] * (${expr})`:lang==='c'?`ll ${name}[${expr}>0?${expr}:1]; memset(${name},0,sizeof ${name});`:
       lang==='cpp'?`std::vector<ll> ${name}(${expr},0);`:['java','csharp','dotnet'].includes(lang)?`long[] ${name} = new long[(int)(${expr})];`:`const ${name} = new Array(${expr}).fill(0);`;
   }else if(t.startsWith('let ')){t=t.replace(/^let /,lang==='python'?'':['javascript','typescript'].includes(lang)?'let ':['java','csharp','dotnet'].includes(lang)?'long ':'ll ');t=expression(t,lang);
   }else if(t.startsWith('emit ')){const e=expression(t.slice(5,-1),lang);t=lang==='python'?`out.append(${e})`:lang==='c'?`out.values[out.count++] = ${e};`:lang==='cpp'?`out.push_back(${e});`:lang==='java'?`out.add((long)(${e}));`:['csharp','dotnet'].includes(lang)?`output.Add(${e});`:`out.push(${e});`;
   }else if(t==='fail;'){t=lang==='python'?`raise ValueError("Regra de negócio inválida")`:lang==='c'?`out.error=1; return out;`:lang==='cpp'?`throw std::invalid_argument("Regra de negocio invalida");`:lang==='java'?`throw new IllegalArgumentException("Regra de negocio invalida");`:['csharp','dotnet'].includes(lang)?`throw new ArgumentException("Regra de negócio inválida");`:`throw new RangeError("Regra de negócio inválida");`;
   }else if(t.startsWith('if ')||t.startsWith('while ')){const keyword=t.startsWith('if ')?'if':'while',expr=expression(t.slice(keyword.length+1,-1).trim(),lang);t=lang==='python'?`${keyword} ${expr}:`:`${keyword} (${expr}) {`;
   }else if(t==='else {'){t=lang==='python'?'else:':'else {';
   }else t=expression(t,lang);
   if(lang==='python')t=t.replace(/;$/,'');
   put(t,note);if(opens)indent++;
 }
 if(indent!==1)throw Error(`Blocos não balanceados: ${s.id}`);
 return {code:lines.join('\n'),notes};
}
function file(name,code,section='Infraestrutura',specific=[]){
 const lines=code.trim().split('\n');const notes=lines.map((line,i)=>[String(i+1),specific.find(n=>Number(n[0])===i+1)?.[1]||
 (!line.trim()?'Separação visual entre responsabilidades.':line.trim().startsWith('//')||line.trim().startsWith('# ')?line.trim().replace(/^\/\/|^#/,'').trim():
 `${section}: ${line.trim().slice(0,140)}. Consulte o contrato e os comandos do README para entender como este arquivo participa da execução.`)]);
 return {name,code:lines.join('\n'),notes};
}
function domainFile(name,prefix,body,suffix,compiled){
 const offset=prefix.trim().split('\n').length;
 return file(name,prefix.trim()+'\n'+body+'\n'+suffix,'Núcleo de domínio',compiled.notes.map(([line,note])=>[String(Number(line)+offset),note]));
}
const schema=s=>s.fields.map(f=>[f.min,f.max]);
const header=s=>s.fields.map(f=>f.name).join('\t');
const jsValidation=s=>`  if (!Array.isArray(data) || data.length > 200) throw new RangeError('Até 200 registros');
  const bounds = ${JSON.stringify(schema(s))};
  for (const row of data) {
    if (!Array.isArray(row) || row.length !== bounds.length) throw new RangeError('Colunas inválidas');
    row.forEach((value, index) => {
      if (!Number.isSafeInteger(value) || value < bounds[index][0] || value > bounds[index][1]) throw new RangeError('Valor fora do contrato');
    });
  }`;
const helpersJs=`const cell = (data, row, col) => data[row][col];
const minv = Math.min, maxv = Math.max, absv = Math.abs;
const quotient = (a, b) => Math.trunc(a / b);`;

function jsFiles(s,lang){
 const ts=lang==='typescript',ext=ts?'ts':'mjs',body=compileBody(s,lang);
 let prefix=`${helpersJs}\nexport function solve(data) {\n${jsValidation(s)}\n  const n = data.length;\n  const out = [];`;
 if(ts)prefix=prefix.replace('(data, row, col)','(data: number[][], row: number, col: number)').replace('(a, b)','(a: number, b: number)').replace('solve(data)','solve(data: number[][]): number[]').replace('const out = []','const out: number[] = []');
 const imports=`import { solve } from './domain.${ts?'js':'mjs'}';`;
 const io=`import { readFileSync } from 'node:fs';
${imports}
const text = readFileSync(process.argv[2] || 'input.tsv', 'utf8').replaceAll('\\r', '').trimEnd();
const [header, ...rows] = text.split('\\n');
if (header !== ${JSON.stringify(header(s))}) throw new Error('Cabeçalho inválido');
const data = rows.filter(Boolean).map(row => row.split('\\t').map(value => {
  if (!/^-?\\d+$/.test(value)) throw new Error('Inteiro inválido');
  return Number(value);
}));
console.log(JSON.stringify(solve(data)));`;
 const test=`import test from 'node:test';
import assert from 'node:assert/strict';
${imports}
const cases = ${JSON.stringify(s.cases,null,2)};
cases.forEach((item,index)=>test('caso '+index,()=>{
  if (item.expected === null) assert.throws(()=>solve(item.input));
  else assert.deepEqual(solve(item.input),item.expected);
}));
test('valida limites e forma',()=>{
  assert.throws(()=>solve([[${s.fields.map((f,i)=>i===0?f.min-1:f.min).join(',')}]]));
  assert.throws(()=>solve([[]]));
  assert.throws(()=>solve(Array.from({length:201},()=>[${s.fields.map(f=>f.min).join(',')}])));
});`;
 const files=[domainFile(`domain.${ext}`,prefix,body.code,'  return out;\n}',body),file(`main.${ext}`,io,'Adaptador CLI: parsing estrito de TSV, execução e serialização JSON'),file(`domain.test.${ext}`,test,'Testes independentes: os resultados esperados foram escritos no contrato')];
 if(ts){files.push(file('package.json',JSON.stringify({name:s.id,private:true,type:'module',scripts:{build:'tsc',test:'tsc && node --test dist/domain.test.js',start:'node dist/main.js'},devDependencies:{typescript:'5.9.3','@types/node':'22.19.19'}},null,2),'Manifesto de dependências'),file('tsconfig.json',JSON.stringify({compilerOptions:{target:'ES2022',module:'NodeNext',moduleResolution:'NodeNext',strict:true,outDir:'dist',skipLibCheck:true},include:['*.ts']},null,2),'Configuração do compilador'));}
 else files.push(file('package.json',JSON.stringify({name:s.id,private:true,type:'module',scripts:{test:'node --test domain.test.mjs',start:'node main.mjs'}},null,2),'Comandos do projeto; usa apenas módulos nativos'));
 return files;
}
function pyFiles(s){const body=compileBody(s,'python');return [domainFile('domain.py',`import math

def cell(data, row, col):
    return data[row][col]

minv, maxv, absv = min, max, abs
def quotient(a, b):
    return math.trunc(a / b)

def solve(data):
    bounds = ${JSON.stringify(schema(s))}
    if not isinstance(data, list) or len(data) > 200:
        raise ValueError('Até 200 registros')
    for row in data:
        if not isinstance(row, list) or len(row) != len(bounds):
            raise ValueError('Colunas inválidas')
        for value, (low, high) in zip(row, bounds):
            if type(value) is not int or not low <= value <= high:
                raise ValueError('Valor fora do contrato')
    n = len(data)
    out = []`,body.code,'    return out',body),
file('main.py',`import csv
import json
import re
import sys
from domain import solve

with open(sys.argv[1] if len(sys.argv)>1 else 'input.tsv', encoding='utf-8', newline='') as source:
    reader = csv.reader(source, delimiter='\\t')
    if next(reader, None) != ${JSON.stringify(s.fields.map(f=>f.name))}:
        raise ValueError('Cabeçalho inválido')
    data = []
    for row in reader:
        if not row: continue
        if any(not re.fullmatch(r'-?\\d+', value) for value in row):
            raise ValueError('Inteiro inválido')
        data.append([int(value) for value in row])
print(json.dumps(solve(data)))`,'Adaptador CLI: leitura incremental e validação do protocolo'),
file('test_domain.py',`import unittest
from domain import solve

CASES = ${JSON.stringify(s.cases).replaceAll('null','None')}
class DomainTest(unittest.TestCase):
    def test_contract(self):
        for case in CASES:
            with self.subTest(case=case):
                if case['expected'] is None:
                    with self.assertRaises(ValueError): solve(case['input'])
                else:
                    self.assertEqual(solve(case['input']), case['expected'])
    def test_validation(self):
        for invalid in [[[]], [[${s.fields.map((f,i)=>i===0?f.min-1:f.min).join(',')}]], [[${s.fields.map(f=>f.min).join(',')}]]*201]:
            with self.assertRaises(ValueError): solve(invalid)
if __name__ == '__main__': unittest.main()`,'Testes: casos de negócio, limites e forma inválida')];}

const longMatrix=rows=>rows.length?'new long[][] { '+rows.map(r=>'new long[] { '+r.join(', ')+' }').join(', ')+' }':'new long[0][]';
const longArray=arr=>'new long[] { '+arr.join(', ')+' }';
function csFiles(s,lang){const body=compileBody(s,lang),api=lang==='dotnet';return [domainFile('Domain.cs',`using System;
using System.Collections.Generic;
public static class Domain {
  static long cell(long[][] data, long row, long col) => data[(int)row][(int)col];
  static long minv(long a,long b) => Math.Min(a,b);
  static long maxv(long a,long b) => Math.Max(a,b);
  static long absv(long a) => Math.Abs(a);
  static long quotient(long a,long b) => a/b;
  public static long[] Solve(long[][] data) {
    if (data is null || data.Length>200) throw new ArgumentException("Até 200 registros");
    long[][] bounds = ${longMatrix(schema(s))};
    foreach(var row in data) {
      if(row is null || row.Length!=bounds.Length) throw new ArgumentException("Colunas inválidas");
      for(int col=0;col<row.Length;col++)
        if(row[col]<bounds[col][0] || row[col]>bounds[col][1]) throw new ArgumentException("Valor fora do contrato");
    }
    int n=data.Length;
    var output=new List<long>();`,body.code,'    return output.ToArray();\n  }\n}',body),
file('Tests.cs',`using System;
using System.Linq;
public static class Tests {
  static void Check(long[][] input,long[]? expected) {
    try {
      var actual=Domain.Solve(input);
      if(expected is null || !actual.SequenceEqual(expected)) throw new Exception("Resultado inesperado");
    } catch(ArgumentException) { if(expected is not null) throw; }
  }
  public static void Run() {
    ${s.cases.map(c=>`Check(${longMatrix(c.input)},${c.expected===null?'null':longArray(c.expected)});`).join('\n    ')}
    Check(${longMatrix([s.fields.map((f,i)=>i===0?f.min-1:f.min)])},null);
    Check(new long[][]{Array.Empty<long>()},null);
    Check(Enumerable.Range(0,201).Select(_=>${longArray(s.fields.map(f=>f.min))}).ToArray(),null);
    Console.WriteLine("Todos os casos passaram.");
  }
}`,'Testes: exceção esperada é diferente de resultado incorreto'),
file('InputReader.cs',`using System;
using System.IO;
using System.Linq;
using System.Globalization;
using System.Text.RegularExpressions;
public static class InputReader {
  public static long[][] Read(string path) {
    var lines=File.ReadAllLines(path);
    if(lines.Length==0 || lines[0]!=${JSON.stringify(header(s))}) throw new ArgumentException("Cabeçalho inválido");
    return lines.Skip(1).Where(line=>line.Length>0).Select(line=>line.Split('\\t').Select(value=>{
      if(!Regex.IsMatch(value,@"^-?[0-9]+$") || !long.TryParse(value,NumberStyles.AllowLeadingSign,CultureInfo.InvariantCulture,out var number))
        throw new ArgumentException("Inteiro inválido");
      return number;
    }).ToArray()).ToArray();
  }
}`,'Adaptador de entrada: cabeçalho e inteiros estritos'),
file('Program.cs',api?`using System.Text.Json;
if(args.Contains("--test")) { Tests.Run(); return; }
var builder=WebApplication.CreateBuilder(args);
var app=builder.Build();
app.MapGet("/health",()=>Results.Ok(new {status="ok"}));
app.MapPost("/solve",(SolveRequest request)=>{
  try { return Results.Ok(new {result=Domain.Solve(request.Data)}); }
  catch(ArgumentException error) { return Results.BadRequest(new {error=error.Message}); }
});
app.Run();
record SolveRequest(long[][] Data);`:
`using System.Text.Json;
if(args.Contains("--test")) { Tests.Run(); return; }
try { Console.WriteLine(JsonSerializer.Serialize(Domain.Solve(InputReader.Read(args.Length>0?args[0]:"input.tsv")))); }
catch(ArgumentException error) { Console.Error.WriteLine(error.Message); Environment.ExitCode=1; }`,'Ponto de entrada: testa ou expõe a regra com tratamento de falhas'),
file('Project.csproj',`<Project Sdk="Microsoft.NET.Sdk${api?'.Web':''}">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <CheckForOverflowUnderflow>true</CheckForOverflowUnderflow>
  </PropertyGroup>
</Project>`,'Projeto .NET 10 sem dependências externas'),
file('NuGet.Config','<configuration><packageSources><clear /></packageSources></configuration>','Sem pacotes: build usa apenas os reference packs do SDK .NET 10 instalado')];}

function javaFiles(s){const body=compileBody(s,'java');const matrix=rows=>'new long[][] { '+rows.map(r=>'{'+r.join(',')+'}').join(',')+' }';const array=arr=>'new long[] {'+arr.join(',')+'}';return [domainFile('Domain.java',`import java.util.*;
public final class Domain {
  static long cell(long[][] data,long row,long col){return data[(int)row][(int)col];}
  static long minv(long a,long b){return Math.min(a,b);}
  static long maxv(long a,long b){return Math.max(a,b);}
  static long absv(long a){return Math.abs(a);}
  static long quotient(long a,long b){return a/b;}
  public static long[] solve(long[][] data) {
    long[][] bounds=${matrix(schema(s))};
    if(data==null || data.length>200)throw new IllegalArgumentException("Ate 200 registros");
    for(long[] row:data){
      if(row==null || row.length!=bounds.length)throw new IllegalArgumentException("Colunas invalidas");
      for(int col=0;col<row.length;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw new IllegalArgumentException("Valor fora do contrato");
    }
    int n=data.length;
    var out=new ArrayList<Long>();`,body.code,'    return out.stream().mapToLong(Long::longValue).toArray();\n  }\n}',body),
file('Main.java',`import java.nio.file.*;
import java.util.*;
public class Main {
  public static void main(String[] args) throws Exception {
    var lines=Files.readAllLines(Path.of(args.length>0?args[0]:"input.tsv"));
    if(lines.isEmpty() || !lines.get(0).equals(${JSON.stringify(header(s))}))throw new IllegalArgumentException("Cabecalho invalido");
    var rows=new ArrayList<long[]>();
    for(String line:lines.subList(1,lines.size())){
      if(line.isEmpty())continue;
      String[] values=line.split("\\t",-1);
      long[] row=new long[values.length];
      for(int i=0;i<values.length;i++){
        if(!values[i].matches("-?[0-9]+"))throw new IllegalArgumentException("Inteiro invalido");
        row[i]=Long.parseLong(values[i]);
      }
      rows.add(row);
    }
    System.out.println(Arrays.toString(Domain.solve(rows.toArray(long[][]::new))));
  }
}`,'CLI Java: leitura UTF-8, contrato de entrada e saída'),
file('Tests.java',`import java.util.*;
public class Tests {
  static void check(long[][] input,long[] expected){
    try { var actual=Domain.solve(input); if(expected==null || !Arrays.equals(actual,expected))throw new AssertionError("Resultado inesperado"); }
    catch(IllegalArgumentException error){ if(expected!=null)throw error; }
  }
  public static void main(String[] args){
    ${s.cases.map(c=>`check(${matrix(c.input)},${c.expected===null?'null':array(c.expected)});`).join('\n    ')}
    check(${matrix([s.fields.map((f,i)=>i===0?f.min-1:f.min)])},null);
    check(new long[][]{new long[0]},null);
    check(new long[201][${s.fields.length}],null);
    System.out.println("Todos os casos passaram.");
  }
}`,'Testes de contrato Java: resultados e erros esperados')];}

function nativeFiles(s,lang){const cpp=lang==='cpp',body=compileBody(s,lang);const h=cpp?'domain.hpp':'domain.h';
 const prefix=cpp?`#pragma once
#include <vector>
#include <stdexcept>
#include <algorithm>
#include <cstdlib>
using ll=long long;
using Matrix=std::vector<std::vector<ll>>;
inline ll cell(const Matrix& data,ll row,ll col){return data.at(row).at(col);}
inline ll minv(ll a,ll b){return std::min(a,b);}
inline ll maxv(ll a,ll b){return std::max(a,b);}
inline ll absv(ll a){return std::llabs(a);}
inline ll quotient(ll a,ll b){return a/b;}
inline std::vector<ll> solve(const Matrix& data){
  const ll bounds[${s.fields.length}][2]={${schema(s).map(r=>'{'+r.join(',')+'}').join(',')}};
  if(data.size()>200)throw std::invalid_argument("Ate 200 registros");
  for(const auto& row:data){
    if(row.size()!=${s.fields.length})throw std::invalid_argument("Colunas invalidas");
    for(int col=0;col<${s.fields.length};col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw std::invalid_argument("Valor fora do contrato");
  }
  int n=static_cast<int>(data.size());
  std::vector<ll> out;`:
`#include "domain.h"
#include <string.h>
ll cell(const Matrix* data,ll row,ll col){return data->values[row][col];}
ll minv(ll a,ll b){return a<b?a:b;}
ll maxv(ll a,ll b){return a>b?a:b;}
ll absv(ll a){return a<0?-a:a;}
ll quotient(ll a,ll b){return a/b;}
Result solve(const Matrix* data){
  Result out={0};
  const ll bounds[${s.fields.length}][2]={${schema(s).map(r=>'{'+r.join(',')+'}').join(',')}};
  if(!data || data->n<0 || data->n>200 || data->cols!=${s.fields.length}){out.error=1;return out;}
  for(int i=0;i<data->n;i++)for(int col=0;col<${s.fields.length};col++)
    if(data->values[i][col]<bounds[col][0] || data->values[i][col]>bounds[col][1]){out.error=1;return out;}
  int n=data->n;`;
 
 const files=[domainFile(cpp?h:'domain.c',prefix,body.code,'  return out;\n}',body)];
 if(!cpp)files.push(file(h,`#ifndef DOMAIN_H
#define DOMAIN_H
typedef long long ll;
typedef struct {int n;int cols;ll values[200][8];} Matrix;
typedef struct {int count;int error;ll values[2000];} Result;
Result solve(const Matrix* data);
#endif`,'Contrato C: limites de memória explícitos e erro separado do resultado'));
 files.push(file(cpp?'main.cpp':'main.c',cpp?`#include "domain.hpp"
#include <fstream>
#include <iostream>
#include <sstream>
#include <string>
int main(int argc,char** argv){
  try{
    std::ifstream input(argc>1?argv[1]:"input.tsv");
    std::string line;
    if(!std::getline(input,line))throw std::invalid_argument("Arquivo vazio");
    if(!line.empty()&&line.back()=='\\r')line.pop_back();
    if(line!=${JSON.stringify(header(s))})throw std::invalid_argument("Cabecalho invalido");
    Matrix data;
    while(std::getline(input,line)){
      if(!line.empty()&&line.back()=='\\r')line.pop_back();
      if(line.empty())continue;
      if(line.back()=='\\t')throw std::invalid_argument("Campo vazio");
      std::istringstream stream(line);std::string part;std::vector<ll> row;
      while(std::getline(stream,part,'\\t')){
        auto start=part.size()>0&&part[0]=='-'?1u:0u;
        if(start==part.size() || part.find_first_not_of("0123456789",start)!=std::string::npos)throw std::invalid_argument("Inteiro invalido");
        row.push_back(std::stoll(part));
      }
      data.push_back(row);
      if(data.size()>200)throw std::invalid_argument("Limite excedido");
    }
    auto result=solve(data);std::cout<<"[";
    for(std::size_t i=0;i<result.size();i++){if(i)std::cout<<",";std::cout<<result[i];}
    std::cout<<"]\\n";
  }catch(const std::exception& error){std::cerr<<error.what()<<"\\n";return 1;}
}`:
`#include "domain.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <ctype.h>
int main(int argc,char** argv){
  FILE* input=fopen(argc>1?argv[1]:"input.tsv","r");
  if(!input){perror("input");return 1;}
  Matrix data={0};data.cols=${s.fields.length};char line[4096];int valid=1;
  if(!fgets(line,sizeof line,input)){fclose(input);return 1;}
  line[strcspn(line,"\\r\\n")]=0;
  if(strcmp(line,${JSON.stringify(header(s))})!=0){fclose(input);return 1;}
  while(fgets(line,sizeof line,input)){
    line[strcspn(line,"\\r\\n")]=0;if(!line[0])continue;
    if(data.n==200){valid=0;break;}
    char* cursor=line;
    for(int col=0;col<data.cols;col++){
      char* end;char* digits=cursor+(*cursor=='-');
      if(!isdigit((unsigned char)*digits)){valid=0;break;}
      errno=0;ll value=strtoll(cursor,&end,10);
      if(errno || end==cursor || (col<data.cols-1?*end!='\\t':*end!=0)){valid=0;break;}
      data.values[data.n][col]=value;cursor=end+(*end!=0);
    }
    if(!valid)break;data.n++;
  }
  fclose(input);if(!valid){fprintf(stderr,"Entrada invalida\\n");return 1;}
  Result result=solve(&data);if(result.error){fprintf(stderr,"Regra invalida\\n");return 1;}
  printf("[");for(int i=0;i<result.count;i++){if(i)printf(",");printf("%lld",result.values[i]);}puts("]");return 0;
}`,'Adaptador nativo: parser TSV estrito, limites, ownership do arquivo e erro explícito'));
 const cases=[...s.cases,{input:[s.fields.map((f,i)=>i===0?f.min-1:f.min)],expected:null}];
 files.push(file(cpp?'tests.cpp':'tests.c',cpp?`#include "domain.hpp"
#include <iostream>
void check(const Matrix& input,const std::vector<ll>& expected,bool failure){
  try{auto result=solve(input);if(failure || result!=expected)throw std::runtime_error("Resultado inesperado");}
  catch(const std::invalid_argument&){if(!failure)throw;}
}
int main(){
${cases.map(c=>`  check({${c.input.map(r=>'{'+r.join(',')+'}').join(',')}},{${(c.expected||[]).join(',')}},${c.expected===null?'true':'false'});`).join('\n')}
  std::cout<<"Todos os casos passaram.\\n";
}`:
`#include "domain.h"
#include <stdio.h>
#include <stdlib.h>
void check(Matrix input,const ll* expected,int length,int failure){
  Result result=solve(&input);
  if((!!result.error)!=failure){fprintf(stderr,"Erro inesperado\\n");exit(1);}
  if(failure)return;
  if(result.count!=length){fprintf(stderr,"Tamanho inesperado\\n");exit(1);}
  for(int i=0;i<length;i++)if(result.values[i]!=expected[i]){fprintf(stderr,"Valor inesperado\\n");exit(1);}
}
int main(void){
${cases.map((c,i)=>`  Matrix input${i}={.n=${c.input.length},.cols=${s.fields.length},.values={${c.input.length?c.input.map(r=>'{'+r.join(',')+'}').join(','):'{0}'}}};
  ll expected${i}[]={${c.expected?.length?c.expected.join(','):'0'}};
  check(input${i},expected${i},${c.expected?.length||0},${c.expected===null?1:0});`).join('\n')}
  puts("Todos os casos passaram.");return 0;
}`,'Testes nativos: não dependem de assert, portanto continuam ativos em builds release'));
 return files;
}

export const commands={python:'python -m unittest -v\npython main.py input.tsv',javascript:'node --test domain.test.mjs\nnode main.mjs input.tsv',typescript:'npm install\nnpm test\nnode dist/main.js input.tsv',csharp:'dotnet run --project Project.csproj -- --test\ndotnet run --project Project.csproj -- input.tsv',dotnet:'dotnet run --project Project.csproj -- --test\ndotnet run --project Project.csproj --urls http://localhost:5080',java:'javac --release 17 Domain.java Main.java Tests.java\njava Tests\njava Main input.tsv',c:'cc -std=c17 -Wall -Wextra domain.c tests.c -o tests\n./tests\ncc -std=c17 -Wall -Wextra domain.c main.c -o app\n./app input.tsv',cpp:'c++ -std=c++17 -Wall -Wextra tests.cpp -o tests\n./tests\nc++ -std=c++17 -Wall -Wextra main.cpp -o app\n./app input.tsv'};
export const idioms={python:'Funções puras, validação de tipos em runtime, listas e unittest. A CLI usa o módulo csv e mantém leitura de arquivos separada da regra.',javascript:'Módulos ESM, Number.isSafeInteger, arrays e testes node:test. Separar IO da função pura permite reutilizar o núcleo em um servidor.',typescript:'Tipos explícitos no núcleo, strict no compilador e validação em runtime. Uma anotação TypeScript não valida JSON recebido.',csharp:'Métodos estáticos puros, long, List<long> e exceções de contrato. Overflow é verificado pelo projeto; os adaptadores não contêm regras de negócio.',dotnet:'ASP.NET Core Minimal API, DTO de entrada, status HTTP e domínio sem dependência de HTTP. Entradas inválidas retornam 400; uma chamada usa apenas estado local.',java:'Tipos long, arrays, ArrayList e exceções. O núcleo não acessa arquivo nem estado global, facilitando testes e integração futura com serviços.',c:'Buffers de capacidade explícita, structs, validação antes de indexar e resultado com flag de erro. O adaptador é responsável por fechar o arquivo.',cpp:'RAII, std::vector, referências const e exceções. O arquivo é fechado pelo destrutor e a memória acompanha a vida dos containers.'};
export function makeProject(s,track,index){
 const lang=track.id;
 const files=['javascript','typescript'].includes(lang)?jsFiles(s,lang):lang==='python'?pyFiles(s):['csharp','dotnet'].includes(lang)?csFiles(s,lang):lang==='java'?javaFiles(s):nativeFiles(s,lang);
 const example=s.cases.find(c=>c.expected!==null);
 files.push(file('input.tsv',header(s)+'\n'+example.input.map(r=>r.join('\t')).join('\n'),'Fixture de entrada: a primeira linha nomeia as colunas; registros usam TAB'));
 if(lang==='dotnet')files.push(file('request.json',JSON.stringify({data:example.input},null,2),'Corpo JSON para POST /solve'));
 return {...track,id:`${lang}--${s.id}`,trackId:lang,number:index+2,project:s.title,title:s.title,description:s.goal,area:s.area,level:s.level,tags:[s.area,lang==='dotnet'?'API HTTP':'CLI',s.level],minutes:90+index,prerequisite:track.prerequisite+(lang==='dotnet'||lang==='csharp'?' Para este projeto adicional, instale SDK .NET 10.':''),concept:s.decision+' '+idioms[lang],tradeoff:s.limit+' '+(lang==='dotnet'?'A API é um laboratório local sem autenticação, persistência ou controle de abuso; não a exponha diretamente como serviço público.':'O projeto é um componente executável de escopo definido; não é uma plataforma empresarial pronta.'),challenge:s.goal,acceptance:s.cases.map((c,i)=>c.expected===null?`Caso ${i+1}: a entrada inválida deve falhar, sem resposta parcial.`:`Caso ${i+1}: entrada ${JSON.stringify(c.input)} deve produzir ${JSON.stringify(c.expected)}.`).concat(['Rejeitar colunas incorretas, valores fora dos limites e mais de 200 registros.']),run:commands[lang],expected:lang==='dotnet'?JSON.stringify({result:example.expected}):JSON.stringify(example.expected),files,fields:s.fields,extension:s.extension,market:`Aplicação: ${s.area}. Este componente resolve uma decisão recorrente de produto ou infraestrutura; o valor do portfólio está em demonstrar invariantes, testes e os limites da solução.`,steps:[`Defina o contrato: ${s.goal}`,`Crie os arquivos de domínio e leia a decisão: ${s.decision}`,`Implemente o adaptador da linguagem: ${idioms[lang]}`,`Execute os testes antes de usar input.tsv. Os valores esperados são fixos e independentes do retorno calculado.`,`Faça uma extensão autoral: ${s.extension}`],apiExample:lang==='dotnet'?'curl -X POST http://localhost:5080/solve -H "Content-Type: application/json" --data-binary @request.json':null};
}
export function newProjects(tracks){return tracks.flatMap(t=>specs.map((s,i)=>makeProject(s,t,i)));}
