---
title: Diabetes Prediction Model
emoji: 🩸
colorFrom: blue
colorTo: indigo
sdk: docker
sdk_version: "3.9"
app_file: app.py
pinned: false
---

Check out the configuration reference at https://huggingface.co/docs/hub/spaces-config-reference

# Diabetes Prediction Model

This FastAPI application provides a REST API and web interface for predicting diabetes based on medical data.

## API Endpoints

### Prediction Endpoint

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

## Web Interface

A simple web interface is available at the root URL. This interface allows users to input their medical data and receive predictions without needing to make API calls directly.

## Model Information

The diabetes prediction model was trained on the PIMA Indians Diabetes Dataset. It uses the following features:

- Pregnancies: Number of times pregnant
- Glucose: Plasma glucose concentration
- BloodPressure: Diastolic blood pressure (mm Hg)
- SkinThickness: Triceps skin fold thickness (mm)
- Insulin: 2-Hour serum insulin (mu U/ml)
- BMI: Body mass index (weight in kg/(height in m)^2)
- DiabetesPedigreeFunction: Diabetes pedigree function
- Age: Age (years)

## Deployment

This application is designed to be deployed as a Hugging Face Space. It uses Docker for containerization.

## Important Note

This model is for educational purposes only and should not be used for medical diagnosis. Always consult with a healthcare professional for medical advice. 