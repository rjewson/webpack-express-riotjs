var constants = require('constants/EventTypes');

var AppActions = {
	AddProduct : (name,description) => {
		riot.control.trigger(
			riot.EventTypes.ADD_PRODUCT_ITEM,
			{
				name,
				description
			});
	}
};

export default AppActions;