import os
import pickle
import numpy as np
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI(
    title="Diabetes Prediction API",
    description="API for predicting diabetes risk using machine learning",
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
MODEL_PATH = os.getenv("MODEL_PATH", "model/diabetes_model.pkl")

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
class DiabetesData(BaseModel):
    pregnancies: float
    glucose: float
    bloodPressure: float
    skinThickness: float
    insulin: float
    bmi: float
    diabetesPedigree: float
    age: float

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
            <title>Diabetes Prediction</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5">
                <h1>Diabetes Prediction API</h1>
                <p>This is a machine learning API for diabetes prediction.</p>
                <p>To use this API, send a POST request to <code>/predict</code> with the required parameters.</p>
                
                <h3 class="mt-4">API Documentation</h3>
                <p>Visit <a href="/docs">/docs</a> for the Swagger documentation.</p>
            </div>
        </body>
        </html>
        """
        return HTMLResponse(content=html_content)

@app.post("/predict")
async def predict(data: DiabetesData):
    """Endpoint to predict diabetes risk based on input features"""
    try:
        # Convert input data to numpy array for prediction
        input_data = np.array([
            [
                data.pregnancies, data.glucose, data.bloodPressure,
                data.skinThickness, data.insulin, data.bmi,
                data.diabetesPedigree, data.age
            ]
        ])
        
        # Make prediction
        prediction_proba = model.predict_proba(input_data)[0]
        probability = prediction_proba[1]  # Probability of having diabetes
        prediction = probability >= 0.5
        
        # Generate response message
        if prediction:
            message = "High risk of diabetes. Please consult with a healthcare professional."
        else:
            message = "Low risk of diabetes. Maintain a healthy lifestyle."
        
        # Return prediction results
        return {
            "has_diabetes": bool(prediction),
            "probability": float(probability),
            "message": message
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

# For testing locally
if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=7860, reload=True) 