const express = require('express');
const app = express();
const sql = require('./sql');
(global.sql = new sql()).connect();

app.use(express.json({ extended: false }));
app.use('/auth', require('./routes/auth'));
app.use('/todo', require('./routes/todo'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.info(`Server started on port: ${PORT}`));
