import { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
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
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatComponent = ({ open, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const style = {
    modalContent: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "80vw",
      maxWidth: "600px",
      height: "70vh",
      bgcolor: "background.paper",
      borderRadius: "16px",
      boxShadow: 24,
      p: 4,
      outline: "none",
    },
    backdrop: {
      backdropFilter: "blur(5px)",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Simulated AI response
      const aiResponse = {
        text: "This is a simulated AI response. Replace this with actual API integration.",
        sender: "ai",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error:", error);
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
      onClose={onClose}
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
          <Paper
            elevation={0}
            sx={{
              height: "calc(100% - 90px)",
              overflow: "auto",
              mb: 2,
              p: 2,
              backgroundColor: "#f5f5f5",
              borderRadius: "12px",
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
                        message.sender === "user" ? "#e3f2fd" : "#ffffff",
                      borderRadius: "12px",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="body1">{message.text}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {/* {new Date(message.timestamp).toLocaleTimeString()} */}
                        "I'm currently working on the backend and it will be
                        finished soon!"
                      </Typography>
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
              <div ref={messagesEndRef} />
            </List>
          </Paper>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Wokring on the backend..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              multiline
              maxRows={4}
              sx={{
                backgroundColor: "#ffffff",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              sx={{
                backgroundColor: "#1976d2",
                color: "white",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#bdbdbd",
                  color: "#ffffff",
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ChatComponent;
