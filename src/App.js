import React from 'react';
import imagen from './cryptomonedas.png'
import Formulario from "./components/Formulario";
import axios from 'axios';
import Loading from "./components/Loading";
import Resultado from "./components/Resultado";
function App() {
    const [state, setState] = React.useState({});
    const [results, setResults] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    React.useEffect(()=>{
        if(Object.keys(state).length > 0){
            setLoading(true);
            queryApi(state.moneda, state.crypto)
                .then((r)=>{
                   setTimeout(()=> {
                       setLoading(false);
                       setResults(r.data.DISPLAY[state.crypto][state.moneda]);
                   }, 3000);
                });
        }
    },[state]);

    const queryApi= async function(moneda, crypto){
        let url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${moneda}`;
        return await axios.get(url);
    };

  return (
    <div className="container">
      <div className="one-half column">
        <img src={imagen} alt="fondo" className="logotipo"/>
      </div>
      <div className="one-half column">
        <h1>Cotizar crypto moneda</h1>
        <Formulario setState={setState}/>
        <Loading show={loading}/>
        <Resultado data={results}/>
      </div>
    </div>
  );
}

export default App;
