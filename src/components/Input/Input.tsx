import clsx from 'clsx';
import React, { forwardRef } from 'react';

// Hooks

// Components
import { Element } from '..';

// Utils

// Styles
import './Input.scss';

interface IInput extends GenericComponentProps<'input'> {
  isError?: boolean;
  label?: string;
  className?: string;
}

const Input = forwardRef(
  (
    { className = '', isError = false, label = '', ...props }: IInput,
    ref?: PolymorphicRef<'input'>
  ) => {
    // Return
    return (
      <label>
        {label}
        <Element
          ref={ref}
          {...props}
          as="input"
          className={clsx(`input ${className}`, {
            error: isError,
          })}
        />
      </label>
    );
  }
);

Input.displayName = 'Input';

export default React.memo(Input);
