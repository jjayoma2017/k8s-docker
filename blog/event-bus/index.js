const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
const events = [];

app.post('/events', (req, res) => {
  const event = req.body;
  events.push(event);
  console.log('posts..' + JSON.stringify(events));
  axios.post('http://posts-clusterip-srv:4000/events', event);
  console.log('comments..');
  axios.post('http://comments-clusterip-srv:4001/events', event);
  console.log('query..');
  axios.post('http://query-clusterip-srv:4002/events', event);
  console.log('moderation..');
  axios.post('http://moderation-clusterip-srv:4003/events', event);

  res.send({ status: 'ok' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Listening on port 4005');
});
