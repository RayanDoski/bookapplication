# app.py
import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from gemini import gemini

# Load environment variables from .env file
load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for the entire app

    # Register the blueprint
    app.register_blueprint(gemini)

    @app.route('/')
    def index():
        return "Book Recommendation API is running!"

    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 5001))
    app.run(debug=True, host='0.0.0.0', port=port)