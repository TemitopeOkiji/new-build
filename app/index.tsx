import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Users, Sparkles, ChevronRight } from 'lucide-react-native';

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Plan Your Perfect Event</Text>
          <Text style={styles.heroSubtitle}>
            AI-powered event planning with trusted vendors
          </Text>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('/plan-event')}
          >
            <Text style={styles.primaryButtonText}>Start Planning</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Three Pillars of Success</Text>
          
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Calendar color="#9b87f5" size={32} />
            </View>
            <Text style={styles.cardTitle}>Smart Planning</Text>
            <Text style={styles.cardDescription}>
              AI-powered tools to organize every detail of your event
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Users color="#9b87f5" size={32} />
            </View>
            <Text style={styles.cardTitle}>Trusted Vendors</Text>
            <Text style={styles.cardDescription}>
              Vetted professionals ready to bring your vision to life
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <Sparkles color="#9b87f5" size={32} />
            </View>
            <Text style={styles.cardTitle}>Seamless Experience</Text>
            <Text style={styles.cardDescription}>
              From concept to celebration, we've got you covered
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          
          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Share Your Vision</Text>
              <Text style={styles.stepDescription}>
                Tell us about your event - the date, type, and your dreams
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>AI Creates Your Plan</Text>
              <Text style={styles.stepDescription}>
                Our AI generates a customized timeline and vendor recommendations
              </Text>
            </View>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Connect & Celebrate</Text>
              <Text style={styles.stepDescription}>
                Book vendors, manage details, and enjoy your perfect event
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('/auth')}
          >
            <Text style={styles.primaryButtonText}>Sign Up Now</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.push('/vendors')}
          >
            <Text style={styles.secondaryButtonText}>Browse Vendors</Text>
            <ChevronRight color="#9b87f5" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Event Planner. All rights reserved.</Text>
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
  hero: {
    padding: 24,
    paddingTop: 48,
    paddingBottom: 48,
    backgroundColor: '#F1F0FB',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    color: '#1A1F2C',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#6E59A5',
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: '#1A1F2C',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F1F0FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: '#1A1F2C',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: '#8E9196',
    textAlign: 'center',
    lineHeight: 20,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9b87f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#ffffff',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#1A1F2C',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#8E9196',
    lineHeight: 20,
  },
  ctaSection: {
    padding: 24,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: '#1A1F2C',
    marginBottom: 24,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#9b87f5',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600' as const,
  },
  secondaryButton: {
    backgroundColor: '#F1F0FB',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#9b87f5',
    fontSize: 16,
    fontWeight: '600' as const,
    marginRight: 8,
  },
  footer: {
    padding: 24,
    backgroundColor: '#F1F0FB',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#8E9196',
  },
});
