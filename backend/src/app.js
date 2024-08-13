const express = require('express');
const mongoose = require('mongoose'); // Asegúrate de tener esta línea para importar mongoose
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', require('./routes'));

const PORT = process.env.PORT || 5000;

const uri = process.env.MONGO_URI; // O usa directamente la cadena URI proporcionada por MongoDB Atlas

mongoose.connect(uri, {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  }
})
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.error('Connection error:', error.message));
