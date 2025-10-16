import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Package, DollarSign, Star, TrendingUp } from 'lucide-react-native';

export default function VendorDashboard() {
  const { data: stats } = useQuery({
    queryKey: ['vendor-stats'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      return {
        totalBookings: 24,
        revenue: 12500,
        rating: 4.8,
        growth: 15,
      };
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Vendor Dashboard</Text>
          <Text style={styles.headerSubtitle}>Manage your business</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Package color="#9b87f5" size={24} />
            </View>
            <Text style={styles.statValue}>{stats?.totalBookings || 0}</Text>
            <Text style={styles.statLabel}>Total Bookings</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <DollarSign color="#9b87f5" size={24} />
            </View>
            <Text style={styles.statValue}>${stats?.revenue || 0}</Text>
            <Text style={styles.statLabel}>Revenue</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Star color="#9b87f5" size={24} />
            </View>
            <Text style={styles.statValue}>{stats?.rating || 0}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <TrendingUp color="#9b87f5" size={24} />
            </View>
            <Text style={styles.statValue}>+{stats?.growth || 0}%</Text>
            <Text style={styles.statLabel}>Growth</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Update Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>View Inquiries</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Manage Availability</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>View Reviews</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    backgroundColor: '#F1F0FB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5DEFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: '#1A1F2C',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8E9196',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    backgroundColor: '#F1F0FB',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: '#1A1F2C',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E9196',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: '#1A1F2C',
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#9b87f5',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600' as const,
    textAlign: 'center',
  },
});
