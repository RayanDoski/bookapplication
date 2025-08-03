# recommendation_bp.py
import os
import json
import google.generativeai as genai
from flask import Blueprint, request, jsonify

# Create a Blueprint instance
gemini = Blueprint('gemini', __name__)

# The configuration line is moved into the function to ensure it runs
# after load_dotenv() is called from app.py.


@gemini.route('/api/recommend-books', methods=['POST'])
def recommend_books():
    """
    A Flask endpoint to get book recommendations from the Gemini API.
    """
    try:
        api_key = os.getenv('GEMINI_API_KEY')

        if not api_key:
            return jsonify({"error": "API key not configured."}), 500
        
        # Configure the Gemini API client here, inside the function
        # This ensures the API key is retrieved after load_dotenv() has run.
        try:
            genai.configure(api_key=api_key)
        except ValueError as e:
            print(f"Error configuring Gemini API: {e}")
            return jsonify({"error": "Failed to configure Gemini API.", "details": str(e)}), 500

        data = request.get_json()
        if not data or 'userPreferences' not in data or 'allBooks' not in data:
            return jsonify({"error": "Invalid request body. 'userPreferences' and 'allBooks' are required."}), 400

        user_preferences = data.get('userPreferences')
        all_books = data.get('allBooks')

        prompt = f"""Du är en expert på bokrekommendationer. Baserat på användarens preferenser, välj ut ett antal böcker från den angivna listan.
        För varje rekommenderad bok, ange dess 'id'. **Den bok som är bäst rekommenderad enligt dig ska alltid hamna först i listan.** Om inga böcker matchar perfekt, gör ditt bästa utifrån de angivna preferenserna för att hitta de mest relevanta.

        Användarens preferenser:
        {json.dumps(user_preferences, indent=2)}

        Tillgängliga böcker (rekommendera endast från denna lista, inget annat):
        {json.dumps(all_books, indent=2)}

        Svara endast med en JSON-array av rekommenderade bokobjekt. Använd exakt detta format:
        [
            {{
                "id": "bokens-id-här",
                "motivation": "Kort motivering varför denna bok passar preferenserna (max 200 tecken)."
            }}
        ]
        """
        
        generation_config = genai.GenerationConfig(
            response_mime_type="application/json",
            response_schema={
                "type": "ARRAY",
                "items": {
                    "type": "OBJECT",
                    "properties": {
                        "id": {"type": "STRING"},
                        "motivation": {"type": "STRING"},
                    },
                    "required": ["id", "motivation"]
                }
            }
        )

        model = genai.GenerativeModel('gemini-2.0-flash')

        try:
            response = model.generate_content(
                contents=[{'role': 'user', 'parts': [{'text': prompt}]}],
                generation_config=generation_config
            )
        except genai.types.StopCandidateException as e:
            print(f"Model generation stopped early: {e}")
            return jsonify({"error": "AI response was incomplete."}), 500
        except Exception as e:
            print(f"Gemini API error: {e}")
            return jsonify({"error": "Failed to get recommendations from AI.", "details": str(e)}), 500

        json_text = response.text
        
        try:
            recommended_books = json.loads(json_text)
            return jsonify(recommended_books), 200
        except json.JSONDecodeError as e:
            print(f"Failed to parse AI's JSON response: {json_text}. Error: {e}")
            return jsonify({"error": "AI returned malformed JSON.", "raw_response": json_text}), 500

    except Exception as e:
        print(f'Internal server error in API route: {e}')
        return jsonify({"error": "Internal server error."}), 500