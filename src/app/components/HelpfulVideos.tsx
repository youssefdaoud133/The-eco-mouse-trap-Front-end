import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import axios from 'axios'; // Make sure to import axios


const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    // Mocking Gemini API request for the bot's response
    const botResponse = await fetchGeminiResponse(input); 

    setMessages((prevMessages) => [
      ...prevMessages,
      { user: input, bot: botResponse }
    ]);

    setInput('');
  };


  const fetchGeminiResponse = async (message: string): Promise<string> => {
    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: message, // Send the message in the request body
      });
      
      // Assuming the response from the server is in the format { data: { ... } }
      return response.data.data; // Adjust this based on your actual response structure
    } catch (error) {
      console.error('Error fetching response from Gemini API:', error);
      throw new Error('Failed to fetch response from Gemini API');
    }
  };
  

  return (
    <div className="flex flex-col items-center bg-gray-100" style={{
      width: '90%',                 
      height: '90vh',               
      maxWidth: '100%',             
      overflow: 'hidden',           
    }}>
      <div className="flex-grow overflow-y-auto w-full p-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white py-2 px-4 rounded-lg max-w-xs md:max-w-md break-words">
                  <strong>User:</strong> {msg.user}
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-300 py-2 px-4 rounded-lg max-w-xs md:max-w-md break-words">
                  <strong>Gemini:</strong> {msg.bot}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-4 flex items-center w-full">
        <input
          className="flex-grow border border-gray-300 rounded-lg py-2 px-4 mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500
          sm:text-sm md:text-base lg:text-lg sm:py-2 md:py-3 lg:py-4 sm:px-1 md:px-4 lg:px-6"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />


      <Button variant="contained"   onClick={handleSend}
      endIcon={<SendIcon />}>
      </Button>


      </div>
    </div>
  );
};

export default ChatBot;
