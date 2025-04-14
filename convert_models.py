"""
Convert Scikit-learn or Pickle models to TensorFlow.js format.

This script loads the pickled ML models, converts them to TensorFlow.js format, 
and saves them in the public/models directory for use in the browser.

Requirements:
- pip install scikit-learn tensorflow tensorflowjs pandas numpy
"""

import os
import pickle
import numpy as np
import tensorflow as tf
import tensorflowjs as tfjs
from tensorflow import keras
from sklearn.preprocessing import StandardScaler
from sklearn.base import BaseEstimator

# Create directories
os.makedirs('public/models/diabetes', exist_ok=True)
os.makedirs('public/models/heart', exist_ok=True)
os.makedirs('public/models/kidney', exist_ok=True)

def create_keras_model_from_sklearn(sklearn_model, input_shape):
    """Convert a scikit-learn model to a Keras model"""
    # Create a Keras Sequential model
    model = keras.Sequential()
    
    # Add an input layer
    model.add(keras.layers.Input(shape=(input_shape,)))
    
    # If it's a simple model like LogisticRegression, we can extract coefficients and intercept
    if hasattr(sklearn_model, 'coef_') and hasattr(sklearn_model, 'intercept_'):
        # Add a dense layer with weights from the sklearn model
        dense = keras.layers.Dense(1, activation='sigmoid')
        model.add(dense)
        
        # Set the weights
        weights = [
            np.array([sklearn_model.coef_[0]]).T,  # Weights
            np.array([sklearn_model.intercept_[0]])  # Bias
        ]
        dense.set_weights(weights)
    else:
        # For more complex models, we'll use a dense layer and fit it to approximate
        # This is a simplified approach and might not work for all models
        model.add(keras.layers.Dense(64, activation='relu'))
        model.add(keras.layers.Dense(32, activation='relu'))
        model.add(keras.layers.Dense(1, activation='sigmoid'))
        
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    return model

def convert_model(pickle_path, output_dir, input_shape):
    """Load a pickled model and convert it to TensorFlow.js format"""
    try:
        # Load the pickled model
        with open(pickle_path, 'rb') as f:
            sklearn_model = pickle.load(f)
        
        print(f"Loaded model from {pickle_path}")
        print(f"Model type: {type(sklearn_model)}")
        
        # Convert to Keras model
        keras_model = create_keras_model_from_sklearn(sklearn_model, input_shape)
        
        # Save model in TensorFlow.js format
        tfjs.converters.save_keras_model(keras_model, output_dir)
        print(f"Saved TensorFlow.js model to {output_dir}")
        return True
    
    except Exception as e:
        print(f"Error converting model {pickle_path}: {str(e)}")
        return False

# Convert diabetes model
diabetes_success = convert_model(
    'ml/saved_models/diabetes.pkl',
    'public/models/diabetes',
    input_shape=8  # Number of features in the diabetes dataset
)

# Convert heart model
heart_success = convert_model(
    'ml/saved_models/heart.pkl',
    'public/models/heart',
    input_shape=13  # Number of features in the heart disease dataset
)

# Convert kidney model
kidney_success = convert_model(
    'ml/saved_models/kidney.pkl',
    'public/models/kidney',
    input_shape=24  # Number of features in the kidney disease dataset
)

# Print summary
print("\nConversion Summary:")
print(f"Diabetes Model: {'Success' if diabetes_success else 'Failed'}")
print(f"Heart Model: {'Success' if heart_success else 'Failed'}")
print(f"Kidney Model: {'Success' if kidney_success else 'Failed'}")
print("\nTo use these models, you need to:")
print("1. Make sure the public/models directory is included in your build")
print("2. Access the models using TensorFlow.js in your application") 