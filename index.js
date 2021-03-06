const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');/* to connect server to the database */
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 8000;
const app = express();

// middleware 
app.use(cors());
app.use(express.json());


// connect server to the database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7bpgw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// to work with database 
async function run() {
    try {
        await client.connect();
        const billingCollection = client.db('powerHack').collection('billingList');
        console.log('db connected');

        // get all saved billing and send to client
        app.get('/billing-list', async (req, res) => {
            const query = {};
            const cursor = billingCollection.find(query);
            const bills = await cursor.toArray();
            res.send(bills);
        });

    }
    finally {

    }
}
run().catch(console.dir);

// for my checking
app.get('/', (req, res) => {
    res.send('Power-Hunter server is running')
});

app.listen(port, () => {
    console.log(`Power-Hunter is running server is running at port : ${port}`);
});