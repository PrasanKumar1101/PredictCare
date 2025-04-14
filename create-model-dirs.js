// Script to create model directories and placeholder files
const fs = require('fs');
const path = require('path');

// Create directories
const modelTypes = ['diabetes', 'heart', 'kidney'];
modelTypes.forEach(type => {
  const dirPath = path.join('public', 'models', type);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
});

// Create dummy model.json files
modelTypes.forEach(type => {
  const modelJsonPath = path.join('public', 'models', type, 'model.json');
  const modelJson = {
    format: "layers-model",
    generatedBy: "TensorFlow.js v3.18.0",
    convertedBy: "TensorFlow.js Converter v3.18.0",
    modelTopology: {
      keras_version: "2.9.0",
      backend: "tensorflow",
      model_config: {
        class_name: "Sequential",
        config: {
          name: "sequential",
          layers: [
            {
              class_name: "Dense",
              config: {
                name: "dense",
                trainable: true,
                dtype: "float32",
                units: 1,
                activation: "sigmoid",
                use_bias: true,
                kernel_initializer: {
                  class_name: "GlorotUniform",
                  config: { seed: null }
                },
                bias_initializer: {
                  class_name: "Zeros",
                  config: {}
                }
              }
            }
          ]
        }
      },
      training_config: {
        loss: "binary_crossentropy",
        metrics: ["accuracy"],
        weighted_metrics: null,
        loss_weights: null,
        optimizer_config: {
          class_name: "Adam",
          config: {
            name: "Adam",
            learning_rate: 0.001,
            decay: 0.0,
            beta_1: 0.9,
            beta_2: 0.999,
            epsilon: 1e-7,
            amsgrad: false
          }
        }
      }
    },
    weightsManifest: [
      {
        paths: ["group1-shard1of1.bin"],
        weights: [
          {
            name: "dense/kernel",
            shape: [type === 'diabetes' ? 8 : type === 'heart' ? 13 : 24, 1],
            dtype: "float32"
          },
          {
            name: "dense/bias",
            shape: [1],
            dtype: "float32"
          }
        ]
      }
    ]
  };

  fs.writeFileSync(modelJsonPath, JSON.stringify(modelJson, null, 2));
  console.log(`Created model.json for ${type}`);

  // Create binary weights file with random data
  const binPath = path.join('public', 'models', type, 'group1-shard1of1.bin');
  const inputSize = type === 'diabetes' ? 8 : type === 'heart' ? 13 : 24;
  const buffer = Buffer.alloc((inputSize + 1) * 4); // 4 bytes per float32
  
  // Fill with random values
  for (let i = 0; i < buffer.length; i += 4) {
    buffer.writeFloatLE(Math.random() - 0.5, i); // Random weights centered around 0
  }
  
  fs.writeFileSync(binPath, buffer);
  console.log(`Created binary weights file for ${type}`);
});

console.log('All model files created successfully!'); 