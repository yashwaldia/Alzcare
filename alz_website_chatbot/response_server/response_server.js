const readline = require('readline');
const CharacterAI = require('node_characterai');
const characterAI = new CharacterAI();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

(async () => {
  await characterAI.authenticateAsGuest();

  const characterId = "VAAKDfYkj46tPvxzLxaR6nfZF2izmfABnn4xPzDK0nU"; // Discord moderator

  const chat = await characterAI.createOrContinueChat(characterId);

  rl.question('You: ', async (input) => {
    const response = await chat.sendAndAwaitResponse(input, true);
    console.log('AI:', response.text);
    
    rl.close();
  });
})();
