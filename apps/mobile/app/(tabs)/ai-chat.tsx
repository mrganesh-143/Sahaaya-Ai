import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/theme';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

export default function MobileAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Namaste! 🙏 I am Sahaaya AI, your family savings advisor. Ask me how to reduce grocery expenses, balance your monthly budget, or find free youth skill courses.'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    const promptText = input;
    setInput('');
    setLoading(true);

    // Realistic smart response simulation for mobile demo
    setTimeout(() => {
      let reply = "Namaste! Based on your family goals, tracking daily groceries on Sahaaya saves an average of ₹1,200 per month. Always look for community bulk offers!";
      if (promptText.toLowerCase().includes('course') || promptText.toLowerCase().includes('job')) {
        reply = "We offer 100% free certified courses in Tally Prime, Digital Marketing, and Web Development. Check the 'Youth' tab for details and enrollments!";
      } else if (promptText.toLowerCase().includes('budget')) {
        reply = "A great Indian family budgeting rule is 50/30/20: 50% on essentials (dal, rice, milk, utilities), 30% on lifestyle/school, and 20% into savings emergency funds.";
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'bot', text: reply }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) => (
          <View style={[styles.msgRow, item.sender === 'user' ? styles.userRow : styles.botRow]}>
            {item.sender === 'bot' && (
              <View style={styles.botIcon}>
                <Ionicons name="sparkles" size={14} color="#FFFFFF" />
              </View>
            )}
            <View style={[styles.bubble, item.sender === 'user' ? styles.userBubble : styles.botBubble]}>
              <Text style={[styles.msgText, item.sender === 'user' ? styles.userText : styles.botText]}>
                {item.text}
              </Text>
            </View>
          </View>
        )}
      />

      {loading && (
        <View style={styles.loadingRow}>
          <ActivityIndicator size="small" color={Colors.primary} />
          <Text style={styles.loadingText}>Sahaaya AI is thinking...</Text>
        </View>
      )}

      {/* Input row */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Ask savings or budget question..."
          placeholderTextColor="#9CA3AF"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity 
          style={[styles.sendBtn, !input.trim() && { opacity: 0.5 }]}
          onPress={handleSend}
          disabled={!input.trim()}
        >
          <Ionicons name="send" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  messageList: {
    padding: 16,
    paddingBottom: 20,
  },
  msgRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  botRow: {
    justifyContent: 'flex-start',
  },
  botIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 2,
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderBottomLeftRadius: 4,
  },
  msgText: {
    fontSize: 13,
    lineHeight: 18,
  },
  userText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  botText: {
    color: Colors.textPrimary,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  loadingText: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    alignItems: 'center',
    gap: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FAFAF7',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
