document.getElementById("download-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const url = document.getElementById("video-url").value;
    const resultDiv = document.getElementById("result");
  
    if (!url) {
      resultDiv.innerHTML = "من فضلك أدخل رابط صالح.";
      return;
    }
  
    resultDiv.innerHTML = "جاري التحميل...";
  
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
  
      const data = await res.json();
  
      if (data.success) {
        resultDiv.innerHTML = `
          <a href="${data.downloadUrl}" target="_blank">تحميل الفيديو 🎬</a>
        `;
      } else {
        resultDiv.innerHTML = "الرابط غير صالح أو غير مدعوم.";
      }
    } catch (error) {
      resultDiv.innerHTML = "حدث خطأ أثناء الاتصال بالخادم.";
    }
  });
  