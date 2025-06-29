export async function POST(req) {
    try {

        const apiKey = process.env.GEMINI_API_KEY;

        // Om api Nyckeln Inte finns
        if (!apiKey) {
            return new Response(JSON.stringify({ error: 'API key not configured.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        
        // Dessa två värden skickas från vår frontend på SelectingBooks.js
        const { userPreferences, allBooks } = await req.json();

        const prompt = `Du är en expert på bokrekommendationer. Baserat på användarens preferenser, välj ut ett antal böcker från den angivna listan.
        För varje rekommenderad bok, ange dess 'id'. **Den bok som är bäst rekommenderad enligt dig ska alltid hamna först i listan.** Om inga böcker matchar perfekt, gör ditt bästa utifrån de angivna preferenserna för att hitta de mest relevanta.

        Användarens preferenser:
        ${JSON.stringify(userPreferences, null, 2)}

        Tillgängliga böcker (rekommendera endast från denna lista, inget annat):
        ${JSON.stringify(allBooks, null, 2)}

        Svara endast med en JSON-array av rekommenderade bokobjekt. Använd exakt detta format:
        [
            {
                "id": "bokens-id-här",
                "motivation": "Kort motivering varför denna bok passar preferenserna (max 200 tecken)."
            }
        ]
        `;

        // En payload gör det enkalre för oss att ta emot meddelande från AI och faktiskt använda oss utav den
        const payload = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "ARRAY",
                    items: {
                        type: "OBJECT",
                        properties: {
                            "id": { "type": "STRING" },
                            "motivation": { "type": "STRING" },
                        },
                        "propertyOrdering": ["id"] ["motivation"],
                    }
                }
            }
        };

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        // Gör Det faktikska callet till API:N
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        // Om vi inte får tillbaka ett korrekt meddelande från vår API
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Gemini API error:', errorData);
            return new Response(JSON.stringify({ error: 'Failed to get recommendations from AI.', details: errorData }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // hämtar resultatet i json format 
        const result = await response.json();

        // Kontrollera om svaret har förväntad struktur och parsas som JSON
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const jsonText = result.candidates[0].content.parts[0].text;
            const recommendedBooks = JSON.parse(jsonText);

            return new Response(JSON.stringify(recommendedBooks), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            console.error('Unexpected AI response structure:', result);
            return new Response(JSON.stringify({ error: 'AI did not return expected data format.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }

    } catch (error) {
        console.error('Error in API route:', error);
        return new Response(JSON.stringify({ error: 'Internal server error.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}