import mongoose from 'mongoose';

class DB {
  constructor () {
    this.startDb();
  }
  startDb() {
    mongoose.connect('mongodb://localhost/gh_metrics');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log('Mongo connected');
    });
    return db;
  }
}

export let Db = new DB();