import { createContext, useContext } from 'react';

// Lets any canvas section navigate the viewport without knowing about the
// pan-zoom engine underneath — App wires the real implementation in.
export const NavigationContext = createContext<(nodeId: string) => void>(() => {});

export function useNavigateTo() {
  return useContext(NavigationContext);
}
