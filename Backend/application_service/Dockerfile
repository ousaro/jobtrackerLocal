# Stage 1: Build dependencies
FROM python:3.11-slim AS builder

WORKDIR /app

COPY requirements.txt .

# Install dependencies into a user-writable directory (will later match appuser's home)
RUN useradd -m appuser 
RUN pip install --upgrade pip && pip install --prefix=/home/appuser/.local -r requirements.txt

# Stage 2: Final runtime image
FROM python:3.11-slim AS runtime

WORKDIR /app

# Create a non-root user
RUN useradd -m appuser

# Copy installed Python packages from builder to the correct location for appuser
COPY --from=builder /home/appuser/.local /home/appuser/.local

# Copy application code and give permissions to the non-root user
COPY . .
RUN chown -R appuser:appuser /app

# Set environment variables for best practices
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PATH=/home/appuser/.local/bin:$PATH

# Make sure we run as non-root user
USER appuser

# Expose the port the app runs on
EXPOSE 5002

# Start the Django app
CMD ["python", "manage.py", "runserver", "0.0.0.0:5002"]
