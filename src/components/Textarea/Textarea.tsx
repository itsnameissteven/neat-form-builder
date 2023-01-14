import React from 'react';
import clsx from 'clsx';

// Hooks

// Components
import { Element } from '..';

// Utils

// Styles
import './Textarea.scss';

// Interfaces and Types
interface ITextarea extends GenericComponentProps<'input'> {
  isError?: boolean;
}

const Textarea = React.forwardRef(
  (
    { className = '', isError = false, children, ...props }: ITextarea,
    ref?: PolymorphicRef<'textarea'>
  ) => {
    return (
      <Element
        as="textarea"
        {...props}
        ref={ref}
        className={clsx(`textarea ${className}`, {
          error: isError,
        })}
      >
        {children}
      </Element>
    );
  }
);

Textarea.displayName = 'Textarea';

export default React.memo(Textarea);
