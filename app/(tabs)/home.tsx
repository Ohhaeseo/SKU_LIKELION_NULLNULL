import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Mascot, ScreenHeader, ui } from '@/components/AppChrome';

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
          <FontAwesome name={item.icon} size={27} color={item.active ? '#F4D94E' : '#D8DDE3'} />
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
      <ScrollView style={styles.container} contentContainerStyle={styles.emptyContent}>
        <Text style={styles.question}>오늘 어디로 가실건가요?</Text>

        <View style={styles.form}>
          <View style={styles.inputBox}>
            <FontAwesome name="search" size={16} color="#7C8594" />
            <TextInput
              style={styles.input}
              placeholder="출발 예정 시간을 입력하세요"
              placeholderTextColor="#6F7480"
            />
          </View>
          <View style={styles.inputBox}>
            <FontAwesome name="map-marker" size={18} color="#7C8594" />
            <TextInput
              style={styles.input}
              placeholder="목적지를 입력하세요"
              placeholderTextColor="#6F7480"
            />
          </View>
          <Pressable style={styles.searchButton} onPress={onSearch}>
            <Text style={styles.searchButtonText}>검색</Text>
          </Pressable>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitleCenter}>실시간 서울 현황</Text>
        <View style={styles.liveCards}>
          <View style={styles.liveCard}>
            <FontAwesome name="sun-o" size={31} color={ui.blue} />
            <Text style={styles.liveLabel}>날씨</Text>
            <Text style={styles.liveValue}>맑음</Text>
          </View>
          <View style={styles.liveCard}>
            <FontAwesome name="users" size={30} color={ui.blue} />
            <Text style={styles.liveLabel}>혼잡도</Text>
            <Text style={styles.liveValue}>보통</Text>
          </View>
          <View style={styles.liveCard}>
            <FontAwesome name="subway" size={28} color={ui.blue} />
            <Text style={styles.liveLabel}>지하철</Text>
            <Text style={styles.liveValue}>혼잡</Text>
          </View>
        </View>
        <Mascot size={120} style={styles.homeMascot} />
      </ScrollView>
    </>
  );
}

function ResultHome() {
  const router = useRouter();

  return (
    <>
      <ScreenHeader title="홈" time="8:32" />
      <ScrollView style={styles.container} contentContainerStyle={styles.resultContent}>
        <View style={styles.alertCard}>
          <View style={styles.alertIcon}>
            <FontAwesome name="exclamation" size={30} color="#FFFFFF" />
          </View>
          <Text style={styles.alertPlace}>오후 3시 홍대입구역</Text>
          <Text style={styles.alertLevel}>혼잡도 매우 높음</Text>
        </View>

        <View style={styles.resultDivider} />

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

        <View style={styles.resultDividerSmall} />

        <Text style={styles.resultSectionTitle}>홍대 날씨</Text>
        <WeatherStrip />

        <Pressable style={styles.detailButton} onPress={() => router.push('/(tabs)/two' as never)}>
          <Text style={styles.detailButtonText}>널널 상세보기</Text>
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
  emptyContent: {
    minHeight: 668,
    paddingTop: 39,
    paddingHorizontal: 25,
    paddingBottom: 108,
  },
  question: {
    color: ui.text,
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 41,
  },
  form: { gap: 12 },
  inputBox: {
    height: 57,
    borderWidth: 3,
    borderColor: ui.border,
    borderRadius: 13,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    height: 52,
    marginLeft: 10,
    color: '#111827',
    fontSize: 15,
    fontWeight: '800',
    outlineStyle: 'none' as never,
  },
  searchButton: {
    width: 135,
    height: 45,
    borderRadius: 13,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ui.blue,
    marginTop: 6,
  },
  searchButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '900' },
  divider: { height: 1, backgroundColor: '#CFCFCF', marginTop: 32, marginBottom: 23 },
  sectionTitleCenter: {
    color: ui.text,
    fontSize: 21,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 27,
  },
  liveCards: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 21 },
  liveCard: {
    width: 98,
    height: 107,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#7394EB',
    shadowOpacity: 0.28,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 7 },
    elevation: 8,
  },
  liveLabel: { color: '#6A7180', fontSize: 11, fontWeight: '800', marginTop: 8 },
  liveValue: { color: ui.blueDark, fontSize: 15, fontWeight: '900', marginTop: 6 },
  homeMascot: { position: 'absolute', right: 4, bottom: 8 },
  resultContent: {
    minHeight: 668,
    paddingHorizontal: 34,
    paddingTop: 39,
    paddingBottom: 112,
  },
  alertCard: {
    width: 245,
    height: 174,
    borderRadius: 45,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: ui.danger,
    shadowOpacity: 0.26,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  alertIcon: {
    width: 47,
    height: 42,
    borderRadius: 10,
    backgroundColor: ui.danger,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },
  alertPlace: { color: '#111111', fontSize: 15, fontWeight: '900', marginBottom: 12 },
  alertLevel: { color: ui.danger, fontSize: 19, fontWeight: '900' },
  resultDivider: { height: 1, backgroundColor: '#D7D7D7', marginTop: 43, marginBottom: 20 },
  resultDividerSmall: { height: 1, backgroundColor: '#D7D7D7', marginTop: 20, marginBottom: 13 },
  routeHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 15 },
  resultSectionTitle: { color: ui.blueDark, fontSize: 16, fontWeight: '900', marginBottom: 4 },
  routeMinutes: { color: '#111111', fontSize: 24, fontWeight: '900', lineHeight: 26 },
  routeSub: { color: '#565E6A', fontSize: 10, fontWeight: '800', marginTop: 4 },
  arriveBadge: {
    height: 39,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: ui.blue,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  arriveText: { color: ui.blue, fontSize: 11, fontWeight: '900' },
  routeBar: { height: 17, borderRadius: 9, overflow: 'hidden', flexDirection: 'row', backgroundColor: '#D8D8D8' },
  routeGray: { flex: 3, alignItems: 'center', justifyContent: 'center' },
  routeGreen: { flex: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#79B365' },
  routeLineBadge: {
    width: 17,
    height: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6FFF3',
    borderWidth: 2,
    borderColor: '#79B365',
  },
  routeLineText: { color: '#79B365', fontSize: 10, fontWeight: '900', lineHeight: 11 },
  routeBarText: { color: '#5F6670', fontSize: 10, fontWeight: '900' },
  routeBarTextLight: { color: '#FFFFFF', fontSize: 10, fontWeight: '900' },
  weatherStrip: {
    height: 112,
    borderRadius: 8,
    backgroundColor: '#FBFCFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 11,
  },
  weatherItem: { alignItems: 'center', justifyContent: 'center', gap: 8 },
  weatherLabel: { color: ui.blueDark, fontSize: 13, fontWeight: '900' },
  weatherTemp: { color: ui.blueDark, fontSize: 11, fontWeight: '900' },
  detailButton: {
    width: 181,
    height: 48,
    borderRadius: 9,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ui.blue,
    marginTop: 19,
  },
  detailButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '900' },
});
