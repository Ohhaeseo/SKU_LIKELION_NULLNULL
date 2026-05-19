import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const logoImage = require('../pdf/LOGO.jpg');

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
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const login = (method = '아이디') => {
    if (method === '아이디' && (!id.trim() || !password.trim())) {
      setError('아이디와 비밀번호를 입력해주세요.');
      setShowForm(true);
      return;
    }
    rememberLogin(id.trim() || '해서', method);
    router.replace('/home' as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topPanel} />
      <View style={styles.statusRow}>
        <Text style={styles.statusTime}>2:30</Text>
        <View style={styles.statusIcons}>
          <FontAwesome name="signal" size={13} color="#FFFFFF" />
          <FontAwesome name="wifi" size={13} color="#FFFFFF" />
          <FontAwesome name="battery-three-quarters" size={15} color="#FFFFFF" />
        </View>
      </View>

      <View style={styles.hero}>
        <Image source={logoImage} style={styles.logo} resizeMode="cover" />
        <Text style={styles.brand}>널널 AI</Text>
        <Text style={styles.copy}>서울 이동을 더 가볍게 만드는 혼잡도 비서</Text>
      </View>

      {showForm ? (
        <View style={styles.loginCard}>
          <TextInput
            value={id}
            onChangeText={setId}
            placeholder="아이디 또는 이메일"
            placeholderTextColor="#8D97B0"
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="비밀번호"
            placeholderTextColor="#8D97B0"
            secureTextEntry
            style={styles.input}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Pressable style={styles.primaryButton} onPress={() => login()}>
            <Text style={styles.primaryText}>로그인</Text>
          </Pressable>
        </View>
      ) : null}

      <View style={styles.bottomSheet}>
        <Pressable style={styles.bigLoginButton} onPress={() => (showForm ? login() : setShowForm(true))}>
          <Text style={styles.bigLoginText}>로그인</Text>
        </Pressable>

        <View style={styles.snsDivider}>
          <View style={styles.line} />
          <Text style={styles.snsText}>SNS LOGIN</Text>
          <View style={styles.line} />
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

        <Pressable style={styles.signupButton} onPress={() => router.push('/signup' as never)}>
          <Text style={styles.signupText}>회원가입</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#6F8FF2', overflow: 'hidden' },
  topPanel: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 365,
    backgroundColor: '#7D9BF4',
  },
  statusRow: {
    height: 58,
    paddingHorizontal: 30,
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusTime: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  statusIcons: { flexDirection: 'row', gap: 8 },
  hero: { height: 318, alignItems: 'center', justifyContent: 'center', paddingBottom: 22 },
  logo: {
    width: 142,
    height: 142,
    borderRadius: 34,
    marginBottom: 22,
    borderWidth: 6,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  brand: { color: '#FFFFFF', fontSize: 34, fontWeight: '900', marginBottom: 8 },
  copy: { color: '#EDF3FF', fontSize: 14, fontWeight: '800' },
  loginCard: {
    position: 'absolute',
    left: 28,
    right: 28,
    bottom: 268,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    padding: 17,
    shadowColor: '#244C9F',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  input: {
    height: 48,
    borderRadius: 16,
    backgroundColor: '#F4F7FF',
    paddingHorizontal: 16,
    color: '#111827',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
    outlineStyle: 'none' as never,
  },
  error: { color: '#D45A52', fontSize: 12, fontWeight: '900', marginBottom: 8 },
  primaryButton: {
    height: 48,
    borderRadius: 16,
    backgroundColor: '#5F82EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: { color: '#FFFFFF', fontSize: 15, fontWeight: '900' },
  bottomSheet: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 36,
    paddingTop: 32,
    alignItems: 'center',
  },
  bigLoginButton: {
    width: '100%',
    height: 58,
    borderRadius: 17,
    backgroundColor: '#6F8FF2',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6F8FF2',
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  bigLoginText: { color: '#FFFFFF', fontSize: 22, fontWeight: '900' },
  snsDivider: { flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 48, marginBottom: 30 },
  line: { flex: 1, height: 1, backgroundColor: '#DADDE5' },
  snsText: { color: '#7A8292', fontSize: 15, fontWeight: '900', marginHorizontal: 16 },
  socialRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 28 },
  socialCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kakaoButton: { backgroundColor: '#F8E74B' },
  talkBubble: {
    width: 36,
    height: 28,
    borderRadius: 15,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  talkText: { color: '#F8E74B', fontSize: 10, fontWeight: '900' },
  naverButton: { backgroundColor: '#55C63B' },
  naverText: { color: '#FFFFFF', fontSize: 34, fontWeight: '900' },
  googleButton: { backgroundColor: '#D95043' },
  googleText: { color: '#FFFFFF', fontSize: 34, fontWeight: '900' },
  signupButton: { marginTop: 26, height: 42, paddingHorizontal: 22, alignItems: 'center', justifyContent: 'center' },
  signupText: { color: '#50607C', fontSize: 14, fontWeight: '900' },
});
