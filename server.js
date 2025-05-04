const express = require("express");
const bodyParser = require("body-parser");
const ytdl = require("ytdl-core"); // استخدام ytdl-core لتحميل الفيديوهات
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // علشان HTML يشتغل

app.post("/api/download", async (req, res) => {
  const videoUrl = req.body.url;
  if (!videoUrl) {
    return res.status(400).json({ success: false, message: "رابط غير صالح" });
  }

  try {
    const info = await ytdl.getInfo(videoUrl);  // نحصل على معلومات الفيديو
    const downloadUrl = info.formats[0].url;     // هنا هنجيب أول رابط من الجودة المتاحة

    res.json({ success: true, downloadUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "فشل التحميل" });
  }
});

app.listen(PORT, () => {
  console.log(`الخادم يعمل على http://localhost:${PORT}`);
});
