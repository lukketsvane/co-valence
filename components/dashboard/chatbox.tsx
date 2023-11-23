import { useState } from "react";
import Image from 'next/image';

export default function ChatBox({
  title = "Describe a study",
  initialMessages = [],
  placeholder = "Company X operates an offshore drilling platform in the North Sea, \"Area Y\". This platform features advanced drilling machinery, safety systems, and environmental monitoring equipment. Key operations include power generation, drilling control, and crew safety. The scenario involves routine maintenance, repairs, and upgrades to improve efficiency and safety, focusing on machinery, power systems, and emergency response enhancements."
}: {
  title?: string;
  initialMessages?: string[];
  placeholder?: string;
}) {
  const [messages, setMessages] = useState<string[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto my-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
      <div className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-gray-600">Industry: Oil & Gas Industry | Application: Offshore Drilling Operations</p>
        </div>
        <div className="flex space-x-2">
            <button className="p-2 rounded hover:bg-gray-100">
              <Image src="/upload.png" alt="Upload data" width={20} height={20} />
            </button>
            <button className="p-2 rounded hover:bg-gray-100">
              <Image src="/list.png" alt="List concepts" width={20} height={20} />
            </button>
        </div>
      </div>
      <div className="p-4">
        <div className="h-48 overflow-y-auto mb-4">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div key={index} className="p-2 bg-white rounded-lg shadow mb-2">
                {message}
              </div>
            ))
          ) : (
            <div className="text-gray-400 italic">No messages...</div>
          )}
        </div>
        <textarea
          rows={4}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          placeholder={placeholder}
        />
        <button
          onClick={handleSendMessage}
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}
