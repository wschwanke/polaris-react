import * as React from 'react';
import {ReactComponent} from '@shopify/react-utilities/types';
import reactCompose from '@shopify/react-compose';
// eslint-disable-next-line shopify/strict-component-boundaries
import {Provider as RefProvider} from '../components/WithRef';

export type ComponentClass = React.ComponentClass<any>;

export type WrappingFunction = (
  Component: ReactComponent<any>,
) => ReactComponent<any>;

export default function compose<Props>(
  ...wrappingFunctions: WrappingFunction[]
) {
  return function wrapComponent<ComposedProps>(
    OriginalComponent: ReactComponent<ComposedProps>,
  ): ReactComponent<Props> {
    const Result = reactCompose(...wrappingFunctions)(
      OriginalComponent,
    ) as ReactComponent<ComposedProps>;
    return React.forwardRef<Props>(
      (props: Props, ref: React.RefObject<any>) => {
        return (
          <RefProvider value={{forwardedRef: ref}}>
            <Result {...props} />
          </RefProvider>
        );
      },
    ) as ReactComponent<Props>;
  };
}
