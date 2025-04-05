import SocketEndpoints from "./helpers";

/**
 * @constant URL
 * @description The base URL for the WebSocket server.
 * @default "ws://localhost:8000/ws/v1"
 */
const URL = "ws://localhost:8000/ws/v1";

/**
 * @interface ConnectionParams
 * @description Defines the parameters required for establishing a WebSocket connection.
 */
type ConnectionParams = {
  /**
   * @property url
   * @description The specific endpoint path to connect to on the WebSocket server.
   * @type SocketEndpoints
   */
  url: SocketEndpoints;
  /**
   * @property onOpen
   * @description An optional callback function that will be executed when the WebSocket connection is successfully opened.
   * @type (event?: Event) => void
   */
  onOpen?: (event?: Event) => void;
  /**
   * @property onClose
   * @description An optional callback function that will be executed when the WebSocket connection is closed.
   * @type (event: CloseEvent) => void
   */
  onClose?: (event: CloseEvent) => void;
};

/**
 * @class WebsocketClient
 * @description A class responsible for managing a single WebSocket connection. It handles connecting, sending, receiving, and closing the connection, and supports multiple message listeners.
 */
export class WebsocketClient {
  /**
   * @property ws
   * @description The underlying WebSocket instance. It is initialized during the `connect` method.
   * @type WebSocket | null
   */
  ws!: WebSocket | null;

  /**
   * @private
   * @property messageListeners
   * @description An array to store multiple callback functions that will be executed when a message is received from the WebSocket server.
   * @type ((data: any) => void)[]
   */
  private messageListeners: ((data: any) => void)[] = [];

  /**
   * @constructor
   * @param {string} [baseUrl="ws://localhost:8000/ws/v1"] - The base URL of the WebSocket server. Defaults to `URL`.
   */
  constructor(private baseUrl: string = URL) {}

  /**
   * @method connect
   * @description Establishes a WebSocket connection to the specified URL. It sets up event listeners for 'open', 'close', and 'error' events.
   * @param {ConnectionParams["url"]} url - The specific endpoint path to connect to.
   * @param {ConnectionParams["onOpen"]} [onOpen] - An optional callback to be executed when the connection is opened.
   * @param {ConnectionParams["onClose"]} [onClose] - An optional callback to be executed when the connection is closed.
   * @returns {void}
   */
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
        console.log(
          `Client is closed at: ${this.baseUrl + url}, Code: ${
            event.code
          }, Reason: ${event.reason}`
        );
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

  /**
   * @method close
   * @description Closes the WebSocket connection if it is currently open.
   * @returns {void}
   */
  close() {
    this.ws?.close();
  }

  /**
   * @method onMessage
   * @description Registers a callback function to be executed when a message is received from the WebSocket server. Supports multiple listeners.
   * @template T
   * @param {(data: T, ...args: any[]) => Promise<void> | void} callback - The function to be called when a message is received. The received data will be passed as the first argument.
   * @returns {void}
   * @throws {Error} If the WebSocket is not connected and `connect()` has not been called.
   */
  onMessage<T = string>(
    callback: (data: T, ...args: any[]) => Promise<void> | void
  ) {
    if (!this.ws) {
      console.error("WebSocket is not connected. Call connect() first.");
      return;
    }

    this.messageListeners.push(callback);

    if (this.ws && !this.ws.onmessage) {
      this.ws.onmessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data) as T;
          this.messageListeners.forEach((listener) => listener(data));
        } catch (error) {
          this.messageListeners.forEach((listener) => listener(event.data));
        }
      };
    }
  }

  /**
   * @method send
   * @description Sends data to the WebSocket server. The data is automatically serialized to JSON before sending.
   * @template T
   * @param {T} data - The data to be sent.
   * @returns {void}
   * @throws {Error} If the WebSocket is not connected and `connect()` has not been called.
   */
  send<T = any>(data: T) {
    if (!this.ws) {
      console.error("WebSocket is not connected. Call connect() first.");
      return;
    }

    if (this.ws.readyState === 1) {
      this.ws.send(JSON.stringify(data));
    }
  }
}

/**
 * @class WebsocketConnectionManager
 * @description A singleton class responsible for managing multiple WebSocket connections. It ensures that only one connection exists per URL and provides methods for creating, retrieving, and disconnecting clients. It also implements a locking mechanism to prevent race conditions during connection establishment.
 */
class WebsocketConnectionManager {
  /**
   * @private
   * @property connections
   * @description A map to store active WebSocketClient instances, keyed by their URL.
   * @type Map<string, WebsocketClient>
   */
  private connections: Map<string, WebsocketClient> = new Map();

  /**
   * @private
   * @property connectionLocks
   * @description A map to track whether a connection is currently being established for a given URL, preventing multiple simultaneous connection attempts.
   * @type Map<string, boolean>
   */
  private connectionLocks: Map<string, boolean> = new Map();

  /**
   * @private
   * @method connect
   * @description Establishes a new WebSocket connection or returns an existing one if it already exists and is not currently being established. Implements a locking mechanism to prevent race conditions.
   * @param {ConnectionParams} config - The configuration object containing the URL and optional open/close callbacks.
   * @returns {WebsocketClient} The `WebsocketClient` instance for the given URL.
   */
  private connect({ url, onClose, onOpen }: ConnectionParams): WebsocketClient {
    if (this.connections.has(url)) {
      console.warn(`Connection to '${url}' already exists.`);
      return this.connections.get(url)!;
    }

    if (this.connectionLocks.get(url)) {
      console.warn(
        `Connection to '${url}' is currently being established. Returning existing (potentially not yet open) client.`
      );
      return this.connections.get(url)!; // Return the client that is in the process of connecting
    }

    this.connectionLocks.set(url, true); // Acquire lock

    const client = new WebsocketClient();

    const onOpenWrapper = (event?: Event) => {
      if (onOpen) {
        onOpen(event);
      }

      this.connectionLocks.delete(url);
    };

    const onCloseWrapper = (event: CloseEvent) => {
      if (onClose) {
        onClose(event);
      }

      this.connectionLocks.delete(url);
    };

    if (client.ws) {
      client.ws.onerror = () => {
        this.connectionLocks.delete(url);
      };
    }

    client.connect(url, onOpenWrapper, onCloseWrapper);

    this.connections.set(url, client);

    return client;
  }

  /**
   * @method createAndConnectClient
   * @description Retrieves an existing WebSocketClient for the given URL or creates and connects a new one if it doesn't exist.
   * @param {ConnectionParams} connectionConfig - The configuration object containing the URL and optional open/close callbacks.
   * @returns {WebsocketClient | undefined} The `WebsocketClient` instance for the given URL, or undefined if connection fails during the initial setup.
   */
  createAndConnectClient(
    connectionConfig: ConnectionParams
  ): WebsocketClient | undefined {
    let client = this.getConnection(connectionConfig.url);
    if (!client) {
      client = this.connect(connectionConfig);
    }
    return client;
  }

  /**
   * @method getConnection
   * @description Retrieves an existing WebSocketClient instance for the given URL.
   * @param {string} url - The URL of the WebSocket connection.
   * @returns {WebsocketClient | undefined} The `WebsocketClient` instance if found, otherwise undefined.
   */
  getConnection(url: string): WebsocketClient | undefined {
    return this.connections.get(url);
  }

  /**
   * @method disconnect
   * @description Closes and removes the WebSocketClient instance associated with the given URL. It also releases any active connection locks for that URL.
   * @param {string} url - The URL of the WebSocket connection to disconnect.
   * @returns {void}
   */
  disconnect(url: string): void {
    const client = this.connections.get(url);
    if (client) {
      client.close();
      this.connections.delete(url);
      this.connectionLocks.delete(url); // Release lock if disconnected
    }
  }

  /**
   * @method disconnectAll
   * @description Closes all active WebSocket connections managed by the ConnectionFactory and clears all stored clients and connection locks.
   * @returns {void}
   */
  disconnectAll(): void {
    this.connections.forEach((client) => client.close());
    this.connections.clear();
    this.connectionLocks.clear();
  }
}

export const ConnectionFactory = new WebsocketConnectionManager();
