FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Create necessary directories
RUN mkdir -p model templates static

# Set environment variables
ENV PORT=7860
ENV HOST=0.0.0.0

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"] 