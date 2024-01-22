const mongoose = require('mongoose');

mongoose.connect('mongodb://Lily:1234@localhost:27017/top_music')
  .then(() => console.log('Connected!'));