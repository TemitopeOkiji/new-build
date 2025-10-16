import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = 'https://exzpwekqqcekbtxblibt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4enB3ZWtxcWNla2J0eGJsaWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MDg1OTksImV4cCI6MjA3NTk4NDU5OX0.YJZuJv7RbaXbc8MaIQQDH4gwhteRU_3KhPVKFbb73cY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
