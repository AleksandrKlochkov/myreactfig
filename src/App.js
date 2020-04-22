import React from 'react';
import figma_files from '../src/figma_design/figma_files/figma_files.json'
import figma_node_file from '../src/figma_design/figma_files/figma_node_file.json'
import {MY_CLOSE_FRAME} from './figma-components/MyCloseFrame'
// import {Frame1} from './figma-components/Frame1'
// import {IconSetZenit} from './figma-components/Iconsetzenit'

function App() {
console.log('File', figma_files);
console.log('Node', figma_node_file);
// console.log('Nodes', figma_file_nodes);
// console.log('Images',figma_file_images);
// console.log('Fils',figma_file_images_fills);
  return (
    <div className="App">
          <MY_CLOSE_FRAME />
          {/* <Frame1 /> */}
    </div>
  );
}

export default App;
