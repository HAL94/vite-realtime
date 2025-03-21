import SocketEndpoints from "./socket-endpoints";
const URL = "ws://localhost:8000";

type ConnectionParams = {
  url: SocketEndpoints;
  onOpen?: (event?: Event) => void;
  onClose?: (event: CloseEvent) => void;
};

class WebsocketClient {
  ws!: WebSocket | null;

  constructor(private baseUrl: string = URL) {}

  connect(
    url: ConnectionParams["url"],
    onOpen?: ConnectionParams["onOpen"],
    onClose?: ConnectionParams["onClose"]
  ) {
    this.ws = new WebSocket(this.baseUrl + url);

    try {
      this.ws.onopen = (event: Event) => {
        if (onOpen) {
          onOpen(event);
        }
      };

      this.ws.onclose = (event: CloseEvent) => {
        if (onClose) {
          onClose(event);
        }
      };

      this.ws.onerror = (event: Event) => {
        console.error(`WebSocket error on ${url}:`, event);
        this.ws = null; // Reset ws to null on error.
      };
    } catch (error) {
      console.error(`Failed to connect to ${url}`, error);
    }
  }

  onMessage<T = string>(
    callback: (data: T, ...args: any[]) => Promise<void> | void
  ) {
    if (!this.ws) {
      console.error("WebSocket is not connected. Call connect() first.");
      return;
    }

    this.ws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data) as T;
      callback(data);
    };
  }

  send<T extends Record<string, any>>(data: T) {
    if (!this.ws) {
      console.error("WebSocket is not connected. Call connect() first.");
      return;
    }

    this.ws.send(JSON.stringify(data));
  }
}



export default new WebsocketClient();
