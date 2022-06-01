// const path = require('path');
import path from 'path';

// module.exports =  {
//   config: path.join(__dirname, 'config.js'),
//   'migrations-path': path.join(__dirname, 'migrations'),
//   'seeders-path': path.join(__dirname, 'seeders'),
//   'models-path': path.join(__dirname, 'models')
// }

export default {
  config: path.join(__dirname, 'config.js'),
  'migrations-path': path.join(__dirname, 'migrations'),
  'seeders-path': path.join(__dirname, 'seeders'),
  'models-path': path.join(__dirname, 'models')
}