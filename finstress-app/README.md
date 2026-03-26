# FinDistress Predictor

A full-stack web application that predicts financial distress risk for startups.
Built with React (frontend) and FastAPI (backend) as part of a beginner's toolkit
for learning React through a practical machine learning use case.

## Project Structure
```
finstress-app/        # React frontend (Vite)
  src/
    components/
      PredictionForm.jsx
      ScoreCard.jsx
    App.jsx
    main.jsx
    style.css
backend/              # FastAPI backend
  main.py
```

## Requirements

- Node.js v18+
- Python 3.8+
- npm
- pip

## Setup & Running

### Frontend
```bash
cd finstress-app
npm install
npm run dev
```

Opens at http://localhost:5173

### Backend
```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
```

Runs at http://localhost:8000

Both must be running at the same time for the app to work.

## How It Works

1. User enters company name, revenue, debt ratio, and cash flow
2. React form sends a POST request to the FastAPI backend
3. Backend runs a scoring algorithm and returns a distress probability
4. Frontend displays the score with a risk label and contributing factors

## API

**POST** `/predict`

Request body:
```json
{
  "company_name": "Acme Ltd",
  "revenue": 5000000,
  "debt_ratio": 0.7,
  "cash_flow": 800000
}
```

Response:
```json
{
  "company_name": "Acme Ltd",
  "score": 0.4,
  "factors": [
    { "name": "Debt ratio", "impact": "0.70" },
    { "name": "Cash flow", "impact": "KES 800,000" },
    { "name": "Revenue", "impact": "KES 5,000,000" }
  ]
}
```

## Notes

The current prediction logic is a rule-based mock. It is designed to be replaced
with a trained LightGBM model using joblib in a future version.