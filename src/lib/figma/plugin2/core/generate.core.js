const {VECTOR_TYPES} = require('../config/init')
const ShapeElement = require('../elements/shape.element');

class GenerateCore {
    shapeElement = null

    constructor() {
         this.shapeElement = new ShapeElement();
    }
    
    init(node, shared, prevNode=null) {
        if(node){
           this.treeElements(node,shared, prevNode);
        }

        let figures = shared.components;
        const vectors = shared.vectors;
        const images = shared.images; 
        if(figures){
            figures = figures.filter(f=> !VECTOR_TYPES.includes(f.type));
            if(figures && figures.length !== 0) {
                this.shapeElement.init(figures[figures.length-2], shared);
            }
        }
    }

    treeElements(node, shared, prevNode) {
        const { vectors, images} = shared;

        if(node && prevNode && prevNode.children.includes(node)) {
            node['parentId'] = prevNode.id;
            node['parentType'] = prevNode.type;
        }

        if(VECTOR_TYPES.includes(node.type)) {
            vectors[node.id] = node;
        }

        if (node && node.fills && node.fills.find(f => f.type === 'IMAGE')) {
            images[node.id] = node;
        }

        shared.components.push(node);

        if(node && node.children) {
           const nodes = node.children;
           nodes.forEach(item => {
            this.treeElements(item, shared, node);
           });
        }
    }
}

module.exports = GenerateCore