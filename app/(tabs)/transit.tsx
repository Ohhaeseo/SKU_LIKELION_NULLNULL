import { FontAwesome } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { ScreenHeader, ui } from '@/components/AppChrome';
import mock from '@/data/delbeum_mock.json';

type Stop = {
  id: string;
  name: string;
  meta: string;
  crowd: '낮음' | '중간' | '높음';
  line: string;
  move: string;
};

const initialStops: Stop[] = (mock.itinerary.draftStops as Stop[]).map((stop, index) => ({
  ...stop,
  crowd: index === 0 ? '낮음' : index === 1 ? '중간' : '높음',
}));

export default function TransitScreen() {
  const [stops, setStops] = useState<Stop[]>(initialStops);
  const [draft, setDraft] = useState('');
  const [optimized, setOptimized] = useState(false);
  const totalMinutes = useMemo(() => stops.reduce((sum, stop) => sum + Number(stop.move.replace(/\D/g, '')), 0), [stops]);

  const addStop = () => {
    const name = draft.trim();
    if (!name) return;
    setStops((prev) => [
      ...prev,
      { id: `${name}-${Date.now()}`, name, meta: 'AI 추천 · 관광지', crowd: '중간', line: '2호선', move: '이동 18분' },
    ]);
    setDraft('');
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="일정" />
      {optimized ? (
        <OptimizedSchedule stops={stops} totalMinutes={totalMinutes} onBack={() => setOptimized(false)} />
      ) : (
        <Planner
          stops={stops}
          draft={draft}
          onDraft={setDraft}
          onAdd={addStop}
          onRemove={(id) => setStops((prev) => prev.filter((stop) => stop.id !== id))}
          onOptimize={() => setOptimized(true)}
        />
      )}
    </View>
  );
}

function Planner({
  stops,
  draft,
  onDraft,
  onAdd,
  onRemove,
  onOptimize,
}: {
  stops: Stop[];
  draft: string;
  onDraft: (value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onOptimize: () => void;
}) {
  return (
    <ScrollView style={styles.body} contentContainerStyle={styles.plannerContent} showsVerticalScrollIndicator={false}>
      <View style={styles.intro}>
        <View style={styles.calendarIcon}>
          <FontAwesome name="calendar" size={23} color={ui.blue} />
        </View>
        <Text style={styles.plannerTitle}>널널한 서울 여행 일정 짜기</Text>
      </View>

      <View style={styles.addRow}>
        <TextInput
          value={draft}
          onChangeText={onDraft}
          placeholder="장소 추가하기"
          placeholderTextColor="#6F7480"
          style={styles.placeInput}
        />
        <Pressable style={styles.addButton} onPress={onAdd}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      <View style={styles.stopList}>
        {stops.map((stop, index) => (
          <View key={stop.id} style={styles.stopCard}>
            <View style={styles.stopText}>
              <Text style={styles.stopTitle}>{index + 1}. {stop.name}</Text>
              <Text style={styles.stopMeta}>{stop.meta}</Text>
            </View>
            <View style={styles.stopBadge}>
              <Text style={styles.stopBadgeText}>{stop.crowd}</Text>
            </View>
            <Pressable style={styles.removeButton} onPress={() => onRemove(stop.id)}>
              <FontAwesome name="times" size={18} color="#6C7078" />
            </Pressable>
          </View>
        ))}
      </View>

      <Pressable style={styles.optimizeButton} onPress={onOptimize}>
        <FontAwesome name="magic" size={16} color="#FFFFFF" />
        <View>
          <Text style={styles.optimizeText}>AI 순서 최적화</Text>
          <Text style={styles.optimizeSub}>혼잡도 · 이동시간 계산</Text>
        </View>
      </Pressable>
    </ScrollView>
  );
}

function OptimizedSchedule({
  stops,
  totalMinutes,
  onBack,
}: {
  stops: Stop[];
  totalMinutes: number;
  onBack: () => void;
}) {
  return (
    <ScrollView style={styles.body} contentContainerStyle={styles.optimizedContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.orderTitle}>추천 순서</Text>
      <View style={styles.timeline}>
        {stops.map((stop, index) => (
          <View key={stop.id} style={styles.timelineBlock}>
            <View style={styles.timelineRail}>
              <View style={styles.pin}>
                <FontAwesome name="map-marker" size={20} color="#FFFFFF" />
              </View>
              {index < stops.length - 1 ? <View style={styles.dashedLine} /> : null}
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.timelineName}>{stop.name}</Text>
              <Text style={styles.timelineMeta}>{index === 0 ? '오전 9시' : index === 1 ? '오후 1시' : '저녁 6시'} · 혼잡도 {stop.crowd}</Text>
              {index < stops.length - 1 ? (
                <View style={styles.moveBox}>
                  <Text style={styles.moveText}>{stop.move} · 지하철 {stop.line}</Text>
                </View>
              ) : null}
            </View>
          </View>
        ))}
        <View style={styles.timelineBlock}>
          <View style={styles.timelineRail}>
            <View style={styles.pin}>
              <FontAwesome name="map-marker" size={20} color="#FFFFFF" />
            </View>
          </View>
          <View style={styles.timelineContent}>
            <Text style={styles.timelineName}>숙소</Text>
          </View>
        </View>
      </View>

      <View style={styles.summaryBar}>
        <Text style={styles.summaryText}>총 이동시간 {totalMinutes}분 · {stops.length}개 장소 방문</Text>
      </View>
      <Pressable style={styles.saveButton} onPress={onBack}>
        <Text style={styles.saveButtonText}>일정 저장하기</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  body: { flex: 1, backgroundColor: '#FFFFFF' },
  plannerContent: { padding: 24, paddingBottom: 112 },
  intro: { alignItems: 'center', marginBottom: 24 },
  calendarIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: ui.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  plannerTitle: { color: ui.blue, fontSize: 20, fontWeight: '900', textAlign: 'center' },
  addRow: { flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 18 },
  placeInput: {
    flex: 1,
    height: 50,
    borderWidth: 1.5,
    borderColor: ui.border,
    borderRadius: 17,
    paddingHorizontal: 16,
    color: ui.text,
    fontSize: 14,
    fontWeight: '800',
    outlineStyle: 'none' as never,
  },
  addButton: { width: 52, height: 50, borderRadius: 17, backgroundColor: ui.blue, alignItems: 'center', justifyContent: 'center' },
  addButtonText: { color: '#FFFFFF', fontSize: 22, fontWeight: '900' },
  stopList: { gap: 12, marginBottom: 16 },
  stopCard: {
    minHeight: 86,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: ui.borderSoft,
    backgroundColor: ui.blueSoft2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18,
    paddingRight: 12,
  },
  stopText: { flex: 1 },
  stopTitle: { color: ui.blueDark, fontSize: 16, fontWeight: '900', marginBottom: 7 },
  stopMeta: { color: '#555A64', fontSize: 12, fontWeight: '800' },
  stopBadge: {
    minWidth: 54,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginRight: 8,
  },
  stopBadgeText: { color: ui.blueDark, fontSize: 11, fontWeight: '900' },
  removeButton: { width: 26, height: 40, alignItems: 'center', justifyContent: 'center' },
  optimizeButton: {
    alignSelf: 'center',
    minWidth: 194,
    height: 50,
    borderRadius: 17,
    backgroundColor: ui.blue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    marginTop: 4,
    shadowColor: ui.blue,
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  optimizeText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },
  optimizeSub: { color: '#E8EEFF', fontSize: 10, fontWeight: '800', marginTop: 2 },
  optimizedContent: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 112 },
  orderTitle: { color: ui.blueDark, fontSize: 17, fontWeight: '900', marginBottom: 20 },
  timeline: { marginBottom: 22 },
  timelineBlock: { flexDirection: 'row', minHeight: 106 },
  timelineRail: { width: 42, alignItems: 'center' },
  pin: { width: 34, height: 34, borderRadius: 17, backgroundColor: ui.blue, alignItems: 'center', justifyContent: 'center' },
  dashedLine: { width: 2, flex: 1, borderLeftWidth: 2, borderLeftColor: ui.blue, borderStyle: 'dashed', marginTop: 7 },
  timelineContent: { flex: 1, paddingLeft: 10 },
  timelineName: { color: ui.text, fontSize: 17, fontWeight: '900', marginBottom: 5 },
  timelineMeta: { color: ui.muted, fontSize: 11, fontWeight: '800', marginBottom: 10 },
  moveBox: {
    width: 190,
    height: 35,
    borderWidth: 1,
    borderColor: ui.blue,
    borderRadius: 12,
    backgroundColor: ui.blueSoft2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moveText: { color: ui.text, fontSize: 11, fontWeight: '900' },
  summaryBar: {
    height: 52,
    borderRadius: 18,
    backgroundColor: ui.blueSoft2,
    borderWidth: 1,
    borderColor: ui.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  summaryText: { color: ui.blue, fontSize: 14, fontWeight: '900' },
  saveButton: {
    width: 190,
    height: 48,
    borderRadius: 17,
    backgroundColor: ui.blue,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  saveButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '900' },
});
