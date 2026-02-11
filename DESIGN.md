# 🏥 MedSpa Check-in App - Design Doc

## 1. The Goal
A premium, seamless check-in experience for MedSpa clients.
*   **Client Side**: Clients scan a QR code -> Open a beautiful mobile web page -> Enter details -> Sign consent form.
*   **Admin Side**: Admin sees a live dashboard of who checked in, their treatment, and signed forms.

## 2. User Experience (UX) 💎
*   **Aesthetic**: "Clean, Medical, Luxury". White, Gold, Soft Grey.
*   **Flow**:
    1.  **Welcome**: "Welcome to BeBest MedSpa".
    2.  **Info**: Name, Phone, Email.
    3.  **Treatment Selection**: Dropdown or buttons (Botox, Filler, Facial, etc).
    4.  **Consent**: Scrollable legal text.
    5.  **Signature**: Digital signature pad (touch screen).
    6.  **Success**: "Please take a seat, your provider will be with you shortly."

## 3. Technical Architecture 🏗️
*   **Frontend**: HTML5 + Vanilla JS + TailwindCSS (via CDN for speed/simplicity).
*   **Signature**: `signature_pad` library (lightweight JS).
*   **Backend**: Node.js (Express).
*   **Database**: `db/visits.json` (Simple JSON store).
*   **Admin Dashboard**: `/admin` page (Password protected).

## 4. Data Structure (`visits.json`)
```json
[
  {
    "id": "uuid-123",
    "timestamp": "2026-02-10T21:55:00Z",
    "name": "Jane Doe",
    "phone": "+15551234567",
    "email": "jane@example.com",
    "treatment": "Botox",
    "signature": "data:image/png;base64,..."
  }
]
```

## 5. Implementation Steps
1.  **Setup Server**: `server.js` (Express app).
2.  **Build Client App**: `public/index.html` (Mobile first).
3.  **Build Admin Dash**: `public/admin.html`.
4.  **Generate QR**: Create a QR code pointing to the local network IP (or ngrok URL).

## 6. Future Expansion 🚀
*   Auto-sends a "Thank you" WhatsApp message via **Clawbot** 5 minutes after check-in.
*   Saves contact to `leads.json` for the **Sales Outreach Agent**.
