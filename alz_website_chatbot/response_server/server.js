const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const CharacterAI = require('node_characterai');
const characterAI = new CharacterAI();
const axios = require("axios");
let num = 0;

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware

const characterId = "VAAKDfYkj46tPvxzLxaR6nfZF2izmfABnn4xPzDK0nU"
const acceseToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVqYmxXUlVCWERJX0dDOTJCa2N1YyJ9.eyJpc3MiOiJodHRwczovL2NoYXJhY3Rlci1haS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTA1OTQ2NDQ5NjM1NjA0ODY3ODIiLCJhdWQiOlsiaHR0cHM6Ly9hdXRoMC5jaGFyYWN0ZXIuYWkvIiwiaHR0cHM6Ly9jaGFyYWN0ZXItYWkudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY5NjE4MTE3NSwiZXhwIjoxNjk4NzczMTc1LCJhenAiOiJkeUQzZ0UyODFNcWdJU0c3RnVJWFloTDJXRWtucVp6diIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.mCHxl1BwfcaJnkEGC_Za7bCwl_KV21Sd0Pn8ihpcRMjZmwUNAGJFC8ZbOcnotORI49GuKF7JqKTuXLNwjqkXZNJkfM7jMws5mhWyIUo0CbHm5qvQBmQlr704BK76mK36jD9ZbB0_xkFQ3Q_uPlWpP55h__AAkmdM3FXwqhIAZWdQ3iVyrkwZKO-69-zEmWuFszxI9QgNCh0hac6edIOwfyewM3487SOGqE0BvIlTzowxpVCl7FsDSts5AVsq5mcGZCX7JEP0zpKWUUW4dRDTgppySWkcnzhekKkMNth3WupGQG7Ubw52pt4CsAKZRC6pS36UoybHU2ShL5PrlAlqgg";
async function handleRequest(req, res) {
    try {
        const { input } = req.body;

        if (!characterAI.isAuthenticated()) {
            // await characterAI.authenticateAsGuest("VAAKDfYkj46tPvxzLxaR6nfZF2izmfABnn4xPzDK0nU");
            await characterAI.authenticateWithToken(acceseToken);
        }

        const chat = await characterAI.createOrContinueChat(characterId);

        const response = await chat.sendAndAwaitResponse(input, true);
        res.json({ aiResponse: response.text });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

app.post('/', handleRequest);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});