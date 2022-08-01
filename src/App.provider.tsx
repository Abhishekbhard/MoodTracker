import React, { useEffect } from 'react';
import { MoodOptionType, MoodOptionWithTimeStamp } from './type';
import AsyncStorage from '@react-native-async-storage/async-storage';
const storageKey = 'my-app-data';

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
type AppData = {
  moods: MoodOptionWithTimeStamp[];
};

const getAppData = async (): Promise<AppData | null> => {
  try {
    const data = await AsyncStorage.getItem(storageKey);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch {
    return null;
  }
};
const setAppData = async (newData: AppData) => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
  } catch {}
};

const AppContext = React.createContext<AppContextType>(defaultValue);

export const AppProvider: React.FC<Children> = ({ children }) => {
  const [moodList, setMoodList] = React.useState<MoodOptionWithTimeStamp[]>([]);

  const handleSelectedMood = React.useCallback((mood: MoodOptionType) => {
    setMoodList(current => {
      const newValue = [...current, { mood, timeStamp: Date.now() }];
      setAppData({ moods: newValue });
      return newValue;
    });
  }, []);
  useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await getAppData();
      if (data) {
        setMoodList(data.moods);
      }
    };
    getDataFromStorage();
  }, []);
  return (
    <AppContext.Provider value={{ moodList, handleSelectedMood }}>
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => React.useContext(AppContext);
