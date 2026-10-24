import {readFile,readdir,lstat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,relative,sep,posix} from 'node:path';
import assert from 'node:assert/strict';

// A reviewed allowlist, not a claim that pattern matching proves the absence of secrets.
const root=fileURLToPath(new URL('../',import.meta.url));
const manifest=JSON.parse(await readFile(resolve(root,'PUBLIC_FILES.json'),'utf8'));
assert.equal(manifest.version,1);
assert.ok(Array.isArray(manifest.files));
assert.equal(new Set(manifest.files).size,manifest.files.length,'Duplicate allowlist path');
for(const name of manifest.files)assert.ok(!name.includes('\\')&&!name.startsWith('/')&&!name.split('/').includes('..'),'Unsafe allowlist path');
async function walk(dir,skip=new Set()){
  const result=[];
  for(const entry of await readdir(dir,{withFileTypes:true})){
    if(skip.has(entry.name))continue;
    const path=resolve(dir,entry.name),s=await lstat(path);
    assert.ok(!s.isSymbolicLink(),`Symlink excluded: ${relative(root,path)}`);
    if(s.isDirectory())result.push(...await walk(path));
    else {assert.ok(s.isFile());result.push(relative(root,path).split(sep).join('/'));}
  }
  return result.sort();
}
const actual=await walk(root,new Set(['.git','dist','node_modules']));
assert.deepEqual(actual,[...manifest.files].sort(),'Source payload differs from reviewed PUBLIC_FILES.json');
const privacyPatterns=[
  ['access token',new RegExp('(?:gh'+'p_|github_'+'pat_)[A-Za-z0-9_]{20,}')],
  ['private key',new RegExp('-----BEGIN '+'(?:RSA |EC |OPENSSH )?PRIVATE KEY-----')],
  ['owner filesystem path',new RegExp('[A-Za-z]:[\\\\/]Users[\\\\/]','i')],
  ['personal email',new RegExp('[A-Za-z0-9._%+-]+@(?:g'+'mail|out'+'look|hot'+'mail|i'+'cloud|ya'+'hoo)\\.com','i')],
  ['owner timezone',new RegExp('Europe/(?:K'+'iev|K'+'yiv)|GMT\\+0'+'300','i')]
];
let localLinks=0;
const sourceSet=new Set(actual);
for(const name of actual){
  const bytes=await readFile(resolve(root,name));
  if(/\.(?:png|jpe?g)$/i.test(name))continue;
  const text=bytes.toString('utf8');
  for(const [label,pattern] of privacyPatterns)assert.ok(!pattern.test(text),`Review ${label} in ${name}; match value intentionally suppressed`);
  if(name.endsWith('.md'))for(const match of text.matchAll(/!?\[[^\]\n]*\]\(([^\s)]+)(?:\s+[^)]*)?\)/g)){
    const link=match[1].replace(/^<|>$/g,'');
    if(/^[a-z][a-z0-9+.-]*:|^#/i.test(link))continue;
    const path=posix.normalize(posix.join(posix.dirname(name),decodeURIComponent(link.split('#')[0])));
    assert.ok(sourceSet.has(path),`Broken public documentation link in ${name}: ${path}`);localLinks++;
  }
}
const expected=['dist/.nojekyll','dist/index.html','dist/LICENSE.txt','dist/THIRD_PARTY_NOTICES.txt','dist/public/forge.svg',...actual.filter(p=>p.startsWith('src/')).map(p=>'dist/'+p)].sort();
assert.deepEqual(await walk(resolve(root,'dist')),expected,'Unexpected file in Pages artifact');
for(const file of expected){
  const source=file==='dist/LICENSE.txt'?'LICENSE':file==='dist/THIRD_PARTY_NOTICES.txt'?'THIRD_PARTY_NOTICES.md':file.slice(5);
  const output=await readFile(resolve(root,file));
  if(file.endsWith('/.nojekyll'))assert.equal(output.length,0);
  else assert.deepEqual(output,await readFile(resolve(root,source)),`Build drift: ${file}`);
}
const html=await readFile(resolve(root,'dist/index.html'),'utf8');
for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)){
  if(match[1].startsWith('#'))continue;
  assert.ok(match[1].startsWith('./'),'Entry assets must be project-subpath relative');
  assert.ok(expected.includes('dist/'+match[1].slice(2)),'Missing entry asset');
}
console.log(JSON.stringify({result:'PASS',sourceFiles:actual.length,staticFiles:expected.length,validLocalDocumentationLinks:localLinks,checks:['reviewed source allowlist','no symlinks','bounded privacy-pattern scan','local Markdown targets','static allowlist','byte-identical modules and notices','relative entry assets'],limitations:'This audit is not a general secret/security scanner or hosted CI/deployment verification.'},null,2));
