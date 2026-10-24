import {writeFile} from 'node:fs/promises';
import {createTeam,MISSIONS} from '../src/domain.js';
import {buildPrompt} from '../src/bridge.js';
await writeFile(new URL('../prompts/SCOUT_TEST_PROMPT.md',import.meta.url),buildPrompt(createTeam(MISSIONS[0].mission),'scout').text);
console.log('One exact Scout prompt saved; no model call.');
