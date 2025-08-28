/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useEffect, useState, type ChangeEvent } from 'react';
import { Chart } from 'chart.js';
import React from 'react';
import './App.css';


interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

type State = 'Model_Menu' | 'Main_Choice_Menu' | 'Default';
let nextId = 1;


function App() {
    const [forecasts, setForecasts] = useState<Forecast[]>();
    const [currentState, setCurrentState] = useState<State>('Default');
    const [models, setModels] = useState([{id: 0, text: '', done: false}]);
    const [inputValue, setInputValue] = useState({ value: ''});

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddModel = () => {
        setModels([...models, { id: nextId++, text: '', done: false }]);
    };

    useEffect(() => {
        populateWeatherData();
    }, []);

    const site_scrape = async () => {
        
    }

    const run_comparison = async () => {
        const input_text = document.getElementById('textInput').value;
        console.log(input_text);
    }

    function MyCanvasComponent() {
        const canvasRef = useRef(null);

        useEffect(() => {
            const canvas = canvasRef.current;
            canvas.width = 300;
            canvas.height = 400;
            if (canvas) {
                const ctx = canvas.getContext('2d');
                //ctx.fillStyle = 'blue';
                //ctx.fillRect(100, 100, 200, 200);
                const cellSize = 20;
                const lineColor = '#ccc';
                const lineWidth = 1;
                ctx.strokeStyle = lineColor;
                ctx.lineWidth = lineWidth;
                ctx.strokeRect(0, 0, 300, 400)
                // Draw vertical lines
                for (let x = 0; x <= canvas.width; x += cellSize) {
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, canvas.height);
                    ctx.stroke();
                }
            }
        }, []); // Empty dependency array ensures this effect runs only once after initial render

        return (
            <canvas ref={canvasRef} width="300" height="150" style={{ border: '1px solid black' }} />
        );
    }

    function model_compare_2() {
        // Add a new button to the state array
        //const newInput = { text: '' };
        //setInputs(prevItems => [...prevItems, newInput]);
        if (inputValue === "") {
            return null;
        }
        handleAddModel();
        return (
            models.map((model) => (
                <div key={model.id }>
                        <label>Variable equation {model.id + 2}.</label>
                        <input
                            type="text"
                            value={model.text}
                            onChange={handleInputChange}
                        />
                        <button key={model.id} onClick={model_compare_2}>
                            Submit
                        </button>
                        {<MyCanvasComponent ref={model_ref} />}
                    </div>
        )));
    };

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;


    const model_ref = useRef(null);

    const wrapper_1 = () => {
        switch (currentState) {
            case "Model_Menu":
                return (
                    models.map((model) => (
                        <div key={model.id}>
                            <label>Variable equation {model.id + 1}.</label>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                            <button key={model.id} onClick={model_compare_2}>
                                Submit
                            </button>
                            {<MyCanvasComponent ref={model_ref} />}
                        </div>
                    )));
            case "Main_Choice_Menu":
                return <div>
                    <li className="buttonlist" onClick={() => setCurrentState('Model_Menu')}><button>Compare Models</button></li>
                    <li className="buttonlist"><button>Scrape Site</button></li>
                </div>;

            default:
                return <div>
                    <h1 id="tableLabel">Weather forecast</h1>
                    <p id="app">This component demonstrates fetching data from the server.</p>
                    {contents}
                    <p id="continue">Continue Below.</p>
                    <button onClick={() => setCurrentState('Main_Choice_Menu')}>Continue</button>
                </div>;
        }
    }

    return (
        wrapper_1()
    );

    const MyComponent: React.FC<MyComponentProps> = ({ onClick }) => {
        return <button onClick={onClick}>Click me</button>;
    };


    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        if (response.ok) {
            const data = await response.json();
            setForecasts(data);
        }
    }
}

//export default TextInputExample;
export default App;
