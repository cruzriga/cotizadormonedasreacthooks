import React from 'react';
import axios from 'axios'


function Formulario({setState}) {
    const [crytos, setCryptos]= React.useState([]);
    const [cmoneda, setCmoneda]= React.useState("");
    const [ccrypto, setCcrypto]= React.useState("");
    const [error, setError]= React.useState(false);

    React.useEffect(()=>{
        queryApi().then((r)=>{
            setCryptos(r.data.Data);
        });
    },[]);

    const queryApi = async function(){
        const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=15&tsym=USD`;
        return await axios.get(url);
    };

    const cotizarMoneda = e => {
      e.preventDefault();
      if(cmoneda === "" || ccrypto === ""){
        setError(true);
        return ;
      }

      setError(false);
      setState({moneda : cmoneda , crypto : ccrypto});

    };

    const ShowErrors = function({show, msg}){
        if(!show){
            return '' ;
        }

        return(
            <div className="error">
                {msg}
            </div>
        )
    };

    return(
            <form onSubmit={cotizarMoneda}>
                <ShowErrors show={error} msg="Ambos campos son obligatorios"/>
                <div className="row">
                    <label htmlFor="moneda">Elige una moneda</label>
                    <select
                        name="moneda" id=""
                        className="u-full-width"
                        onChange={e => {setCmoneda(e.target.value)}}>
                        <option value="">Elige tu moneda</option>
                        <option value="USD">Dolar US</option>
                        <option value="COP">Peso Colombiano</option>
                        <option value="MXN">Peso Méxicano</option>
                        <option value="GBP">Libras UK</option>
                        <option value="EUR">Euro</option>
                    </select>
                </div>
                <div className="row">
                    <label htmlFor="crypto">Elige tu crypto moneda</label>
                    <select name="crypto"
                            className="u-full-width"
                            onChange={e => {setCcrypto(e.target.value)}}>
                        <option value="">Elige cypto moneda</option>
                        {   crytos.map(c =>(
                            <option key={c.CoinInfo.Id} value={c.CoinInfo.Name}>
                                {c.CoinInfo.FullName}
                            </option>)
                        )}
                    </select>
                </div>
                <input type="submit" className="button-primary u-full-width" value="ENVIAR"/>
            </form>
    );
}
export default Formulario;