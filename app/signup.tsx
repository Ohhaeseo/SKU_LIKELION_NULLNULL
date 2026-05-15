import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ScreenHeader, ui } from '@/components/AppChrome';

function saveSignup(user: Record<string, string>) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('nollnull-user', JSON.stringify({ ...user, method: '회원가입' }));
}

export default function SignupScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    id: '',
    password: '',
    name: '',
    phone: '',
    email: '',
  });
  const [message, setMessage] = useState('');

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const signup = () => {
    if (!form.id.trim() || !form.password.trim() || !form.name.trim() || !form.phone.trim()) {
      setMessage('필수 정보를 모두 입력해주세요.');
      return;
    }
    saveSignup(form);
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="회원가입" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>기본 정보 입력</Text>
        <Text style={styles.subtitle}>여행 일정과 혼잡도 알림에 사용할 정보를 입력해주세요.</Text>

        <TextInput value={form.id} onChangeText={(value) => update('id', value)} placeholder="아이디" placeholderTextColor="#7A818C" style={styles.input} />
        <TextInput
          value={form.password}
          onChangeText={(value) => update('password', value)}
          placeholder="비밀번호"
          placeholderTextColor="#7A818C"
          secureTextEntry
          style={styles.input}
        />
        <TextInput value={form.name} onChangeText={(value) => update('name', value)} placeholder="이름" placeholderTextColor="#7A818C" style={styles.input} />
        <TextInput
          value={form.phone}
          onChangeText={(value) => update('phone', value)}
          placeholder="전화번호"
          placeholderTextColor="#7A818C"
          keyboardType="phone-pad"
          style={styles.input}
        />
        <TextInput
          value={form.email}
          onChangeText={(value) => update('email', value)}
          placeholder="이메일 선택"
          placeholderTextColor="#7A818C"
          keyboardType="email-address"
          style={styles.input}
        />

        {message ? <Text style={styles.message}>{message}</Text> : null}
        <Pressable style={styles.primaryButton} onPress={signup}>
          <Text style={styles.primaryText}>가입하고 시작하기</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={() => router.back()}>
          <Text style={styles.secondaryText}>로그인으로 돌아가기</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 28, paddingBottom: 60 },
  title: { color: ui.text, fontSize: 25, fontWeight: '900', marginBottom: 8 },
  subtitle: { color: '#656C76', fontSize: 13, fontWeight: '800', marginBottom: 22 },
  input: {
    height: 52,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: ui.border,
    paddingHorizontal: 16,
    color: ui.text,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 12,
    outlineStyle: 'none' as never,
  },
  message: { color: ui.danger, fontSize: 12, fontWeight: '900', marginBottom: 10 },
  primaryButton: { height: 52, borderRadius: 15, backgroundColor: ui.blue, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  primaryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  secondaryButton: { height: 48, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  secondaryText: { color: ui.blueDark, fontSize: 14, fontWeight: '900' },
});
