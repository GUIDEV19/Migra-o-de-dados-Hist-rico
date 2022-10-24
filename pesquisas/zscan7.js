const Options = require('../config/firebird.js')
const Firebird = require('node-firebird')



class QuerysPacientes {

    static async selectPacientesid(id){
        return new Promise( (resolve, reject)=>{
            Firebird.attach(Options.dbOptions, function(err, db) {
                if (err){
                    reject(err);
                };
                    db.query(`SELECT CAST(OBSERV AS VARCHAR(32700)) AS notas, id_zs_evo, nome FROM PACIENTES where IDPACIENTE = ${id};`, function(err, result) {
                    db.detach();
                    if (err){
                        return reject(err);
                    } else{
                        return resolve(result);
                    };
                });
            });
        }).catch(
            (e) => {
                console.log(e)
                return 
            }
        );
        
    }

    static async selectPacientes(){
        return new Promise( (resolve, reject)=>{
            Firebird.attach(Options.dbOptions, function(err, db) {
                if (err){
                    reject(err);
                };
                    db.query(`SELECT nome FROM PACIENTES;`, function(err, result) {
                    db.detach();
                    if (err){
                        
                        return reject(err);
                    } else{
                        resolve(result);
                    };
                    
                });
            });
        })
    }
}

async function teste(){
    let teste = await QuerysPacientes.selectPacientesid(7)
    return console.log(teste)
}

teste()





module.exports =  QuerysPacientes