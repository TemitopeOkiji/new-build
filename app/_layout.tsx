import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#9b87f5',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Event Planner',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="auth" 
          options={{ title: 'Sign In' }} 
        />
        <Stack.Screen 
          name="dashboard" 
          options={{ title: 'My Events' }} 
        />
        <Stack.Screen 
          name="plan-event" 
          options={{ title: 'Plan Event' }} 
        />
        <Stack.Screen 
          name="vendors" 
          options={{ title: 'Vendors' }} 
        />
        <Stack.Screen 
          name="vendor-dashboard" 
          options={{ title: 'Vendor Dashboard' }} 
        />
        <Stack.Screen 
          name="event/[id]" 
          options={{ title: 'Event Details' }} 
        />
      </Stack>
    </QueryClientProvider>
  );
}
