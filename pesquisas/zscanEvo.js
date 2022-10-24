Sequelize = require('sequelize')

const sequelize = new Sequelize('?','root', '?',{
    port: '?',
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        multipleStatements: true
    }
})

sequelize.authenticate().then(function(){
    let db = 'zscan_database'
    console.log('Conexão realizadad com sucesso em ' + db);
}).catch(function(err){
    console.log('erro ao realziar a conexão com DB: ' + err)
}) 

async function migraHistoricoClinico(note){
    if( !note.NOTAS || !note.ID_ZS_EVO ){
        return
    }
    await sequelize.query({
        query: `insert into tb_note (note_desc, note_ptts, note_ucrt, note_uchd, note_udlt,  note_dhcr, note_dhcg, note_dhdl) values (
            :note_desc,
            :note_ptts,
            :note_ucrt,
            :note_uchd,
            :note_udlt,
            current_date,
            current_date,
            null
        )`,
        values: {
            note_desc: note.NOTAS ? note.NOTAS : '',
            note_ptts: note.ID_ZS_EVO,
            note_ucrt: 1,
            note_uchd: null,
            note_udlt: null,

        }
    }).catch(
        (e) => {
            console.log(e)
            return 
        }
    );
}

module.exports = {migraHistoricoClinico}