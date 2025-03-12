const useFormIds = (id?: string) => ({
  formItemId: `${id}-form-item`,
  formDescriptionId: `${id}-form-item-description`,
  formMessageId: `${id}-form-item-message`,
});

export default useFormIds;
