import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MoodPicker } from '../components/MoodPicker';
import format from 'date-fns/format';
import { MoodOptionType, MoodOptionWithTimeStamp } from '../type';
import { useAppContext } from '../App.provider';
export const Home: React.FC = () => {
  const appContext = useAppContext();

  return (
    <View style={styles.container}>
      <MoodPicker onSelect={appContext.handleSelectedMood} />
      {/* {moodList.map(item => (
        <MoodItemRow item={item} />
      ))} */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
