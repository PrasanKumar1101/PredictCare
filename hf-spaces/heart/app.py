import os
import pickle
import numpy as np
from fastapi import FastAPI, Request, Form, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI(
    title="Heart Disease Prediction API",
    description="API for predicting heart disease using machine learning",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Mount static directory for CSS, JS, etc.
if os.path.exists("static"):
    app.mount("/static", StaticFiles(directory="static"), name="static")

# Load the model
MODEL_PATH = os.getenv("MODEL_PATH", "model/heart_model.pkl")

def load_model():
    try:
        with open(MODEL_PATH, "rb") as f:
            return pickle.load(f)
    except Exception as e:
        print(f"Error loading model: {e}")
        # If model fails to load, return dummy model that always predicts 0.5
        class DummyModel:
            def predict_proba(self, X):
                return np.array([[0.5, 0.5]] * len(X))
        return DummyModel()

model = load_model()

# Define input data model
class HeartData(BaseModel):
    age: float
    sex: int
    cp: int  # chest pain type
    trestbps: float  # resting blood pressure
    chol: float  # serum cholesterol
    fbs: int  # fasting blood sugar > 120 mg/dl
    restecg: int  # resting electrocardiographic results
    thalach: float  # maximum heart rate achieved
    exang: int  # exercise induced angina
    oldpeak: float  # ST depression induced by exercise relative to rest
    slope: int  # slope of the peak exercise ST segment
    ca: int  # number of major vessels colored by fluoroscopy
    thal: int  # thalassemia

# Setup Jinja2 templates
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """Serve the prediction form"""
    try:
        return templates.TemplateResponse("index.html", {"request": request})
    except Exception as e:
        # If templates directory doesn't exist, return simple HTML
        html_content = """
        <!DOCTYPE html>
        <html>
        <head>
            <title>Heart Disease Prediction</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5">
                <h1>Heart Disease Prediction API</h1>
                <p>This is a machine learning API for heart disease prediction.</p>
                <p>To use this API, send a POST request to <code>/predict</code> with the required parameters.</p>
                
                <h3 class="mt-4">API Documentation</h3>
                <p>Visit <a href="/docs">/docs</a> for the Swagger documentation.</p>
            </div>
        </body>
        </html>
        """
        return HTMLResponse(content=html_content)

@app.post("/predict")
async def predict(data: HeartData):
    """Endpoint to predict heart disease based on input features"""
    try:
        # Convert input data to numpy array for prediction
        input_data = np.array([
            [
                data.age, data.sex, data.cp, data.trestbps, data.chol,
                data.fbs, data.restecg, data.thalach, data.exang,
                data.oldpeak, data.slope, data.ca, data.thal
            ]
        ])
        
        # Make prediction
        prediction_proba = model.predict_proba(input_data)[0]
        probability = prediction_proba[1]  # Probability of having heart disease
        prediction = probability >= 0.5
        
        # Generate response message
        if prediction:
            message = "High risk of heart disease. Please consult with a healthcare professional."
        else:
            message = "Low risk of heart disease. Maintain a healthy lifestyle."
        
        # Return prediction results
        return {
            "has_heart_disease": bool(prediction),
            "probability": float(probability),
            "message": message
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

# For testing locally
if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=7860, reload=True) 