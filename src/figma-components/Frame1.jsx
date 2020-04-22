import * as React from 'react';
import { observer } from 'mobx-react';
import { Frame1Generated } from './Frame1.generated';

export const Frame1 = observer(props => {
  return <Frame1Generated {...props} />;
});
