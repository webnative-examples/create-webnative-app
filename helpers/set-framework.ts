import prompts from 'prompts'

import type { CWA_Command } from "../index";

export enum Framework {
  React = 'react',
  SvelteKit = 'sveltekit',
}

/**
 * Detect the useReact and useSveltekit options passed in from the user. If they
 * haven't passed one of those options, ask them if they want to use SvelteKit
 * or React as their frontend framework
 *
 * @param program
 */
const setFramework = async (program: CWA_Command): Promise<Framework> => {
  if (program.useSveltekit) {
    return Framework.SvelteKit
  }

  if (program.useReact) {
    return Framework.React
  }

  // If the user hasn't explicitly requested a framework, ask them
  if (!program.useReact && !program.useSveltekit) {
    try {
      const res = await prompts({
        type: 'select',
        name: 'framework',
        message: 'Which frontend framework would you like to use?',
        choices: [
          {
            title: 'SvelteKit',
            // @ts-ignore-next-line
            description: 'Learn more here: https://kit.svelte.dev/',
            value: 'sveltekit',
          },
          {
            title: 'React',
            // @ts-ignore-next-line
            description: 'Learn more here: https://reactjs.org/',
            value: 'react',
          },
        ],
        initial: 0,
      })

      return res.framework.trim()
    } catch (error) {
      console.error(error)
    }
  }

  // Default to SvelteKit
  return Framework.SvelteKit
};

export default setFramework
