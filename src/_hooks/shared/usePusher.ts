"use client";

import Pusher from "pusher-js";
import { useEffect } from "react";

// Pusherクライアントはアプリケーション全体で一つだけ存在すれば良いので、ここで初期化します
const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
});

// Pusherのチャンネル購読・イベント待受を簡単にするためのカスタムフック
export const usePusher = (
  channelName: string,
  eventName: string,
  callback: (data: any) => void
) => {
  useEffect(() => {
    const channel = pusherClient.subscribe(channelName);
    channel.bind(eventName, callback);

    // コンポーネントが不要になった際に、購読を解除するクリーンアップ処理
    return () => {
      channel.unbind(eventName, callback);
      pusherClient.unsubscribe(channelName);
    };
    // ▼▼▼ 依存配列にcallbackを追加します ▼▼▼
  }, [channelName, eventName, callback]);
};
