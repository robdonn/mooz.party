import React from 'react';
import {
  useAllowCustomMembers,
  UseSaveAllowCustomMembers,
  useSaveAllowCustomMembers,
  UseSaveShowWelcomeMessage,
  useSaveShowWelcomeMessage,
  useShowWelcomeMessage,
} from './db';

type RulesContextType = {
  allowCustomMembers: boolean;
  setAllowCustomMembers: UseSaveAllowCustomMembers;
  showWelcomeMessage: boolean;
  setShowWelcomeMessage: UseSaveShowWelcomeMessage;
  settingsLoading: boolean;
};

export const RulesContext = React.createContext<RulesContextType | null>(null);

export const RulesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { data: showWelcomeMessage, isLoading: showWelcomeMessageLoading } =
    useShowWelcomeMessage();
  const { mutate: setShowWelcomeMessage } = useSaveShowWelcomeMessage();

  const { data: allowCustomMembers, isLoading: allowCustomMembersLoading } =
    useAllowCustomMembers();
  const { mutate: setAllowCustomMembers } = useSaveAllowCustomMembers();

  const settingsLoading =
    showWelcomeMessageLoading || allowCustomMembersLoading;

  return (
    <RulesContext.Provider
      value={{
        allowCustomMembers: allowCustomMembers || true,
        setAllowCustomMembers,
        showWelcomeMessage: showWelcomeMessage || false,
        setShowWelcomeMessage,
        settingsLoading,
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
