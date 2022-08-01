import React from 'react';
import { MoodOptionType, MoodOptionWithTimeStamp } from './type';

type AppContextType = {
  moodList: MoodOptionWithTimeStamp[];
  handleSelectedMood: (mood: MoodOptionType) => void;
};
const defaultValue = {
  moodList: [],
  handleSelectedMood: () => {},
};
type Children = {
  children: React.ReactNode;
};

const AppContext = React.createContext<AppContextType>(defaultValue);

export const AppProvider: React.FC<Children> = ({ children }) => {
  const [moodList, setMoodList] = React.useState<MoodOptionWithTimeStamp[]>([]);

  const handleSelectedMood = React.useCallback((mood: MoodOptionType) => {
    setMoodList(current => [...current, { mood, timeStamp: Date.now() }]);
  }, []);
  return (
    <AppContext.Provider value={{ moodList, handleSelectedMood }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => React.useContext(AppContext);
