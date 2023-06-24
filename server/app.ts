import express, { Request, Response } from 'express';
import cors from 'cors';
import events from 'events';
import EventEmitter from 'events';

const app = express();
const port = 5000;

const emmiter = new EventEmitter();

app.use(cors());

app.get('message', (req: Request, res: Response) => {
  emmiter.once('new-message', (message) => {
    res.json(message)
  })
});

app.post('message', (req: Request, res: Response) => {
  const message = req.body;
  emmiter.emit('new-message', message);
  res.status(200);
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});