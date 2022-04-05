import { useCallback, useMemo, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";


export default function Kline() {
  const socketUrl = "wss://stream.binance.com:9443/stream";

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    socketUrl
  );

  const messageHistory = useRef<MessageEvent[]>([]);

  messageHistory.current = useMemo(
    () => messageHistory.current.concat(lastJsonMessage ?? []),
    [lastJsonMessage]
  );

  const handleClickSendMessage = useCallback(
    () =>
      sendJsonMessage({
        method: "SUBSCRIBE",
        params: ["ethusdt@kline_1m","btcusdt@kline_1m"],
        id: 1
      }),
    [sendJsonMessage]
  );

  const handleClickUnSendMessage = useCallback(
    () =>
      sendJsonMessage({
        method: "UNSUBSCRIBE",
        params: ["ethusdt@kline_1m","btcusdt@kline_1m"],
        id: 1
      }),
    [sendJsonMessage]
  );

  function testLog() {
    console.log(lastJsonMessage.data);
    return JSON.stringify(lastJsonMessage.data, null, 4);
  }

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated"
  }[readyState];

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Subscribe
      </button>
      <button
        onClick={handleClickUnSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Unsubscribe
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastJsonMessage ? (
        <span>
          {testLog}
          Last message: {testLog()}
        </span>
      ) : null}
      <ul>
        {messageHistory.current.map((message, idx) => (
          <span key={idx}>{testLog()}</span>
        ))}
      </ul>
    </div>
  );
}
