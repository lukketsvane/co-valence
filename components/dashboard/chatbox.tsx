import { useState, useRef, useEffect } from "react";
import OpenAI from "openai";
import { FiSend } from 'react-icons/fi';

const openai = new OpenAI({
  apiKey: 'process.env.OPENAI_API_KEY',
  dangerouslyAllowBrowser: true, 
});



export default function ChatBox({ title = "Describe a study", initialMessages = [] }) {
  const [messages, setMessages] = useState([...initialMessages]);
  const messageInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle streaming completions here if needed
  }, [messages]);

  const handleSendMessage = async () => {
    if (messageInputRef.current) {
      const userMessage = messageInputRef.current.innerText.trim();
      if (userMessage !== "") {
        setMessages(prevMessages => [...prevMessages, { role: 'user', content: userMessage }]);
        messageInputRef.current.innerText = ""; // Clear the input
  
        try {
          const completion = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: userMessage }
            ],
            stream: true,
          });
  
          for await (const chunk of completion) {
            setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: chunk.choices[0].delta.content }]);
          }
        } catch (error) {
          console.error("Error getting completion:", error);
          setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: "Failed to get a response." }]);
        }
      }
    }
  };
  

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
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
              {/* Render the content of the message */}
              {message.content}
            </div>
          ))
        ) : (
          <div className="text-gray-400 italic">No messages...</div>
        )}
      </div>
        <div
          ref={messageInputRef}
          onKeyPress={handleKeyPress}
          onPaste={handlePaste}
          contentEditable
          className="w-full mt-2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          role="textbox"
          tabIndex={0}
          style={{ minHeight: '50px' }}
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
