import axios, { AxiosResponse } from "axios";

interface IMyMessage {
  author: string;
  content: string;
}

const BASE_URL = 'http://localhost:';
const PORT = 5000;
const URL = `${BASE_URL}${PORT}`;

const handleResponseError = (response: AxiosResponse) => {
  if (response.status !== 200) {
    throw new Error(response.data.message);
  }
};

const getMessagesHistory = async () => {
  try {
    const response = await axios.get(`${URL}/history`);
    handleResponseError(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const sendMessage = async (data: IMyMessage) => {
  // console.log('!!!!!!!!!!!!!!!!', data)
  try {
    const response = await axios.post(`${URL}/message`, data);
    handleResponseError(response);
    // console.log(response)
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const subscribe = async () => {
  try {
    const response = await axios.get(`${URL}/messages`);
    handleResponseError(response);
    return response.data;
  } catch (error) {
    console.error(error);
    setTimeout(() => {
      subscribe()
    }, 1000);
  }
}

export default {
  getMessagesHistory,
  sendMessage,
  subscribe
}