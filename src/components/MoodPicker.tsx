import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MoodOptionType } from '../type';
import { theme } from '../theme';
const moodOptions: MoodOptionType[] = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];
type MoodPickerProps = {
  onSelect: (mood: MoodOptionType) => void;
};
export const MoodPicker: React.FC<MoodPickerProps> = ({ onSelect }) => {
  const [selectMood, setSelectMood] = React.useState<MoodOptionType>();
  const handleSelect = React.useCallback(() => {
    if (selectMood) {
      onSelect(selectMood);
      setSelectMood(undefined);
    }
  }, [onSelect, selectMood]);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How are you right now?</Text>

      <View style={styles.moodList}>
        {moodOptions.map(option => (
          <View>
            <Pressable
              onPress={() => setSelectMood(option)}
              key={option.emoji}
              style={[
                styles.moodItem,
                option.emoji === selectMood?.emoji
                  ? styles.selectedMoodItem
                  : undefined,
              ]}>
              <Text style={styles.moodText}>{option.emoji}</Text>
            </Pressable>

            <Text style={styles.descriptionText}>
              {selectMood?.emoji === option.emoji ? option.description : ''}
            </Text>
          </View>
        ))}
      </View>
      <Pressable style={styles.button} onPress={handleSelect}>
        <Text style={styles.buttonText}>Choose</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: theme.colorPurple,
    margin: 10,
    borderRadius: 10,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 20,
  },
  moodText: {
    fontSize: 24,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  moodItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: theme.colorPurple,
    borderColor: theme.colorPurple,
  },
  descriptionText: {
    color: theme.colorPurple,
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: theme.colorPurple,
    width: 150,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
  },
  buttonText: {
    color: theme.colorWhite,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
