import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const IngredientInput = ({ onIngredientsChange }) => {
  const [inputText, setInputText] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = () => {
    if (inputText.trim()) {
      const newIngredients = [...ingredients, inputText.trim()];
      setIngredients(newIngredients);
      setInputText('');
      onIngredientsChange(newIngredients);
    }
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
    onIngredientsChange(newIngredients);
  };

  const handleSubmit = () => {
    if (inputText.trim()) {
      addIngredient();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What ingredients do you have?</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Enter an ingredient..."
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {ingredients.length > 0 && (
        <View style={styles.ingredientsList}>
          <Text style={styles.listTitle}>Your ingredients:</Text>
          <FlatList
            data={ingredients}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.ingredientItem}>
                <Text style={styles.ingredientText}>{item}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeIngredient(index)}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  ingredientsList: {
    maxHeight: 200,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#FF3B30',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default IngredientInput;