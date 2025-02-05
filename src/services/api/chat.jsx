// src/services/api/chat.js
import api from "./config";

const CHAT_ENDPOINT = "/chat";

export const sendMessage = async (message) => {
  const promptId = "cm6pjy2l50001vmn869wiizdo";
  const response = await api.post(CHAT_ENDPOINT, { message, promptId });
  return response.data.response;
};

export const getMessageHistory = async () => {
  const response = await api.get(CHAT_ENDPOINT);
  return response.data;
};
