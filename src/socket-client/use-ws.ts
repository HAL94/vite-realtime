import { useEffect, useRef, useState } from "react";
import SocketEndpoints from "./helpers";
import { ConnectionFactory, WebsocketClient } from ".";

type WebsocketProps = {
  url: SocketEndpoints;
};
export default function useWebSocket<TReq = any, TRes = any>({
  url,
}: WebsocketProps) {
  const [receivedData, setReceivedData] = useState<TRes | undefined>(undefined);
  const [messages, setMessages] = useState<TRes[]>([]);
  const wsRef = useRef<WebsocketClient | undefined>(undefined);

  const sender = (data: TReq) => {
    if (wsRef.current) {
      wsRef.current.send(data);
    } else {
      console.error("wsRef not initialized");
    }
  };

  useEffect(() => {
    // Replace 'ws://your-websocket-endpoint' with your actual WebSocket URL
    const ws = ConnectionFactory.createAndConnectClient(
      url,
      () => console.log("con opened"),
      () => console.log("con closed")
    );

    ws.onMessage<TRes>((data) => {
      try {
        console.log("received data", data);
        setReceivedData(data);
        setMessages((prevMessages) => [...prevMessages, data]);
      } catch (error) {
        console.error("receving failed:", error);
      }
    });

    wsRef.current = ws;

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      if (ws.ws?.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  return {
    data: receivedData,
    messages,
    sendMessage: sender,
  };
}
