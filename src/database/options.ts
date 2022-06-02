import path from 'path';

export default {
  config: path.join(__dirname, 'config.js'),
  'migrations-path': path.join(__dirname, 'migrations'),
  'seeders-path': path.join(__dirname, 'seeders'),
  'models-path': path.join(__dirname, 'models')
}