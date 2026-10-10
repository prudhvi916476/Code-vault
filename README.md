# 🛡️ Code Vault — Personal Program Library

> **Your personal online library for storing, viewing, organizing, and retrieving college practical programs.** Access your programming practicals from any device, anytime.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

- **🔐 Secret Access Gate Screen:** Secured with passkey verification (`456789`), shake-on-error animation, and persistent session storage.
- **⚡ Shortened Practical Programs 1–8:** Clean, exam-ready implementations of all ML & Data Science college practicals.
- **📄 Downloadable Practical Word Documents:**
  - `Original_Practical_Programs.docx` — Full practical manual with questions, original programs, and notes.
  - `Programs_1_to_8_Shortened.docx` — Optimized, shortened practical programs.
- **💻 Dedicated Source-Code Viewer:**
  - Python syntax highlighting matching modern IDE themes.
  - 1-click **Copy to Clipboard** with visual feedback.
  - 1-click **Download .py** file for each program.
  - Keyboard accessible (`Esc` to dismiss).
- **🔍 Instant Search & Category Filtering:**
  - Real-time search across titles, descriptions, code keywords, and filenames.
  - Filter by category pills: *Data Preprocessing, Regression, Classification, Neural Networks*.
- **📱 Fully Responsive & Dark-Mode First:** Handcrafted with custom CSS, glassmorphism, responsive grid layouts, and smooth micro-animations.
- **🚀 Static Deployment Ready:** Configured with `output: "export"` for 1-click deployment on GitHub Pages, Vercel, Netlify, or Cloudflare Pages.

---

## 📚 Included Programs

| # | Program Title | Dataset / Topic | Category |
|---|---------------|-----------------|----------|
| **01** | Healthcare Data Preprocessing | Pima Indians Diabetes Dataset | Data Preprocessing |
| **02** | Linear Regression | Auto MPG Dataset | Regression |
| **03** | Logistic Regression | Breast Cancer Wisconsin Dataset | Classification |
| **04** | K-Nearest Neighbors (KNN) | Glass Identification Dataset | Classification |
| **05** | Decision Tree Classifier | Bank Marketing Dataset | Classification |
| **06** | Perceptron Learning | Logic Gates (AND/OR) & Breast Cancer | Neural Networks |
| **07** | Activation Functions | Step, Sigmoid, Tanh, ReLU | Neural Networks |
| **08** | Single-Layer Perceptron | Iris Dataset | Neural Networks |

---

## 🔑 Access Code

The default vault access code is:
```text
456789
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Local Run

1. Clone the repository:
```bash
git clone https://github.com/prudhvi916476/Code-vault.git
cd Code-vault
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Building for Production / Static Hosting

To build the static export ready for GitHub Pages or static web hosts:

```bash
npm run build
```

This generates a standalone `out/` folder containing static HTML, CSS, JavaScript, and downloadable documents.

---

## 🔒 Security Note
This application uses client-side access protection designed for convenience and quick retrieval of personal study notes and academic practicals.

---

## 📄 License
MIT License. Created for educational reference.
