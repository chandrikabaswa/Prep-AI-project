require("dotenv").config();

const axios = require("axios");

async function test() {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
      {
        contents: [
          {
            parts: [
              {
                text: "Say hello",
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );

    console.log(response.data);
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
}

test();