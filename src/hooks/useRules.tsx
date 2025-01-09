import React from 'react';
import { readWelcomeState, saveWelcomeState } from '../data/db';

type RulesContextType = {
  allowCustomMembers: boolean;
  setAllowCustomMembers: React.Dispatch<React.SetStateAction<boolean>>;
  showWelcome: () => boolean;
  setShowWelcome: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RulesContext = React.createContext<RulesContextType | null>(null);

export const RulesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [allowCustomMembers, setAllowCustomMembers] =
    React.useState<RulesContextType['allowCustomMembers']>(true);
  const [showWelcomeInternal, setShowWelcomeInternal] = React.useState<boolean>(
    readWelcomeState()
  );

  const setShowWelcome = () => {
    setShowWelcomeInternal((prev) => {
      saveWelcomeState(!prev);
      return !prev;
    });
  };

  const showWelcome = () => {
    const current = readWelcomeState();

    if (current !== showWelcomeInternal) {
      setShowWelcomeInternal(current);
    }

    return current;
  };

  return (
    <RulesContext.Provider
      value={{
        allowCustomMembers,
        setAllowCustomMembers,
        showWelcome,
        setShowWelcome,
      }}
    >
      {children}
    </RulesContext.Provider>
  );
};

export const useRules = () => {
  const context = React.useContext(RulesContext);

  if (!context) {
    throw new Error('useRules must be used within a RulesProvider');
  }

  return context;
};
