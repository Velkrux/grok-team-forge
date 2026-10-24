/** @typedef {'releases'|'competitors'|'github'|'custom'} MissionKind */
/** @typedef {{id:string,name:string,role:string,responsibility:string,inputs:string,outputs:string,allowed:string,forbidden:string,review:string}} Agent */
/** @typedef {{freshness:boolean,evidence:boolean,timestamps:boolean,knownSources:boolean,conflicts:boolean,untrustedAsData:boolean,scopedApproval:boolean}} Rules */
/** @typedef {{id:string,mission:string,kind:MissionKind,title:string,revision:number,agents:Agent[],handoffs:{id:string,from:string,to:string,name:string,requiredFields:string[]}[],rules:Rules}} Team */

export const MISSIONS = Object.freeze([
  {id:'releases',label:'AI Model Release Monitor',short:'AI releases',icon:'◈',mission:'Monitor AI model releases, verify official announcements, compare meaningful changes and prepare a weekly briefing.'},
  {id:'competitors',label:'Competitor Research Team',short:'Competitor research',icon:'◎',mission:'Research competitor product changes from public sources, preserve evidence and prepare a comparison for human review.'},
  {id:'github',label:'GitHub Release Notes Assistant',short:'GitHub release notes',icon:'⌘',mission:'Review GitHub release notes and merged changes, verify references and draft a clear changelog for human approval.'}
]);

export const RULES = Object.freeze([
  {key:'freshness',label:'Reporting window',description:'Reject source material outside the fixture’s seven-day reporting window.',fix:'Require a seven-day freshness check before a source enters the briefing.'},
  {key:'evidence',label:'Evidence required',description:'Reject a handoff that omits source identifiers.',fix:'Require source_ids in every research handoff.'},
  {key:'timestamps',label:'Source timestamps',description:'Reject a handoff without its applicable source date.',fix:'Require observed_at alongside the source reference.'},
  {key:'knownSources',label:'Known source IDs',description:'Validate identifiers against the trusted source registry.',fix:'Reject source IDs absent from the fixture registry.'},
  {key:'conflicts',label:'Preserve disagreements',description:'Keep both conflicting official claims and mark the result unresolved.',fix:'Preserve both official source IDs and route the conflict to human review.'},
  {key:'untrustedAsData',label:'Untrusted text is data',description:'Quarantine instructions and approval claims found inside source text.',fix:'Treat source instructions as quoted data; they cannot change the workflow.'},
  {key:'scopedApproval',label:'Scoped human approval',description:'Require an explicit human approval matching the exact external action.',fix:'Check approval actor, scope and action ID; a draft approval cannot authorize publication.'}
]);

const commonForbidden='No external sending, publishing, purchases, permission changes or production writes.';
const role=(id,name,responsibility,inputs,outputs)=>({id,name,role:name,responsibility,inputs,outputs,allowed:'Read provided public sources; prepare local artifacts.',forbidden:commonForbidden,review:'Cite source IDs and dates. Preserve uncertainty. Human reviews the final result.'});

export function classifyMission(text){
  if(/github|changelog|merged|pull request/i.test(text)) return 'github';
  if(/competitor|competition|market research/i.test(text)) return 'competitors';
  if(/model|release|announcement/i.test(text)) return 'releases';
  return 'custom';
}

/** @returns {Team} */
export function createTeam(mission, requested='auto'){
  const clean=String(mission).trim();
  if(clean.length<12||clean.length>1600) throw new Error('Describe a mission in 12–1,600 characters.');
  const kind=requested==='auto'?classifyMission(clean):requested;
  if(!['releases','competitors','github','custom'].includes(kind)) throw new Error('Unknown mission template.');
  let agents;
  if(kind==='releases') agents=[
    role('scout','Scout','Find relevant model announcements and preserve their original source records.','Mission, reporting window, official source list','Source packet with IDs, dates and claim excerpts'),
    role('verifier','Verifier','Check source authority, dates, scope and disagreement. Never invent certainty.','Source packet','Verified packet with uncertainty and rejected-source reasons'),
    role('analyst','Analyst','Explain meaningful capability changes and the limits of the available evidence.','Verified packet','Comparison with cited changes and open questions'),
    role('reporter','Reporter','Prepare a useful weekly briefing for human review.','Cited comparison','Draft briefing; no external publication')];
  else if(kind==='competitors') agents=[
    role('researcher','Researcher','Collect relevant competitor changes using public, attributable material.','Mission, competitors, public sources','Dated source packet'),
    role('reviewer','Reviewer','Validate comparisons, preserve uncertainty and reject unsupported claims.','Dated source packet','Reviewed comparison and unresolved questions'),
    role('editor','Editor','Turn the comparison into a concise decision brief.','Reviewed comparison','Human-review draft')];
  else if(kind==='github') agents=[
    role('collector','Collector','Collect supplied release entries and merged-change references.','Repository scope, release window, provided references','Change packet with release/PR IDs and dates'),
    role('auditor','Auditor','Check references and distinguish released, planned and uncertain changes.','Change packet','Audited change list with caveats'),
    role('writer','Writer','Draft release notes grounded in the audited change list.','Audited change list','Release-note draft awaiting human approval')];
  else agents=[
    role('intake','Intake','Collect and structure the inputs for this user-defined mission.','User mission and supplied source material','Attributed input packet'),
    role('reviewer','Reviewer','Check evidence, scope, dates and uncertainty before drafting.','Attributed input packet','Reviewed packet and open questions'),
    role('writer','Writer','Prepare the requested local deliverable from reviewed inputs.','Reviewed packet','Draft for human review')];
  return {id:'forge-team',mission:clean,kind,title:MISSIONS.find(m=>m.id===kind)?.label||'Custom mission workspace',revision:1,agents,
    handoffs:agents.slice(0,-1).map((a,i)=>({id:`h${i+1}`,from:a.id,to:agents[i+1].id,name:i===0?'Source packet':i===1?'Verified evidence':'Cited analysis',requiredFields:['source_ids','claim','uncertainty']})),
    rules:{freshness:false,evidence:true,timestamps:false,knownSources:true,conflicts:false,untrustedAsData:false,scopedApproval:false}};
}

export const clone=value=>structuredClone(value);
export function fingerprint(team){
  // Stable configuration identity for stale-proposal checks; not a security signature.
  let hash=2166136261;
  for(const c of JSON.stringify(team)){hash^=c.charCodeAt(0);hash=Math.imul(hash,16777619);}
  return (hash>>>0).toString(16).padStart(8,'0');
}

export function setRule(team,key,value){
  if(!RULES.some(r=>r.key===key)||typeof value!=='boolean') throw new Error('Invalid rule change.');
  const next=clone(team);next.rules[key]=value;next.revision++;
  const managedField={evidence:'source_ids',timestamps:'observed_at',conflicts:'conflicting_source_ids'}[key];
  next.handoffs.forEach(h=>{
    if(!managedField)return;
    if(value&&!h.requiredFields.includes(managedField))h.requiredFields.push(managedField);
    if(!value)h.requiredFields=h.requiredFields.filter(f=>f!==managedField);
  });
  return next;
}

export function editAgent(team,id,field,value){
  const keys=['name','responsibility','inputs','outputs','allowed','forbidden','review'];
  if(!keys.includes(field)||typeof value!=='string'||!value.trim()||value.length>1400)throw new Error('Use a nonempty field of at most 1,400 characters.');
  const next=clone(team), agent=next.agents.find(a=>a.id===id);
  if(!agent)throw new Error('Unknown agent.');
  agent[field]=value.trim();if(field==='name')agent.role=value.trim();next.revision++;return next;
}

export function editHandoff(team,id,fields,destination){
  if(!Array.isArray(fields)||fields.length>12||fields.some(f=>!/^\w{1,40}$/.test(f)))throw new Error('Use up to 12 field names: letters, numbers and underscores.');
  const next=clone(team),h=next.handoffs.find(h=>h.id===id);if(!h)throw new Error('Unknown handoff.');
  if(destination!==undefined){if(destination===h.from||!next.agents.some(a=>a.id===destination))throw new Error('Choose another valid agent.');h.to=destination;
    const reaches=(node,target,seen=new Set())=>{if(node===target)return true;if(seen.has(node))return false;seen.add(node);return next.handoffs.filter(x=>x.from===node).some(x=>reaches(x.to,target,seen));};
    if(reaches(h.to,h.from))throw new Error('This route creates a cycle. Choose a later handoff destination.');}
  h.requiredFields=[...new Set(fields)];next.revision++;return next;
}

export function validateTeam(value){
  if(!value||typeof value!=='object')return false;
  try{
    if(!['releases','competitors','github','custom'].includes(value.kind)||typeof value.mission!=='string'||value.mission.length<12||value.mission.length>1600||!Number.isInteger(value.revision))return false;
    if(!Array.isArray(value.agents)||value.agents.length<2||value.agents.length>6)return false;
    if(!value.agents.every(a=>['id','name','role','responsibility','inputs','outputs','allowed','forbidden','review'].every(k=>typeof a[k]==='string'&&a[k].length>0&&a[k].length<=1400)))return false;
    const ids=value.agents.map(a=>a.id);if(ids.some(id=>!/^\w{1,40}$/.test(id))||new Set(ids).size!==ids.length)return false;
    if(!Array.isArray(value.handoffs)||value.handoffs.length<1||value.handoffs.length>12||!value.handoffs.every(h=>typeof h.id==='string'&&/^\w{1,40}$/.test(h.id)&&typeof h.name==='string'&&ids.includes(h.from)&&ids.includes(h.to)&&Array.isArray(h.requiredFields)&&h.requiredFields.every(f=>typeof f==='string'&&/^\w{1,40}$/.test(f))))return false;
    return RULES.every(r=>typeof value.rules[r.key]==='boolean');
  }catch{return false;}
}
