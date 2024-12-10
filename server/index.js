const express= require('express');
const app = express();

const cors = require('cors');
app.use (cors())
app.get('/', (req, res) => {res.send('Um salve do servidor dobberman'); console.log('Acabei de mandar um salve pro otário do cliente'); })
app.listen(8080, () => {
console.log ('ouvindo na porta 8080')

})

