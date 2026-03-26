function ScoreCard({ result }) {
    const isHighRisk = result.score > 0.6

    return (
        <div className={`scorecard ${isHighRisk ? 'high-risk' : 'low-risk'}`}>
            <h2>{result.company_name}</h2>
            <p className="score">{(result.score * 100).toFixed(1)}% distress probability</p>
            <p className="label">{isHighRisk ? 'High Risk' : 'Low Risk'}</p>
            <div className="factors">
                <h3>Key contributing factors</h3>
                {result.factors.map((f) => (
                    <div key={f.name} className="factor-row">
                        <span>{f.name}</span>
                        <span className="factor-value">{f.impact}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ScoreCard