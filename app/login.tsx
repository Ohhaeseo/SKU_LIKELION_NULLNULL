import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { ScreenHeader, ui } from '@/components/AppChrome';

function rememberLogin(name: string, method: string) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(
    'nollnull-user',
    JSON.stringify({
      name: name || '해서',
      method,
      loggedInAt: new Date().toISOString(),
    }),
  );
}

export default function LoginScreen() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = (method = '아이디') => {
    if (method === '아이디' && (!id.trim() || !password.trim())) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }
    rememberLogin(id.trim() || '해서', method);
    router.replace('/(tabs)' as never);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="로그인" />
      <View style={styles.content}>
        <Text style={styles.brand}>널널 AI</Text>
        <Text style={styles.subtitle}>서울 여행을 더 여유롭게 시작해보세요.</Text>

        <View style={styles.form}>
          <TextInput
            value={id}
            onChangeText={setId}
            placeholder="아이디 또는 이메일"
            placeholderTextColor="#7A818C"
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="비밀번호"
            placeholderTextColor="#7A818C"
            secureTextEntry
            style={styles.input}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Pressable style={styles.primaryButton} onPress={() => login()}>
            <Text style={styles.primaryText}>로그인</Text>
          </Pressable>
        </View>

        <View style={styles.snsDivider}>
          <View style={styles.snsLine} />
          <Text style={styles.snsLabel}>SNS LOGIN</Text>
          <View style={styles.snsLine} />
        </View>

        <View style={styles.socialRow}>
          <Pressable style={[styles.socialCircle, styles.kakaoButton]} onPress={() => login('카카오')}>
            <View style={styles.talkBubble}>
              <Text style={styles.talkText}>TALK</Text>
            </View>
          </Pressable>
          <Pressable style={[styles.socialCircle, styles.naverButton]} onPress={() => login('네이버')}>
            <Text style={styles.naverText}>N</Text>
          </Pressable>
          <Pressable style={[styles.socialCircle, styles.googleButton]} onPress={() => login('Google')}>
            <Text style={styles.googleText}>G</Text>
          </Pressable>
        </View>

        <Pressable style={styles.linkButton} onPress={() => router.push('/signup' as never)}>
          <Text style={styles.linkText}>계정이 없나요? 회원가입</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { flex: 1, paddingHorizontal: 30, paddingTop: 58, paddingBottom: 40 },
  brand: { color: ui.text, fontSize: 30, fontWeight: '900', textAlign: 'center', marginBottom: 9 },
  subtitle: { color: '#656C76', fontSize: 14, fontWeight: '800', textAlign: 'center', lineHeight: 20, marginBottom: 34 },
  form: { gap: 12 },
  input: {
    height: 52,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: ui.border,
    paddingHorizontal: 16,
    color: ui.text,
    fontSize: 14,
    fontWeight: '800',
    outlineStyle: 'none' as never,
  },
  error: { color: ui.danger, fontSize: 12, fontWeight: '900' },
  primaryButton: {
    height: 56,
    borderRadius: 15,
    backgroundColor: ui.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    shadowColor: ui.blue,
    shadowOpacity: 0.28,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
  },
  primaryText: { color: '#FFFFFF', fontSize: 18, fontWeight: '900' },
  snsDivider: { flexDirection: 'row', alignItems: 'center', gap: 18, marginTop: 54, marginBottom: 32 },
  snsLine: { flex: 1, height: 1, backgroundColor: '#D8D8D8' },
  snsLabel: { color: '#717784', fontSize: 15, fontWeight: '900' },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 34 },
  socialCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kakaoButton: { backgroundColor: '#F5E84A' },
  naverButton: { backgroundColor: '#57C43A' },
  googleButton: { backgroundColor: '#D85043' },
  talkBubble: {
    width: 31,
    height: 24,
    borderRadius: 13,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  talkText: { color: '#F5E84A', fontSize: 9, fontWeight: '900' },
  naverText: { color: '#FFFFFF', fontSize: 36, fontWeight: '900' },
  googleText: { color: '#FFFFFF', fontSize: 36, fontWeight: '900' },
  linkButton: { alignItems: 'center', marginTop: 30 },
  linkText: { color: ui.blueDark, fontSize: 14, fontWeight: '900' },
});
