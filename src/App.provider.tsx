import React from 'react';

type AppContextType = {
  greeting: string;
};
const defaultValue = {
  greeting: '',
};
type Children = {
  children: React.ReactNode;
};

const AppContext = React.createContext<AppContextType>(defaultValue);

export const AppProvider: React.FC<Children> = ({ children }) => {
  return (
    <AppContext.Provider value={{ greeting: 'Hello World' }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => React.useContext(AppContext);
