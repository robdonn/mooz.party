import React from 'react';
import { useSaveShowWelcomeMessage, useShowWelcomeMessage } from './db';

type RulesContextType = {
  allowCustomMembers: boolean;
  setAllowCustomMembers: React.Dispatch<React.SetStateAction<boolean>>;
  showWelcomeMessage: boolean;
  showWelcomeMessageLoading: boolean;
  setShowWelcomeMessage: (hidden: boolean) => void;
};

export const RulesContext = React.createContext<RulesContextType | null>(null);

export const RulesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { data: showWelcomeMessage, isLoading: showWelcomeMessageLoading } =
    useShowWelcomeMessage();
  const { mutate: setShowWelcomeMessageFn } = useSaveShowWelcomeMessage();

  const [allowCustomMembers, setAllowCustomMembers] =
    React.useState<RulesContextType['allowCustomMembers']>(true);

  const setShowWelcomeMessage: RulesContextType['setShowWelcomeMessage'] = (
    show
  ) => {
    setShowWelcomeMessageFn({ show });
  };

  return (
    <RulesContext.Provider
      value={{
        allowCustomMembers,
        setAllowCustomMembers,
        showWelcomeMessage: showWelcomeMessage || false,
        showWelcomeMessageLoading,
        setShowWelcomeMessage,
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
