require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
// const path = require('path');

const API = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/';
const options = {
  headers: {
    Authorization: process.env.AUTH_TOKEN,
  },
};

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../public')));

app.get('/styles/:productId', (req, res) => {
  axios.get(`${API}products/${req.params.productId}/styles`, options)
    .then((response) => res.send(response.data))
    .catch((err) => res.send(err));
});

app.get('/products/:productId', (req, res) => {
  axios.get(`${API}products/${req.params.productId}`, options)
    .then((response) => res.send(response.data))
    .catch((err) => res.send(err));
});

app.get('/qa/questions', (req, res) => {
  axios.get(`${API}qa/questions?product_id=66642`, options)
    .then((response) => res.send(response.data))
    .catch((err) => res.send(err));
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  axios.get(`${API}qa/questions/${req.params.question_id}/answers`, options)
    .then((response) => res.send(response.data.results))
    .catch((err) => res.send(err));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log('Listening on port 3001');
