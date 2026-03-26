import { useState } from 'react'

function PredictionForm({ onResult }) {
    // State for each form input
    const [formData, setFormData] = useState({
        revenue: '',
        debtRatio: '',
        cashFlow: '',
        companyName: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Updates the right field when user types
    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()  // prevents page reload
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    company_name: formData.companyName,
                    revenue: parseFloat(formData.revenue),
                    debt_ratio: parseFloat(formData.debtRatio),
                    cash_flow: parseFloat(formData.cashFlow)
                })
            })

            if (!response.ok) throw new Error('Prediction failed')
            const data = await response.json()
            onResult(data)  // pass result up to App

        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="field">
                <label>Company Name</label>
                <input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Acme Ltd"
                    required
                />
            </div>
            <div className="field">
                <label>Annual Revenue (KES)</label>
                <input
                    type="number"
                    name="revenue"
                    value={formData.revenue}
                    onChange={handleChange}
                    placeholder="e.g. 5000000"
                    required
                />
            </div>
            <div className="field">
                <label>Debt Ratio (0-1)</label>
                <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    name="debtRatio"
                    value={formData.debtRatio}
                    onChange={handleChange}
                    placeholder="e.g. 0.65"
                    required
                />
            </div>
            <div className="field">
                <label>Cash Flow (KES)</label>
                <input
                    type="number"
                    name="cashFlow"
                    value={formData.cashFlow}
                    onChange={handleChange}
                    placeholder="e.g. 800000"
                    required
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Analysing...' : 'Predict Distress Risk'}
            </button>
            {error && <p className="error">{error}</p>}
        </form>
    )
}

export default PredictionForm