import alt from 'altjs';

class AppActions {

	clearAllProducts() {
		this.dispatch();
	}

  	addProduct(product) {
    	this.dispatch(product);
  	}

  	deleteProduct(product) {
    	this.dispatch(product);
  	}

}
 
module.exports = alt.createActions(AppActions);