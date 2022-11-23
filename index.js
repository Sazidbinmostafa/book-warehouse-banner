const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();

// Middleware \\
app.use(cors())
app.use(express.json())

// Database \\
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster.x2nwlcr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        // Connecting with Database \\
        await client.connect();
        const collection = client.db('Website-Documents').collection('Banner');
        
        // Get \\
        app.get('/banner', async (req, res)=>{
            const query = {};
            const cursor = collection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
    }
    finally{}
}

run().catch(console.dir);

app.get('/', (req, res)=>{
    res.send("Banner is ready for the warehouse!!!")
});

app.listen(port, ()=>{
    console.log("Listening to port", port)
})
