# 🥘 AI Smart Recipe Improviser - MVP

An AI-powered mobile app that generates recipe suggestions based on available ingredients.

## Features

### ✅ Implemented (MVP)
- **Ingredient Input**: Manual entry of available ingredients
- **Recipe Generation**: AI-powered recipe suggestions using provided ingredients
- **Recipe Display**: Clean card view with ingredients, steps, and cooking time
- **Recipe Save**: Local storage of favorite recipes
- **Cross-platform**: React Native app with web support
- **Backend API**: Node.js/Express server for recipe management

### 🔄 Core User Flow
1. User opens the app
2. Input ingredients they have available
3. AI generates recipe suggestions
4. View detailed recipe with ingredients and step-by-step instructions
5. Save recipes for later reference

## Project Structure

```
AI recepit/
├── ai-recipe-app/          # React Native frontend
│   ├── components/
│   │   ├── IngredientInput.js
│   │   └── RecipeCard.js
│   ├── services/
│   │   └── recipeService.js
│   └── App.js
├── recipe-backend/         # Node.js backend API
│   ├── server.js
│   ├── package.json
│   └── .env
├── data.md                # Original MVP specifications
└── README.md              # This file
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (for React Native development)

### Frontend Setup
```bash
cd ai-recipe-app
npm install
npm run web        # For web development
npm run android    # For Android (requires setup)
npm run ios        # For iOS (requires macOS)
```

### Backend Setup
```bash
cd recipe-backend
npm install
npm start          # Starts server on http://localhost:3001
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/recipes` - Get all saved recipes
- `POST /api/recipes` - Save a new recipe
- `GET /api/recipes/:id` - Get specific recipe
- `DELETE /api/recipes/:id` - Delete a recipe
- `POST /api/generate-recipe` - Generate recipe from ingredients

## Current Implementation Details

### Frontend Features
- **IngredientInput Component**: Allows users to add/remove ingredients
- **RecipeCard Component**: Displays generated recipes with ingredients and instructions
- **Mock Recipe Generation**: Currently uses mock data (ready for AI integration)
- **Save Functionality**: Local state management for saved recipes

### Backend Features
- **RESTful API**: Express.js server with CORS support
- **In-memory Storage**: Recipes stored in memory (ready for database integration)
- **Recipe Generation**: Mock endpoint ready for AI service integration
- **Error Handling**: Proper HTTP status codes and error messages

## Future Enhancements (Not in MVP)

### Planned Features
- **Photo Input**: Camera integration to scan ingredients
- **Voice Input**: Speech-to-text for ingredient entry
- **Nutrition Info**: Calorie and macro calculations
- **Diet Filters**: Vegetarian, keto, halal, etc.
- **Meal Planning**: Weekly planner with shopping lists
- **AI Creativity Slider**: Control recipe complexity/creativity
- **User Accounts**: Google/Email authentication
- **Real AI Integration**: OpenAI API for recipe generation
- **Database**: MongoDB/Firestore for persistent storage

### Tech Stack Upgrades
- **Database**: MongoDB or Firestore
- **Authentication**: Firebase Auth or Auth0
- **AI Integration**: OpenAI GPT API
- **Image Recognition**: Google Vision API for ingredient scanning
- **Push Notifications**: Recipe suggestions and meal reminders

## Development Notes

- Built with Expo for easier cross-platform development
- Uses React Native with web support via react-native-web
- Backend ready for deployment to cloud platforms
- Modular architecture for easy feature additions
- Mock data allows full app testing without AI API costs

## Running the Full Stack

1. Start the backend server:
   ```bash
   cd recipe-backend && npm start
   ```

2. Start the frontend app:
   ```bash
   cd ai-recipe-app && npm run web
   ```

3. Open http://localhost:8081 in your browser

The app is now ready for testing with ingredient input, recipe generation, and saving functionality!