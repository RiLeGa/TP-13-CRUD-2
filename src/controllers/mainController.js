const fs = require('fs');
const path = require('path');/* 
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); */

const productos = require("../data/productsDataBase.json")


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
	index: (req, res) => {
		let inSaleProducts = productos.filter(product =>product.category === 'in-sale');
		let lastVisit = productos.filter(product => product.category === 'visited' );
		

		res.render('index',{
			lastVisit,
			inSaleProducts,
			toThousand
		})
	},
	search: (req, res) => {
		
	},
};

