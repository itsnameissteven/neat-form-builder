
/////////////////////////////////
/// Format initial Data
/////////////////////////////////

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

// Returns the original data with user interactive values
export const getUpdatedValues = <T extends FBBaseValue>(
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
