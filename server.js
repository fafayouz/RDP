const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const rdp = require("node-rdp");

// تعريف قائمة السيرفرات
const servers = [
  { name: "Server 1", ipAddress: "45.32.73.247" },
  { name: "Server 2", ipAddress: "192.168.1.101" },
  { name: "Server 3", ipAddress: "192.168.1.102" },
];

// مسار واجهة المستخدم
app.use(express.static("public"));

// اتصال العميل
io.on("connection", (socket) => {
  console.log("Client connected");

  // إرسال قائمة السيرفرات إلى العميل
  socket.emit("servers", servers);

  // استقبال أمر فتح الرابط
  socket.on("openLink", (link) => {
    console.log("Opening link:", link);

    // قم بإرسال الأمر إلى السيرفر هنا (استخدم مكتبة node-rdp)
    const rdpOptions = {
      address: "45.32.73.247", // استبدله بعنوان ومنفذ الخادم الخاص بك
      username: "Administrator", // استبدله بمعرف المستخدم الصحيح
      password: "}hJ2$HK4?H,uC+!w", // استبدله بكلمة المرور الصحيحة
    };

    rdp(rdpOptions)
      .then(() => {
        console.log("Connection terminated.");
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  });

  // افصل العميل
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// استمع إلى المنفذ 3000
server.listen(4000, () => {
  console.log("Server is running on port 3000");
});
