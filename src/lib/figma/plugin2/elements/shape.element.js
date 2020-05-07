const ElementCore = require('../core/element.core');
const ContentService = require('../services/content.service');
const StyleService = require('../services/style.service')

class ShapeElement extends ElementCore{
    id = null;
    name = '';
    type = '';
    children = [];
    className = '';
    style = {};
    shared = {};
    shape = {};

    set Id(id) { this.id = id; }
    get Id() { return this.id; }

    set Name(name) { this.name = name; }
    get Name() { return this.name; }

    set Type(type) { this.type = type; }
    get Type() { return this.type; }

    set Children(children) { this.children = children; }
    get Children() { return this.children; }

    set ClassName(className) { this.className = className; }
    get ClassName() { return this.className; }

    set Style(style) { this.style = style; }
    get Style() { return this.style; }

    set Shared(shared) {this.shared = shared}
    get Shared() { return this.shared}

    set Shape(shape) {this.shape = shape}
    get Shape() { return this.shape}

    contentService = null;
    styleService = null;

    constructor(shape,shared) {
        super();

        this.contentService = new ContentService(); 
        this.styleService = new StyleService();
    }

    init(shape,shared){
        if(shape) {
            const {id,name, type, children} = shape;
            this.Style = id;
            this.Name = name;
            this.Type = type;
            this.Children = children;
            this.ClassName = this.contentService.getClassName(this.name);
            this.Style = this.styleElement(shape);
            this.Shared = shared;
        }
    }

    styleElement(shape){
        this.styleService.init(shape);
        return ''
    }

}


module.exports = ShapeElement