import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Code2, Users, Link2, AlertCircle, User } from "lucide-react";

const Codecast = () => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [participants, setParticipants] = useState([]);
  const socketRef = useRef(null);

  const joinRoom = () => {
    if (!roomId) {
      setError("Please enter a room ID");
      return;
    }

    if (!userName) {
      setError("Please enter your name");
      return;
    }

    setError("");
    const ws = new WebSocket(`ws://localhost:8080/ws?room=${roomId}&name=${encodeURIComponent(userName)}`);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      setIsConnected(true);
      setParticipants(prev => [...prev, { name: userName, id: Date.now() }]);
    };

    ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log(data);
          if (data.type === "participants") {
            setParticipants(data.names);
            console.log(data.names);
            console.log(participants);
          } else if (data.type === "code"){
            setCode(data.content);
          }
        } catch (e) {
          console.error("Invalid JSON message:", event.data);
        }
      };    

    ws.onclose = () => {
      console.log("Disconnected from WebSocket");
      setIsConnected(false);
      setParticipants([]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setError("Failed to connect to the room");
    };

    socketRef.current = ws;
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: 'code', content: newCode }));
    }
  };

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 py-8">
        {!isConnected ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Code2 className="w-8 h-8 text-blue-500" />
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
                  Codecast
                </h1>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 ">
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full text-white px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Room ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter Room ID"
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                      className="w-full text-white px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                    <Users className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  </div>
                  {error && (
                    <div className="mt-2 flex items-center gap-1.5 text-sm text-red-500">
                      <AlertCircle className="w-4 h-4" />
                      <span>{error}</span>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={joinRoom}
                  className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-green-500 text-white font-medium hover:brightness-110 active:brightness-90 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Link2 className="w-4 h-4" />
                  Join Room
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <div className="flex-1 bg-white dark:bg-neutral-800 rounded-xl shadow-xl overflow-hidden">
              <div className="border-b border-neutral-200 dark:border-neutral-700 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Code2 className="w-6 h-6 text-blue-500" />
                  <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    Room: {roomId}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Connected</span>
                </div>
              </div>
              <Editor
                height="75vh"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                onChange={handleCodeChange}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>

            {/* Participants Panel */}
            <div className="w-64 bg-white dark:bg-neutral-800 rounded-xl shadow-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-neutral-900 text-white">
                  Participants
                </h3>
              </div>
              <div className="space-y-2">
              {participants.map((name, index) => (
  <div
    key={index}
    className="flex items-center gap-2 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-700"
  >
    <User className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
    <span className="text-sm text-white">{name}</span>
  </div>
))}

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Codecast;