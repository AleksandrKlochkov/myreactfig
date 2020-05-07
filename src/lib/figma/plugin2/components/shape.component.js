const ComponentCore = require('../core/component.core')

class ShapeComponent extends ComponentCore{
    id = null;
    name = '';
    className = '';
    component = null;
    shape = null;
    children = [];
    style = {};

    constructor() {
        super();
    }

    init(shape, shared) {
        console.log('HELLO');
    }

    getComponents() {
        return this.component;
    }

    clear() {
        
    }

}


module.exports = ShapeComponent