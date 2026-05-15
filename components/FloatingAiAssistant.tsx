import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { ui } from '@/components/AppChrome';

type ChatMessage = {
  from: 'bot' | 'user';
  text: string;
};

const starterMessages: ChatMessage[] = [
  {
    from: 'bot',
    text: '안녕하세요. 지금 서울 이동 상황을 보고 있어요. 목적지나 동네를 말해주면 덜 붐비는 방향으로 도와드릴게요.',
  },
];

const quickQuestions = ['지하철 추천', '맛집 추천', '다른 지역 추천'];

function makeAnswer(text: string) {
  if (text.includes('지하철') || text.includes('전철')) {
    return '현재는 2호선 주요 환승역이 붐비는 편이에요. 한 정거장 앞뒤 역을 이용하거나 20분 뒤 이동하면 체감 혼잡도가 내려갈 가능성이 높아요.';
  }
  if (text.includes('맛집') || text.includes('밥')) {
    return '지금은 대로변보다 골목 안쪽 매장이 더 여유로워 보여요. 홍대라면 연남동 방향, 강남이라면 신논현 뒤쪽 골목을 추천할게요.';
  }
  if (text.includes('지역') || text.includes('추천')) {
    return '비슷한 분위기지만 덜 붐비는 곳으로 망원, 성수 외곽, 여의도 한강공원 쪽을 추천해요. 이동 시간도 비교적 짧게 잡혀요.';
  }
  return '좋아요. 현재 혼잡도, 날씨, 지하철 상황을 함께 보고 가장 덜 붐비는 선택지를 다시 계산해볼게요.';
}

export function FloatingAiAssistant() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { from: 'user', text: trimmed },
      { from: 'bot', text: makeAnswer(trimmed) },
    ]);
    setMessage('');
  };

  return (
    <View pointerEvents="box-none" style={styles.root}>
      {open ? (
        <View style={styles.panel}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>널널 AI</Text>
              <Text style={styles.subtitle}>이동 상황 비서</Text>
            </View>
            <Pressable style={styles.closeButton} onPress={() => setOpen(false)}>
              <FontAwesome name="close" size={15} color="#6E7480" />
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.messages} showsVerticalScrollIndicator={false}>
            {messages.map((item, index) => (
              <View key={`${item.from}-${index}`} style={item.from === 'user' ? styles.userRow : styles.botRow}>
                <View style={item.from === 'user' ? styles.userBubble : styles.botBubble}>
                  <Text style={item.from === 'user' ? styles.userText : styles.botText}>{item.text}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.quickRow}>
            {quickQuestions.map((question) => (
              <Pressable key={question} style={styles.quickChip} onPress={() => sendMessage(question)}>
                <Text style={styles.quickText}>{question}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.inputRow}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="메시지를 입력하세요"
              placeholderTextColor="#939AAA"
              style={styles.input}
              onSubmitEditing={() => sendMessage(message)}
            />
            <Pressable style={styles.sendButton} onPress={() => sendMessage(message)}>
              <FontAwesome name="send" size={16} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      ) : null}

      <Pressable style={styles.floatingButton} onPress={() => setOpen((value) => !value)}>
        <Text style={styles.buttonLetter}>N</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    right: 18,
    bottom: 104,
    alignItems: 'flex-end',
    zIndex: 50,
  },
  floatingButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: ui.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#FFFFFF',
    shadowColor: '#5D7FE8',
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  buttonLetter: { color: '#FFFFFF', fontSize: 27, fontWeight: '900' },
  panel: {
    width: 336,
    height: 470,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E3E8F8',
    shadowColor: '#274A93',
    shadowOpacity: 0.16,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 },
    elevation: 14,
    overflow: 'hidden',
  },
  header: {
    height: 72,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F6',
  },
  title: { color: ui.text, fontSize: 20, fontWeight: '900' },
  subtitle: { color: ui.blueDark, fontSize: 12, fontWeight: '800', marginTop: 3 },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F4F9',
  },
  messages: { padding: 16, paddingBottom: 10 },
  botRow: { alignItems: 'flex-start', marginBottom: 10 },
  userRow: { alignItems: 'flex-end', marginBottom: 10 },
  botBubble: { maxWidth: 252, borderRadius: 17, padding: 13, backgroundColor: ui.blueSoft },
  userBubble: { maxWidth: 238, borderRadius: 17, padding: 13, backgroundColor: '#3C62A6' },
  botText: { color: ui.blueDark, fontSize: 13, fontWeight: '800', lineHeight: 19 },
  userText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800', lineHeight: 19 },
  quickRow: { flexDirection: 'row', gap: 7, paddingHorizontal: 14, paddingBottom: 10 },
  quickChip: {
    flex: 1,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#C7D4FA',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  quickText: { color: ui.blueDark, fontSize: 10, fontWeight: '900' },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 14, paddingTop: 0 },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: ui.blue,
    paddingHorizontal: 16,
    color: ui.text,
    fontSize: 13,
    fontWeight: '800',
    outlineStyle: 'none' as never,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ui.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
