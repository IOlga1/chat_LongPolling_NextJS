export interface IMyMessage {
  author: string;
  content: string;
  id: string;
}

export type TMessagesHistory = Array<IMyMessage>;