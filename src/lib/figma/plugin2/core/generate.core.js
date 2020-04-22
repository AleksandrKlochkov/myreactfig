const {VECTOR_TYPES} = require('../config/init')
const ShapeComponent = require('../components/shape.component');

class GenerateCore {
    shapeComponent = null

    constructor() {
        this.shapeComponent = new ShapeComponent();
    }
    
    init(node, shared, prevNode=null) {
        if(node){
           this.treeElements(node,shared, prevNode);
        }

        const components = shared.components;
        const vectors = shared.vectors;
        const images = shared.images; 
        if(components){
            const shape = components.filter(c=> !VECTOR_TYPES.includes(c.type));
            if(shape) {
                this.shapeComponent.init(shape, shared);
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

        if(node && node.children){
           const nodes = node.children;
           nodes.forEach(item => {
            this.treeElements(item, shared, node);
           });
        }
    }
}

module.exports = GenerateCore