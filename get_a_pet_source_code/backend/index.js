const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.static('public'));

const UserRoutes = require('./routes/UsersRoutes');
const PetsRoutes = require('./routes/PetsRoutes');

app.use('/users', UserRoutes);
app.use('/pets', PetsRoutes);

app.listen(5000);