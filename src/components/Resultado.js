import React from 'react';

function Resultado({data}){
    if(typeof data === "object" && Object.keys(data).length > 0) {
        return (
            <div className="resultado">
                <h2>Resultado: </h2>
                <p className="precio">Precio :<span>{data.PRICE}</span></p>
                <p className="">Precio mas alto: <span>{data.HIGHDAY}</span></p>
                <p className="">Precio mas bajo:<span>{data.LOWDAY}</span></p>
                <p className="">Variación: <span>{data.CHANGEPCT24HOUR}%</span></p>
                <p className="">Actualizado el: <span>{data.LASTUPDATE}</span></p>

            </div>
        );
    }

    return null;
}
export  default Resultado;