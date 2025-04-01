import { useEffect, useState } from "react";
import SocketEndpoints from "./helpers";
import client from ".";

export default function useGetMessage<T>(
  endpoint: SocketEndpoints
) {
  const [messageData, setMessageData] = useState<undefined | T>(undefined);
  useEffect(() => {
    client.onMessage<T>(endpoint, (data) => setMessageData(data));    
  }, []);

  return { data: messageData, setData: setMessageData };
}
