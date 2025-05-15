# Hugging Face Spaces Health Prediction Models - Context

This document provides key information about the three Hugging Face Spaces health prediction models for use in future conversations.

## Project Overview

- Project consists of three separate FastAPI applications for deploying ML health prediction models to Hugging Face Spaces
- Models predict: heart disease, diabetes, and kidney disease
- Each model is configured to be deployed as a separate Hugging Face Space
- Target deployment URLs:
  - Heart: https://huggingface.co/spaces/prasan1101/ml-heart
  - Diabetes: https://huggingface.co/spaces/prasan1101/ml-diabetes
  - Kidney: https://huggingface.co/spaces/prasan1101/ml-kidney

## Technical Details

### Stack
- FastAPI for REST API
- Python 3.9
- scikit-learn for ML models
- Docker for containerization
- Jinja2 templates for web interface

### Common Structure (for each model)
- `app.py`: Main FastAPI application with endpoints and model loading logic
- `Dockerfile`: Configuration for Docker container
- `requirements.txt`: Python dependencies
- `.dockerignore`: Files excluded from Docker
- `README.md`: Documentation for the specific model
- `model/`: Directory containing the ML model (pickle file)
- `templates/`: Directory for HTML templates
- `static/`: Directory for static assets (CSS, JS, images)

### Key Functions
- Model loading with fallback to dummy model if real model fails to load
- Data validation using Pydantic models
- Prediction endpoint with probability scores and risk messages
- Simple web interface accessible at root URL
- Swagger documentation at `/docs` endpoint
- Support for both JSON API and HTML form submission

### Model-Specific Input Parameters

**Heart Disease Model**
- age: float
- sex: int (1 = male, 0 = female)
- cp: int (chest pain type, 0-3)
- trestbps: float (resting blood pressure in mm Hg)
- chol: float (serum cholesterol in mg/dl)
- fbs: int (fasting blood sugar > 120 mg/dl, 1 = true, 0 = false)
- restecg: int (resting ECG results, 0-2)
- thalach: float (maximum heart rate achieved)
- exang: int (exercise induced angina, 1 = yes, 0 = no)
- oldpeak: float (ST depression induced by exercise)
- slope: int (slope of peak exercise ST segment, 0-2)
- ca: int (number of major vessels colored by fluoroscopy, 0-4)
- thal: int (thalassemia, 0-2)

**Diabetes Model**
- pregnancies: float
- glucose: float
- bloodPressure: float
- skinThickness: float
- insulin: float
- bmi: float
- diabetesPedigree: float
- age: float

**Kidney Disease Model**
- age: float
- bloodPressure: float
- specificGravity: float
- albumin: float
- sugar: float
- redBloodCells: str ('normal' or 'abnormal')
- pus: float
- pusCellClumps: str ('present' or 'notpresent')
- bacteria: str ('present' or 'notpresent')
- bloodGlucose: float
- bloodUrea: float
- serumCreatinine: float
- sodium: float
- potassium: float
- hemoglobin: float
- packedCellVolume: float
- whiteBloodCellCount: float
- redBloodCellCount: float
- hypertension: str ('yes' or 'no')
- diabetesMellitus: str ('yes' or 'no')
- coronaryArteryDisease: str ('yes' or 'no')
- appetite: str ('good' or 'poor')
- pedalEdema: str ('yes' or 'no')
- anemia: str ('yes' or 'no')

## Deployment Process

1. Create new Space on Hugging Face with Docker SDK
2. Upload files from corresponding directory to the Space
3. Add trained model file to the `model/` directory
4. Optionally customize HTML interface in `templates/` directory
5. Let Hugging Face build and deploy the Docker container

## Important Notes

- Models are for educational purposes only
- No actual models are included - users need to provide their own trained models
- FastAPI supports real-time API documentation via Swagger UI
- Docker container is configured to run on port 7860 (Hugging Face Spaces default)
- Application has fallback HTML if templates are not provided 