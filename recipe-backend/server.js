const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? [process.env.FRONTEND_URL, 'https://your-app-name.onrender.com']
    : ['http://localhost:8081', 'http://localhost:3000', 'http://localhost:19006'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

let savedRecipes = [];
let recipeIdCounter = 1;

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🥘 AI Recipe Improviser API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      recipes: '/api/recipes',
      generateRecipe: '/api/generate-recipe'
    },
    documentation: 'https://github.com/your-username/ai-recipe-app'
  });
});

app.get('/api/recipes', (req, res) => {
  res.json({
    success: true,
    recipes: savedRecipes
  });
});

app.post('/api/recipes', (req, res) => {
  const { title, cookingTime, ingredients, instructions } = req.body;

  if (!title || !ingredients || !instructions) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: title, ingredients, instructions'
    });
  }

  const newRecipe = {
    id: recipeIdCounter++,
    title,
    cookingTime: cookingTime || 'Unknown',
    ingredients,
    instructions,
    createdAt: new Date().toISOString()
  };

  savedRecipes.push(newRecipe);

  res.status(201).json({
    success: true,
    recipe: newRecipe
  });
});

app.get('/api/recipes/:id', (req, res) => {
  const recipeId = parseInt(req.params.id);
  const recipe = savedRecipes.find(r => r.id === recipeId);

  if (!recipe) {
    return res.status(404).json({
      success: false,
      message: 'Recipe not found'
    });
  }

  res.json({
    success: true,
    recipe
  });
});

app.delete('/api/recipes/:id', (req, res) => {
  const recipeId = parseInt(req.params.id);
  const recipeIndex = savedRecipes.findIndex(r => r.id === recipeId);

  if (recipeIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Recipe not found'
    });
  }

  savedRecipes.splice(recipeIndex, 1);

  res.json({
    success: true,
    message: 'Recipe deleted successfully'
  });
});

app.post('/api/generate-recipe', async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Please provide an array of ingredients'
    });
  }

  try {
    const mockRecipe = {
      title: `Delicious ${ingredients[0]} Recipe`,
      cookingTime: '30 minutes',
      ingredients: [
        ...ingredients.map(ing => ({ name: ing, amount: '1 cup', available: true })),
        { name: 'salt', amount: '1 tsp', available: false },
        { name: 'pepper', amount: '1/2 tsp', available: false }
      ],
      instructions: [
        `Prepare your ${ingredients[0]} by washing and chopping as needed.`,
        'Heat a large pan over medium heat.',
        `Add the ${ingredients.join(', ')} to the pan.`,
        'Season with salt and pepper to taste.',
        'Cook for 20-25 minutes, stirring occasionally.',
        'Taste and adjust seasoning as needed.',
        'Serve hot and enjoy your delicious meal!'
      ]
    };

    res.json({
      success: true,
      recipe: mockRecipe
    });
  } catch (error) {
    console.error('Recipe generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate recipe'
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Recipe API is running!',
    timestamp: new Date().toISOString()
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🥘 Recipe API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});