import { useEffect, useState } from "react";
import useWebSocket, { WebsocketProps } from "./use-ws";
import { ConnectionFactory } from ".";

type WebsocketFetchProps<TReq = any> = {
  payload?: TReq;
  deps?: any[];
  enabled?: boolean;
} & WebsocketProps;

export default function useWsFetch<TReq = any, TRes = any>(
  props: WebsocketFetchProps<TReq>
) {
  const [receivedData, setReceivedData] = useState<TRes | undefined>(undefined);
  const [messages, setMessages] = useState<TRes[]>([]);
  const {
    url,
    onOpen,
    onClose,
    enabled = true,
    deps = [],
    ...sendProps
  } = props;

  const clientProps = useWebSocket({ url, onOpen, onClose });

  const { client, state } = clientProps;

  const sender = (data: TReq) => {
    if (client) {
      client.send<TReq>(data);
    } else {
      console.error(`client is not initialized`);
    }
  };

  const { payload } = sendProps;

  useEffect(() => {
    if (state && state === "OPEN" && enabled && payload) {
      sender(payload);
    }
  }, [state, ...deps]);

  useEffect(() => {
    // Register on receve data
    client.onMessage<TRes>((data) => {
      try {
        setReceivedData(data);
        setMessages((prevMessages) => [...prevMessages, data]);
      } catch (error) {
        console.error("receving failed:", error);
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      if (state === "OPEN") {
        ConnectionFactory.disconnect(url);
      }
    };
  }, [state]);

  return {
    ...clientProps,
    sendMessage: sender,
    data: receivedData,
    messages,
  };
}
