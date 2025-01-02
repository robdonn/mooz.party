import React from 'react';

type RulesContextType = {
  allowCustomMembers: boolean;
  setAllowCustomMembers: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RulesContext = React.createContext<RulesContextType | null>(null);

export const RulesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [allowCustomMembers, setAllowCustomMembers] =
    React.useState<RulesContextType['allowCustomMembers']>(true);

  return (
    <RulesContext.Provider
      value={{ allowCustomMembers, setAllowCustomMembers }}
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
