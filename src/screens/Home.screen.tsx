import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MoodPicker } from '../components/MoodPicker';
import { MoodOptionType, MoodOptionWithTimeStamp } from '../type';
export const Home: React.FC = () => {
  const [moodList, setMoodList] = React.useState<MoodOptionWithTimeStamp[]>([]);
  const handleSelectedMood = React.useCallback((mood: MoodOptionType) => {
    setMoodList(current => [...current, { mood, timeStamp: Date.now() }]);
  }, []);
  return (
    <View style={styles.container}>
      <MoodPicker onSelect={handleSelectedMood} />
      {moodList.map(item => (
        <Text style={{ color: 'black' }} key={item.timeStamp}>
          {item.mood.emoji} {new Date(item.timeStamp).toString()}
        </Text>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
