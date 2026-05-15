import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Mascot, ScreenHeader, ui } from '@/components/AppChrome';
import mock from '@/data/delbeum_mock.json';

type PageMode = 'profile' | 'saved';

const activityItems = [
  { icon: 'calendar' as const, title: '저장된 일정', count: `${mock.user.savedScheduleCount}개 저장됨`, action: 'saved' as const },
  { icon: 'heart' as const, title: '찜한 장소', count: `${mock.user.favoritePlaceCount}곳 저장됨` },
  { icon: 'clock-o' as const, title: '최근 검색 내역', count: `${mock.user.recentSearchCount}개 기록` },
];

const settings = [
  { icon: 'globe' as const, title: '언어 변경' },
  { icon: 'bell' as const, title: '알림 설정' },
];

const support = [
  { icon: 'bullhorn' as const, title: '공지사항' },
  { icon: 'commenting-o' as const, title: '문의하기' },
];

export default function MyPageScreen() {
  const [mode, setMode] = useState<PageMode>('profile');

  return (
    <View style={styles.container}>
      <ScreenHeader title="마이 페이지" />
      {mode === 'profile' ? <ProfilePage onSaved={() => setMode('saved')} /> : <SavedPage onNew={() => setMode('profile')} />}
    </View>
  );
}

function ProfilePage({ onSaved }: { onSaved: () => void }) {
  const router = useRouter();
  const [notice, setNotice] = useState('');

  const logout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('nollnull-user');
    }
    router.replace('/login' as never);
  };

  return (
    <ScrollView style={styles.body} contentContainerStyle={styles.profileContent}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <FontAwesome name="user" size={31} color="#FFFFFF" />
        </View>
        <View style={styles.profileText}>
          <Text style={styles.name}>{mock.user.name}</Text>
          <Text style={styles.lang}>언어 - {mock.user.language}</Text>
        </View>
        <Pressable style={styles.editButton} onPress={() => setNotice('프로필 정보가 저장되었습니다.')}>
          <Text style={styles.editButtonText}>프로필 편집</Text>
        </Pressable>
      </View>

      {notice ? <Text style={styles.notice}>{notice}</Text> : null}

      <Text style={styles.sectionTitle}>내 활동</Text>
      <View style={styles.menuBox}>
        {activityItems.map((item, index) => (
          <Pressable
            key={item.title}
            style={[styles.menuRow, index === activityItems.length - 1 && styles.lastRow]}
            onPress={item.action === 'saved' ? onSaved : () => setNotice(`${item.title}을 확인했습니다.`)}
          >
            <FontAwesome name={item.icon} size={15} color={ui.blue} />
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Text style={styles.menuCount}>{item.count}</Text>
            <FontAwesome name="angle-right" size={21} color="#6E737C" />
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>앱 설정</Text>
      <MenuGroup items={settings} onPress={(title) => setNotice(`${title} 설정이 변경되었습니다.`)} />

      <Text style={styles.sectionTitle}>고객 지원</Text>
      <MenuGroup items={support} onPress={(title) => setNotice(`${title} 요청이 접수되었습니다.`)} />

      <View style={styles.accountRow}>
        <Pressable style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={logout}>
          <Text style={styles.deleteText}>탈퇴하기</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function MenuGroup({
  items,
  onPress,
}: {
  items: { icon: React.ComponentProps<typeof FontAwesome>['name']; title: string }[];
  onPress: (title: string) => void;
}) {
  return (
    <View style={styles.menuBox}>
      {items.map((item, index) => (
        <Pressable key={item.title} style={[styles.menuRow, index === items.length - 1 && styles.lastRow]} onPress={() => onPress(item.title)}>
          <FontAwesome name={item.icon} size={15} color={ui.blue} />
          <Text style={styles.menuTitle}>{item.title}</Text>
          <View style={{ flex: 1 }} />
          <FontAwesome name="angle-right" size={21} color="#6E737C" />
        </Pressable>
      ))}
    </View>
  );
}

function SavedPage({ onNew }: { onNew: () => void }) {
  return (
    <ScrollView style={styles.body} contentContainerStyle={styles.savedContent}>
      <Text style={styles.savedTitle}>저장된 일정</Text>
      {mock.itinerary.savedPlans.map((plan) => (
        <View key={plan.title} style={styles.planCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.planTitle}>{plan.title}</Text>
            <Text style={styles.planRoute}>{plan.route}</Text>
            <Text style={styles.planMeta}>{plan.meta}</Text>
          </View>
          <View style={styles.planTag}>
            <Text style={styles.planTagText}>{plan.tag}</Text>
          </View>
        </View>
      ))}
      <Pressable style={styles.newPlanButton} onPress={onNew}>
        <Text style={styles.newPlanText}>+ 새로운 일정 만들기</Text>
      </Pressable>
      <Mascot size={170} style={styles.bigMascot} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  body: { flex: 1, backgroundColor: '#FFFFFF' },
  profileContent: { paddingHorizontal: 28, paddingTop: 24, paddingBottom: 112 },
  profileCard: {
    minHeight: 105,
    borderWidth: 1.5,
    borderColor: ui.border,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    marginBottom: 12,
  },
  avatar: { width: 58, height: 58, borderRadius: 29, backgroundColor: ui.blue, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  profileText: { flex: 1 },
  name: { color: ui.text, fontSize: 17, fontWeight: '900', marginBottom: 4 },
  lang: { color: '#59606B', fontSize: 10, fontWeight: '800' },
  editButton: { width: 101, height: 31, borderRadius: 16, backgroundColor: ui.blue, alignItems: 'center', justifyContent: 'center' },
  editButtonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '900' },
  notice: { color: ui.blueDark, fontSize: 12, fontWeight: '900', marginBottom: 5 },
  sectionTitle: { color: ui.blueDark, fontSize: 14, fontWeight: '900', marginTop: 14, marginBottom: 9 },
  menuBox: {
    borderWidth: 1.5,
    borderColor: ui.border,
    borderRadius: 18,
    paddingHorizontal: 17,
    backgroundColor: '#FFFFFF',
    marginBottom: 3,
  },
  menuRow: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
  },
  lastRow: { borderBottomWidth: 0 },
  menuTitle: { color: ui.text, fontSize: 13, fontWeight: '900', marginLeft: 9 },
  menuCount: { color: '#747984', fontSize: 8, fontWeight: '800', marginLeft: 7, flex: 1 },
  accountRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, paddingHorizontal: 12 },
  logoutButton: {
    width: 128,
    height: 38,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#6E737C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    width: 128,
    height: 38,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: ui.danger,
    backgroundColor: '#FFF9F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: { color: '#6E737C', fontSize: 12, fontWeight: '900' },
  deleteText: { color: ui.danger, fontSize: 12, fontWeight: '900' },
  savedContent: { paddingHorizontal: 28, paddingTop: 32, paddingBottom: 112, minHeight: 700 },
  savedTitle: { color: ui.text, fontSize: 27, fontWeight: '900', textAlign: 'center', marginBottom: 22 },
  planCard: {
    minHeight: 132,
    borderWidth: 1.5,
    borderColor: ui.border,
    borderRadius: 28,
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
    backgroundColor: '#FFFFFF',
  },
  planTitle: { color: ui.text, fontSize: 19, fontWeight: '900', marginBottom: 16 },
  planRoute: { color: '#4E5662', fontSize: 12, fontWeight: '800', marginBottom: 7 },
  planMeta: { color: '#4E5662', fontSize: 12, fontWeight: '900' },
  planTag: { width: 112, height: 33, borderRadius: 17, backgroundColor: ui.blue, alignItems: 'center', justifyContent: 'center' },
  planTagText: { color: '#FFFFFF', fontSize: 12, fontWeight: '900' },
  newPlanButton: {
    width: 228,
    height: 43,
    borderRadius: 22,
    backgroundColor: ui.blue,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 2,
  },
  newPlanText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },
  bigMascot: { position: 'absolute', right: 14, bottom: 10 },
});
