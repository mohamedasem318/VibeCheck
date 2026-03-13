FROM python:3.10-slim

# HuggingFace Spaces requires non-root user with UID 1000
RUN useradd -m -u 1000 user
WORKDIR /home/user/app

# Install dependencies first (layer caching)
COPY --chown=user requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY --chown=user app.py .

# Copy model files (large layer — copy last to keep build cache useful)
COPY --chown=user saved_models/ ./saved_models/

USER user

EXPOSE 7860

ENV MODEL_DIR=./saved_models/mentalbert_v3flat
ENV TOKENIZER_DIR=./saved_models/mentalbert_v3flat/tokenizer

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
