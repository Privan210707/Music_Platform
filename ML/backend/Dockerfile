FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY Requirements.txt .

RUN pip install --no-cache-dir -r Requirements.txt

COPY . .

# Generate ML model files during image build
RUN python train_model.py

EXPOSE 8001

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
