import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Star, MapPin } from 'lucide-react-native';

type Vendor = {
  id: string;
  name: string;
  category: string;
  rating: number;
  location: string;
  image_url: string;
  description: string;
};

export default function Vendors() {
  const { data: vendors, isLoading } = useQuery({
    queryKey: ['vendors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .order('rating', { ascending: false });

      if (error) throw error;
      return data as Vendor[];
    },
  });

  const renderVendor = ({ item }: { item: Vendor }) => (
    <View style={styles.vendorCard}>
      <Image 
        source={{ uri: item.image_url || 'https://via.placeholder.com/300' }}
        style={styles.vendorImage}
      />
      <View style={styles.vendorContent}>
        <View style={styles.vendorHeader}>
          <Text style={styles.vendorName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Star color="#FFD700" size={16} fill="#FFD700" />
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
          </View>
        </View>
        
        <Text style={styles.vendorCategory}>{item.category}</Text>
        
        <View style={styles.locationContainer}>
          <MapPin color="#9b87f5" size={14} />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        
        <Text style={styles.vendorDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact Vendor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Vendors</Text>
        <Text style={styles.headerSubtitle}>Trusted professionals for your event</Text>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#9b87f5" />
        </View>
      ) : vendors && vendors.length > 0 ? (
        <FlatList
          data={vendors}
          renderItem={renderVendor}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No vendors available</Text>
        </View>
      )}
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    padding: 16,
  },
  vendorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  vendorImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#E5DEFF',
  },
  vendorContent: {
    padding: 16,
  },
  vendorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  vendorName: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#1A1F2C',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#1A1F2C',
  },
  vendorCategory: {
    fontSize: 14,
    color: '#9b87f5',
    fontWeight: '600' as const,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#6E59A5',
  },
  vendorDescription: {
    fontSize: 14,
    color: '#8E9196',
    lineHeight: 20,
    marginBottom: 12,
  },
  contactButton: {
    backgroundColor: '#9b87f5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600' as const,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#8E9196',
  },
});
