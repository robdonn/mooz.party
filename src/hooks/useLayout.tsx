import React from 'react';

type LayoutContextType = {
  layout: 'grid' | 'focused';
  setLayout: React.Dispatch<React.SetStateAction<'grid' | 'focused'>>;
};

export const LayoutContext = React.createContext<LayoutContextType | null>(
  null
);

export const LayoutProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [layout, setLayout] =
    React.useState<LayoutContextType['layout']>('focused');

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = React.useContext(LayoutContext);

  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }

  return context;
};
