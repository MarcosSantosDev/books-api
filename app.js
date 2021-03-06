const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const datasource = require('./config/datasource');


const app = express();

app.config = config;

app.datasource = datasource(app);

app.set('port', 7000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { Books } = app.datasource.models;

app.route('/books')
  .get((req, res) => {
    Books.findAll({})
      .then((result) => res.json(result))
      .catch(() => res.status(412));
  })
  .post((req, res) => {
    Books.create(req.body)
      .then((result) => res.json(result))
      .catch(() => res.status(412));
  });

app.route('/books/:id')
  .get((req, res) => {
    Books.findOne({ where: req.params })
      .then((result) => res.json(result))
      .catch(() => res.status(412));
  })
  .put((req, res) => {
    Books.update(req.body, { where: req.params })
      .then((result) => res.json(result))
      .catch(() => res.status(412));
  })
  .delete((req, res) => {
    Books.destroy({ where: req.params })
      .then(() => res.status(204))
      .catch(() => res.status(412));
  });

module.exports = app;
