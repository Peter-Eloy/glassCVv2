// src/services/api/chat.js
import api from "./config";

const CHAT_ENDPOINT = "/chat";

export const sendMessage = async (message) => {
  console.log("🤖 Beep boop! Someone's trying to chat with the AI. Sending message to the digital brain...", { message: message.substring(0, 50) + "..." });
  
  const promptId = "cm6pjy2l50001vmn869wiizdo";
  const response = await api.post(CHAT_ENDPOINT, { message, promptId });
  
  console.log("💬 Chat API responded! The AI has something to say (hopefully something smart):", { responseLength: response.data.response.length + " characters" });
  
  return response.data.response;
};

export const getMessageHistory = async () => {
  console.log("📜 Digging through the chat archives... Let's see what conversations we've had before!");
  
  const response = await api.get(CHAT_ENDPOINT);
  
  console.log("🗃️ Chat history retrieved! Found", response.data?.length || 0, "previous messages. Time traveling through conversations!");
  
  return response.data;
};
