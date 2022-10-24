const zscan7 = require('./pesquisas/zscan7.js');
const zscanevo = require('./pesquisas/zscanEvo.js')
// const iconv = require('iconv-lite');
// const Promise = require('bluebird');



async function migrarHC(){
    const zscanHC = await zscan7.selectPacientes();
        let i = 6
        while(i < zscanHC.length){
            console.log(i)
            const historico = await zscan7.selectPacientesid(i)
            console.log(historico)
            // const observ = await trataObserv(db, historico[0].OBSERV)
            if(historico  == undefined){
                console.log('arithmetic exception, numeric overflow, or string truncation')
            }else if(!historico.length){
                console.log('array vazio')
            }else{
                await zscanevo.migraHistoricoClinico(historico[0])
            }
            
            i++
        }
            
        
}

migrarHC()

// async function trataObserv(db, observ){
//     return new Promise((resolve, reject) => {

//         if (!!observ) {
//             return observ((err, name, data) => {
//                 let dataResult = "";

//                 if (err) {
//                     return reject(new Error(err));
//                 }
//                 data.on('data', (chunk) => {
//                     dataResult += iconv.decode(chunk, "win1252");
//                 });
//                 data.on('end', () => {
//                     db.detach();
//                     resolve(dataResult);
//                 });
//             });
            
//         } else {
//             resolve(false);
//         }
//     })
// }









