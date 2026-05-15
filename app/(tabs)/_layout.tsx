import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import { FloatingAiAssistant } from '@/components/FloatingAiAssistant';
import Colors from '@/constants/Colors';

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
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: focused ? Colors.light.tint : '#8A8F9C',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 8,
          borderColor: '#FFFFFF',
          marginBottom: 24,
          shadowColor: '#6F8DEB',
          shadowOpacity: 0.25,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 5 },
        }}
      >
        <FontAwesome name="home" size={26} color="#FFFFFF" />
      </View>
    );
  }

  return <FontAwesome name={name} size={24} color={color} />;
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
          tabBarInactiveTintColor: '#B8B8B8',
          tabBarStyle: {
            height: 92,
            paddingTop: 13,
            paddingBottom: 14,
            backgroundColor: colors.card,
            borderTopColor: '#F0F0F0',
            borderTopWidth: 1,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '700',
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
            title: '널널 AI',
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
