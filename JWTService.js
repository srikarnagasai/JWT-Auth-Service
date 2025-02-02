const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Middleware to parse JSON request bodies

// Endpoint to generate a JWT token
app.post('/get-token', (req, res) => {
    // const identity = req.body.identity;
    // const clientId = req.body.clientId;
    // const clientSecret = req.body.clientSecret;
    // const isAnonymous = req.body.isAnonymous || false;
    // const aud = req.body.aud || "https://idproxy.kore.com/authorize";

    const identity = "srikar.dathi@kore.com";
    const clientId = "cs-d5ca4503-15e0-5514-98aa-fc7591eb7d43";
    const clientSecret = "lVADkyhHIIhtuQu3bUKtBN6WVCiFccyLGvpqmH5EapU=";
    const isAnonymous = false;
    const aud = "https://idproxy.kore.com/authorize";

    const options = {
        "iat": Math.floor(Date.now() / 1000), // Issued At (current time in seconds)
        "exp": Math.floor(Date.now() / 1000) + 24 * 60 * 60, // Expires in 24 hours
        "aud": aud,
        "iss": clientId,
        "sub": identity,
        "isAnonymous": isAnonymous
    };

    // Generate the JWT token
    try {
        const token = jwt.sign(options, clientSecret);
        var x = res.send({ "jwt": token });
        console(x);
    } catch (err) {
        res.status(500).send({ error: "Error generating token", details: err.message });
    }
});

// Start the server
const PORT = 7001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
