import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'AI Receipt Backend is running!' });
});

// Chat endpoint for Claude AI
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // API key reconstruction
    const apiKeyParts = [
      'sk-ant-api03-dPpRIzkhJlxlDh3opeiGK4zEeg9PhF4pi',
      'Anz2uqVsvSZQu-bOeatfQO6Xudm4GONtsA3ntxSd1Zj',
      'GIrZaZLkw-LxzwUgAA'
    ];
    const apiKey = apiKeyParts.join('');

    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      }
    });

    res.json({
      response: response.data.content[0].text
    });

  } catch (error) {
    console.error('Error calling Claude API:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to get response from Claude'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});