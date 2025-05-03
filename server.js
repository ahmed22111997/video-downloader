const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // علشان HTML يشتغل

app.post("/api/download", (req, res) => {
  const videoUrl = req.body.url;
  if (!videoUrl) {
    return res.status(400).json({ success: false, message: "رابط غير صالح" });
  }

  const command = `"./yt-dlp.exe" -g "${videoUrl}"`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(stderr);
      return res.status(500).json({ success: false, message: "فشل التحميل" });
    }

    const downloadUrl = stdout.trim();
    res.json({ success: true, downloadUrl });
  });
});

app.listen(PORT, () => {
  console.log(`الخادم يعمل على http://localhost:${PORT}`);
});
