const fs = require('fs');
const path = require('path');
const productos = require("../data/productsDataBase.json")
const saveProduct = (dato)=> fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json')
, JSON.stringify(dato, null, 4), 'utf-8');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		return res.render('products',{
			productos,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let id = +req.params.id

		let detalle = productos.find(detalle => detalle.id === id)

		return res.render('detail',{
			detalle,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {

		let {name,price,discount,category,description}=req.body
		let productoNuevo = {
			
			id:productos[productos.length - 1].id + 1,
			name,
			price,
			discount,
			category,
			description,
			image :  req.file.originalname !== "" ? req.file.originalname : "default-image.png",
		}
		productos.push(productoNuevo)
		saveProduct(productos)
		res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		let id = +req.params.id;
		let edit = productos.find(producto => producto.id === id);
		return res.render('product-edit-form', {
			toEdit : edit
		})
	},
	// Update - Method to update
	update: (req, res) => {
		return res.send('Producto modificado')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		
		let idParams = +req.params.id

		let product = productos.find(product => product.id === idParams)
		let ruta = fs.existsSync(path.join(__dirname,'..','..','public','images','products',product.image))
	
		
		if (ruta && product.image !== "default-image.png") {
			fs.unlinkSync(path.join(__dirname,'..','..','public','images','products',product.image))
		}

		let modified = productos.filter(producto => {
			return producto.id !== idParams
		})

		saveProduct(modified)

			return res.redirect('/')

	}
};

module.exports = controller;