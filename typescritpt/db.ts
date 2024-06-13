import { MongoClient, Db } from "mongodb";

const uri = "mongodb+srv://saraalves0901:12345678910@filmesfavs.53eqegv.mongodb.net/"; // Substitua pelo URI da sua conexão MongoDB
let client: MongoClient | null = null;
let db: Db;

async function connectToDatabase(): Promise<Db> {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db("your-database-name"); // Substitua pelo nome do seu banco de dados
  }
  return db;
}

export { connectToDatabase };
