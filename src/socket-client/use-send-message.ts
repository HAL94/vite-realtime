
import { useEffect } from "react";
import SocketEndpoints from "./socket-endpoints";
import client from ".";

export default function useSendMessage<T = object>(
  endpoint: SocketEndpoints,
  data: T,
  config: {
    enabled: boolean
  } = { enabled: true }
) {
  const sender = () => client.send<T>(endpoint, data)
  useEffect(() => {
    if (config.enabled) {
        sender()
    }
  }, []);
}
