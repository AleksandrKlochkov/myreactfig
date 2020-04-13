import React from 'react';
import figma from '../src/lib/figma/figma.json'
import figma_files from '../src/lib/figma/figma_files/figma_files.json'
import figma_file_nodes from '../src/lib/figma/figma_files/figma_file_nodes.json'
import figma_file_images from '../src/lib/figma/figma_files/figma_file_images.json'
import figma_file_images_fills from '../src/lib/figma/figma_files/figma_file_images_fills.json'
import {MY_CLOSE_FRAME} from './figma-components/m-y_-c-l-o-s-e_-f-r-a-m-e/m-y_-c-l-o-s-e_-f-r-a-m-e'

function App() {
console.log(figma)

console.log(figma_files);
console.log(figma_file_nodes);
console.log(figma_file_images);
console.log(figma_file_images_fills);

  return (
    <div className="App">
          <MY_CLOSE_FRAME />
    </div>
  );
}

export default App;
