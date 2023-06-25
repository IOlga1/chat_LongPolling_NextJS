import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import DataService from "services/DataService";

interface IMessage {
  author: string;
  content: string;
  id: string;
}

export type TMessagesHistory = Array<IMessage>;

interface IChatProps {
  history: TMessagesHistory;
}

const Chat = ({ history }: IChatProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<TMessagesHistory | []>(history);
  const router = useRouter();
  const author = router.query.name;

  useEffect(() => {
    const subscribe = async () => {
      const newMessages = await DataService.subscribe();
      setMessages(newMessages);
      subscribe();
    };
    subscribe();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage) {
      const fetchData = async () => {
        const sendResult = await DataService.sendMessage({
          author: author as string,
          content: newMessage
        })
      };
      fetchData();
    }
    setNewMessage('');
  }

  return (
    <div>
      <h1>Chat</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <input placeholder="message" value={newMessage} onChange={(e) => { setNewMessage(e?.target.value) }} />
        <button type="submit">Go!</button>
      </form>

      {
        messages.length ?
          <div>
            {messages.map((message) => (
              <div key={message.id}>
                <span>{message.author}</span>: {message.content}
              </div>
            ))}
          </div>
          :
          <p>Text will be here</p>
      }
    </div>
  );
};

export async function getServerSideProps() {
  const history = await DataService.getMessagesHistory();
  return {
    props: {
      history,
    }
  }
}

export default Chat;