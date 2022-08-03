import React, { useState } from 'react';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { MoodOptionType } from '../type';
import { theme } from '../theme';
const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);
const imageSrc = require('../assets/butterflies.png');

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
  const [selectedMood, setSelectedMood] = React.useState<MoodOptionType>();

  const [hasSelected, setHasSelected] = React.useState(false);
  const buttonStyle = useAnimatedStyle(
    () => ({
      opacity: selectedMood ? withTiming(1) : withTiming(0.5),
      transform: [{ scale: selectedMood ? withTiming(1) : 0.8 }],
    }),
    [selectedMood],
  );
  const handleSelect = React.useCallback(() => {
    if (selectedMood) {
      onSelect(selectedMood);
      setSelectedMood(undefined);
      setHasSelected(true);
    }
  }, [onSelect, selectedMood]);

  if (hasSelected) {
    return (
      <View style={styles.container}>
        <Image resizeMode="contain" source={imageSrc} style={styles.image} />

        <Pressable style={styles.button} onPress={() => setHasSelected(false)}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How are you right now?</Text>

      <View style={styles.moodList}>
        {moodOptions.map(option => (
          <View>
            <Pressable
              onPress={() => setSelectedMood(option)}
              key={option.emoji}
              style={[
                styles.moodItem,
                option.emoji === selectedMood?.emoji
                  ? styles.selectedMoodItem
                  : undefined,
              ]}>
              <Text style={styles.moodText}>{option.emoji}</Text>
            </Pressable>

            <Text style={styles.descriptionText}>
              {selectedMood?.emoji === option.emoji ? option.description : ''}
            </Text>
          </View>
        ))}
      </View>
      <ReanimatedPressable
        style={[styles.button, buttonStyle]}
        onPress={handleSelect}>
        <Text style={styles.buttonText}>Choose</Text>
      </ReanimatedPressable>
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
    justifyContent: 'space-between',
    height: 230,
  },
  image: {
    alignSelf: 'center',
    height: 100,
    aspectRatio: 300,
  },
  heading: {
    fontSize: 20,
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 20,
    color: theme.colorWhite,
    fontFamily: theme.fontFamilyBold,
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
