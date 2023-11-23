import { useState } from "react";

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
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <div className="flex space-x-2">
            <button className="p-1 rounded text-gray-600 hover:bg-gray-100">
              <span className="sr-only">Extract data from PDFs</span>
              {/* Place your PDF icon here */}
            </button>
            <button className="p-1 rounded text-gray-600 hover:bg-gray-100">
              <span className="sr-only">List of concepts</span>
              {/* Place your concepts icon here */}
            </button>
          </div>
        </div>
        <div className="h-60 overflow-y-auto mb-4 p-2 bg-gray-50 border border-gray-200">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div key={index} className="mb-2 p-2 bg-white rounded-lg shadow">
                {message}
              </div>
            ))
          ) : (
            <div className="text-gray-400 italic p-2">No messages...</div>
          )}
        </div>
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow rounded-md border border-gray-300 p-2"
            placeholder={placeholder}
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
