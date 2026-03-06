# 📬 RabbitMQ Email Demo

A simple Node.js + Express app that demonstrates how a **Message Queue (RabbitMQ)** works with an **Email Service (Nodemailer)**. Clicking a button on the frontend publishes a message to CloudAMQP, and a separate consumer worker picks it up and sends an email via Gmail SMTP.

---

## 🏗️ Architecture

```
Frontend (EJS)
     ↓  [Click Button]
Express API → Publisher → CloudAMQP (RabbitMQ)
                                   ↓
                         Consumer (Worker) → Nodemailer → Gmail
```

---

## ✨ Features

- **Message Queue** — Uses CloudAMQP (hosted RabbitMQ) to queue email jobs
- **Publisher** — Express API endpoint that pushes messages into the queue
- **Consumer** — Separate worker process that listens to the queue and triggers emails
- **Email Service** — Nodemailer with Gmail SMTP sends the actual email
- **Decoupled Architecture** — Publisher and Consumer run independently; if the consumer is down, messages stay in the queue and are processed when it comes back up

---

## 📁 Project Structure

```
MQ/
├── controllers/
│   └── messageController.js   # Publisher logic
├── routes/
│   └── messageRoutes.js       # POST /api/send route
├── views/
│   └── index.ejs              # Frontend with Send Email button
├── consumer.js                # Worker — listens to queue & sends email
├── server.js                  # Express app entry point
├── .env                       # Environment variables
└── package.json
```

---

## ⚙️ Prerequisites

- Node.js v18+
- A [CloudAMQP](https://www.cloudamqp.com) account (free tier works)
- A Gmail account with **2-Step Verification** enabled
- A **Gmail App Password** — generate at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-repo/MQ.git
cd MQ
npm install
```

### 2. Setup Environment Variables

Create a `.env` file in the root:

```env
PORT=3000
CLOUDAMQP_URL=amqps://your-cloudamqp-url-here
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your-16-char-app-password
RECEIVER_EMAIL=receiver@gmail.com
```

> ⚠️ `EMAIL_PASS` is a **Gmail App Password**, not your actual Gmail password.

### 3. Run the App

Open **two terminals**:

```bash
# Terminal 1 — Start Express server
node server.js

# Terminal 2 — Start Consumer worker
node consumer.js
```

### 4. Use It

- Open [http://localhost:3000](http://localhost:3000) in your browser
- Click the **"Send Email"** button
- The message gets published to RabbitMQ
- The consumer picks it up and sends the email to `RECEIVER_EMAIL`

---

## 🔁 How It Works

1. User clicks **Send Email** button on the frontend
2. Frontend calls `POST /api/send`
3. `messageController.js` connects to CloudAMQP and pushes a message into `email_queue`
4. `consumer.js` (running separately) is subscribed to `email_queue`
5. Consumer receives the message and uses Nodemailer to send an email via Gmail SMTP
6. Message is acknowledged and removed from the queue

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | EJS (Embedded JavaScript Templates) |
| Backend | Node.js + Express |
| Message Queue | RabbitMQ via CloudAMQP |
| Email Service | Nodemailer + Gmail SMTP |

---
 
## 🔐 Security Notes

- Never commit your `.env` file — it's in `.gitignore`
- Always use Gmail App Passwords instead of your real password 
- Keep your `CLOUDAMQP_URL` private as it contains credentials   



