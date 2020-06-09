const express = require('express')
const db = require('./db.js')
const cors = require('cors');

const app = express();
app.db = db(app);
app.set('port', process.env.PORT || 3000);
app.use(express.json());


const login = require('./routes/login');
app.use('/login', cors(), login(app));

app.db.sequelize.sync().done(() => {
    //Iniciar el server
    app.listen(app.get('port'), () =>{
        console.log('Server on port', app.get('port'));
    });
});
