'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { connectWS } from '@/lib/socket';
import { Send } from 'lucide-react';
import { IMessage } from '@/models/Message';

interface Props {
  orderId: string;
  currentUserId: string;
}

export default function ChatMessageBox({ orderId, currentUserId }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<ReturnType<typeof connectWS> | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!orderId) return;
    const fetchMessages = async () => {
      const res = await axios.post('/api/chat/get-messages', {
        roomId: orderId,
      });
      setMessages(res.data.messages);
    };

    fetchMessages();
  }, [orderId]);

  useEffect(() => {
    socketRef.current = connectWS();

    socketRef.current.emit('joinRoom', orderId);

    socketRef.current.on('newMessage', ({ roomId, text, senderId, time }) => {
      setMessages((prev) => {
        return [...prev, { roomId, text, senderId, time }];
      });
    });

    return () => {
      socketRef.current?.off('newMessage');
      socketRef.current?.emit('leaveRoom', orderId);
    };
  }, [orderId]);

  function formatTime12h(time: string | Date): string {
    const date = new Date(time);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')} ${ampm}`;
  }

  const sendMessage = async () => {
    if (!text.trim() || !socketRef.current) return;
    const newMsg = {
      roomId: orderId,
      text,
      senderId: currentUserId,
      time: new Date(),
    };
    socketRef.current.emit('sendMessage', newMsg);
    setText('');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="border-border mt-4 rounded-2xl border bg-white p-2 md:p-4"
      >
        <div className="hide-scrollbar mb-3 h-52 space-y-2 overflow-y-auto rounded-lg bg-neutral-50 p-1 text-[13px]">
          {messages.map((msg, i) => {
            const mine = msg.senderId === currentUserId;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className={`flex ${mine ? 'justify-end text-right' : 'justify-start text-left'} `}
              >
                <div
                  className={`max-w-[75%] rounded-xl px-4 py-0.5 text-sm ${mine ? 'rounded-br-none bg-green-200' : 'rounded-bl-none bg-blue-100'}`}
                >
                  <div>{msg.text}</div>
                  <p className="text-[9px] text-neutral-400">
                    {formatTime12h(msg.time)}
                  </p>
                </div>
                <div ref={bottomRef} />
              </motion.div>
            );
          })}
        </div>

        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border border-neutral-400 px-3 py-2 text-sm outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-primary rounded-lg px-4 py-2 text-sm font-semibold text-white"
          >
            <Send className="size-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
