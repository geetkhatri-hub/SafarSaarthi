# 🛡️ SafarSaarthi
### On-the-Spot Tourism & Transit Trust Protocol — Smart India Hackathon 2026

> Turning uncertain, street-level tourist interactions into verified, transparent, and safer experiences.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](#-license)
[![SIH 2026](https://img.shields.io/badge/SIH-2026-orange)](#-sih-2026-submission)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-green)](#requirements)

---

## 📑 Table of Contents

- [About](#-about)
- [Problem Statement](#-problem-statement)
- [Our Solution](#-our-solution)
- [How It Works](#-how-it-works)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment & Configuration](#-environment--configuration)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Data Sources](#-data-sources)
- [Security Notes](#-security-notes)
- [Roadmap](#-roadmap)
- [Challenges & Mitigations](#-challenges--mitigations)
- [Impact](#-impact)
- [SIH 2026 Submission](#-sih-2026-submission)
- [License](#-license)

---

## 🚀 About

**SafarSaarthi** is a real-time tourism safety and trust platform built for **Smart India Hackathon 2026**. It targets the moment travelers interact with unknown drivers, guides, hotels, and local vendors **on the spot — without advance booking** — and gives them verification, fair-price context, local risk awareness, and evidence tools, all in one place.

> **Verify who you meet. Know what you should pay. Understand the local risk. Stay somewhere safe. Create proof if something goes wrong.**

The prototype ships as a responsive, mobile-first web app with a **Passenger Mode** and a **Driver/Guide Mode**, backed by Firebase/Supabase and a real 106-hotel Vadodara safety dataset.

---

## 🎯 Problem Statement

Tourists routinely face uncertainty during spontaneous, unbooked interactions:

- ❌ Unknown driver / guide identity and legitimacy
- ❌ Unclear or inflated fares
- ❌ Tourist-targeted scams and touts near stations, landmarks, and hotels
- ❌ No reliable way to judge whether a hotel or its surrounding area is safe
- ❌ Lack of authentic, tamper-proof reviews
- ❌ Difficulty documenting disputes or incidents
- ❌ Limited support in an actual emergency

SafarSaarthi unifies **identity verification, fair-pricing intelligence, location-aware risk context, encounter records, and instant SOS evidence** into a single, intuitive platform.

---

## 💡 Our Solution

| # | Module | What it does |
|---|--------|---------------|
| 1 | 🔐 **Digital Handshake** | GPS-linked, short-lived rotating QR verification that turns an anonymous ride/guide interaction into a verified, timestamped encounter (identity + vehicle/license info + GPS proximity + timestamp). |
| 2 | 💰 **Route Fare Intelligence / Price Pulse** | Shows fair-price benchmarks for a route using recent passenger-paid data, so travelers can spot inflated quotes before accepting. |
| 3 | 📷 **Price Camera** | In-browser OCR (Tesseract.js) that reads a quoted price off a photo and checks it against the live fair-price bracket, with a negotiation coach. |
| 4 | 📍 **Scam Hotspot Radar** | An interactive map plus a full places directory that flags tout zones, fake-guide spots, overcharging hotspots, and ticket scams, with proactive geofence alerts. |
| 5 | 🏨 **Check My Stay — Hotel & Area Safety** | Lets a tourist search a real hotel from the verified **Vadodara Hotel Safety Dataset (106 properties)** and see the surrounding area's amenities, distances, and safety-relevant context — never a fabricated "safe/unsafe" label. |
| 6 | 🧾 **Proof-of-Presence Ledger / Digital Footprint** | Links reviews to a verified physical encounter (passenger → driver/guide → GPS → timestamp → verification token → ledger record) instead of anonymous ratings, and keeps a trip-by-trip digital footprint. |
| 7 | 🆘 **SOS & Tourist-Police Evidence Dossier** | One-tap bundle of GPS, timestamp, scanned license/vehicle info, quoted vs. actual price, and photo evidence — built for reporting to Tourist Police (1363 / 112) — plus a delayed-trip safety check-in flow. |
| 8 | 🚕 **Driver / Guide Mode** | Lets verified drivers/guides register, add vehicle/license details, and generate rotating QR codes for passengers to scan and complete the handshake. |

---

## 🧠 How It Works

```text
        TOURIST ARRIVES
              ↓
        Select Route
              ↓
     Check Fare Intelligence
              ↓
       Scan Driver/Guide QR
              ↓
  Verify Identity + Proximity
              ↓
      DIGITAL HANDSHAKE
              ↓
         Ride / Service
              ↓
      Review + Ledger Entry
              ↓
       SOS IF REQUIRED
```

**Passenger flow:** Open app → GPS/location → Route selection → Fare benchmark → Driver/guide verification → Verified encounter → Trip/service → Digital footprint entry → Review.

**Driver / Guide flow:** Register profile → Add vehicle/license details → Generate rotating QR → Passenger scans QR → Identity/proximity check → Verified encounter → Trust ledger.

**Traditional platforms:** `BOOK → TRAVEL → REVIEW`
**SafarSaarthi:** `MEET → VERIFY → CHECK PRICE → STAY SAFE → TRAVEL → PROVE`

---

## 🛠️ Tech Stack

**Frontend**
- HTML5, CSS3 (custom design system in `css/`)
- Vanilla JavaScript (ES Modules) — no framework, no build step

**Client-side libraries**
- Leaflet / Google Maps JavaScript API (Scam Hotspot Radar & map views)
- QRCode.js / html5-qrcode (Digital Handshake QR generation & scanning)
- Tesseract.js (Price Camera OCR)
- Canvas Confetti (UI feedback)

**Backend & Data**
- Node.js (zero-dependency built-in `http` dev server — `server.js`)
- Firebase Hosting + Cloud Firestore + Firestore Security Rules (`firebase.json`, `firestore.rules`)
- Supabase (auth / client, `js/supabaseClient.js`)
- Vercel serverless function for AI-assisted photo review (`api/analyze-hotel-photo.js`)

**Data**
- `Vadodara_Hotel_Safety_Dataset_106.xlsx` — verified, real hotel records (source of truth for `data/vadodaraHotels.js`)
- `data/seedData.js` — tourism knowledge base (routes, fare benchmarks, hotspots) covering Vadodara and other seeded cities

---

## 📁 Project Structure

```text
SafarSaarthi/
│
├── index.html                      # App shell / entry point
├── server.js                       # Zero-dependency local dev server
├── package.json
├── firebase.json                   # Firebase Hosting + Firestore config
├── firestore.rules                 # Firestore security rules
├── .firebaserc                     # Firebase project alias
├── vercel.json                     # Vercel deployment config
├── START_SAFARSAARTHI.bat          # One-click local server launcher (Windows)
│
├── css/
│   ├── main.css                    # Core design system (colors, layout, typography)
│   ├── components.css              # Reusable UI components
│   └── responsive.css              # Breakpoints for mobile, tablet, and desktop
│
├── js/
│   ├── app.js                      # Main application controller & view router
│   ├── store.js                    # Reactive state store & data repository
│   ├── authManager.js              # Passenger/Driver onboarding & auth
│   ├── firebase-config.js          # Firestore config + local-storage fallback engine
│   ├── supabaseClient.js           # Supabase client
│   ├── handshake.js                # Digital Handshake (QR + GPS verification)
│   ├── pricePulse.js               # Live fare ticker & fair-price brackets
│   ├── priceCamera.js              # OCR-based price check + negotiation coach
│   ├── hotspots.js                 # Scam Hotspot Radar (map + places directory)
│   ├── hotelSafety.js              # "Check My Stay" hotel & surrounding-area safety
│   ├── transitSafety.js            # Route fare intelligence & digital footprint
│   ├── reviews.js                  # Proof-of-presence reviews / guide ledger
│   ├── evidencePacket.js           # One-tap SOS / evidence dossier generator
│   └── demoSimulator.js            # Fast demo/testing suite for live judging
│
├── data/
│   ├── vadodaraHotels.js           # Generated from the 106-hotel dataset (do not hand-edit)
│   └── seedData.js                 # Multi-city tourism knowledge base & benchmarks
│
├── api/
│   └── analyze-hotel-photo.js      # Vercel serverless: server-side AI photo review
│
├── Vadodara_Hotel_Safety_Dataset_106.xlsx   # Source dataset (106 verified hotels)
├── logo.jpeg / chat_box.jpeg / rickshow.png # Brand & UI assets
└── README.md
```

---

## ▶️ Getting Started

### Requirements
- **Node.js** v16 or newer (v18+ recommended)
- A modern browser (Chrome/Edge/Firefox) with camera + geolocation permissions for full functionality

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/safarsaarthi.git
cd safarsaarthi
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the local server

**Windows (quick start):** double-click **`START_SAFARSAARTHI.bat`**

**Manual start (any OS):**
```bash
npm start
```

### 4. Open the app

```text
http://localhost:3000
```

---

## ⚙️ Environment & Configuration

| Variable | Where used | Purpose |
|---|---|---|
| `OPENAI_API_KEY` | `server.js` / `api/analyze-hotel-photo.js` | Server-side key for the AI hotel/area photo review. Never exposed to the browser. |
| Vision model override | Same as above | Optional environment variable to override the default vision model (`gpt-4.1-mini`) used for photo review — see the top of `server.js` for the exact variable name used in this codebase. |

Set these as environment variables (or Vercel/Firebase project secrets) before deploying. If unset, the **Check My Stay → Add Photo** flow will honestly report that AI review isn't configured and will **not** mark a photo as approved evidence.

Firebase and Supabase connection details live in `js/firebase-config.js` and `js/supabaseClient.js`. The app degrades gracefully to a local, in-browser reactive storage mode if Firebase credentials aren't supplied.

> **Note:** Before deploying under this project's own name, double-check `.firebaserc` for the Firebase project alias and rename it to your own Firebase project ID if you've created a new one.

---

## 📜 Available Scripts

```bash
npm start              # Run the local dev server (server.js) on :3000
npm run dev            # Same as npm start
npm run deploy         # Deploy hosting + Firestore rules to Firebase
npm run deploy:hosting # Deploy only Firebase Hosting
npm run deploy:firestore # Deploy only Firestore security rules
```

---

## ☁️ Deployment

- **Firebase Hosting** — configured via `firebase.json` / `.firebaserc`. Serves the static app with a single-page rewrite to `index.html` and cache headers on static assets.
- **Vercel** — configured via `vercel.json` (static output, plus the `/api/analyze-hotel-photo` serverless function).
- **Live demo:** _add your deployed URL here once published._

---

## 🗃️ Data Sources

- **Vadodara Hotel Safety Dataset (106 hotels)** — the primary, verified source for hotel search, results, details, and map placement in Passenger Mode → Check My Stay. Coordinate quality is preserved and surfaced honestly: only a small subset of records have exact GPS pins, the rest use approximate locality centroids, and this is labeled in the UI rather than hidden.
- **Seed data** (`data/seedData.js`) — tourism locations, transit routes, fare benchmarks, recent passenger-paid examples, verified guides, and scam hotspots.

No hotel, rating, safety score, distance, or coordinate is fabricated — where verified data isn't available, the UI says so instead of inventing a value.

---

## 🔒 Security Notes

- AI photo review runs **server-side only**; API keys are never sent to or stored in the browser.
- Digital Handshake combines **QR token + GPS proximity + timestamp** to reduce spoofing/replay risk from a single leaked signal.
- Firestore access is governed by `firestore.rules` rather than open read/write.
- This is a **hackathon prototype**, not a production-hardened system — see [Roadmap](#-roadmap) for what a production build would add.

---

## 🔮 Roadmap

- Secure backend synchronization & production-grade authentication
- Live government / RTO driver-guide verification integration
- Real-time data pipelines beyond the current seed/dataset model
- Stronger privacy controls and minimal-data-collection defaults
- Scalable cloud infrastructure for multi-city rollout
- AI-assisted scam detection, fare-anomaly detection, and incident classification
- Dashboards for tourism authorities, tourist police, and transport operators

---

## ⚠️ Challenges & Mitigations

| Challenge | Mitigation |
|---|---|
| Data accuracy (fares/hotspots/hotels) | Use verified datasets only; label confidence/coordinate quality instead of guessing |
| Privacy (identity, location, incidents) | Minimize data collection; secure backend authorization |
| Informal driver adoption | Offer a zero-app / plate-based driver verification flow |
| Poor tourist connectivity | Design for offline-tolerant operation |
| QR/identity fraud | Short-lived, rotating QR tokens combined with GPS + timestamp |
| Government integration | Partner with tourism departments & transport authorities |

---

## 🌱 Impact

- **Social:** Safer tourism experiences, greater traveler confidence, better accountability.
- **Economic:** Reduces overcharging, supports legitimate local drivers/guides/hotels.
- **Tourism:** Improves visitor experience and destination reputation.
- **Safety:** Faster identity verification, proactive scam awareness, structured incident documentation.

---

## 📌 SIH 2026 Submission

| Field | Value |
|---|---|
| **Event** | Smart India Hackathon 2026 |
| **Project** | SafarSaarthi |
| **Category** | Software |
|**Team Name** | FLUX1 |
| **Theme** | Travel & Tourism |
| **Problem Statement ID** | SIH26204 |
| **Problem Statement Title** | Student Innovation-A solution/idea that can boost the current situation of the tourism industries including hotels, travel and others. |

---

## 📚 References

1. Ministry of Tourism, Government of India — [data.tourism.gov.in](https://data.tourism.gov.in/)
2. UN Tourism — [International Code for the Protection of Tourists](https://www.unwto.org/)
3. Government of India — [Digital Personal Data Protection Act, 2023](https://www.indiacode.nic.in/)
4. OWASP — [Mobile Application Security](https://mas.owasp.org/)
5. Google Maps Platform — [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)
6. Firebase — [Cloud Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

---

## 📄 License

Released under the **MIT License**. See [`LICENSE`](./LICENSE) for details.

---

## ⭐ SafarSaarthi in One Sentence

> **SafarSaarthi transforms uncertain, street-level tourism interactions into verified, transparent, and safer experiences — from the ride, to the stay, to the trip home.**
