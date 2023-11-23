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
    <div className="relative col-span-1 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <div className="flex space-x-2">
            <button className="p-2 rounded hover:bg-gray-100">
              <Image src="/upload.png" alt="Upload data" width={20} height={20} />
            </button>
            <button className="p-2 rounded hover:bg-gray-100">
              <Image src="/list.png" alt="List concepts" width={20} height={20} />
            </button>
          </div>
        </div>
        <div className="h-60 overflow-y-auto mb-4 p-4 bg-gray-50">
          {/* ... */}
        </div>
      </div>
      <div className="flex items-center p-4">
        {/* ... */}
      </div>
    </div>
  );
}
