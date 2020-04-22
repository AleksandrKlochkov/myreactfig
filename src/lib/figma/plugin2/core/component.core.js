class ComponentCore {
    id = '';
    name = '';
    type = '';
    children = [];
    className = '';
    style = {};

    constructor(id, name, type, children,className, style) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.children = children; 
        this.className = className;
        this.style = style;
    }
}

module.exports = ComponentCore