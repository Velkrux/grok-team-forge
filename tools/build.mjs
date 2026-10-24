import {mkdir,copyFile,readdir,writeFile} from 'node:fs/promises';
const root=new URL('../',import.meta.url),dist=new URL('../dist/',import.meta.url);
await mkdir(dist,{recursive:true});await copyFile(new URL('index.html',root),new URL('index.html',dist));
for(const folder of ['src','public']){
  const target=new URL(folder+'/',dist);await mkdir(target,{recursive:true});
  for(const name of await readdir(new URL(folder+'/',root))){if(folder==='public'&&name!=='forge.svg')continue;await copyFile(new URL(folder+'/'+name,root),new URL(name,target));}
}
await writeFile(new URL('.nojekyll',dist),'');
await copyFile(new URL('LICENSE',root),new URL('LICENSE.txt',dist));
await copyFile(new URL('THIRD_PARTY_NOTICES.md',root),new URL('THIRD_PARTY_NOTICES.txt',dist));
console.log('Build complete: dist/ — portable static files, no runtime dependency or model request.');
