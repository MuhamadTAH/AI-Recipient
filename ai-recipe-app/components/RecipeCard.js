import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const RecipeCard = ({ recipe, onSave }) => {
  if (!recipe) return null;

  return (
    <View style={styles.card}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{recipe.title}</Text>

        <View style={styles.timeContainer}>
          <Text style={styles.timeLabel}>Cooking Time:</Text>
          <Text style={styles.timeValue}>{recipe.cookingTime}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientRow}>
              <Text style={[
                styles.ingredientText,
                ingredient.available ? styles.availableIngredient : styles.missingIngredient
              ]}>
                {ingredient.amount} {ingredient.name}
              </Text>
              {!ingredient.available && (
                <Text style={styles.missingLabel}>Missing</Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {recipe.instructions.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <Text style={styles.stepNumber}>{index + 1}</Text>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={() => onSave(recipe)}>
          <Text style={styles.saveButtonText}>Save Recipe</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxHeight: 500,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 8,
  },
  timeLabel: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  ingredientText: {
    fontSize: 16,
    flex: 1,
  },
  availableIngredient: {
    color: '#333',
  },
  missingIngredient: {
    color: '#666',
    fontStyle: 'italic',
  },
  missingLabel: {
    fontSize: 12,
    color: '#FF3B30',
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    backgroundColor: '#E3F2FD',
    width: 28,
    height: 28,
    textAlign: 'center',
    lineHeight: 28,
    borderRadius: 14,
    marginRight: 12,
  },
  stepText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    lineHeight: 22,
  },
  saveButton: {
    backgroundColor: '#34C759',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecipeCard;