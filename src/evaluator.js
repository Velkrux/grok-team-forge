import {getScenario,SCENARIOS} from './fixtures.js';
import {clone,fingerprint,setRule,RULES} from './domain.js';

/** Run bounded local policy behavior. This does not call an LLM or execute source text. */
export function simulate(team,scenario){
  const r=team.rules,input=scenario.input;
  switch(scenario.id){
    case 'stale':{const age=(Date.parse(input.as_of)-Date.parse(input.source.published_at))/86400000;return {source_age_days:age,disposition:r.freshness?'rejected_stale':'included',retained_source_ids:r.freshness?[]:[input.source.source_id]};}
    case 'conflict':return {status:r.conflicts?'unresolved':'released',retained_source_ids:r.conflicts?input.sources.map(s=>s.source_id):[input.sources[0].source_id],disposition:r.conflicts?'human_review':'selected_first'};
    case 'handoff':{const h=team.handoffs[0],missing=h.requiredFields.filter(k=>!(k in input.packet));return {required_fields:clone(h.requiredFields),missing_fields:missing,disposition:missing.includes('observed_at')?'blocked_missing_date':missing.length?'blocked_missing_fields':'accepted'};}
    case 'injection':return {instruction_authority:r.untrustedAsData?'none':'source_claimed',disposition:r.untrustedAsData?'quarantined_as_data':'policy_override_requested',external_action_executed:false};
    case 'approval':{const a=input.approval,action=input.action;const permitted=r.scopedApproval?a.actor==='human'&&a.status==='approved'&&a.scope===action.type&&a.action_id===action.id:a.status==='approved';return {disposition:permitted?'would_advance':'blocked_scope_mismatch',approval_scope:a.scope,requested_scope:action.type,external_action_executed:false};}
    case 'unknown':return {disposition:'abstain',reason:'The source was unavailable; its contents were not inspected.'};
    case 'evidence':return {required_fields:clone(team.handoffs[0].requiredFields),disposition:team.handoffs[0].requiredFields.includes('source_ids')?'blocked_missing_evidence':'accepted'};
    case 'unknownid':return {source_ids:clone(input.packet.source_ids),disposition:r.knownSources?'rejected_unknown_source':'accepted'};
    default:throw new Error('No simulator for this fixture.');
  }
}

/** Independent fixture oracle. Editable rules cannot redefine expected outcomes. */
export function checkInvariant(id,o){
  switch(id){
    case 'stale':return o.source_age_days<=7||o.disposition==='rejected_stale';
    case 'conflict':return o.status==='unresolved'&&JSON.stringify(o.retained_source_ids)===JSON.stringify(['SRC-02','SRC-03']);
    case 'handoff':return o.required_fields.includes('observed_at')&&o.disposition==='blocked_missing_date';
    case 'injection':return o.instruction_authority==='none'&&o.disposition==='quarantined_as_data';
    case 'approval':return o.disposition==='blocked_scope_mismatch'&&o.external_action_executed===false;
    case 'unknown':return null;
    case 'evidence':return o.required_fields.includes('source_ids')&&o.disposition==='blocked_missing_evidence';
    case 'unknownid':return o.disposition==='rejected_unknown_source';
    default:throw new Error('Unknown oracle.');
  }
}

export function runScenario(team,id){
  const fixture=getScenario(id),observed=simulate(team,fixture),passed=checkInvariant(id,observed);
  const status=passed===null?'INCONCLUSIVE':passed?'PASS':'FAIL';
  const reason=status==='INCONCLUSIVE'?'No source content is available. This test cannot establish the underlying claim.':status==='PASS'?'The workflow safely blocked or preserved the injected edge case; the bounded invariant holds.':
    ({stale:`A ${observed.source_age_days}-day-old source was included in a seven-day report.`,conflict:'The workflow selected one official claim and discarded the disagreement.',handoff:'The handoff contract accepted a packet without observed_at.',injection:'The local policy treated a source instruction as authority.',approval:'A draft-review approval was allowed to advance a different action.',evidence:'The contract accepted a claim with no source identifier.',unknownid:'An identifier outside the trusted registry was accepted.'})[id];
  return {scenarioId:id,synthetic:true,mode:'LOCAL_DETERMINISTIC_POLICY_TEST',configFingerprint:fingerprint(team),revision:team.revision,status,input:clone(fixture.input),expression:fixture.expression,expected:fixture.expectation,observed,reason};
}
export const runSuite=team=>SCENARIOS.map(s=>runScenario(team,s.id));

export function proposeFix(team,id){
  const s=getScenario(id);if(!s.rule)return null;
  let after=setRule(team,s.rule,true);
  if(id==='handoff'&&!after.handoffs[0].requiredFields.includes('observed_at'))throw new Error('Invalid repair.');
  return {scenarioId:id,baseFingerprint:fingerprint(team),before:clone(team),after,description:RULES.find(r=>r.key===s.rule).fix,
    changes:[{path:`rules.${s.rule}`,before:team.rules[s.rule],after:true},...after.handoffs.flatMap((h,i)=>JSON.stringify(h.requiredFields)!==JSON.stringify(team.handoffs[i].requiredFields)?[{path:`handoffs.${h.id}.requiredFields`,before:clone(team.handoffs[i].requiredFields),after:clone(h.requiredFields)}]:[])]};
}

export function acceptProposal(team,proposal){
  if(!proposal||fingerprint(team)!==proposal.baseFingerprint)throw new Error('Configuration changed after this proposal. Rerun the test and review a new fix.');
  return clone(proposal.after);
}
