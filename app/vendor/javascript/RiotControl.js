//https://github.com/jimsparkman/RiotControl

let _RiotControlApi = ['on','one','off','trigger']

let RiotControl = {
  _stores: [],
  addStore(store) {
    this._stores.push(store);
  }
}

_RiotControlApi.forEach(api => {
  RiotControl[api] = function() {
    let args = [].slice.call(arguments);
    this._stores.forEach(el => el[api].apply(null, args));
  }
})

riot.control = RiotControl;