import './App.css';
import {useState} from 'react';
import BarIndicator from './components/barIndicator/BarIndicator';

function App() {

    const rangingCat = [
        {
            name: 'Underweight',
            max: 30,
            color: 'coral'
        },
        {
            name: 'Normal',
            max: 50,
            color: '#00c8a4'
        },
        {
            name: 'Overweight',
            max: 75,
            color: 'coral'
        },
        {
            name: 'OverOverOverOverOverOverOverOverOverOverweight',
            max: 135,
            color: 'red'
        },
    ];
    const [nameCat, setNameCat] = useState('Mr. Cat');
    const [weightCat, setWeightCat] = useState(40);

    const rangingDog = [
        {
            name: 'Underweight',
            max: 45,
            color: 'coral'
        },
        {
            name: 'Normal',
            max: 90,
            color: '#00c8a4'
        },
        {
            name: 'Overweight',
            max: 135,
            color: 'coral'
        },
    ];
    const [nameDog, setNameDog] = useState('Mr. Dog');
    const [weightDog, setWeightDog] = useState(88.92);

    return (
        <main className="main">
            <section className="main__inputs">
                <input
                    className="main__inputs-name"
                    type="text"
                    value={nameDog}
                    onChange={(e) => setNameDog(e.target.value)}
                />
                <input
                    className="main__inputs-range"
                    type="range"
                    min="0"
                    max={rangingDog[rangingDog.length-1]['max']}
                    step="0.01"
                    value={+weightDog}
                    onChange={(e) => setWeightDog(+e.target.value)}
                />
            </section>
            <section className="main__indicators">
                <BarIndicator name={nameDog} weight={weightDog} ranging={rangingDog} step={0.01}/>
            </section>
            <br/>
            <br/>
            <div style={{border: '1px solid #282c34', width: '100%'}}/>
            <br/>
            <section className="main__inputs">
                <input
                    className="main__inputs-name"
                    type="text"
                    value={nameCat}
                    onChange={(e) => setNameCat(e.target.value)}
                />
                <input
                    className="main__inputs-range"
                    type="range"
                    min="0"
                    max={rangingCat[rangingCat.length-1]['max']}
                    step="0.01"
                    value={+weightCat}
                    onChange={(e) => setWeightCat(+e.target.value)}
                />
            </section>
            <section className="main__indicators">
                <BarIndicator name={nameCat} weight={weightCat} ranging={rangingCat} step={0.01}/>
            </section>
        </main>
    );
}

export default App;
