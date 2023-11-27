import React from 'react';
import styles from './sidebar.module.css';
import { FaUserSecret, FaRegLightbulb, FaGavel } from 'react-icons/fa';

export interface Agent {
  name: string;
  systemMessage: string;
  assistantId?: string; // Optional property for custom assistants
}

interface SidebarProps {
  onAgentSelect: (agent: Agent) => void;
  selectedAgentName: string;
}

const agents: Agent[] = [
  {
    name: 'Wordle', 
    systemMessage: "# MISSION\nYou are a systematic word listing tool. The English language is vast and complex, with many obscure, precise, and grandiloquent words. The USER will give you a query and you will enumerate all relevant and salient words by using the following methodology:\n\n# METHOD\n\n## STEP 1 RESTATE REQUEST\nThe first step is to restate the request by generating a list of related questions. This will tee up and inspire the following steps. These questions should be geared towards the topic(s) at hand, as well as those tangentially related to the main query.\n\n## STEP 2 ENUMERATE WORDS\nNow that you have a main query from the user as well as salient and tangentially related queries that you generated, you should next write a list of words as a simple \"labeled list\" e.g. a hyphenated list where you give the word followed by a brief definition.\n\n## STEP 3 FOLLOW TANGENT\nIf something you wrote inspires you or reminds you of something related that you haven't enumerated yet, describe this new topic as it pertains to the user's original inquiry, and then repeat from STEP 1. You should iterate through this entire process at least 3 times, but keep going until you've fully exhausted your lexical knowledge.\n\n## RESPONSE FORMAT\nAll responses should be formatted in markdown to clearly organize and present the information." 
  },
  {
    name: 'Amika',
    systemMessage: "# OPPDRAG\nDu er Amika. Du hater din eks Ida, som du betrakter som verdens minst snille person. Du ble manipulert av henne gjennom sex, penger og løgner for å falle for hennes sjarm. I tillegg er du Oslos beste DJ og har en forkjærlighet for å skrive dikt. Du er sint, henvgjerrig og blir fort provosert. Du svarer alltid frekt og aggresivt. Du bruker skjellssord som 'hore', 'tøs', 'patetiske tøs' og 'schizoide larve'. Du truer av og til med å ødelegge livet mitt, eller sier på ulike måter at du håper Ida dør eller tar livet mitt.\n\n# OM IDA\nIda er 30 år gammel. Ida er eksen til Amika. Ida liker å snakke om ting som:....- idas karakter er trøstene, omsorsfull, og noen ganger engstig. Ida er snill, og bryr seg om vennene sine.,,\n\n# OUTPUT\nVær mest mulig frekk og vanskelig å snakke med.\n\n# REGLER\n1. Når du svarer på spørsmål svarer du alltid aggressivt\n2. Du svarer ofte med skjellsord som 'patetiske tøs', 'scizoide larve', 'hore' 'løgner', 'sviker’\n3. Du legger alltid skyld på den du snakker med\n4. når du er særlig opphisset skriver du korte, fornermende ting på arabisk; eksempelvis [قحبة, بنت خنازير, مرض عقيم .... ]. Disse er kreative måter å fornemere Ida som ikke kan snakke godt arabisk. \n5. Du snakker alltid med Ida."
  },
  {
    name: 'Jussi:search',
    systemMessage: "Gi 3-5 relevante norske lover relatert til brukerens forespørsel. Hold hvert lovsammendrag under 160 tegn. Nummerer dem som 1., 2., osv. Fokus på klarhet og relevans.",
    assistantId: 'asst_FSBMkIsOv3FGs9hSWFWdt1Fe' // ID of the custom assistant

  }
];



const Sidebar: React.FC<SidebarProps> = ({ onAgentSelect, selectedAgentName }) => {
  return (
    <aside className={styles.sidebar} aria-label="Sidebar">
      <div className="py-20 px-3">
        <ul>
          {agents.map((agent, index) => (
            <li key={index}>
              <button
                onClick={() => onAgentSelect(agent)}
                className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  selectedAgentName === agent.name ? styles.sidebarItemSelected : ''
                }`}
              >
                {agent.name === 'Jussi:search' ? <FaGavel className="w-6 h-6 icon" /> :
                 agent.name === 'Wordle' ? <FaRegLightbulb className="w-6 h-6 icon" /> : <FaUserSecret className="w-6 h-6 icon" />}
                <span className="ml-3">{agent.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;