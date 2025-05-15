---
title: Heart Disease Prediction Model
emoji: ❤️
colorFrom: red
colorTo: pink
sdk: docker
sdk_version: "3.9"
app_file: app.py
pinned: false
---

Check out the configuration reference at https://huggingface.co/docs/hub/spaces-config-reference

# Heart Disease Prediction Model

This FastAPI application provides a REST API and web interface for predicting heart disease risk based on medical data.

## API Endpoints

### Prediction Endpoint

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

## Web Interface

A simple web interface is available at the root URL. This interface allows users to input their medical data and receive predictions without needing to make API calls directly.

## Model Information

The heart disease prediction model was trained on the UCI Heart Disease Dataset. It uses the following features:

- age: Age in years
- sex: Sex (1 = male, 0 = female)
- cp: Chest pain type (0-3)
- trestbps: Resting blood pressure in mm Hg
- chol: Serum cholesterol in mg/dl
- fbs: Fasting blood sugar > 120 mg/dl (1 = true, 0 = false)
- restecg: Resting electrocardiographic results (0-2)
- thalach: Maximum heart rate achieved
- exang: Exercise induced angina (1 = yes, 0 = no)
- oldpeak: ST depression induced by exercise
- slope: Slope of peak exercise ST segment (0-2)
- ca: Number of major vessels colored by fluoroscopy (0-3)
- thal: Thalassemia (1-3)

## Deployment

This application is designed to be deployed as a Hugging Face Space. It uses Docker for containerization.

## Important Note

This model is for educational purposes only and should not be used for medical diagnosis. Always consult with a healthcare professional for medical advice. 