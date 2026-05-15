import { FontAwesome } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { PanResponder, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { ScreenHeader, ui } from '@/components/AppChrome';
import {
  crowdedStationRanking,
  seoulSubwayStations,
  SubwayStation,
  subwayLineColors,
} from '@/data/seoul_subway_stations';

const crowdColors = {
  low: '#35A853',
  medium: '#D99A32',
  high: '#D95A52',
  veryHigh: '#C84A42',
};

const heatPoints = [
  { left: '22%', top: '31%', size: 58, color: 'rgba(212, 90, 82, 0.24)' },
  { left: '50%', top: '23%', size: 68, color: 'rgba(217, 154, 51, 0.32)' },
  { left: '70%', top: '44%', size: 70, color: 'rgba(72, 179, 98, 0.26)' },
  { left: '78%', top: '12%', size: 62, color: 'rgba(72, 179, 98, 0.28)' },
  { left: '10%', top: '60%', size: 60, color: 'rgba(212, 90, 82, 0.22)' },
  { left: '76%', top: '72%', size: 80, color: 'rgba(228, 212, 94, 0.32)' },
] as const;

const visibleLinePaths = [
  { line: '2호선', top: '45%', rotate: '-4deg', left: '-8%', width: '118%' },
  { line: '5호선', top: '34%', rotate: '-12deg', left: '0%', width: '106%' },
  { line: '6호선', top: '57%', rotate: '7deg', left: '-5%', width: '98%' },
  { line: '9호선', top: '68%', rotate: '-8deg', left: '14%', width: '92%' },
  { line: '공항철도', top: '28%', rotate: '17deg', left: '-10%', width: '74%' },
  { line: '경의중앙선', top: '51%', rotate: '-22deg', left: '39%', width: '72%' },
] as const;

export default function DensityMapScreen() {
  const [query, setQuery] = useState('');
  const [selectedStation, setSelectedStation] = useState<SubwayStation>(crowdedStationRanking[0]);
  const [sheetCollapsed, setSheetCollapsed] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();

  const searchResults = useMemo(() => {
    if (!normalizedQuery) return [];

    return seoulSubwayStations
      .filter((station) => {
        const searchable = [
          station.name,
          station.district,
          station.crowdLevel,
          ...station.lines,
          ...station.nearby,
        ].join(' ').toLowerCase();

        return searchable.includes(normalizedQuery);
      })
      .sort((a, b) => b.passengers - a.passengers)
      .slice(0, 30);
  }, [normalizedQuery]);

  const mapStations = useMemo(() => {
    const important = new Map<string, SubwayStation>();
    crowdedStationRanking.forEach((station) => important.set(station.name, station));
    searchResults.slice(0, 12).forEach((station) => important.set(station.name, station));
    important.set(selectedStation.name, selectedStation);
    return Array.from(important.values());
  }, [searchResults, selectedStation]);

  const ranking = crowdedStationRanking.slice(0, 10);
  const displayList = normalizedQuery ? searchResults : ranking;
  const sheetPanResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 12,
        onPanResponderRelease: (_, gesture) => {
          if (gesture.dy > 24) setSheetCollapsed(true);
          if (gesture.dy < -24) setSheetCollapsed(false);
        },
      }),
    [],
  );

  return (
    <View style={styles.container}>
      <ScreenHeader title="지도" />

      <View style={styles.mapArea}>
        <View style={styles.mapBase}>
          <View style={styles.landPatchOne} />
          <View style={styles.landPatchTwo} />
          <View style={styles.river} />
          <Text style={[styles.mapDistrictLabel, { left: '13%', top: '20%' }]}>마포</Text>
          <Text style={[styles.mapDistrictLabel, { left: '42%', top: '18%' }]}>중구</Text>
          <Text style={[styles.mapDistrictLabel, { left: '68%', top: '24%' }]}>성동</Text>
          <Text style={[styles.mapDistrictLabel, { left: '33%', top: '62%' }]}>여의도</Text>
          <Text style={[styles.mapDistrictLabel, { left: '62%', top: '70%' }]}>강남</Text>

          {roadLines.map((road, index) => (
            <View key={`road-${index}`} style={[styles.road, road]} />
          ))}

          {visibleLinePaths.map((path) => (
            <View
              key={path.line}
              style={[
                styles.subwayLine,
                {
                  top: path.top,
                  left: path.left,
                  width: path.width,
                  backgroundColor: subwayLineColors[path.line],
                  transform: [{ rotate: path.rotate }],
                },
              ]}
            />
          ))}

          {heatPoints.map((point, index) => (
            <View
              key={`heat-${index}`}
              style={[
                styles.heat,
                {
                  left: point.left,
                  top: point.top,
                  width: point.size,
                  height: point.size,
                  borderRadius: point.size / 2,
                  backgroundColor: point.color,
                },
              ]}
            />
          ))}

          {mapStations.map((station) => (
            <Pressable
              key={station.name}
              onPress={() => setSelectedStation(station)}
              style={[
                styles.stationPin,
                {
                  left: `${station.x}%`,
                  top: `${station.y}%`,
                  borderColor: selectedStation.name === station.name ? ui.blue : '#FFFFFF',
                  backgroundColor: crowdColors[station.crowdCode],
                },
              ]}
            >
              {selectedStation.name === station.name ? <View style={styles.stationPinCore} /> : null}
            </Pressable>
          ))}

          <View style={styles.selectedMapLabel}>
            <Text style={styles.selectedMapName}>{selectedStation.name}</Text>
            <Text style={styles.selectedMapMeta}>
              {selectedStation.lines.slice(0, 2).join(' · ')} · {selectedStation.crowdLevel}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.searchLayer}>
        <FontAwesome name="search" size={15} color="#8791A3" />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="역명, 노선, 지역 검색"
          placeholderTextColor="#9AA2B2"
          style={styles.searchInput}
        />
        {query ? (
          <Pressable onPress={() => setQuery('')} style={styles.clearButton}>
            <FontAwesome name="close" size={14} color="#7D8492" />
          </Pressable>
        ) : null}
      </View>

      <View style={[styles.sheet, sheetCollapsed && styles.sheetCollapsed]}>
        <Pressable
          style={styles.handleZone}
          onPress={() => setSheetCollapsed((value) => !value)}
          {...sheetPanResponder.panHandlers}
        >
          <View style={styles.handle} />
          <FontAwesome name={sheetCollapsed ? 'angle-up' : 'angle-down'} size={18} color={ui.blue} />
        </Pressable>

        {sheetCollapsed ? (
          <Text style={styles.collapsedHint}>혼잡도와 역 검색 보기</Text>
        ) : (
          <>
        <View style={styles.sheetHeader}>
          <View>
            <Text style={styles.sheetTitle}>{normalizedQuery ? '역 검색 결과' : '혼잡도 순위'}</Text>
            <Text style={styles.sheetSubtitle}>서울 지하철 {seoulSubwayStations.length}개 역 데이터</Text>
          </View>
          <View style={styles.countPill}>
            <Text style={styles.countText}>{displayList.length}개</Text>
          </View>
        </View>

        <View style={styles.selectedCard}>
          <View style={styles.selectedTop}>
            <Text style={styles.selectedName}>{selectedStation.name}</Text>
            <View style={[styles.crowdBadge, { borderColor: crowdColors[selectedStation.crowdCode] }]}>
              <Text style={[styles.crowdBadgeText, { color: crowdColors[selectedStation.crowdCode] }]}>
                {selectedStation.crowdLevel}
              </Text>
            </View>
          </View>
          <Text style={styles.selectedInfo}>
            {selectedStation.district} · 출구 {selectedStation.exits}개 · 예상 유동 {selectedStation.passengers.toLocaleString()}명
          </Text>
          <View style={styles.lineRow}>
            {selectedStation.lines.map((line) => (
              <View key={line} style={[styles.lineChip, { borderColor: subwayLineColors[line] ?? ui.border }]}>
                <Text style={[styles.lineChipText, { color: subwayLineColors[line] ?? ui.blueDark }]}>{line}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.nearbyText}>{selectedStation.nearby.join(' · ')}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
          {displayList.map((station, index) => (
            <Pressable
              key={station.name}
              style={[styles.stationCard, selectedStation.name === station.name && styles.stationCardSelected]}
              onPress={() => setSelectedStation(station)}
            >
              <Text style={styles.rankNumber}>{normalizedQuery ? index + 1 : `${index + 1}위`}</Text>
              <View style={styles.rankBody}>
                <Text style={styles.stationName}>{station.name}</Text>
                <Text style={styles.stationMeta}>
                  {station.lines.slice(0, 3).join(' · ')} · {station.district}
                </Text>
              </View>
              <View style={[styles.smallBadge, { backgroundColor: `${crowdColors[station.crowdCode]}16` }]}>
                <Text style={[styles.smallBadgeText, { color: crowdColors[station.crowdCode] }]}>
                  {station.crowdLevel}
                </Text>
              </View>
            </Pressable>
          ))}
          {normalizedQuery && displayList.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyTitle}>검색 결과가 없어요</Text>
              <Text style={styles.emptyText}>역명, 노선명, 지역명으로 다시 검색해보세요.</Text>
            </View>
          ) : null}
        </ScrollView>
          </>
        )}
      </View>
    </View>
  );
}

const roadLines = [
  { left: '-6%', top: '19%', width: '112%', transform: [{ rotate: '-9deg' }] },
  { left: '-10%', top: '39%', width: '118%', transform: [{ rotate: '5deg' }] },
  { left: '5%', top: '78%', width: '98%', transform: [{ rotate: '-13deg' }] },
  { left: '16%', top: '4%', width: 3, height: '86%', transform: [{ rotate: '18deg' }] },
  { left: '56%', top: '6%', width: 3, height: '84%', transform: [{ rotate: '-12deg' }] },
] as const;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  mapArea: { height: 430, backgroundColor: '#EAF1E5', overflow: 'hidden' },
  mapBase: { flex: 1, backgroundColor: '#EDF4EA' },
  landPatchOne: {
    position: 'absolute',
    left: '2%',
    top: '8%',
    width: 155,
    height: 95,
    borderRadius: 46,
    backgroundColor: '#DFEBD5',
    transform: [{ rotate: '-16deg' }],
  },
  landPatchTwo: {
    position: 'absolute',
    right: '-7%',
    bottom: '15%',
    width: 190,
    height: 110,
    borderRadius: 52,
    backgroundColor: '#E6EED6',
    transform: [{ rotate: '11deg' }],
  },
  river: {
    position: 'absolute',
    left: '-14%',
    right: '-14%',
    top: '48%',
    height: 82,
    backgroundColor: '#BFDCE9',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'rgba(255,255,255,0.64)',
    transform: [{ rotate: '-10deg' }],
  },
  road: {
    position: 'absolute',
    height: 5,
    borderRadius: 3,
    backgroundColor: '#F6E4A8',
    borderWidth: 1,
    borderColor: '#E1C981',
  },
  subwayLine: {
    position: 'absolute',
    height: 4,
    borderRadius: 3,
    opacity: 0.82,
  },
  mapDistrictLabel: {
    position: 'absolute',
    color: '#63819A',
    fontSize: 12,
    fontWeight: '900',
  },
  heat: { position: 'absolute' },
  stationPin: {
    position: 'absolute',
    width: 17,
    height: 17,
    marginLeft: -8,
    marginTop: -8,
    borderRadius: 9,
    borderWidth: 3,
    shadowColor: '#000000',
    shadowOpacity: 0.16,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  stationPinCore: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    marginTop: 3,
  },
  selectedMapLabel: {
    position: 'absolute',
    left: 18,
    bottom: 76,
    minWidth: 132,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#2F5A9D',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
  },
  selectedMapName: { color: ui.text, fontSize: 16, fontWeight: '900' },
  selectedMapMeta: { color: ui.blueDark, fontSize: 11, fontWeight: '800', marginTop: 3 },
  searchLayer: {
    position: 'absolute',
    left: 25,
    right: 25,
    top: 122,
    height: 48,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: ui.border,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#6A8FE8',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  searchInput: { flex: 1, marginLeft: 10, color: ui.text, fontSize: 14, fontWeight: '800', outlineStyle: 'none' as never },
  clearButton: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F3FA' },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 430,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    paddingHorizontal: 25,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
  sheetCollapsed: {
    height: 74,
    paddingHorizontal: 25,
  },
  handleZone: {
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  handle: { width: 70, height: 7, borderRadius: 4, backgroundColor: ui.blue, alignSelf: 'center' },
  collapsedHint: { color: ui.blueDark, fontSize: 13, fontWeight: '900', textAlign: 'center', marginTop: 2 },
  sheetHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13 },
  sheetTitle: { color: ui.text, fontSize: 24, fontWeight: '900' },
  sheetSubtitle: { color: '#7890BD', fontSize: 12, fontWeight: '800', marginTop: 4 },
  countPill: { minWidth: 50, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EDF3FF' },
  countText: { color: ui.blueDark, fontSize: 12, fontWeight: '900' },
  selectedCard: {
    borderWidth: 1.5,
    borderColor: ui.border,
    borderRadius: 18,
    backgroundColor: '#FBFCFF',
    padding: 15,
    marginBottom: 12,
  },
  selectedTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  selectedName: { color: ui.text, fontSize: 19, fontWeight: '900' },
  selectedInfo: { color: '#6D7280', fontSize: 12, fontWeight: '800', marginTop: 7 },
  lineRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  lineChip: { height: 24, borderRadius: 12, borderWidth: 1, paddingHorizontal: 9, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },
  lineChipText: { fontSize: 11, fontWeight: '900' },
  nearbyText: { color: ui.blueDark, fontSize: 12, fontWeight: '800', marginTop: 10 },
  crowdBadge: { minWidth: 72, height: 28, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 },
  crowdBadgeText: { fontSize: 11, fontWeight: '900' },
  listContent: { paddingBottom: 110 },
  stationCard: {
    minHeight: 58,
    borderRadius: 14,
    borderWidth: 1.3,
    borderColor: ui.border,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
    backgroundColor: '#FFFFFF',
  },
  stationCardSelected: { backgroundColor: '#F5F8FF' },
  rankNumber: { width: 42, color: ui.blueDark, fontSize: 17, fontWeight: '900' },
  rankBody: { flex: 1 },
  stationName: { color: ui.text, fontSize: 14, fontWeight: '900' },
  stationMeta: { color: '#9298A4', fontSize: 11, fontWeight: '800', marginTop: 3 },
  smallBadge: { minWidth: 62, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 9 },
  smallBadgeText: { fontSize: 11, fontWeight: '900' },
  emptyBox: { alignItems: 'center', paddingVertical: 24 },
  emptyTitle: { color: ui.text, fontSize: 16, fontWeight: '900' },
  emptyText: { color: '#8A92A2', fontSize: 12, fontWeight: '800', marginTop: 6 },
});
