import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/theme';

export default function MobileYouth() {
  const [tab, setTab] = useState<'courses' | 'jobs'>('courses');
  const [enrolled, setEnrolled] = useState<{ [id: string]: boolean }>({});

  const courses = [
    { id: '1', title: 'Tally Prime & GST for MSMEs', duration: '30h', level: 'Beginner', students: 1840 },
    { id: '2', title: 'Full-Stack Web Dev Foundation', duration: '60h', level: 'Intermediate', students: 2450 },
    { id: '3', title: 'Spoken English & Interview Skills', duration: '20h', level: 'Beginner', students: 3120 },
    { id: '4', title: 'Digital Marketing & Social Media', duration: '25h', level: 'Beginner', students: 1650 },
  ];

  const jobs = [
    { id: '1', title: 'Junior Accounts Assistant', company: 'Telangana Agro', stipend: '₹ 18,000 / mo', type: 'Full-Time' },
    { id: '2', title: 'Front-End React Intern', company: 'Digital Bharat Tech', stipend: '₹ 12,000 / mo', type: 'Remote' },
    { id: '3', title: 'Store & Inventory Supervisor', company: 'Kisan Co-Op', stipend: '₹ 15,000 / mo', type: 'Full-Time' },
  ];

  const handleEnroll = (id: string, title: string) => {
    setEnrolled(prev => ({ ...prev, [id]: true }));
    Alert.alert('Enrolled Successfully! 🎉', `You have been enrolled in "${title}". Access is 100% free.`);
  };

  return (
    <View style={styles.container}>
      
      {/* Tab Switcher */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tabBtn, tab === 'courses' && styles.tabBtnActive]}
          onPress={() => setTab('courses')}
        >
          <Text style={[styles.tabText, tab === 'courses' && styles.tabTextActive]}>
            Free Courses ({courses.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabBtn, tab === 'jobs' && styles.tabBtnActive]}
          onPress={() => setTab('jobs')}
        >
          <Text style={[styles.tabText, tab === 'jobs' && styles.tabTextActive]}>
            Jobs & Internships ({jobs.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content List */}
      <FlatList
        data={tab === 'courses' ? courses : jobs}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }: any) => {
          if (tab === 'courses') {
            const isDone = enrolled[item.id];
            return (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.badgeFree}>100% FREE</Text>
                  <Text style={styles.meta}>{item.duration} · {item.level}</Text>
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSub}>{item.students} youth enrolled</Text>

                <TouchableOpacity 
                  style={[styles.enrollBtn, isDone && { backgroundColor: '#E8F5E9' }]}
                  onPress={() => handleEnroll(item.id, item.title)}
                  disabled={isDone}
                >
                  <Text style={[styles.enrollBtnText, isDone && { color: Colors.primary }]}>
                    {isDone ? '✓ Enrolled' : 'Enroll for Free'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          } else {
            return (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.badgeType}>{item.type}</Text>
                  <Text style={styles.stipend}>{item.stipend}</Text>
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSub}>{item.company}</Text>

                <TouchableOpacity 
                  style={styles.enrollBtn}
                  onPress={() => Alert.alert('Application Submitted', `Application sent to ${item.company}!`)}
                >
                  <Text style={styles.enrollBtnText}>Apply Now</Text>
                </TouchableOpacity>
              </View>
            );
          }
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabBar: {
    flexDirection: 'row',
    margin: 16,
    backgroundColor: '#E5E7EB',
    borderRadius: 14,
    padding: 3,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  tabBtnActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeFree: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeType: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0284C7',
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  meta: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  stipend: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  enrollBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  enrollBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
