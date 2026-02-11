# 🚀 How to Deploy Your Check-in App

You have built a local Node.js app. Here are your deployment options:

## Option 1: Run it Locally (Easiest)
Since this is for check-ins inside your spa, you might not "need" it on the public internet.

1.  **Keep the Server Running**: Just keep the black `start_checkin.bat` window open on your reception computer.
2.  **Connect Devices**: Connect your iPad or clients' phones to the **SAME WiFi network**.
3.  **Scan QR Code**: Scan the QR code shown in the server window.
    *   It will open `http://YOUR-PC-IP:3000`.

**Pros**: Free, Fast, Secure (local only).
**Cons**: Requires WiFi connection. Computer must stay on.

---

## Option 2: Use ngrok (Public Access)
If you want clients to access it via 4G/5G or from home.

1.  Download `ngrok`.
2.  Run: `ngrok http 3000`
3.  Share the URL (e.g., `https://random-name.ngrok-free.app`).

**Pros**: Accessible from anywhere.
**Cons**: URL changes every time you restart ngrok (unless you pay).

---

## Option 3: Deploy to Cloud (Professional)
To have a permanent URL like `checkin.studioluna.com`.

### Recommended Host: Render.com (Free Tier)
1.  **GitHub**: Upload this code to a GitHub repository.
2.  **Render**: create a new "Web Service".
3.  **Connect**: Link your GitHub repo.
4.  **Build Command**: `npm install`
5.  **Start Command**: `node server.js`

**Pros**: Professional, always on, custom domain.
**Cons**: Data (visits.json) will be **lost on restart** because free tier servers don't keep files. You would need a real database (MongoDB) for this option.

---

### 💡 My Recommendation
Stick with **Option 1 (Local)** for now. It's robust enough for a front desk.

If you need a permanent cloud solution later, we can upgrade the code to use a database like MongoDB Atlas so you don't lose data.
