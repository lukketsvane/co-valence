import { useState, useRef } from "react";
import Image from 'next/image';
import { FiSend } from 'react-icons/fi';


export default function ChatBox({
  title = "Describe a study",
  initialMessages = [],
}: {
  title?: string;
  initialMessages?: string[];
}) {
  const [messages, setMessages] = useState<string[]>(initialMessages);
  const messageInputRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (messageInputRef.current && messageInputRef.current.innerText.trim() !== "") {
      setMessages([...messages, messageInputRef.current.innerText]);
      messageInputRef.current.innerText = ""; // Clear the contenteditable div
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto my-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
      <div className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200">
      <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-gray-600">Industry: Oil & Gas Industry | Application: Offshore Drilling Operations</p>
        </div>
      </div>
      <div className="p-4 pr-16 ">
        <div className="h-auto overflow-y-auto mb-4">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div key={index} className="p-2 pr-6 bg-white rounded-lg shadow mb-2">
                {message}
              </div>
            ))
          ) : (
            <div className="text-gray-400 italic">No messages...</div>
          )}
        </div>
        <div
          ref={messageInputRef}
          onKeyPress={handleKeyPress}
          contentEditable
          className="w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          role="textbox"
          tabIndex={0} // to make div focusable
          style={{ minHeight: '50px' }} // Set a minimum height
        ></div>
          <div className="absolute bottom-3 right-4 p-auto">
            <button
              style={{ minHeight: '50px' }} // Set a minimum height
              onClick={handleSendMessage}
              aria-label="Send message"
              className="text-black hover:text-blue-600"
            >
              <FiSend className="mr-2" size={26} />
            </button>
          </div>
      </div>
    </div>
  );
}
