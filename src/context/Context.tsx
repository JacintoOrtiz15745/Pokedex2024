import React, { createContext, ReactElement, useState } from 'react';

interface ContextProps {
  children: ReactElement;
}

export const PokemonContext = createContext({});

export const Context = ({ children }: ContextProps) => {
  const [id, setId] = useState<string | undefined>(undefined);

  return (
    <PokemonContext.Provider value={{ id, setId }}>
      {children}
    </PokemonContext.Provider>
  );
};
