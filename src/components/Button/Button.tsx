import React from 'react';

// Hooks

// Components
import { Element } from '..';

// Utils

// Styles
import './Button.scss';

// Interfaces and Types

const Button = React.forwardRef(
  (
    { className = '', children, ...props }: GenericComponentProps<'button'>,
    ref?: PolymorphicRef<'button'>
  ) => {
    return (
      <Element
        {...props}
        as="button"
        ref={ref}
        className={`button ${className}`}
      >
        {children}
      </Element>
    );
  }
);

Button.displayName = 'Button';

export default React.memo(Button);
