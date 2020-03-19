import 'reflect-metadata';
import app from './app'
import {createConnection} from 'typeorm'

async function main() { 
  app.listen(app.get('port'));
  console.log('Server on port: ', app.get('port'));
  const connection = await createConnection();
  console.log('Database is Connected: ', connection.options.database);
} 

main();