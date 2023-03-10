import { useReducer, useMemo, useCallback } from 'react';
import {
  sortData,
  isChangeEvent,
  isFocusEvent,
  getInitialData,
  formReducer,
  getEventValueById,
  getValues,
} from '../utils';

const useFormBuilder = <T extends FBBaseValue>({
  data,
  onSubmit,
  resetOnSubmit = false,
}: IOptions<T>) => {
  const [formState, formDispatch] = useReducer(
    formReducer<T>,
    getInitialData(data)
  );

  //// Handlers

  const handleChange = useCallback((e: unknown) => {
    (e as any).persist?.();
    /// Input handlers
    if (isChangeEvent<HTMLInputElement | HTMLTextAreaElement>(e)) {
      formDispatch({
        type: 'INPUT',
        payload: getEventValueById(e),
      });
    }
  }, []);

  const handleTouch = useCallback((e: unknown) => {
    (e as any).persist?.();
    if (isFocusEvent(e)) {
      formDispatch({ type: 'TOUCH', payload: e.target.id });
    }
  }, []);

  const returnNewValues = useCallback(
    () => getValues(formState, data),
    [formState, data]
  );

  const handleSubmit = useCallback(() => {
    if (formState.getisValid()) {
      onSubmit(returnNewValues().inputs);
      resetOnSubmit &&
        formDispatch({ type: 'RESET', payload: getInitialData(data) });
    }
  }, [formState, data, onSubmit, returnNewValues]);

  const formInputs = useMemo(
    () =>
      sortData({
        data: Object.values(formState.inputs),
        sortKey: 'priority',
        sort: 'asc',
      }),
    [formState.inputs]
  );

  return {
    getValues: returnNewValues,
    handleChange,
    handleSubmit,
    handleTouch,
    formInputs,
    formState,
    formDispatch,
  };
};

export default useFormBuilder;
