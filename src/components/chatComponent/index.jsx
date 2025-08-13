import { useState, useRef, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  List,
  ListItem,
  Card,
  CardContent,
  Backdrop,
  Fade,
  Modal,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { sendMessage } from "../../services/api/chat";
import { useTheme } from "../../contexts";

const LoadingIndicator = () => {
  const { isDarkMode } = useTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
      <CircularProgress
        size={20}
        sx={{ color: isDarkMode ? "#fff" : "#000" }}
      />
      <Typography
        variant="body2"
        sx={{
          fontStyle: "italic",
          color: isDarkMode ? "#fff" : "#000",
        }}
      >
        Processing... 🧠
      </Typography>
    </Box>
  );
};

const ChatComponent = ({ open, onClose }) => {
  const { isDarkMode } = useTheme();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const colors = {
    background: isDarkMode
      ? "rgba(30, 30, 30, 0.85)"
      : "rgba(255, 255, 255, 0.85)",
    messageBg: isDarkMode
      ? { user: "rgba(25, 118, 210, 0.15)", ai: "rgba(255, 255, 255, 0.05)" }
      : { user: "rgba(25, 118, 210, 0.1)", ai: "rgba(255, 255, 255, 0.5)" },
    text: isDarkMode
      ? { primary: "#fff", secondary: "rgba(255, 255, 255, 0.7)" }
      : { primary: "#000", secondary: "rgba(0, 0, 0, 0.7)" },
  };

  const style = {
    modalContent: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "80vw",
      maxWidth: "600px",
      height: "70vh",
      bgcolor: colors.background,
      borderRadius: "16px",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      backdropFilter: "blur(8px)",
      border: "1px solid rgba(255, 255, 255, 0.18)",
      p: 4,
      outline: "none",
    },
    backdrop: {
      backdropFilter: "blur(5px)",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  const handleClose = () => {
    setMessages([]);
    onClose();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        text: inputMessage,
        sender: "user",
        timestamp: new Date().toISOString(),
      },
    ]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const responseText = await sendMessage(inputMessage);
      setMessages((prev) => [
        ...prev,
        {
          text: responseText,
          sender: "ai",
          timestamp: new Date().toISOString(),
          shouldType: true,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: error.message || "Error processing message",
          sender: "ai",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: style.backdrop,
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style.modalContent}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: colors.text.secondary,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box
            sx={{
              height: "calc(100% - 90px)",
              overflow: "auto",
              mb: 2,
              p: 2,
            }}
          >
            <List>
              {messages.map((message, index) => (
                <ListItem
                  key={index}
                  sx={{
                    justifyContent:
                      message.sender === "user" ? "flex-end" : "flex-start",
                    mb: 1,
                  }}
                >
                  <Card
                    sx={{
                      maxWidth: "70%",
                      backgroundColor:
                        message.sender === "user"
                          ? colors.messageBg.user
                          : colors.messageBg.ai,
                      borderRadius: "12px",
                      boxShadow: "none",
                    }}
                  >
                    <CardContent>
                      {message.shouldType ? (
                        <TypeAnimation
                          sequence={[message.text]}
                          wrapper="span"
                          speed={80}
                          style={{
                            fontSize: "1em",
                            display: "inline-block",
                            color: colors.text.primary,
                          }}
                        />
                      ) : (
                        <Typography
                          variant="body1"
                          sx={{ color: colors.text.primary }}
                        >
                          {message.text}
                        </Typography>
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 1,
                          color: colors.text.secondary,
                        }}
                      >
                        <Typography variant="caption">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </Typography>
                        {message.sender === "ai" && (
                          <Typography variant="caption" sx={{ opacity: 0.6 }}>
                            Mixtral-8x7B-Instruct-v0.1
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
              {isLoading && <LoadingIndicator />}
              <div ref={messagesEndRef} />
            </List>
          </Box>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              multiline
              maxRows={4}
              disabled={isLoading}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: isDarkMode
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(255, 255, 255, 0.8)",
                  borderRadius: "12px",
                  color: colors.text.primary,
                  "& fieldset": { 
                    borderColor: isDarkMode ? "transparent" : "rgba(0, 0, 0, 0.23)" 
                  },
                  "&:hover fieldset": { 
                    borderColor: isDarkMode ? "transparent" : "rgba(0, 0, 0, 0.4)" 
                  },
                  "&.Mui-focused fieldset": { 
                    borderColor: isDarkMode ? "transparent" : "rgba(25, 118, 210, 0.8)" 
                  },
                },
              }}
            />
            <IconButton
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              sx={{
                bgcolor: isDarkMode
                  ? "rgba(25, 118, 210, 0.2)"
                  : "rgba(25, 118, 210, 0.1)",
                color: colors.text.primary,
                "&:hover": {
                  bgcolor: isDarkMode
                    ? "rgba(25, 118, 210, 0.3)"
                    : "rgba(25, 118, 210, 0.2)",
                },
                "&.Mui-disabled": {
                  bgcolor: isDarkMode
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              // bottom: ,
              left: "50%",
              transform: "translateX(-50%)",
              opacity: 0.5,
              color: colors.text.secondary,
              textAlign: "center",
            }}
          >
            AI can get its wires crossed! Let's chat in person.
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ChatComponent;
