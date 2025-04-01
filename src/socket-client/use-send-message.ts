
import { useEffect } from "react";
import SocketEndpoints from "./helpers";
import client from ".";

export default function useSendMessage<T>(
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
