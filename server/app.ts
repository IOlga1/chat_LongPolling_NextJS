import express, { Request, Response } from 'express';
import cors from 'cors';
import events from 'events';
import EventEmitter from 'events';
import { v4 } from 'uuid';
import { IMyMessage } from './app.interfaces';

const app = express();
const port = 5000;

const emmiter = new EventEmitter();

app.use(cors());
app.use(express.json());

const messagesHistory = [{ author: 'Admin', content: 'Тут может быть история сообщений с БД', id: v4() }];

const getLastMessages = () => {
  if (messagesHistory.length > 10) {
    return messagesHistory.slice(-10)
  } else {
    return messagesHistory
  }
}

app.get('/history', (req: Request, res: Response) => {
  res.send(getLastMessages());
})

app.get('/messages', (req: Request, res: Response) => {
  emmiter.once('new-messages', (messages) => {
    res.send(messages)
  })
});

app.post('/message', (req: Request, res: Response) => {
  const message = req.body;
  const myMessage: IMyMessage = { ...message, id: v4() };
  messagesHistory.push(myMessage);
  emmiter.emit('new-messages', getLastMessages());
  res.status(200);
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});