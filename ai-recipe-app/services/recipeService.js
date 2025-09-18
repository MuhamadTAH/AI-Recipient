const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const generateRecipe = async (ingredients, apiKey) => {
  if (!apiKey) {
    throw new Error('OpenAI API key is required');
  }

  const prompt = `Create a detailed recipe using these ingredients: ${ingredients.join(', ')}.

Please provide the response in this exact JSON format:
{
  "title": "Recipe name",
  "cookingTime": "X minutes",
  "ingredients": [
    {"name": "ingredient name", "amount": "quantity", "available": true/false}
  ],
  "instructions": [
    "Step 1 description",
    "Step 2 description"
  ]
}

Make sure to:
- Use as many of the provided ingredients as possible
- Mark ingredients as "available: true" if they were in the provided list
- Suggest reasonable substitutions for missing ingredients
- Provide clear, numbered cooking steps
- Include realistic cooking time`;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful cooking assistant that creates recipes from available ingredients.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const recipeText = data.choices[0].message.content;

    try {
      return JSON.parse(recipeText);
    } catch (parseError) {
      throw new Error('Failed to parse recipe response');
    }
  } catch (error) {
    console.error('Recipe generation error:', error);
    throw error;
  }
};

const getMockRecipe = (ingredients) => {
  return {
    title: `Delicious ${ingredients[0]} Dish`,
    cookingTime: '30 minutes',
    ingredients: [
      ...ingredients.map(ing => ({ name: ing, amount: '1 cup', available: true })),
      { name: 'salt', amount: '1 tsp', available: false },
      { name: 'pepper', amount: '1/2 tsp', available: false }
    ],
    instructions: [
      `Prepare your ${ingredients[0]} by washing and chopping as needed.`,
      'Heat a pan over medium heat.',
      `Add the ${ingredients.join(' and ')} to the pan.`,
      'Season with salt and pepper to taste.',
      'Cook for 15-20 minutes until tender.',
      'Serve hot and enjoy!'
    ]
  };
};

export { generateRecipe, getMockRecipe };