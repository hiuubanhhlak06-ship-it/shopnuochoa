const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API test
app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello from server API 🚀"
  });
});

// API POST
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "123") {
    res.json({ success: true, message: "Đăng nhập thành công" });
  } else {
    res.status(401).json({ success: false, message: "Sai tài khoản hoặc mật khẩu" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
