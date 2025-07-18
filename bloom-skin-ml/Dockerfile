# Use a full Debian image for TensorFlow compatibility
FROM python:3.10

# Set working directory
WORKDIR /app

# Install system dependencies for OpenCV and other requirements
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install them
COPY requirements.txt .

RUN pip install --upgrade pip

# Install TensorFlow separately to ensure compatibility
RUN pip install tensorflow

# Install remaining requirements
RUN pip install -r requirements.txt

# Copy the rest of your app
COPY . .

# Set environment variable for Flask port
ENV PORT=5000

# Expose port for Render
EXPOSE 5000

# Run the app
CMD ["python", "app.py"]
