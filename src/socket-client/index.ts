import SocketEndpoints from "./socket-endpoints";
const URL = "ws://localhost:8000/ws/v1";

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
        console.log(`Client is closed at: ${this.baseUrl + url}, Code: ${event.code}, Reason: ${event.reason}`)
        if (onClose) {
          onClose(event);
          this.ws?.close()
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

  close() {
    this.ws?.close();
  }

  onMessage<T = string>(
    callback: (data: T, ...args: any[]) => Promise<void> | void
  ) {
    if (!this.ws) {
      console.error("WebSocket is not connected. Call connect() first.");
      return;
    }

    this.ws.onmessage = (event: MessageEvent) => {
      try {        
        const data = JSON.parse(event.data) as T;
        callback(data);
      } catch (error) {
        callback(event.data);
      }
    };
  }

  send<T = any>(data: T) {
    if (!this.ws) {
      console.error("WebSocket is not connected. Call connect() first.");
      return;
    }

    this.ws.send(JSON.stringify(data));
  }
}

class WebsocketConnectionManager {
  private connections: Map<string, WebsocketClient> = new Map();

  private connect(
    url: ConnectionParams["url"],
    onOpen?: ConnectionParams["onOpen"],
    onClose?: ConnectionParams["onClose"]
  ): WebsocketClient {
    if (this.connections.has(url)) {
      console.warn(`Connection to '${url}' already exists.`);
      return this.connections.get(url)!;
    }

    const client = new WebsocketClient();
    client.connect(url, onOpen, onClose);
    this.connections.set(url, client);
    return client;
  }

  private getClient(url: ConnectionParams["url"]) {
    let client = this.getConnection(url);
    if (!client) {
      client = this.connect(url);
    }
    return client;
  }

  getConnection(url: string): WebsocketClient | undefined {
    return this.connections.get(url);
  }

  disconnect(url: string): void {
    const client = this.connections.get(url);
    if (client) {
      client.close();
      this.connections.delete(url);
    }
  }

  disconnectAll(): void {
    this.connections.forEach((client) => client.close());
    this.connections.clear();
  }

  onMessage<T = any>(
    url: ConnectionParams["url"],
    callback: (data: T) => Promise<void> | void
  ): void {
    try {
      const client = this.getClient(url);
      client.onMessage(callback);      
    } catch (error) {
      console.error(`Error onMessage for ${url}`, error);
    }
  }

  send<T = any>(
    url: ConnectionParams["url"],
    data: T
  ): void {
    try {
      const client = this.getClient(url);
      client.send(data);
    } catch (error) {
      console.error(`Error send for ${url}`, error);
    }
  }
}

export default new WebsocketConnectionManager();
