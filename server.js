const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const cors = require("cors");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // استخدم البورت المناسب لبيئة التشغيل

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // علشان HTML يشتغل

// المسار للصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // تأكد من وجود index.html في المجلد الصحيح
});

// المسار لتحميل الفيديو
app.post("/api/download", (req, res) => {
  const videoUrl = req.body.url;
  if (!videoUrl) {
    return res.status(400).json({ success: false, message: "رابط غير صالح" });
  }

  const command = `"./yt-dlp.exe" -g "${videoUrl}"`; // تأكد من أنك تستخدم المسار الصحيح لبرنامج yt-dlp
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(stderr);
      return res.status(500).json({ success: false, message: "فشل التحميل" });
    }

    const downloadUrl = stdout.trim();
    res.json({ success: true, downloadUrl });
  });
});

// استماع على البورت
app.listen(PORT, () => {
  console.log(`الخادم يعمل على http://localhost:${PORT}`);
});
