import { Component } from 'react';
import { Element } from '..';
/////////////////////////////////
/// Format initial Data
/////////////////////////////////


const t: FBInput = {
  componentType: 'input',
  id: '',
  value: '',
}

// type ComponentTypes = 'input' | 


declare global {
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
  
  type FBBaseValue <T extends FBComponentTypes = FBComponentTypes>= T extends {componentType: 'input'} ? FBInput : FBTextArea
  // type FormState = ReturnType<typeof getInitialData>;
  type FormState <T extends FBBaseValue> = {
    inputs: {
        [key: string]: CleanedInput<T>;
    };
    getisValid: () => boolean;
  }
  type FormInputs <T extends FBBaseValue>= FormState<T>['inputs'];
  // type IBaseValue = {
  //   type: 'input' | 'select' | 'textarea' | 'submit'; // etc
  //   value: string;
  //   id: string;
  //   placeholder?: string;
  //   errorMessage?: string;
  //   required?: boolean;
  //   label?: string;
  // };

  interface IOptions<T extends FBBaseValue> {
    data: T[];
    onSubmit: (data: FormInputDef<T>) => void;
    resetOnSubmit?: boolean;
  }
  type FormInputDef<T extends FBBaseValue = FBBaseValue> = T[];
  type FormAction <T extends FBBaseValue>=
    | { type: 'INPUT'; payload: { id: string; value: string } }
    | { type: 'TOUCH'; payload: string }
    | { type: 'RESET'; payload: FormState<T> };

  type CleanedInput<T extends FBBaseValue> = T & {
    priority: number;
    getIsError: () => boolean;
    isTouched: boolean;
    displayError: () => boolean;
  };

  type IGetNewInputsArgs <T extends FBBaseValue>= {
    inputs: FormInputs<T>;
    key: string;
    value: string;
  }

  type TouchArgs <T extends FBBaseValue>= Omit<IGetNewInputsArgs<T>, 'value'>;
}

export const getInitialData = <T extends FBBaseValue>(data: T[]) => {
  const cleanedData = data.reduce(
    (
      acc: {
        [key: string]: CleanedInput<T>;
      },
      el,
      i
    ) => {
      const { id } = el;
      acc[id] = {
        ...el,
        priority: i,
        isTouched: false,
        getIsError: function () {
          return !!this.required && !this.value.trim().length;
        },
        displayError: function () {
          return this.getIsError() && this.isTouched;
        },
      };
      return acc;
    },
    {}
  );
  return {
    inputs: cleanedData,
    getisValid: function () {
      return !Object.values(this.inputs).some((input) => input.getIsError());
    },
  };
};

const getNewInputs = <T extends FBBaseValue>({
  inputs,
  key,
  value,
}: IGetNewInputsArgs<T>)=> {
  return {
    ...inputs,
    [key]: {
      ...inputs[key],
      value,
    },
  };
};
const touch = <T extends FBBaseValue>({ inputs, key }: TouchArgs<T>): FormInputs<T> => {
  return {
    ...inputs,
    [key]: {
      ...inputs[key],
      isTouched: true,
    },
  };
};

export const formReducer = <T extends FBBaseValue>(state: FormState<T>, action: FormAction<T>) => {
  const { type } = action;
  if (type === 'INPUT') {
    const newInputs = getNewInputs({
      inputs: state.inputs,
      key: action.payload.id,
      value: action.payload.value,
    });
    return {
      ...state,
      inputs: newInputs,
    };
  }
  if (type === 'TOUCH') {
    return {
      ...state,
      inputs: touch({ inputs: state.inputs, key: action.payload }),
    };
  }
  if (type === 'RESET') {
    return action.payload;
  }
  return state;
};

export const getValues = <T extends FBBaseValue>(
  formState: FormState<T>,
  inputs: T[]
) => {
  // use data map and replace with new values, remove any added valus for
  const newValues = inputs.map((el) => {
    const { inputs } = formState;

    if (inputs?.[el.id]) {
      const { priority, getIsError, ...rest } = inputs[el.id];
      return { ...el, ...rest };
    }
    return el;
  });

  return {
    inputs: newValues,
  };
};
