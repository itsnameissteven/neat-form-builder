// Polymophic types

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


//// FormBuilder helpers

//////// Current component types with requred props
type FBInput = React.HTMLProps<'input'> & {
  componentType: 'input'
  id: string;
  value: string;
}
type FBTextArea = React.HTMLProps<'textarea'> & {
  componentType: 'textarea';
  id: string;
  value: string;
}

type FBComponentTypes = FBInput | FBTextArea; 

//////// Conditional Typing
type FBBaseValue <T extends FBComponentTypes = FBComponentTypes>= T extends {componentType: 'input'} ? FBInput : FBTextArea


//////// Reducer types 
type FormState <T extends FBBaseValue> = {
  inputs: {
      [key: string]: CleanedInput<T>;
  };
  getisValid: () => boolean;
}
///////////// Adds extra properties to user provided data
type CleanedInput<T extends FBBaseValue> = T & {
  priority: number;
  getIsError: () => boolean;
  isTouched: boolean;
  displayError: () => boolean;
};
type FormInputs <T extends FBBaseValue>= FormState<T>['inputs'];

type FormAction <T extends FBBaseValue>=
  | { type: 'INPUT'; payload: { id: string; value: string } }
  | { type: 'TOUCH'; payload: string }
  | { type: 'RESET'; payload: FormState<T> };

type IGetNewInputsArgs <T extends FBBaseValue>= {
  inputs: FormInputs<T>;
  key: string;
  value: string;
}

type TouchArgs <T extends FBBaseValue>= Omit<IGetNewInputsArgs<T>, 'value'>;
  
//////// A type type user can utilize when passing to hook (to ensure currect data is being sent/ use elsewhere)
type FormInputDef<T extends FBBaseValue = FBBaseValue> = T[];
  
interface IOptions<T extends FBBaseValue> {
  data: T[];
  onSubmit: (data: FormInputDef<T>) => void;
  resetOnSubmit?: boolean;
}