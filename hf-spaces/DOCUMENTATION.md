# Hugging Face Spaces: Health Prediction Models

This repository contains FastAPI applications for three medical prediction models:
1. Heart Disease Prediction
2. Diabetes Prediction
3. Kidney Disease Prediction

Each application is designed to be deployed as a separate Hugging Face Space.

## Overview

These FastAPI applications provide REST APIs and simple web interfaces for predicting various health conditions based on medical data. Each model has its own directory with the following structure:

```
model_name/
├── app.py                  # FastAPI application
├── Dockerfile              # Docker configuration
├── requirements.txt        # Python dependencies
├── .dockerignore           # Files to exclude from Docker
├── README.md               # Documentation
├── model/                  # Directory for ML model
│   └── placeholder.txt     # Instructions for model placement
├── templates/              # Directory for HTML templates
│   └── placeholder.txt     # Instructions for templates
└── static/                 # Directory for static files
    └── placeholder.txt     # Instructions for static files
```

## Deployment to Hugging Face Spaces

### Prerequisites

1. A Hugging Face account (sign up at [huggingface.co](https://huggingface.co))
2. Trained ML models for heart disease, diabetes, and kidney disease prediction (scikit-learn models saved with pickle)

### Deployment Steps

For each model (heart, diabetes, kidney), follow these steps:

1. Create a new Space on Hugging Face:
   - Go to [huggingface.co/new-space](https://huggingface.co/new-space)
   - Choose a name (e.g., `prasan1101/ml-heart`, `prasan1101/ml-diabetes`, `prasan1101/ml-kidney`)
   - Select "Docker" as the Space SDK

2. Copy the files from the corresponding directory (e.g., `hf-spaces/heart/`) to your Space:
   - You can use Git or the Hugging Face web interface
   - Make sure to include all files and directories

3. Add your trained model:
   - Place your trained scikit-learn model in the `model/` directory
   - Rename it to match the expected filename (`heart_model.pkl`, `diabetes_model.pkl`, or `kidney_model.pkl`)

4. (Optional) Customize the HTML interface:
   - Create an `index.html` file in the `templates/` directory
   - Add CSS/JS files to the `static/` directory

5. Build and deploy:
   - Hugging Face will automatically build and deploy your Docker container
   - You can monitor the build process in the Space's "Settings" tab

## API Usage

Each model provides a similar REST API structure:

### Heart Disease Prediction API

```http
POST /predict
Content-Type: application/json

{
  "age": 63,
  "sex": 1,
  "cp": 3,
  "trestbps": 145,
  "chol": 233,
  "fbs": 1,
  "restecg": 0,
  "thalach": 150,
  "exang": 0,
  "oldpeak": 2.3,
  "slope": 0,
  "ca": 0,
  "thal": 1
}
```

Response:
```json
{
  "has_heart_disease": true,
  "probability": 0.85,
  "message": "High risk of heart disease. Please consult with a healthcare professional."
}
```

### Diabetes Prediction API

```http
POST /predict
Content-Type: application/json

{
  "pregnancies": 6,
  "glucose": 148,
  "bloodPressure": 72,
  "skinThickness": 35,
  "insulin": 0,
  "bmi": 33.6,
  "diabetesPedigree": 0.627,
  "age": 50
}
```

Response:
```json
{
  "has_diabetes": true,
  "probability": 0.85,
  "message": "High risk of diabetes. Please consult with a healthcare professional."
}
```

### Kidney Disease Prediction API

```http
POST /predict
Content-Type: application/json

{
  "age": 48,
  "bloodPressure": 80,
  "specificGravity": 1.020,
  "albumin": 1,
  "sugar": 0,
  "redBloodCells": "normal",
  "pus": 2,
  "pusCellClumps": "notpresent",
  "bacteria": "notpresent",
  "bloodGlucose": 121,
  "bloodUrea": 36,
  "serumCreatinine": 1.2,
  "sodium": 137.5,
  "potassium": 4.5,
  "hemoglobin": 15.4,
  "packedCellVolume": 44,
  "whiteBloodCellCount": 7800,
  "redBloodCellCount": 5.2,
  "hypertension": "yes",
  "diabetesMellitus": "no",
  "coronaryArteryDisease": "no",
  "appetite": "good",
  "pedalEdema": "no",
  "anemia": "no"
}
```

Response:
```json
{
  "has_kidney_disease": false,
  "probability": 0.15,
  "message": "Low risk of chronic kidney disease. Maintain a healthy lifestyle and regular check-ups."
}
```

## Web Interface

Each model also provides a simple web interface accessible at the root URL (e.g., `https://huggingface.co/spaces/prasan1101/ml-heart`). This interface allows users to input their medical data and receive predictions without needing to make API calls directly.

## Swagger Documentation

FastAPI automatically generates Swagger documentation for each API, accessible at `/docs` (e.g., `https://huggingface.co/spaces/prasan1101/ml-heart/docs`).

## Local Development

To run any of the applications locally:

1. Navigate to the application directory:
   ```
   cd hf-spaces/heart
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Run the application:
   ```
   uvicorn app:app --reload
   ```

4. Open http://localhost:7860 in your browser

## Important Note

These models are for educational purposes only and should not be used for medical diagnosis. Always consult with a healthcare professional for medical advice. 