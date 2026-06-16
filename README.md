# ElectRevise — Voter Survey & Booth Management System

<p align="center">
  <img src="./Frontend/public/icon1.png" width="180"/>
</p>

<p align="center">
A centralized voter verification, survey tracking, and booth allocation platform designed to streamline large-scale electoral review workflows.
</p>

---

# Overview

ElectRevise is a **full-stack administrative platform** created to support **voter verification, SIR (Special Intensive Revision) review, booth allocation, survey management, and administrative monitoring**.

The system enables organizations to manage and review field survey processes while verifying whether a voter exists in SIR records and ensuring survey completion across assigned regions.

It supports **governmental and non-governmental operational workflows** where administrators distribute work region-wise and monitor execution.

---

# Core Objectives

✅ Assign district-level responsibilities

✅ Allocate booths to survey teams

✅ Verify SIR voter records

✅ Monitor survey completion

✅ Track booth progress

✅ Generate downloadable reports

✅ Manage voter uploads and reconciliation

---

# System Architecture

```text
Frontend (React)
       │
       ▼
Backend (Node.js + Express)
       │
       ▼
Authentication + APIs
       │
       ▼
MySQL Database
       │
       ▼
Excel Processing Engine
```


<h2 align="center">Login Portal</h2>

<p align="center">
<img src="Frontend/assets/screenshot1.png" width="90%">
</p>

<h2 align="center">Admin Dashboard</h2>

<p align="center">
<img src="Frontend/assets/screenshot2.png" width="90%">
</p>

<h2 align="center">Functionalities</h2>

<p align="center">
<img src="Frontend/assets/screenshot3.png" width="90%">
</p>



---

# Complete Workflow

```text
ADMIN LOGIN
    │
    ▼
Dashboard
    │
    ├──────────────► Upload Master Data
    │
    ├──────────────► Create Jilla Structure
    │
    ├──────────────► Create Vidhansabha Tables
    │
    ├──────────────► Upload Voter Files
    │
    ├──────────────► Upload SIR Files
    │
    ├──────────────► Assign Booths
    │
    ├──────────────► Create Jilla Login
    │
    ├──────────────► Survey Collection
    │
    ├──────────────► Completion Tracking
    │
    └──────────────► Download Reports
```

---

# Home-to-Home Survey Flow

```text
Master Voter Upload
       │
       ▼
SIR Data Upload
       │
       ▼
Match Existing Voters
       │
       ▼
Create Booth Assignment
       │
       ▼
Assign Jilla Users
       │
       ▼
Home Survey Collection
       │
       ▼
Family Distribution View
       │
       ▼
Completion Dashboard
       │
       ▼
Export Final Data
```

---

# User Roles

---

## Admin

Central controller of the platform.

### Admin Functionalities

### 🪷 ElectRevise Admin Dashboard

---

### Reports

📊 Download Voter Count by Jilla

📄 Download Voter Table Data

📋 Download Master Jilla Data

---

### Upload Operations

📤 Upload Zilla Master (Multiple Excel)

📤 Upload Excel of Voter Data

📤 Upload SIR Voter Excel Files

📤 बूथ प्रवासी Excel Upload Portal

---

### Table Management

📥 Create Vidhansabha Table

📥 Create Standard Voter Table

📥 Add SIR Table

---

### Assignment Operations

📤 बूथ प्रवासी Allotment Portal

📄 View Saved Data of बूथ प्रवासी

---

### Processing

🗳 Voter Data Merge

⚙️ Update Final Voter Count

🗑 Delete Voter Data

---

### Distribution

District-wise allocation

Booth-wise assignment

User-level management

Survey responsibility distribution

---

### Login Management

Create Jilla Login

Upload Excel → Generate Passkeys

Check Existing Jilla Passkeys

Manage Access

---

### Analytics

Voter Completion Dashboard

Survey Tracking

Polling Station Monitoring

Voting Completion Percentage

---

## Jilla User

Assigned by admin.

Responsibilities:

* Access only allocated booths
* Review assigned voters
* Conduct survey
* Update voter records
* Submit completion status

---

## Survey Team

Responsibilities:

* Family-based collection
* House verification
* Confirm SIR status
* Mark voter presence

---

# Voter Verification Logic

```text
Voter Exists
      │
      ▼
Check SIR Database
      │
      ├── Present
      │       │
      │       ▼
      │  Mark Verified
      │
      └── Not Present
              │
              ▼
        Send For Review
```

---

# Completion Dashboard

Tracks:

✔ Assigned Booths

✔ Survey Completion %

✔ Pending Surveys

✔ Family Coverage

✔ Voter Count

✔ Polling Progress

---

# Tech Stack

## Frontend

* React
* React Router
* Axios
* CSS

## Backend

* Node.js
* Express.js

## Database

* MySQL

## File Handling

* Excel Processing
* CSV Handling

## Deployment

* Vercel
* Environment Variables

---

# Folder Structure

```text
ELECTREVISE/
├── Backend/
│   ├── Admin/
│   ├── Jilla/
│   ├── uploads/
│   ├── User/
│   ├── db.js
│   └── main.js
│
├── Frontend/
│   ├── assets/
│   ├── build/
│   ├── public/
│   ├── resources/
│   ├── src/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
└── .gitignore
```

---

# Installation

## Clone

```bash
git clone YOUR_REPO_URL
```

## Frontend

```bash
cd frontend
npm install
npm start
```

## Backend

```bash
cd backend
npm install
npm run dev
```

---

# Environment Variables

Create:

```env
frontend/.env
backend/.env
```

Example:

```env
REACT_APP_API_URL=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

Do not commit `.env`.

---

# Contributors

### Yatharth Dubey

💻GitHub : https://github.com/Yatharth-Dubey

💼LinkedIn : https://www.linkedin.com/in/yatharth-dubey-34a532316

🌐Portfolio : https://yatharthdubey.vercel.app/

---

### Sachin Diwakar

💻GitHub : https://github.com/sachindiwakar35

💼LinkedIn : in/sachin-diwakar-604aa5338

🌐Portfolio : https://sachin-portfolio-plum.vercel.app/

---

# Future Scope

* GIS-based Booth Mapping
* Mobile Survey App
* Analytics Dashboard
* Real-Time Tracking
* OTP Authentication
* Multi-Role Access

---

© 2026 ElectRevise — Built Collaboratively
