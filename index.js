const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.csyc5ob.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const userInfo = client.db('internshipAssesment').collection('userInfo');

        app.post('/userInfo', async (req, res) => {
            const result = await userInfo.insertOne(req.body);
            res.send(result);
        })
    }
    finally { }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send("Internship Assesment")
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})