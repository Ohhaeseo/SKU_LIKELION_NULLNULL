import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { ScreenHeader, ui } from '@/components/AppChrome';

function saveSignup(user: Record<string, string>) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('nollnull-user', JSON.stringify({ ...user, name: user.name || '해서', method: '회원가입' }));
}

export default function SignupScreen() {
  const router = useRouter();
  const [form, setForm] = useState({ id: '', password: '', name: '', phone: '', email: '' });
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
    router.replace('/home' as never);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="회원가입" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.introCard}>
          <Text style={styles.title}>널널 AI 시작하기</Text>
          <Text style={styles.subtitle}>이동 일정과 혼잡도 알림에 사용할 기본 정보를 입력해주세요.</Text>
        </View>

        <View style={styles.formCard}>
          <Field value={form.id} onChangeText={(value) => update('id', value)} placeholder="아이디" />
          <Field value={form.password} onChangeText={(value) => update('password', value)} placeholder="비밀번호" secureTextEntry />
          <Field value={form.name} onChangeText={(value) => update('name', value)} placeholder="이름" />
          <Field value={form.phone} onChangeText={(value) => update('phone', value)} placeholder="전화번호" keyboardType="phone-pad" />
          <Field value={form.email} onChangeText={(value) => update('email', value)} placeholder="이메일 선택" keyboardType="email-address" />
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>

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

function Field(props: React.ComponentProps<typeof TextInput>) {
  return <TextInput {...props} placeholderTextColor="#7A818C" style={styles.input} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 24, paddingBottom: 70 },
  introCard: {
    borderRadius: 24,
    backgroundColor: ui.blueSoft2,
    borderWidth: 1,
    borderColor: ui.borderSoft,
    padding: 22,
    marginBottom: 16,
  },
  title: { color: ui.text, fontSize: 25, fontWeight: '900', marginBottom: 8 },
  subtitle: { color: ui.muted, fontSize: 13, fontWeight: '800', lineHeight: 20 },
  formCard: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEF1F8',
    padding: 16,
    marginBottom: 16,
  },
  input: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#F6F8FF',
    paddingHorizontal: 16,
    color: ui.text,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 11,
    outlineStyle: 'none' as never,
  },
  message: { color: ui.danger, fontSize: 12, fontWeight: '900', marginBottom: 2 },
  primaryButton: {
    height: 54,
    borderRadius: 17,
    backgroundColor: ui.blue,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: ui.blue,
    shadowOpacity: 0.23,
    shadowRadius: 13,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  primaryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  secondaryButton: { height: 48, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  secondaryText: { color: ui.blueDark, fontSize: 14, fontWeight: '900' },
});
