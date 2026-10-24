import {createTeam,MISSIONS,clone,validateTeam,fingerprint} from './domain.js';
import {runScenario,proposeFix,acceptProposal} from './evaluator.js';
import {SCENARIOS} from './fixtures.js';
export const STORAGE_KEY='velkrux.grok-team-forge.v1';
export function initialState(){const t=createTeam(MISSIONS[0].mission,'releases');return {version:1,team:t,baseline:clone(t),generated:false,selectedAgent:t.agents[0].id,selectedScenario:'handoff',results:[],proposal:null,history:[]};}
export function forgeMission(state,text,kind='auto'){const team=createTeam(text,kind);return {...initialState(),team,baseline:clone(team),generated:true,selectedAgent:team.agents[0].id};}
export function assess(state,id){const result=runScenario(state.team,id);return {...state,selectedScenario:id,proposal:null,results:[...state.results,result].slice(-40)};}
export function propose(state){const last=[...state.results].reverse().find(r=>r.scenarioId===state.selectedScenario&&r.configFingerprint===fingerprint(state.team));if(!last||last.status!=='FAIL')throw new Error('Run a failing test against the current configuration first.');return {...state,proposal:proposeFix(state.team,state.selectedScenario)};}
export function apply(state){const before=clone(state.team),after=acceptProposal(state.team,state.proposal);return assess({...state,team:after,history:[...state.history,{before,after:clone(after),reason:state.proposal.description}].slice(-20),proposal:null},state.selectedScenario);}
export function revert(state){if(!state.history.length)return state;const team=clone(state.history.at(-1).before);team.revision=state.team.revision+1;return {...state,team,history:state.history.slice(0,-1),proposal:null};}
export function restore(serialized){
  try{const s=JSON.parse(serialized);if(s.version!==1||!validateTeam(s.team)||!validateTeam(s.baseline)||!Array.isArray(s.results)||s.results.length>40)return initialState();
    // Discard transient proposal/history and recompute stored results. Never trust an injected PASS badge.
    const ids=[...new Set(s.results.map(r=>r.scenarioId))].filter(id=>SCENARIOS.some(s=>s.id===id));
    return {...initialState(),team:clone(s.team),baseline:clone(s.baseline),generated:s.generated===true,selectedAgent:s.team.agents[0].id,results:ids.map(id=>runScenario(s.team,id))};
  }catch{return initialState();}
}
