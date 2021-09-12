/// <reference types="react-scripts" />

type MessageBlock = { sender: string; timeStamp: string; messages: string[] };
type Chat = { time: number; chatId: string; messageBlocks: MessageBlock[] };
