import React from 'react';
import { Descriptions } from 'antd';


const Descriptionguembe = ({title, itemsEnviados, column}) => {    
    
    const items = [              
       
        {
            key: '1',
            label: 'Email',
            children: 'Info@guembe-ind.com.ar',
        },       
        {
            key: '2',
            label: 'CBU',
            children: '00000254655650009',
        },
        {
            key: '3',
            label: 'Dirección',
            children: 'Gamarra 3300 Posadas, Ms, Arg',
        },
        {
            key: '4',
            label: 'Banco',
            children: 'Macro',
        },
       
    ];
    return (

        <>
            <Descriptions title="Datos de la Empresa" items={items} column={2}/>
        </>

     )
}


export default Descriptionguembe;
