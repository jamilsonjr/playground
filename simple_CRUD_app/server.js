const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express()
const connectionString = 'mongodb+srv://admin:admin@cluster0.lc4pb.gcp.mongodb.net/Cluster0?retryWrites=true&w=majority'
MongoClient.connect(connectionString, { useUnifiedTopology: true })
	.then( client => {
		console.log('Connected to Database')
		const db = client.db('quotes-app')
		const quotesCollection = db.collection('quotes')

		app.set('view engine', 'ejs')
		app.use(bodyParser.urlencoded({ extended: true }))
		app.listen(3000, () => {
			console.log('listening on 3000')
		})
		// CRUD handlers
		app.get('/', (req, res) => {
			const cursor = db.collection('quotes').find().toArray()
				.then(results =>{
					res.render('index.ejs', { quotes: results })
				})
				.catch(error => console.error(error))
			
		})

		app.post('/quotes', (req, res) => {
			quotesCollection.insertOne(req.body)
				.then(result => {
					res.redirect('/')
					console.log(result)
				})
				.catch(error => console.error(error))
		})
	})
	.catch(error => console.error(error))

