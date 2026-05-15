import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

import Colors from '@/constants/Colors';
import NudgeCard from '@/components/NudgeCard';
import PredictionChart from '@/components/PredictionChart';
import mock from '@/data/delbeum_mock.json';

const colors = Colors.light;

export function generateStaticParams() {
  return mock.places.map((place) => ({ id: place.id }));
}

export default function LocationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const place = mock.places.find((item) => item.id === id) ?? mock.places[0];
  const alternatives = place.alternatives
    .map((altId) => mock.places.find((item) => item.id === altId))
    .filter(Boolean);

  const shouldAvoid = place.levelCode >= 3;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="chevron-left" size={18} color={colors.ink} />
        </Pressable>
        <Text style={styles.headerTitle}>{place.name}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.placeArea}>{place.area}</Text>
              <Text style={styles.placeName}>{place.name}</Text>
            </View>
            <View style={[styles.levelBadge, { backgroundColor: place.statusColor }]}>
              <Text style={styles.levelBadgeText}>{place.level}</Text>
            </View>
          </View>
          <Text style={styles.description}>{place.description}</Text>

          <View style={styles.statGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{(place.population / 10000).toFixed(1)}만</Text>
              <Text style={styles.statLabel}>현재 추정</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{(place.forecastPopulation / 10000).toFixed(1)}만</Text>
              <Text style={styles.statLabel}>{place.forecastTime} 예측</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{place.trend}</Text>
              <Text style={styles.statLabel}>변화율</Text>
            </View>
          </View>
        </View>

        <NudgeCard
          title={shouldAvoid ? '길라미 AI 회피 추천' : '길라미 AI 방문 추천'}
          message={
            shouldAvoid
              ? `${place.name}은 지금 혼잡 리스크가 높아요. 비슷한 분위기의 덜 붐비는 장소를 먼저 추천할게요.`
              : `${place.name}은 지금 이동하기 좋은 상태예요. 초행 관광객도 비교적 편하게 방문할 수 있어요.`
          }
          reason={place.risk}
          metric={shouldAvoid ? '대체 시 혼잡도 40% 이상 완화 기대' : '현재 저혼잡 유지 중'}
        />

        <PredictionChart data={mock.forecastSeries} title={`${place.name} AI 혼잡 예측`} />

        <Text style={styles.sectionTitle}>대체 장소 추천</Text>
        {alternatives.map((alternative) => {
          if (!alternative) return null;
          return (
            <Pressable
              key={alternative.id}
              style={styles.alternativeCard}
              onPress={() => router.replace(`/location/${alternative.id}`)}
            >
              <View style={[styles.altDot, { backgroundColor: alternative.statusColor }]} />
              <View style={styles.altBody}>
                <Text style={styles.altName}>{alternative.name}</Text>
                <Text style={styles.altMeta}>{alternative.area} · {alternative.level}</Text>
                <Text style={styles.altDesc}>{alternative.description}</Text>
              </View>
              <FontAwesome name="angle-right" size={20} color={colors.muted} />
            </Pressable>
          );
        })}

        <Text style={styles.sectionTitle}>관광객 행동 가이드</Text>
        <View style={styles.guideCard}>
          <View style={styles.guideRow}>
            <FontAwesome name="sign-out" size={15} color={colors.tint} />
            <Text style={styles.guideText}>출구가 붐비면 가까운 다른 출구를 먼저 확인하세요.</Text>
          </View>
          <View style={styles.guideRow}>
            <FontAwesome name="clock-o" size={15} color={colors.tint} />
            <Text style={styles.guideText}>혼잡 상승 시간대에는 20~30분만 늦춰도 체감이 달라져요.</Text>
          </View>
          <View style={styles.guideRow}>
            <FontAwesome name="language" size={15} color={colors.tint} />
            <Text style={styles.guideText}>영어 안내가 필요한 경우 큰 역, 쇼핑몰, 관광안내소를 우선 경유하세요.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#F3F5F4',
  },
  headerTitle: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '900',
  },
  headerSpacer: {
    width: 34,
  },
  content: {
    flex: 1,
  },
  contentInner: {
    paddingBottom: 34,
  },
  heroCard: {
    margin: 20,
    padding: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#FFFFFF',
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  placeArea: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 3,
  },
  placeName: {
    color: colors.ink,
    fontSize: 26,
    fontWeight: '900',
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
  },
  levelBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 16,
  },
  statGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F7F8FA',
  },
  statValue: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '900',
  },
  statLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '800',
    marginTop: 4,
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '900',
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 12,
  },
  alternativeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#FFFFFF',
  },
  altDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 5,
    marginRight: 12,
  },
  altBody: {
    flex: 1,
  },
  altName: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '900',
  },
  altMeta: {
    color: colors.safe,
    fontSize: 12,
    fontWeight: '900',
    marginTop: 3,
  },
  altDesc: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
  guideCard: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#FFFFFF',
  },
  guideRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  guideText: {
    flex: 1,
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 20,
    marginLeft: 10,
  },
});
