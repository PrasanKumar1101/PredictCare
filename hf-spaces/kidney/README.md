---
title: Kidney Disease Prediction Model
emoji: 🫘
colorFrom: green
colorTo: teal
sdk: docker
sdk_version: "3.9"
app_file: app.py
pinned: false
---

Check out the configuration reference at https://huggingface.co/docs/hub/spaces-config-reference

# Kidney Disease Prediction Model

This FastAPI application provides a REST API and web interface for predicting chronic kidney disease based on medical data.

## API Endpoints

### Prediction Endpoint

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

A simple web interface is available at the root URL. This interface allows users to input their medical data and receive predictions without needing to make API calls directly.

## Model Information

The kidney disease prediction model was trained on the Chronic Kidney Disease dataset from the UCI Machine Learning Repository. It uses various medical features including:

- Age
- Blood pressure
- Specific gravity of urine
- Albumin levels
- Sugar levels
- Red blood cell condition
- Presence of pus cells and bacteria
- Blood glucose, urea, and creatinine levels
- Electrolyte levels (sodium, potassium)
- Blood cell counts
- Presence of other conditions (hypertension, diabetes)

## Deployment

This application is designed to be deployed as a Hugging Face Space. It uses Docker for containerization.

## Important Note

This model is for educational purposes only and should not be used for medical diagnosis. Always consult with a healthcare professional for medical advice. 