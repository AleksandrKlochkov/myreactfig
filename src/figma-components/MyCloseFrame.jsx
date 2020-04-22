import * as React from 'react';
import { observer } from 'mobx-react';
import { MY_CLOSE_FRAMEGenerated } from './MyCloseFrame.generated';

export const MY_CLOSE_FRAME = observer(props => {
  return <MY_CLOSE_FRAMEGenerated {...props} />;
});
