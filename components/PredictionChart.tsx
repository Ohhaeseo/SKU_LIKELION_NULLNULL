import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import Colors from '@/constants/Colors';

const chartWidth = Math.min(Dimensions.get('window').width - 72, 358);

type ForecastPoint = {
  time: string;
  seoulApiPopulation: number;
  aiNowcast: number;
  aiForecast30min?: number;
};

type Props = {
  data: ForecastPoint[];
  title?: string;
};

export default function PredictionChart({ data, title = '혼잡 예측 추이' }: Props) {
  const colors = Colors.light;
  const labels = data.map((point) => point.time.replace(':00', '시'));
  const publicData = data.map((point) => point.seoulApiPopulation);
  const aiData = data.map((point) => point.aiNowcast);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#A7B0B8' }]} />
            <Text style={styles.legendText}>공공데이터 지연값</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.tint }]} />
            <Text style={styles.legendText}>길라미 AI 보정값</Text>
          </View>
        </View>
      </View>

      <LineChart
        data={{
          labels,
          datasets: [
            {
              data: publicData,
              color: (opacity = 1) => `rgba(102, 112, 133, ${opacity})`,
              strokeWidth: 2,
            },
            {
              data: aiData,
              color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
              strokeWidth: 3,
            },
          ],
        }}
        width={chartWidth}
        height={210}
        yAxisSuffix="k"
        formatYLabel={(value) => (Number(value) / 1000).toFixed(0)}
        chartConfig={{
          backgroundColor: colors.card,
          backgroundGradientFrom: colors.card,
          backgroundGradientTo: colors.card,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(15, 23, 42, ${opacity * 0.14})`,
          labelColor: (opacity = 1) => `rgba(71, 84, 103, ${opacity})`,
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: colors.card,
          },
        }}
        bezier
        style={styles.chart}
        withVerticalLines={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 14,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D9E4F5',
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginBottom: 8,
  },
  title: {
    color: '#172126',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    color: '#667085',
    fontSize: 12,
    fontWeight: '600',
  },
  chart: {
    marginTop: 6,
    marginLeft: -12,
    borderRadius: 8,
  },
});
