/** @format */

const express = require("express");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;
const app = express();

function verifyToken(req, res, next) {
  // Get the auth header value
  const bearerHeader = req.headers["authorization"];
  // console.log(bearerHeader);
  // checking barerHearder is definced or not
  if (typeof bearerHeader !== "undefined") {
    // spilt the token
    const bearer = bearerHeader.split(" ");
    // console.log(bearer);
    const bearerToken = bearer[1];
    req.token = bearerToken;
    // call next function

    // console.log(req.token);
    next();
  } else {
    res.sendStatus(403);
  }
}

app.get("/", async (req, res) => {
  res.json({
    message: "wellcome to api",
  });
});

app.post("/api/posts", verifyToken, async (req, res) => {
  console.log(req.token);
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "post working",
        authData,
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  // mock user
  const user = {
    id: 1,
    email: "ssonawane511@gmail.com",
    username: "sagar",
  };
  jwt.sign({ user }, "secretKey", (err, token) => {
    res.json({
      token,
    });
  });
});

// format of token is
// Authorization : bearer < access_token >

app.listen(port, () => {
  console.log(`server stated at port ${port}`);
});
