import { useState, useRef, useEffect } from "react";
import { FiSend, FiClipboard } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css'; 

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

// Add a new prop for systemMessage
export default function ChatBox({ title = "Describe a study", initialMessages = [], systemMessage }: { title?: string; initialMessages?: Message[], systemMessage: string }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [openaiResponse, setOpenaiResponse] = useState('');
  const [messagePending, setMessagePending] = useState(false);
  const messageInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null; 

    if (messagePending) {
      intervalId = toggleLoaderDots(); 
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [messagePending]);

  function toggleLoaderDots(): NodeJS.Timeout {
    const dots = document.querySelectorAll('.loader .dot');
    let activeIndex = 0;

    return setInterval(() => {
      dots.forEach(dot => dot.classList.remove('active'));
      dots[activeIndex].classList.add('active');
      activeIndex = (activeIndex + 1) % dots.length;
    }, 500);
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Response copied to clipboard!');
    }).catch((err) => {
      console.error('Could not copy text to clipboard', err);
    });
  };

  const handleSendMessage = async () => {
    if (messageInputRef.current) {
      const userMessage = messageInputRef.current.innerText.trim();
      if (userMessage !== "") {
        setMessages([{ role: 'user', content: userMessage }]);
        messageInputRef.current.innerText = "";
        setMessagePending(true);
        try {
          const response = await fetch('/api/openai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage, systemMessage }), // Include systemMessage in the request
          });
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const data = await response.json();
          setOpenaiResponse(data.message); 
        } catch (error) {
          console.error("Error:", error);
          setOpenaiResponse("Failed to get a response."); 
        } finally {
          setMessagePending(false);
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
    <>
      <div className="relative max-w-2xl mx-auto my-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
        <div className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-gray-600">choose an agent and have fun</p>
          </div>
          {messagePending && (
            <div className="loader">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="h-auto overflow-y-auto mb-4">
            {messages.length > 0 && (
              <div className="p-2 px-6 bg-white rounded-lg shadow mb-2">
                <ReactMarkdown>{messages[messages.length - 1].content}</ReactMarkdown>
              </div>
            )}
          </div>
          {!messagePending && (
            <div
              ref={messageInputRef}
              onKeyPress={handleKeyPress}
              onPaste={handlePaste}
              contentEditable
              className="w-full mt-2 p-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              role="textbox"
              tabIndex={0}
              style={{ minHeight: '50px' }}
            ></div>
          )}

          <div className="absolute bottom-3 right-4 p-auto">
            {!messagePending && (
              <button
                style={{ minHeight: '50px' }} 
                onClick={handleSendMessage}
                aria-label="Send message"
                className="text-black hover:text-blue-600"
              >
                <FiSend className="mr-2" size={26} />
              </button>
            )}
          </div>
        </div>
      </div>
      {openaiResponse && (
      <div className="max-w-2xl mx-auto my-6 p-4 overflow-hidden rounded-lg">
        <div className="markdown-body">
          <ReactMarkdown>{openaiResponse}</ReactMarkdown>
        </div>
        <button
          onClick={() => copyToClipboard(openaiResponse)}
          className="mt-2 p-2 bg-gray-100 hover:bg-gray-100 text-black font-bold py-2 rounded"
          aria-label="Copy to clipboard"
        >
          <FiClipboard className="inline" size={22} />
        </button>
      </div>
      )}
    </>
  );
}
