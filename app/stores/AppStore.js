import alt from 'altjs';
import appActions from 'actions/AppActions';

class AppStore {

	constructor() {
		this.products = [{ID:0,title:"Test",description:"blah"}];
		this.nextID = 1;

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

	handleDeleteProduct(id) {
		var item = this.products.filter(p => p.ID == id)[0];
		if (item) {
			this.products.splice(this.products.indexOf(item),1);
		}	
	}

	static getProductById (id) {
		return this.getState().products.filter(p => p.ID == id)[0];
	}

}

module.exports = alt.createStore(AppStore,'AppStore');