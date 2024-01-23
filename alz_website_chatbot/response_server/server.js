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
const idToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVqYmxXUlVCWERJX0dDOTJCa2N1YyJ9.eyJnaXZlbl9uYW1lIjoiWWFzaCIsImZhbWlseV9uYW1lIjoiV2FsZGlhIiwibmlja25hbWUiOiJ5d2FsZGlhIiwibmFtZSI6Illhc2ggV2FsZGlhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0tGU25IeHo3aGo4MGNJYXo2bEhzSllSZkpnVkI3bF9SZHd2OFhtNmlCUFp6TVI9czk2LWMiLCJsb2NhbGUiOiJlbiIsInVwZGF0ZWRfYXQiOiIyMDI0LTAxLTIzVDE0OjMxOjQzLjgzNVoiLCJlbWFpbCI6Inl3YWxkaWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vY2hhcmFjdGVyLWFpLnVzLmF1dGgwLmNvbS8iLCJhdWQiOiJkeUQzZ0UyODFNcWdJU0c3RnVJWFloTDJXRWtucVp6diIsImlhdCI6MTcwNjAyMDMwOCwiZXhwIjoxNzA5NjIwMzA4LCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMDU5NDY0NDk2MzU2MDQ4Njc4MiIsInNpZCI6IlhVT0hfVHVpd0tIb25WVGx6a1VOaFFqNF9DbWkxaG45Iiwibm9uY2UiOiJhbGsxVkVZME9YWjJkVzVwV0dWSFdGRnViV2hZWmxsWU5IUkhSWDVXUWtKdFJXWTJjek5UT1VJNU53PT0ifQ.HlUZ7TD-sBxJxy0UiHy3njD59opadACLn85TVnEVmHqWhX9dtuCBaYE12MxHv0PsAqoongZJG_6JFg7XgcEaEsqGMHHJgdxFsO5YmCFe7PovG06_6VKQAp0X2Dk7yo65X537qaMQnloTjbClTnOgZLEhDkouCVemQXJlEfAT1kzfm4_bNCAQBAjgIRA4CgkfB4WQqWv6vQiFZBidX8L-Y7UFCUAx7FfnY0dMto60JS9NYVKD420BZVLQ4R8k50IUGoOCoN58dGz0KYpK5eiHrg19LixXNa9uidRkl_M9qX3P2D99Lh_KfPFh04vmloo0c5JCoIjeyU_sIyc3GxkYyw";
const acceseToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVqYmxXUlVCWERJX0dDOTJCa2N1YyJ9.eyJpc3MiOiJodHRwczovL2NoYXJhY3Rlci1haS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTA1OTQ2NDQ5NjM1NjA0ODY3ODIiLCJhdWQiOlsiaHR0cHM6Ly9hdXRoMC5jaGFyYWN0ZXIuYWkvIiwiaHR0cHM6Ly9jaGFyYWN0ZXItYWkudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcwNjAyMDMwOCwiZXhwIjoxNzA4NjEyMzA4LCJhenAiOiJkeUQzZ0UyODFNcWdJU0c3RnVJWFloTDJXRWtucVp6diIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.o60bFoxv-qGRFu8HlUBB9Yhy408d-to7HqYCoyGurRB12uS36JNnN-wwVyareE4ngjgfNTE7t3qfAQmXlOYONyW8EbaZIf65kkjIpcvgqu00oVF3XpbqCWxtzie_lmW1VFB9OMMH_pJfjg2AgSuMH4q3E8MG2KAthTYWtS3kv0-meq9K4YUTBYHmX0yo5RPE7P5ETF8f8rG3pm1ULxHEwYc-kOGJVJf0KfeyJPOdahAGSXtpcrxJdm6SkM92JkNHU17-L44xKzbI8lGUxEanvwi3bCH2VPKiNCOpAPz2Pdb6weoEX1juSLBQ0nOe1e7iAokCtD_IYtUmjvdie1fzvw";
async function handleRequest(req, res) {
    try {
        const { input } = req.body;

        if (!characterAI.isAuthenticated()) {
            // await characterAI.authenticateAsGuest("VAAKDfYkj46tPvxzLxaR6nfZF2izmfABnn4xPzDK0nU");
            await characterAI.authenticateWithToken(acceseToken,idToken);
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