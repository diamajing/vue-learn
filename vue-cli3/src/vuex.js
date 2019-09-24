
let Vue;
class Store{
    constructor(options = {}) {
        this.state = new Vue({
            data:options.state
        });
        this.mutations = options.mutations || {};
        this.actions = options.actions || {};
    }
    commit = (type , arg) =>{
        this.mutations[type](this.state,arg);
    }
    dispatch(type){
        this.actions[type]({
            commit:this.commit,
            state:this.state
        })
    }
}
function install(_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        },
    })
}
export default {
    Store,install
}