const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const CharacterAI = require('node_characterai');
const characterAI = new CharacterAI();
const axios = require("axios");
let num = 0;

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware

const characterId = "VAAKDfYkj46tPvxzLxaR6nfZF2izmfABnn4xPzDK0nU"
// const idToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImYyOThjZDA3NTlkOGNmN2JjZTZhZWNhODExNmU4ZjYzMDlhNDQwMjAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiWWFzaCBXYWxkaWEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS0ZTbkh4ejdoajgwY0lhejZsSHNKWVJmSmdWQjdsX1Jkd3Y4WG02aUJQWnpNUj1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9jaGFyYWN0ZXItYWkiLCJhdWQiOiJjaGFyYWN0ZXItYWkiLCJhdXRoX3RpbWUiOjE3MTI4MTM1NzcsInVzZXJfaWQiOiJ4ZDNFVjQyd3E4UXJqNUhzYVJ6RkUxREhlMWcxIiwic3ViIjoieGQzRVY0MndxOFFyajVIc2FSekZFMURIZTFnMSIsImlhdCI6MTcxMjgzMDk5MSwiZXhwIjoxNzEyODM0NTkxLCJlbWFpbCI6Inl3YWxkaWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTA1OTQ2NDQ5NjM1NjA0ODY3ODIiXSwiZW1haWwiOlsieXdhbGRpYUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.CRrgSwSYl6EcfiK2Ay9HnSAsrxFXS-PxUtI0sTdPPlYg-Pg_hINF8QFtt7F2mVPbwFHxJ6Sl3I5OZMDo06oM5-s1mgMYZ1tqRT03Bo1KRQpPqmW21YMVIURIg3mGIXlH4eDQb5Nd9FeCXs_RM1FrMQd_Q7X2gJcvhsUNzhhHewkTWhvvg94ESmaVw6Y7j-jiGJXDOXqlrdIlmUNcYvtcVmLuzB0APd2ugCuBAMb8f9H_G3YjhDsUjCz-gdLGuINjRVFxwjWatkEXGT79MFnxuE7_qhF787woU-dsh6lGfkc8FkVxnoatASt0352W1tgFPHrOy0Zary5-FWqgbH4mwg";
// const acceseToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVqYmxXUlVCWERJX0dDOTJCa2N1YyJ9.eyJpc3MiOiJodHRwczovL2NoYXJhY3Rlci1haS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTA1OTQ2NDQ5NjM1NjA0ODY3ODIiLCJhdWQiOlsiaHR0cHM6Ly9hdXRoMC5jaGFyYWN0ZXIuYWkvIiwiaHR0cHM6Ly9jaGFyYWN0ZXItYWkudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcwNjAyMDMwOCwiZXhwIjoxNzA4NjEyMzA4LCJhenAiOiJkeUQzZ0UyODFNcWdJU0c3RnVJWFloTDJXRWtucVp6diIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.o60bFoxv-qGRFu8HlUBB9Yhy408d-to7HqYCoyGurRB12uS36JNnN-wwVyareE4ngjgfNTE7t3qfAQmXlOYONyW8EbaZIf65kkjIpcvgqu00oVF3XpbqCWxtzie_lmW1VFB9OMMH_pJfjg2AgSuMH4q3E8MG2KAthTYWtS3kv0-meq9K4YUTBYHmX0yo5RPE7P5ETF8f8rG3pm1ULxHEwYc-kOGJVJf0KfeyJPOdahAGSXtpcrxJdm6SkM92JkNHU17-L44xKzbI8lGUxEanvwi3bCH2VPKiNCOpAPz2Pdb6weoEX1juSLBQ0nOe1e7iAokCtD_IYtUmjvdie1fzvw";
const sessionToken = "c5fa1d28e2a187d6db91459eb7c4a81ac233c96d"
async function handleRequest(req, res) {
    try {
        const { input } = req.body;

        if (!characterAI.isAuthenticated()) {
            // await characterAI.authenticateAsGuest("VAAKDfYkj46tPvxzLxaR6nfZF2izmfABnn4xPzDK0nU");
            await characterAI.authenticateWithToken(sessionToken);
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