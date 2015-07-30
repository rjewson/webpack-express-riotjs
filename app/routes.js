import director from 'director'

class AppRoutes {

	constructor() {
		this.curretView = null;
		this.router = new director.Router();
		this.initRoutes();
	}

	initRoutes() {
		this.router.on('/detail/:id',	id => { this.loadView('productDetailView',id)} );
		this.router.on('/products', 	() => { this.loadView('productListView')} );
		this.router.on('/add', 			() => { this.loadView('productAddView')} );
		this.router.on('/', 			() => { this.loadView('productListView')} );
	}

    loadView(viewName, id) {
     	if (this.currentView) {
       		this.currentView.unmount(true);
     	};
      	this.currentView = riot.mountTo('div#mainview', viewName, {data: id})[0];
    }

}

module.exports = new AppRoutes();