import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import IngredientInput from './components/IngredientInput';
import RecipeCard from './components/RecipeCard';
import { generateRecipe, getMockRecipe } from './services/recipeService';

export default function App() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0) {
      Alert.alert('No Ingredients', 'Please add some ingredients first!');
      return;
    }

    setLoading(true);
    try {
      const generatedRecipe = getMockRecipe(ingredients);
      setRecipe(generatedRecipe);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate recipe. Please try again.');
      console.error('Recipe generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = (recipeToSave) => {
    setSavedRecipes([...savedRecipes, { ...recipeToSave, id: Date.now() }]);
    Alert.alert('Success', 'Recipe saved successfully!');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.appTitle}>🥘 AI Recipe Improviser</Text>
        </View>

        <IngredientInput onIngredientsChange={setIngredients} />

        {ingredients.length > 0 && (
          <View style={styles.generateContainer}>
            <TouchableOpacity
              style={[styles.generateButton, loading && styles.disabledButton]}
              onPress={handleGenerateRecipe}
              disabled={loading}
            >
              <Text style={styles.generateButtonText}>
                {loading ? 'Generating Recipe...' : 'Generate Recipe'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {recipe && <RecipeCard recipe={recipe} onSave={handleSaveRecipe} />}

        {savedRecipes.length > 0 && (
          <View style={styles.savedSection}>
            <Text style={styles.savedTitle}>
              Saved Recipes ({savedRecipes.length})
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#007AFF',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  generateContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  generateButton: {
    backgroundColor: '#FF9500',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  generateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  savedSection: {
    padding: 20,
  },
  savedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});
