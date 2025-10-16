import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export default function PlanEvent() {
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [attendees, setAttendees] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const createEventMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('events')
        .insert({
          user_id: user.id,
          title,
          date,
          location,
          attendees: parseInt(attendees) || 0,
          type,
          description,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      Alert.alert('Success', 'Event created successfully');
      router.replace('/dashboard');
    },
    onError: (error: any) => {
      Alert.alert('Error', error.message);
    },
  });

  const handleSubmit = () => {
    if (!title || !date || !location || !type) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    createEventMutation.mutate();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <Text style={styles.title}>Plan Your Event</Text>
            <Text style={styles.subtitle}>Let's create something amazing together</Text>

            <View style={styles.form}>
              <Text style={styles.label}>Event Title *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Summer Wedding"
                value={title}
                onChangeText={setTitle}
              />

              <Text style={styles.label}>Event Type *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Wedding, Birthday, Corporate"
                value={type}
                onChangeText={setType}
              />

              <Text style={styles.label}>Date *</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={date}
                onChangeText={setDate}
              />

              <Text style={styles.label}>Location *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Central Park, NYC"
                value={location}
                onChangeText={setLocation}
              />

              <Text style={styles.label}>Expected Attendees</Text>
              <TextInput
                style={styles.input}
                placeholder="Number of guests"
                value={attendees}
                onChangeText={setAttendees}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Tell us about your event..."
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />

              <TouchableOpacity 
                style={[styles.button, createEventMutation.isPending && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={createEventMutation.isPending}
              >
                <Text style={styles.buttonText}>
                  {createEventMutation.isPending ? 'Creating...' : 'Create Event'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: '#1A1F2C',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E9196',
    marginBottom: 24,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#1A1F2C',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F1F0FB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5DEFF',
  },
  textArea: {
    height: 100,
  },
  button: {
    backgroundColor: '#9b87f5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600' as const,
  },
});
