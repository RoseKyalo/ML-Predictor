import { useState } from 'react'
import PredictionForm from './components/PredictionForm'
import ScoreCard from './components/ScoreCard'
import './style.css'

function App() {
    const [result, setResult] = useState(null)

    return (
        <div className="app">
            <h1>FinDistress Predictor</h1>
            <p className="subtitle">Enter financial indicators to assess distress risk</p>
            <PredictionForm onResult={setResult} />
            {result && <ScoreCard result={result} />}
        </div>
    )
}

export default App