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
      <View style={styles.topGlow} />
      <View style={styles.bottomGlow} />

      <View style={styles.statusRow}>
        <Text style={styles.statusTime}>2:30</Text>
        <View style={styles.statusIcons}>
          <FontAwesome name="signal" size={13} color="#FFFFFF" />
          <FontAwesome name="wifi" size={13} color="#FFFFFF" />
          <FontAwesome name="battery-three-quarters" size={15} color="#FFFFFF" />
        </View>
      </View>

      <View style={styles.hero}>
        <Image source={logoImage} style={styles.logo} resizeMode="contain" />
        <Text style={styles.quote}>"복잡한 도심 속, 당신을 위한 NULL을 찾아서"</Text>
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

      <View style={styles.bottomArea}>
        <View style={styles.socialRow}>
          <Pressable style={[styles.socialCircle, styles.naverButton]} onPress={() => login('네이버')}>
            <Text style={styles.naverText}>N</Text>
          </Pressable>
          <Pressable style={styles.appleButton} onPress={() => login('Apple')}>
            <FontAwesome name="apple" size={29} color="#111111" />
          </Pressable>
          <Pressable style={styles.googleButton} onPress={() => login('Google')}>
            <Text style={styles.googleText}>G</Text>
          </Pressable>
          <Pressable style={[styles.socialCircle, styles.kakaoButton]} onPress={() => login('카카오')}>
            <View style={styles.talkBubble}>
              <Text style={styles.talkText}>TALK</Text>
            </View>
          </Pressable>
        </View>

        <Pressable style={styles.idLoginButton} onPress={() => setShowForm((value) => !value)}>
          <Text style={styles.idLoginText}>{showForm ? '아이디 로그인 닫기' : '아이디로 로그인'}</Text>
        </Pressable>
        <Pressable style={styles.signupButton} onPress={() => router.push('/signup' as never)}>
          <Text style={styles.signupText}>처음이신가요? 회원가입</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87A8F5',
    overflow: 'hidden',
  },
  topGlow: {
    position: 'absolute',
    left: -80,
    top: -90,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  bottomGlow: {
    position: 'absolute',
    right: -120,
    bottom: -120,
    width: 330,
    height: 330,
    borderRadius: 165,
    backgroundColor: 'rgba(255,255,255,0.14)',
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
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  logo: {
    width: 178,
    height: 178,
    borderRadius: 38,
    marginBottom: 32,
  },
  quote: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: 'rgba(50, 80, 160, 0.16)',
    textShadowRadius: 8,
  },
  loginCard: {
    position: 'absolute',
    left: 26,
    right: 26,
    bottom: 170,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.94)',
    padding: 17,
    shadowColor: '#4169D8',
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
  input: {
    height: 48,
    borderRadius: 15,
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
  bottomArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 44,
    alignItems: 'center',
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 19,
    marginBottom: 20,
  },
  socialCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  naverButton: { backgroundColor: '#57C43A' },
  naverText: { color: '#FFFFFF', fontSize: 27, fontWeight: '900' },
  appleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleText: { color: '#D85043', fontSize: 25, fontWeight: '900' },
  kakaoButton: { backgroundColor: '#F5E84A' },
  talkBubble: {
    width: 31,
    height: 24,
    borderRadius: 13,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  talkText: { color: '#F5E84A', fontSize: 9, fontWeight: '900' },
  idLoginButton: {
    height: 34,
    borderRadius: 17,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    marginBottom: 8,
  },
  idLoginText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },
  signupButton: { paddingVertical: 4 },
  signupText: { color: '#FFFFFF', fontSize: 12, fontWeight: '800', opacity: 0.92 },
});
