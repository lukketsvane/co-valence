import { useState, useRef, useEffect } from "react";
import { FiSend } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css'; // Import the CSS for Markdown styling

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatBox({ title = "Describe a study", initialMessages = [] }: { title?: string; initialMessages?: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [openaiResponse, setOpenaiResponse] = useState('');
  const messageInputRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (messageInputRef.current) {
      const userMessage = messageInputRef.current.innerText.trim();
      if (userMessage !== "") {
        setMessages(prevMessages => [...prevMessages, { role: 'user', content: userMessage }]);
        messageInputRef.current.innerText = "";
        try {
          const response = await fetch('/api/openai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage }),
          });
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const data = await response.json();
          setOpenaiResponse(data.message); // set the OpenAI response
        } catch (error) {
          console.error("Error:", error);
          setOpenaiResponse("Failed to get a response."); // set error message
        }
      }
    }
  };

  useEffect(() => {
    // Clear the OpenAI response after it's been set for a while
    const timer = setTimeout(() => setOpenaiResponse(''), 15000);
    return () => clearTimeout(timer);
  }, [openaiResponse]);

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
    <>
      <div className="relative max-w-2xl mx-auto my-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
        <div className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200">
        <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-gray-600">Industry: Oil & Gas Industry | Application: Offshore Drilling Operations</p>
          </div>
        </div>
        <div className="p-4 pr-16">
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
      {openaiResponse && (
      <div className="max-w-2xl mx-auto my-6 p-4 overflow-hidden rounded-lg">
        <div className="markdown-body">
          <ReactMarkdown>{openaiResponse}</ReactMarkdown>
        </div>
      </div>
    )}
    </>
  );
}
