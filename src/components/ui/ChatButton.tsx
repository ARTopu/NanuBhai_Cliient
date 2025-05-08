'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

const ChatButton: React.FC = () => {
  return (
    <div className="fixed bottom-20 right-6 z-50">
      <button 
        className="bg-white border border-gray-300 p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
        onClick={() => alert('Chat functionality would open here')}
      >
        <MessageCircle className="h-6 w-6 text-black" style={{ color: 'black' }} />
      </button>
    </div>
  );
};

export default ChatButton;
