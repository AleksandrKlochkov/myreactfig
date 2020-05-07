const {CLASS_PREFIX} = require('../config/init')

class ContentService {

    constructor(){}

    getClassName(elementName) {
        if(elementName) {
            let str = elementName.trim()

            if(str) {
                str = str.toLowerCase();

                if(str.indexOf('??') !== -1){
                   str = str.split('??')[0]
                }

                if(str.indexOf(' ') !== -1){
                   str = str.split(' ').map(i=>i[0].toUpperCase() + i.slice(1)).join('').replace(/ /g, '');
                }

                if(str.indexOf('-') !== -1){
                    str = str.split('-').map(i=>i[0].toUpperCase() + i.slice(1)).join('').replace(/ /g, '');
                }

                if(str.indexOf('_') !== -1){
                    str = str.split('_').map(i=>i[0].toUpperCase() + i.slice(1)).join('').replace(/ /g, '');
                }

                str = CLASS_PREFIX + str;
            }
            return str;
        }
        return '';
    }
}

module.exports = ContentService