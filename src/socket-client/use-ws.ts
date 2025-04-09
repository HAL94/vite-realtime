import { useState } from "react";
import SocketEndpoints from "./helpers";
import { ConnectionFactory, WebsocketClient } from ".";

export type ReadyState = 'OPEN' | 'CLOSED' | 'CLOSING' | 'CONNECTING';
  

export type WebsocketProps = {
  url: SocketEndpoints;
  onOpen?: (event: Event | undefined) => void;
  onClose?: (closeEvent: CloseEvent) => void;
};
export default function useWebSocket({ url, onClose, onOpen }: WebsocketProps) {
  const [state, setState] = useState<ReadyState | undefined>(undefined);
  const [ws] = useState<WebsocketClient>(() =>
    ConnectionFactory.createAndConnectClient({
      url,
      onOpen: (event) => {
        setState('OPEN');
        onOpen?.(event);
      },
      onClose: (event) => {
        setState('CLOSED');
        onClose?.(event);
      },
    })
  );

  const close = () => {
    ws.close();
  };

  return {
    client: ws,
    close,
    state,
  };
}
