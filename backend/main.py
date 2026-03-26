from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow React (port 5173) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the shape of incoming data
class CompanyData(BaseModel):
    company_name: str
    revenue: float
    debt_ratio: float
    cash_flow: float

# Mock prediction logic — replace with real model later
def mock_predict(data: CompanyData):
    score = 0.0
    if data.debt_ratio > 0.7:
        score += 0.4
    if data.cash_flow < 0:
        score += 0.35
    if data.revenue < 1_000_000:
        score += 0.25
    return min(score, 1.0)  # cap at 1.0

@app.post("/predict")
def predict(data: CompanyData):
    score = mock_predict(data)
    return {
        "company_name": data.company_name,
        "score": score,
        "factors": [
            {"name": "Debt ratio", "impact": f"{data.debt_ratio:.2f}"},
            {"name": "Cash flow", "impact": f"KES {data.cash_flow:,.0f}"},
            {"name": "Revenue", "impact": f"KES {data.revenue:,.0f}"}
        ]
    }