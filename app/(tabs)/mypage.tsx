import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ScreenHeader, ui } from '@/components/AppChrome';
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
    <ScrollView style={styles.body} contentContainerStyle={styles.profileContent} showsVerticalScrollIndicator={false}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <FontAwesome name="user" size={30} color="#FFFFFF" />
        </View>
        <View style={styles.profileText}>
          <Text style={styles.name}>해서</Text>
          <Text style={styles.lang}>언어 · 한국어</Text>
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
      <MenuGroup items={settings} onPress={(title) => setNotice(`${title}이 변경되었습니다.`)} />

      <Text style={styles.sectionTitle}>고객 지원</Text>
      <MenuGroup items={support} onPress={(title) => setNotice(`${title} 요청을 접수했습니다.`)} />

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
    <ScrollView style={styles.body} contentContainerStyle={styles.savedContent} showsVerticalScrollIndicator={false}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  body: { flex: 1, backgroundColor: '#FFFFFF' },
  profileContent: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 112 },
  profileCard: {
    minHeight: 112,
    borderWidth: 1,
    borderColor: ui.border,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
    backgroundColor: ui.surfaceAlt,
  },
  avatar: { width: 60, height: 60, borderRadius: 22, backgroundColor: ui.blue, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  profileText: { flex: 1 },
  name: { color: ui.text, fontSize: 18, fontWeight: '900', marginBottom: 5 },
  lang: { color: ui.muted, fontSize: 11, fontWeight: '800' },
  editButton: { height: 34, borderRadius: 17, backgroundColor: ui.blue, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 },
  editButtonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '900' },
  notice: { color: ui.blueDark, fontSize: 12, fontWeight: '900', marginBottom: 5 },
  sectionTitle: { color: ui.blueDark, fontSize: 14, fontWeight: '900', marginTop: 16, marginBottom: 9 },
  menuBox: {
    borderWidth: 1,
    borderColor: ui.borderSoft,
    borderRadius: 20,
    paddingHorizontal: 17,
    backgroundColor: '#FFFFFF',
    marginBottom: 3,
  },
  menuRow: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F6',
  },
  lastRow: { borderBottomWidth: 0 },
  menuTitle: { color: ui.text, fontSize: 13, fontWeight: '900', marginLeft: 9 },
  menuCount: { color: ui.muted, fontSize: 9, fontWeight: '800', marginLeft: 7, flex: 1 },
  accountRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, gap: 12 },
  logoutButton: {
    flex: 1,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D7DCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    flex: 1,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#F2C3BF',
    backgroundColor: '#FFF9F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: { color: ui.muted, fontSize: 12, fontWeight: '900' },
  deleteText: { color: ui.danger, fontSize: 12, fontWeight: '900' },
  savedContent: { paddingHorizontal: 24, paddingTop: 30, paddingBottom: 112, minHeight: 700 },
  savedTitle: { color: ui.text, fontSize: 27, fontWeight: '900', textAlign: 'center', marginBottom: 22 },
  planCard: {
    minHeight: 128,
    borderWidth: 1,
    borderColor: ui.border,
    borderRadius: 26,
    padding: 23,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  planTitle: { color: ui.text, fontSize: 19, fontWeight: '900', marginBottom: 14 },
  planRoute: { color: '#4E5662', fontSize: 12, fontWeight: '800', marginBottom: 7 },
  planMeta: { color: '#4E5662', fontSize: 12, fontWeight: '900' },
  planTag: { height: 35, borderRadius: 18, backgroundColor: ui.blue, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18 },
  planTagText: { color: '#FFFFFF', fontSize: 12, fontWeight: '900' },
  newPlanButton: {
    width: 230,
    height: 46,
    borderRadius: 23,
    backgroundColor: ui.blue,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 2,
  },
  newPlanText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900' },
});
