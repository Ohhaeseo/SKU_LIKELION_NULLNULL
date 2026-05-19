import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Polyline, Text as SvgText } from 'react-native-svg';

import { ScreenHeader, ui } from '@/components/AppChrome';

const aiPoints = [
  [36, 125],
  [93, 102],
  [150, 62],
  [207, 78],
  [264, 105],
  [321, 118],
];

const publicPoints = [
  [36, 164],
  [93, 145],
  [150, 124],
  [207, 104],
  [264, 142],
  [321, 158],
];

const guideRows = [
  {
    icon: 'sign-out' as const,
    text: '출구가 붐비면 가까운 다른 출구를 먼저 확인하세요.',
  },
  {
    icon: 'clock-o' as const,
    text: '혼잡 상승 시간대에는 20~30분만 늦춰도 체감이 달라져요.',
  },
  {
    icon: 'globe' as const,
    text: '영어 안내가 필요한 경우 큰 역, 쇼핑몰, 관광안내소를 우선 경유하세요.',
  },
];

export default function AssistantScreen() {
  return (
    <View style={styles.container}>
      <ScreenHeader title="널널 비서" />
      <ScrollView style={styles.body} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.graphSection}>
          <Text style={styles.graphTitle}>홍대입구 AI 혼잡도 예측</Text>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#CFCFCF' }]} />
              <Text style={styles.legendText}>공공데이터 지연값</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: ui.blue }]} />
              <Text style={styles.legendText}>널널 AI 보정값</Text>
            </View>
          </View>

          <View style={styles.chartWrap}>
            <Svg width="100%" height={260} viewBox="0 0 365 260">
              {[0, 1, 2, 3, 4].map((line) => (
                <Polyline
                  key={line}
                  points={`36,${45 + line * 40} 330,${45 + line * 40}`}
                  stroke="#F0F2F5"
                  strokeWidth="1"
                />
              ))}
              <Polyline points="36,24 36,214 330,214" stroke="#C4C7CC" strokeWidth="2" fill="none" />
              <Polyline
                points={publicPoints.map((point) => point.join(',')).join(' ')}
                stroke="#C5C7CA"
                strokeWidth="3"
                fill="none"
              />
              <Polyline
                points={aiPoints.map((point) => point.join(',')).join(' ')}
                stroke={ui.blue}
                strokeWidth="3"
                fill="none"
              />
              {aiPoints.map(([x, y]) => (
                <Circle key={`ai-${x}`} cx={x} cy={y} r="3.4" fill={ui.blue} />
              ))}
              {publicPoints.map(([x, y]) => (
                <Circle key={`public-${x}`} cx={x} cy={y} r="3.2" fill="#B9BBC1" />
              ))}
              {['72K', '65K', '58K', '50K', '43K'].map((label, index) => (
                <SvgText key={label} x="0" y={31 + index * 40} fontSize="12" fontWeight="700" fill="#747984">
                  {label}
                </SvgText>
              ))}
              {['14:30', '15:00', '15:30', '16:00', '16:30', '17:00'].map((label, index) => (
                <SvgText
                  key={label}
                  x={36 + index * 57}
                  y="244"
                  fontSize="12"
                  fontWeight="700"
                  fill="#747984"
                  textAnchor="middle"
                >
                  {label}
                </SvgText>
              ))}
            </Svg>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.guideTitle}>관광객 행동 가이드</Text>
        <View style={styles.guideCard}>
          {guideRows.map((row) => (
            <View key={row.text} style={styles.guideRow}>
              <FontAwesome name={row.icon} size={16} color={ui.blue} />
              <Text style={styles.guideText}>{row.text}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  body: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { minHeight: 724, paddingHorizontal: 28, paddingTop: 39, paddingBottom: 126 },
  graphSection: { minHeight: 318 },
  graphTitle: { color: '#777A83', fontSize: 18, fontWeight: '900', marginBottom: 9 },
  legend: { flexDirection: 'row', alignItems: 'center', gap: 18, marginBottom: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  legendDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  legendText: { color: '#7D838F', fontSize: 10, fontWeight: '900' },
  chartWrap: { minHeight: 260, justifyContent: 'center' },
  divider: { height: 1, backgroundColor: '#DADCE0', marginTop: 28, marginBottom: 30 },
  guideTitle: { color: '#6F727B', fontSize: 21, fontWeight: '900', marginBottom: 18 },
  guideCard: {
    borderWidth: 1.5,
    borderColor: ui.border,
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 18,
    backgroundColor: '#FBFCFF',
  },
  guideRow: { flexDirection: 'row', alignItems: 'center', minHeight: 42 },
  guideText: { flex: 1, color: '#596170', fontSize: 12, fontWeight: '900', marginLeft: 12, lineHeight: 18 },
});
