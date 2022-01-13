const express = require('express');

const app = express();

app.use(express.static(__dirname + '/dist/task-manager'))

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/dist/task-manager/index.html');
});

app.listen(process.env.PORT || 4200);
