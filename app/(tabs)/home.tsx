import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { ScreenHeader, ui } from '@/components/AppChrome';

const weatherItems = [
  { label: '지금', icon: 'sun-o' as const, temp: '22°', active: true },
  { label: '15시', icon: 'sun-o' as const, temp: '21°', active: true },
  { label: '16시', icon: 'cloud' as const, temp: '20°', active: false },
  { label: '17시', icon: 'sun-o' as const, temp: '19°', active: true },
  { label: '18시', icon: 'cloud' as const, temp: '18°', active: false },
];

function WeatherStrip() {
  return (
    <View style={styles.weatherStrip}>
      {weatherItems.map((item) => (
        <View key={item.label} style={styles.weatherItem}>
          <Text style={styles.weatherLabel}>{item.label}</Text>
          <FontAwesome name={item.icon} size={25} color={item.active ? '#F2D552' : '#D8DDE3'} />
          <Text style={styles.weatherTemp}>{item.temp}</Text>
        </View>
      ))}
    </View>
  );
}

function EmptyHome({ onSearch }: { onSearch: () => void }) {
  return (
    <>
      <ScreenHeader title="홈" />
      <ScrollView style={styles.container} contentContainerStyle={styles.emptyContent} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <Text style={styles.heroEyebrow}>서울 이동 예측</Text>
          <Text style={styles.question}>오늘 어디로 가실건가요?</Text>
          <Text style={styles.heroSub}>출발 시간과 목적지를 넣으면 혼잡도와 추천 경로를 바로 계산해요.</Text>

          <View style={styles.form}>
            <View style={styles.inputBox}>
              <FontAwesome name="clock-o" size={16} color="#7C8594" />
              <TextInput style={styles.input} placeholder="출발 예정 시간을 입력하세요" placeholderTextColor="#7A8190" />
            </View>
            <View style={styles.inputBox}>
              <FontAwesome name="map-marker" size={18} color="#7C8594" />
              <TextInput style={styles.input} placeholder="목적지를 입력하세요" placeholderTextColor="#7A8190" />
            </View>
            <Pressable style={styles.searchButton} onPress={onSearch}>
              <FontAwesome name="search" size={15} color="#FFFFFF" />
              <Text style={styles.searchButtonText}>검색</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>실시간 서울 현황</Text>
          <Text style={styles.sectionHint}>오늘 14:30 기준</Text>
        </View>
        <View style={styles.liveCards}>
          <LiveCard icon="sun-o" label="날씨" value="맑음" tone="#F2D552" />
          <LiveCard icon="users" label="혼잡도" value="보통" tone={ui.blue} />
          <LiveCard icon="subway" label="지하철" value="혼잡" tone="#8B9CF6" />
        </View>
      </ScrollView>
    </>
  );
}

function LiveCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <View style={styles.liveCard}>
      <View style={[styles.liveIcon, { backgroundColor: `${tone}1F` }]}>
        <FontAwesome name={icon} size={25} color={tone} />
      </View>
      <Text style={styles.liveLabel}>{label}</Text>
      <Text style={styles.liveValue}>{value}</Text>
    </View>
  );
}

function ResultHome() {
  const router = useRouter();

  return (
    <>
      <ScreenHeader title="홈" time="8:32" />
      <ScrollView style={styles.container} contentContainerStyle={styles.resultContent} showsVerticalScrollIndicator={false}>
        <View style={styles.alertCard}>
          <View style={styles.alertIcon}>
            <FontAwesome name="exclamation" size={28} color="#FFFFFF" />
          </View>
          <Text style={styles.alertPlace}>오후 3시 홍대입구역</Text>
          <Text style={styles.alertLevel}>혼잡도 매우 높음</Text>
          <Text style={styles.alertSub}>비슷한 시간대보다 약 42% 붐빌 예정이에요.</Text>
        </View>

        <View style={styles.routeCard}>
          <View style={styles.routeHeader}>
            <View>
              <Text style={styles.resultSectionTitle}>추천 경로</Text>
              <Text style={styles.routeMinutes}>30분</Text>
              <Text style={styles.routeSub}>오후 2:30 - 오후 3:00</Text>
            </View>
            <View style={styles.arriveBadge}>
              <Text style={styles.arriveText}>예상 도착 오후 3시</Text>
            </View>
          </View>

          <View style={styles.routeBar}>
            <View style={styles.routeGray}>
              <Text style={styles.routeBarText}>20분</Text>
            </View>
            <View style={styles.routeLineBadge}>
              <Text style={styles.routeLineText}>2</Text>
            </View>
            <View style={styles.routeGreen}>
              <Text style={styles.routeBarTextLight}>10분</Text>
            </View>
          </View>
        </View>

        <View style={styles.weatherCard}>
          <Text style={styles.resultSectionTitle}>홍대 날씨</Text>
          <WeatherStrip />
        </View>

        <Pressable style={styles.detailButton} onPress={() => router.push('/(tabs)/two' as never)}>
          <Text style={styles.detailButtonText}>널널 AI 상세보기</Text>
          <FontAwesome name="angle-right" size={18} color="#FFFFFF" />
        </Pressable>
      </ScrollView>
    </>
  );
}

export default function HomeScreen() {
  const [hasResult, setHasResult] = useState(false);
  return hasResult ? <ResultHome /> : <EmptyHome onSearch={() => setHasResult(true)} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  emptyContent: { minHeight: 668, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 112 },
  heroCard: {
    borderRadius: 26,
    backgroundColor: ui.surfaceAlt,
    borderWidth: 1,
    borderColor: ui.borderSoft,
    padding: 22,
    marginBottom: 26,
    shadowColor: '#6F8FF2',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  heroEyebrow: { color: ui.blueDark, fontSize: 12, fontWeight: '900', marginBottom: 10 },
  question: { color: ui.text, fontSize: 25, fontWeight: '900', marginBottom: 9 },
  heroSub: { color: ui.muted, fontSize: 13, fontWeight: '800', lineHeight: 19, marginBottom: 20 },
  form: { gap: 11 },
  inputBox: {
    height: 54,
    borderWidth: 1.5,
    borderColor: ui.border,
    borderRadius: 17,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    height: 52,
    marginLeft: 10,
    color: ui.text,
    fontSize: 14,
    fontWeight: '800',
    outlineStyle: 'none' as never,
  },
  searchButton: {
    height: 52,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ui.blue,
    flexDirection: 'row',
    gap: 8,
    shadowColor: ui.blue,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  searchButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '900' },
  sectionHeader: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 14 },
  sectionTitle: { color: ui.text, fontSize: 20, fontWeight: '900' },
  sectionHint: { color: ui.muted, fontSize: 11, fontWeight: '800' },
  liveCards: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  liveCard: {
    flex: 1,
    minHeight: 118,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEF1F8',
    shadowColor: '#93A8EF',
    shadowOpacity: 0.17,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 7,
  },
  liveIcon: { width: 44, height: 44, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  liveLabel: { color: ui.muted, fontSize: 11, fontWeight: '800' },
  liveValue: { color: ui.blueDark, fontSize: 15, fontWeight: '900', marginTop: 5 },
  resultContent: { minHeight: 668, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 112 },
  alertCard: {
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF7F6',
    borderWidth: 1,
    borderColor: '#F5D7D3',
    paddingVertical: 28,
    marginBottom: 18,
    shadowColor: ui.danger,
    shadowOpacity: 0.14,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  alertIcon: {
    width: 54,
    height: 48,
    borderRadius: 16,
    backgroundColor: ui.danger,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },
  alertPlace: { color: ui.text, fontSize: 15, fontWeight: '900', marginBottom: 8 },
  alertLevel: { color: ui.danger, fontSize: 21, fontWeight: '900' },
  alertSub: { color: '#8B5350', fontSize: 11, fontWeight: '800', marginTop: 10 },
  routeCard: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#EEF1F8',
    backgroundColor: '#FFFFFF',
    padding: 18,
    marginBottom: 14,
  },
  routeHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 },
  resultSectionTitle: { color: ui.blueDark, fontSize: 15, fontWeight: '900', marginBottom: 5 },
  routeMinutes: { color: ui.text, fontSize: 27, fontWeight: '900', lineHeight: 29 },
  routeSub: { color: ui.muted, fontSize: 11, fontWeight: '800', marginTop: 4 },
  arriveBadge: {
    height: 38,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: ui.blue,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  arriveText: { color: ui.blue, fontSize: 10, fontWeight: '900' },
  routeBar: { height: 18, borderRadius: 9, overflow: 'hidden', flexDirection: 'row', backgroundColor: '#D8D8D8' },
  routeGray: { flex: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#D8D8D8' },
  routeGreen: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#7CB667' },
  routeLineBadge: {
    position: 'absolute',
    left: '64%',
    top: 2,
    zIndex: 3,
    width: 13,
    height: 13,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#74B25E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeLineText: { color: '#61A64E', fontSize: 9, fontWeight: '900' },
  routeBarText: { color: '#6D7178', fontSize: 10, fontWeight: '900' },
  routeBarTextLight: { color: '#FFFFFF', fontSize: 10, fontWeight: '900' },
  weatherCard: {
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEF1F8',
    padding: 18,
    marginBottom: 20,
  },
  weatherStrip: {
    height: 112,
    borderRadius: 18,
    backgroundColor: '#FAFBFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  weatherItem: { alignItems: 'center', justifyContent: 'center', gap: 7 },
  weatherLabel: { color: ui.blueDark, fontSize: 12, fontWeight: '900' },
  weatherTemp: { color: ui.blueDark, fontSize: 11, fontWeight: '900' },
  detailButton: {
    height: 52,
    borderRadius: 17,
    backgroundColor: ui.blue,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 7,
    shadowColor: ui.blue,
    shadowOpacity: 0.22,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  detailButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '900' },
});
