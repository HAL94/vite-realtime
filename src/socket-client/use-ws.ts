import { useEffect, useState } from "react";
import SocketEndpoints from "./helpers";
import { ConnectionFactory, WebsocketClient } from ".";

export enum ReadyState {
  OPEN = WebSocket.OPEN,
  CLOSED = WebSocket.CLOSED,
  CLOSING = WebSocket.CLOSING,
  CONNECTING = WebSocket.CONNECTING,
}

type WebsocketProps = {
  url: SocketEndpoints;
  onOpen?: (event: Event | undefined) => void;
  onClose?: (closeEvent: CloseEvent) => void;
};
export default function useWebSocket<TReq = any, TRes = any>({
  url,
  onClose,
  onOpen,
}: WebsocketProps) {
  const [receivedData, setReceivedData] = useState<TRes | undefined>(undefined);
  const [messages, setMessages] = useState<TRes[]>([]);
  const [state, setState] = useState<ReadyState | undefined>(
    undefined
  );
  const [ws] = useState<WebsocketClient>(() =>
    ConnectionFactory.createAndConnectClient({
      url,
      onOpen: (event) => {
        setState(ReadyState.OPEN);
        onOpen?.(event);
      },
      onClose: (event) => {
        setState(ReadyState.CLOSED)
        onClose?.(event);
      },
    })
  );

  const sender = (data: TReq) => {
    if (ws) {
      ws.send(data);
    } else {
      console.error("wsRef not initialized");
    }
  };

  const close = () => {
    ws.close();
  }

  useEffect(() => {
    ws.onMessage<TRes>((data) => {
      try {
        setReceivedData(data);
        setMessages((prevMessages) => [...prevMessages, data]);
      } catch (error) {
        console.error("receving failed:", error);
      }
    });

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      if (ws.ws?.readyState === WebSocket.OPEN) {
        ConnectionFactory.disconnect(url);
      }
    };
  }, []);

  return {
    data: receivedData,
    messages,
    sendMessage: sender,
    client: ws,
    close,
    state
  };
}
