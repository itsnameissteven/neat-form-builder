interface Handler {
  target: {
    name: string;
    id: string;
    value: string;
  };
}

type BaseProps<C extends React.ElementType> = {
  as?: C;
  className?: string;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (BaseProps<C> & P);

type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & BaseProps<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type GenericComponentProps<C extends React.ElementType> = Omit<
  PolymorphicComponentProps<C>,
  'as'
>;

type PolymorphicComponent = <C extends React.ElementType = 'span'>(
  props: PolymorphicComponentProps<C>
) => React.ReactElement | null;

type PolymorphicRef<C extends React.ElementType = 'span'> =
  React.ComponentPropsWithRef<C>['ref'];

////// FormBuilder helpers

// type IBaseValue = {
//   type: 'input' | 'select' | 'textarea' | 'submit'; // etc
//   value: string;
//   id: string;
//   placeholder?: string;
//   errorMessage?: string;
//   required?: boolean;
//   label?: string;
// };

// interface IOptions<T extends IBaseValue> {
//   data: T[];
//   onSubmit: (data: FormInputDef) => void;
// }
// type FormInputDef<T extends {} = {}> = (IBaseValue & T)[];
// type FormAction =
//   | { type: 'INPUT'; payload: { id: string; value: string } }
//   | { type: 'TOUCH'; payload: string }
//   | { type: 'RESET'; payload: FormState };

// type CleanedInput<T extends IBaseValue> = T & {
//   priority: number;
//   getIsError: () => boolean;
//   isTouched: boolean;
//   displayError: () => boolean;
// };

// interface IGetNewInputsArgs {
//   inputs: FormInputs;
//   key: string;
//   value: string;
// }

// type TouchArgs = Omit<IGetNewInputsArgs, 'value'>;
