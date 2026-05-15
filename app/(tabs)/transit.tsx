import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { ScreenHeader, ui } from '@/components/AppChrome';
import mock from '@/data/delbeum_mock.json';

const placeImages = ['#5B6D7B', '#DCE8F3', '#A79AD0'];

type Stop = {
  id: string;
  name: string;
  meta: string;
  crowd: '낮음' | '중간' | '높음';
  line: string;
  move: string;
};

export default function TransitScreen() {
  const [stops, setStops] = useState<Stop[]>(mock.itinerary.draftStops as Stop[]);
  const [draft, setDraft] = useState('');
  const [optimized, setOptimized] = useState(false);
  const totalMinutes = useMemo(() => stops.reduce((sum, stop) => sum + Number(stop.move.replace(/\D/g, '')), 0), [stops]);

  const addStop = () => {
    const name = draft.trim();
    if (!name) return;
    setStops((prev) => [
      ...prev,
      { id: `${name}-${Date.now()}`, name, meta: 'AI 추천 · 새 장소', crowd: '중간', line: '2호선', move: '이동 18분' },
    ]);
    setDraft('');
  };

  const removeStop = (id: string) => {
    setStops((prev) => prev.filter((stop) => stop.id !== id));
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="일정" />
      {optimized ? (
        <OptimizedSchedule stops={stops} totalMinutes={totalMinutes} onBack={() => setOptimized(false)} />
      ) : (
        <Planner stops={stops} draft={draft} onDraft={setDraft} onAdd={addStop} onRemove={removeStop} onOptimize={() => setOptimized(true)} />
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
    <ScrollView style={styles.body} contentContainerStyle={styles.plannerContent}>
      <View style={styles.calendarIcon}>
        <FontAwesome name="calendar" size={25} color={ui.blue} />
      </View>
      <Text style={styles.plannerTitle}>널널한 서울 여행 일정 짜기</Text>

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

      <View style={styles.thinLine} />

      {stops.map((stop, index) => (
        <View key={stop.id} style={styles.stopCard}>
          <View style={styles.stopText}>
            <Text style={styles.stopTitle}>{index + 1}. {stop.name}</Text>
            <Text style={styles.stopMeta}>{stop.meta}</Text>
          </View>
          <View style={[styles.stopThumb, { backgroundColor: placeImages[index % placeImages.length] }]}>
            <View style={styles.thumbGlow} />
          </View>
          <Pressable style={styles.removeButton} onPress={() => onRemove(stop.id)}>
            <FontAwesome name="times" size={20} color="#6C7078" />
          </Pressable>
        </View>
      ))}

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
    <ScrollView style={styles.body} contentContainerStyle={styles.optimizedContent}>
      <Text style={styles.orderTitle}>추천 순서</Text>
      <View style={styles.timeline}>
        {stops.map((stop, index) => (
          <View key={stop.id} style={styles.timelineBlock}>
            <View style={styles.timelineRail}>
              <View style={styles.pin}>
                <FontAwesome name="map-marker" size={21} color="#FFFFFF" />
              </View>
              {index < stops.length ? <View style={styles.dashedLine} /> : null}
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
              <FontAwesome name="map-marker" size={21} color="#FFFFFF" />
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
  plannerContent: { padding: 27, paddingBottom: 112 },
  calendarIcon: { alignItems: 'center', marginBottom: 8 },
  plannerTitle: { color: ui.blue, fontSize: 20, fontWeight: '900', textAlign: 'center', marginBottom: 27 },
  addRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  placeInput: {
    flex: 1,
    height: 47,
    borderWidth: 2,
    borderColor: ui.border,
    borderRadius: 11,
    paddingHorizontal: 16,
    color: ui.text,
    fontSize: 14,
    fontWeight: '800',
    outlineStyle: 'none' as never,
  },
  addButton: { width: 52, height: 47, borderRadius: 13, backgroundColor: ui.blue, alignItems: 'center', justifyContent: 'center' },
  addButtonText: { color: '#FFFFFF', fontSize: 21, fontWeight: '900' },
  thinLine: { height: 1, backgroundColor: '#D6D6D6', marginVertical: 17 },
  stopCard: {
    minHeight: 85,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#B8C0CB',
    backgroundColor: ui.blueSoft,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 19,
    paddingRight: 12,
    marginBottom: 13,
  },
  stopText: { flex: 1 },
  stopTitle: { color: ui.blueDark, fontSize: 16, fontWeight: '900', marginBottom: 8 },
  stopMeta: { color: '#555A64', fontSize: 12, fontWeight: '800' },
  stopThumb: { width: 93, height: 52, borderRadius: 28, overflow: 'hidden', marginRight: 22, alignItems: 'center', justifyContent: 'center' },
  thumbGlow: { width: 75, height: 24, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.35)' },
  removeButton: { width: 24, height: 40, alignItems: 'center', justifyContent: 'center' },
  optimizeButton: {
    alignSelf: 'center',
    width: 178,
    height: 46,
    borderRadius: 13,
    backgroundColor: ui.blue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 5,
  },
  optimizeText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },
  optimizeSub: { color: '#FFFFFF', fontSize: 9, fontWeight: '800', opacity: 0.92, marginTop: 1 },
  optimizedContent: { padding: 27, paddingBottom: 112 },
  orderTitle: { color: ui.blueDark, fontSize: 17, fontWeight: '900', marginBottom: 23 },
  timeline: { marginLeft: 3 },
  timelineBlock: { flexDirection: 'row', minHeight: 108 },
  timelineRail: { width: 40, alignItems: 'center' },
  pin: { width: 36, height: 36, borderRadius: 18, backgroundColor: ui.blue, alignItems: 'center', justifyContent: 'center' },
  dashedLine: { flex: 1, borderLeftWidth: 2, borderStyle: 'dashed', borderColor: ui.blue, marginVertical: 6 },
  timelineContent: { flex: 1, paddingLeft: 10, paddingTop: 5 },
  timelineName: { color: ui.text, fontSize: 16, fontWeight: '900', marginBottom: 5 },
  timelineMeta: { color: '#4D535E', fontSize: 10, fontWeight: '800', marginBottom: 13 },
  moveBox: {
    width: 185,
    height: 34,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: ui.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7FAFF',
  },
  moveText: { color: '#111827', fontSize: 11, fontWeight: '900' },
  summaryBar: {
    height: 54,
    marginHorizontal: -27,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#D8D8D8',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 24,
  },
  summaryText: { color: ui.blue, fontSize: 15, fontWeight: '900' },
  saveButton: {
    alignSelf: 'center',
    width: 181,
    height: 46,
    borderRadius: 10,
    backgroundColor: ui.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '900' },
});
