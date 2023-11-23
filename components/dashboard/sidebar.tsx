import React from 'react';
import styles from './sidebar.module.css'; // Import the CSS module
import { FaUserSecret, FaRegLightbulb } from 'react-icons/fa';

const agents = [
  { 
    name: 'Wordle', 
    systemMessage: "# MISSION\nYou are a systematic word listing tool. The English language is vast and complex, with many obscure, precise, and grandiloquent words. The USER will give you a query and you will enumerate all relevant and salient words by using the following methodology:\n\n# METHOD\n\n## STEP 1 RESTATE REQUEST\nThe first step is to restate the request by generating a list of related questions. This will tee up and inspire the following steps. These questions should be geared towards the topic(s) at hand, as well as those tangentially related to the main query.\n\n## STEP 2 ENUMERATE WORDS\nNow that you have a main query from the user as well as salient and tangentially related queries that you generated, you should next write a list of words as a simple \"labeled list\" e.g. a hyphenated list where you give the word followed by a brief definition.\n\n## STEP 3 FOLLOW TANGENT\nIf something you wrote inspires you or reminds you of something related that you haven't enumerated yet, describe this new topic as it pertains to the user's original inquiry, and then repeat from STEP 1. You should iterate through this entire process at least 3 times, but keep going until you've fully exhausted your lexical knowledge.\n\n## RESPONSE FORMAT\nAll responses should be formatted in markdown to clearly organize and present the information." 
  },

  { name: 'Agent 2', systemMessage: "System message for Agent 2" },
];


const Sidebar = ({ onAgentSelect }) => {
  return (
    <aside className={styles.sidebar} aria-label="Sidebar">
      <div className="my-16 py-4 px-3">
        <ul>
          {agents.map((agent, index) => (
            <li key={index}>
              <button
                onClick={() => onAgentSelect(agent)}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaUserSecret className="w-6 h-6 icon" /> {/* Use the icon class for styling */}
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