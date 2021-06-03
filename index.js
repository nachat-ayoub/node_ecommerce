const express             = require('express');
const mongoose            = require('mongoose');
const bodyParser          = require('body-parser');
const methodOverride      = require('method-override');
const Product             = require('./models/product')
require('dotenv').config();


const app = express();

//test here 

const PORT = process.env.PORT || 5000;

// Middlewares
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method
    delete req.body._method
    return method
  }
}))

// connecting to db 
const URI = process.env.DB_URI;
	mongoose.connect(URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
    }
 ).then(response => console.log('db connected successfully...'))
  .catch(err => console.log(err));






// ROUTS

app.get('/', (req, res) => {
 let title = 'jaket'
 let price = 200
 let descreption = 'black jaket nice and could.'
 let prod = new Product({
 	title: title,
 	price: price,
 	descreption: descreption
 })
 //prod.save()
 Product.find().then(results => res.render('index', {results: results}))
  			   .catch(err => console.log(err));
});



// SEE ONE PRODUCT
app.get('/product/:id/', (req, res) => {
	const id = req.params.id;
	Product.findById(id)
		.then(results => res.render('more', {results: results}))
	    .catch(err => console.log(err));
});



// ADD ROUTS
app.get('/add', (req, res) => {
	res.render('add')
});
app.post('/add', (req, res) => {
	let newProd = new Product(req.body)
	newProd.save()
	res.redirect('/')
});


// UPDATE ROUTS
app.get('/product/edit/:id', (req, res) => {
	const id = req.params.id;
	Product.findById(id)
		.then(results => res.render('edit', {results: results}))
	    .catch(err => console.log(err));
});

app.put('/product/edit/:id', (req, res) => {
	const id = req.params.id;
    Product.findByIdAndUpdate(id, req.body, function(err, updatedProduct){
       if(err){
           console.log(err);
       }else{
           res.redirect("/");

           console.log('\n\n\nthe product updated');
       }
   })
});




// DELETE ROUTS
app.delete('/product/:id', (req, res) => {
	const id = req.params.id;
    Product.findByIdAndRemove(id)
        .then(results => {
        	console.log('\n\n\nTHE Product deleted');
        	res.redirect('/')
        })
	    .catch(err => console.log(err));

});








app.listen(PORT, () => {
 console.log(`Server running on ${PORT}`)
})
