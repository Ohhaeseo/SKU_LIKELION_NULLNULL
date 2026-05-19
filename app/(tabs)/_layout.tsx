import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';

import { FloatingAiAssistant } from '@/components/FloatingAiAssistant';
import Colors from '@/constants/Colors';

const logoImage = require('../../pdf/LOGO.jpg');

export const unstable_settings = {
  initialRouteName: 'home',
};

function TabBarIcon({
  name,
  color,
  focused,
  isHome,
}: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  focused?: boolean;
  isHome?: boolean;
}) {
  if (isHome) {
    return (
      <View
        style={{
          width: 62,
          height: 62,
          borderRadius: 31,
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: focused ? 3 : 2,
          borderColor: focused ? Colors.light.tint : '#E2E8F8',
          marginBottom: 24,
          shadowColor: '#4368D7',
          shadowOpacity: focused ? 0.32 : 0.18,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 8 },
        }}
      >
        <Image source={logoImage} style={{ width: 42, height: 42, borderRadius: 13 }} resizeMode="cover" />
      </View>
    );
  }

  return <FontAwesome name={name} size={23} color={color} />;
}

function NullIcon({ color }: { color: string }) {
  return <Text style={{ color, fontSize: 28, fontWeight: '900', lineHeight: 30 }}>N</Text>;
}

export default function TabLayout() {
  const colors = Colors.light;

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.tint,
          tabBarInactiveTintColor: '#AEB4C1',
          tabBarStyle: {
            height: 92,
            paddingTop: 12,
            paddingBottom: 13,
            backgroundColor: '#FFFFFF',
            borderTopColor: '#EEF1F6',
            borderTopWidth: 1,
            elevation: 18,
            shadowColor: '#233B72',
            shadowOpacity: 0.08,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: -8 },
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '800',
            marginTop: 2,
          },
        }}
      >
        <Tabs.Screen
          name="map"
          options={{
            title: '지도',
            tabBarIcon: ({ color }) => <TabBarIcon name="map-o" color={color} />,
          }}
        />
        <Tabs.Screen
          name="transit"
          options={{
            title: '일정',
            tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: '',
            tabBarIcon: ({ focused }) => <TabBarIcon name="home" color={colors.tint} focused={focused} isHome />,
            tabBarItemStyle: {
              transform: [{ translateY: -10 }],
            },
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: 'AI 추천',
            tabBarIcon: ({ color }) => <NullIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="mypage"
          options={{
            title: '마이 페이지',
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          }}
        />
      </Tabs>
      <FloatingAiAssistant />
    </View>
  );
}
