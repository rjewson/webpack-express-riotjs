import alt from 'altjs';
import appActions from 'actions/AppActions';

class AppStore {

	constructor() {
		this.products = [];
		this.nextID = 0;

		this.bindListeners({
			handleClearAllProducts:appActions.CLEAR_ALL_PRODUCTS,
			handleAddProduct:appActions.ADD_PRODUCT,
			handleDeleteProduct:appActions.DELETE_PRODUCT
		});

	}

	handleClearAllProducts() {
		this.products.length = 0;
	}

	handleAddProduct(data) {
		data.ID = this.nextID++;
		this.products.push(data);
	}

	handleDeleteProduct(data) {
		var item = this.getProductById(data);
		if (item) {
			this.products.splice(this.products.indexOf(item),1);
		}	
	}

	getProductById(id) {
		return this.products.filter(p => p.ID == id)[0];
	}

}

module.exports = alt.createStore(AppStore,'AppStore');