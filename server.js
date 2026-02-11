const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const os = require('os');

const app = express();
const PORT = 3000;
const DB_DIR = path.join(__dirname, 'db');
const DB_FILE = path.join(DB_DIR, 'visits.json');

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Ensure DB exists
if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
}
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, '[]');
}

// Helper: Get IP
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
}

const nodemailer = require('nodemailer');

// ... (existing imports)

// EMAIL CONFIGURATION
// Ideally, use environment variables. For now, we need user input for credentials.
// Or use a local SMTP? Let's setup a transporter but wrap in try-catch.
const transporter = nodemailer.createTransport({
    service: 'gmail', // Standard for small businesses
    auth: {
        user: 'Boxnfly@gmail.com', // User's email from previous context
        pass: 'YOUR_APP_PASSWORD_HERE' // User needs to provide this!
    }
});

// ...

app.post('/api/checkin', async (req, res) => {
    try {
        const visit = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            ...req.body
        };

        const existing = JSON.parse(fs.readFileSync(DB_FILE));
        existing.push(visit);
        fs.writeFileSync(DB_FILE, JSON.stringify(existing, null, 2));

        console.log(`✅ [${new Date().toLocaleTimeString()}] Check-in: ${visit.name} (${visit.treatment})`);

        // SEND EMAIL
        if (visit.email && visit.email.includes('@')) {
            const mailOptions = {
                from: '"Studio Luna" <Boxnfly@gmail.com>',
                to: visit.email,
                subject: `Your Consent Form - ${visit.treatment}`,
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333;">
                        <h2 style="color: #D4AF37;">Studio Luna Body Sculpting</h2>
                        <p>Hi ${visit.name},</p>
                        <p>Thank you for checking in for your <strong>${visit.treatment}</strong> today.</p>
                        <p>Attached below is a copy of the consent form needed for your records.</p>
                        
                        <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #D4AF37; margin: 20px 0;">
                            <strong>Consent Agreement:</strong><br/>
                            <em style="font-size: 13px; color: #555;">${visit.consentText}</em>
                        </div>

                        <p>Your signature was recorded at ${new Date().toLocaleString()}.</p>
                        
                        <p style="margin-top: 30px; font-size: 12px; color: #888;">
                            Studio Luna Body Sculpting<br/>
                            (555) 123-4567 | www.studioluna.com
                        </p>
                    </div>
                `,
                attachments: [
                    {
                        filename: 'signature.png',
                        content: visit.signature.split('base64,')[1],
                        encoding: 'base64'
                    }
                ]
            };

            /* EMAIL DISABLED PENDING APP PASSWORD
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            */
            console.log("Create App Password in server.js to enable emails.");
        }

        res.json({ success: true, id: visit.id });
    } catch (e) {
        // ...
        console.error("Error saving check-in:", e);
        res.status(500).json({ error: e.message });
    }
});

// API: List Visits
app.get('/api/visits', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(DB_FILE));
        res.json(data.reverse()); // Newest first
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Start
app.listen(PORT, async () => {
    const ip = getLocalIP();
    const url = `http://${ip}:${PORT}`;

    console.log(`\n🏥 Studio Luna Body Sculpting Check-in Server`);
    console.log(`---------------------------------`);
    console.log(`💻 Dashboard: http://localhost:${PORT}/admin.html`);
    console.log(`📱 Check-in:  ${url}`);
    console.log(`---------------------------------`);
    console.log(`\nScan this QR Code to check in:\n`);

    console.log(await QRCode.toString(url, { type: 'terminal', small: true }));
});
