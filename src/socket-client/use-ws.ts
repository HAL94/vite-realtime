import { useEffect, useState } from "react";
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
  const [ws] = useState<WebsocketClient | undefined>(() =>
    ConnectionFactory.createAndConnectClient({ url })
  );

  const sender = (data: TReq) => {
    console.log("should be sending", data, typeof ws);
    if (ws) {
      ws.send(data);
    } else {
      console.error("wsRef not initialized");
    }
  };

  useEffect(() => {
    ws?.onMessage<TRes>((data) => {
      try {
        setReceivedData(data);
        setMessages((prevMessages) => [...prevMessages, data]);
      } catch (error) {
        console.error("receving failed:", error);
      }
    });

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      if (ws?.ws?.readyState === WebSocket.OPEN) {
        ConnectionFactory.disconnect(url);
      }
    };
  }, []);

  return {
    data: receivedData,
    messages,
    sendMessage: sender,
    client: ws,
  };
}
