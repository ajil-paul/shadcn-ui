import { pluck } from 'ramda';

import { isPresent } from '@bigbinary/neeto-cist';

import { EMAIL_REGEX } from './constants';
import { EmailOption } from './types';

const getEmailsMap = (
  inputEmails: EmailOption[] = [],
  options: EmailOption[] = []
) => {
  const emails = [...inputEmails, ...options];
  const emailsMap = new Map<string, EmailOption>();

  emails.forEach((option) => {
    const hasPersistedEntry = isPresent(emailsMap.get(option.value)?.id);
    if (!hasPersistedEntry) emailsMap.set(option.value, option);
  });

  return emailsMap;
};

const processEmailOptions = (
  inputEmails: EmailOption[] = [],
  options: EmailOption[] = []
) => {
  const emailsMap = getEmailsMap(inputEmails, options);

  return (email: string): EmailOption => {
    const emailDetails = emailsMap.get(email) || { value: email };
    return formatEmailInputOption(emailDetails);
  };
};

export const formatEmailInputOption = ({
  label,
  value,
  ...otherDetails
}: EmailOption): EmailOption => ({
  label: label ?? value,
  value,
  ...otherDetails,
  valid: EMAIL_REGEX.test(value),
});

export const pruneDuplicates = (
  inputValues: EmailOption[],
  options: EmailOption[] = []
) => {
  const emailProcessor = processEmailOptions(inputValues, options);
  const emails = pluck('value', inputValues);
  const uniqueValuesSet = new Set<string>();
  const duplicates: string[] = [];

  emails.forEach((pristineEmail) => {
    const email = pristineEmail.toLowerCase();
    if (uniqueValuesSet.has(email)) duplicates.push(pristineEmail);
    uniqueValuesSet.add(email);
  });

  const uniqueValues = Array.from(uniqueValuesSet);
  const uniqueEmails = uniqueValues.map(emailProcessor);

  return { uniqueEmails, duplicates };
};

export const renderValidEmails = (values: EmailOption[]): EmailOption[] =>
  values.filter((email) => email.valid && email);

export const getValidEmailsCount = (values: EmailOption[]): number =>
  renderValidEmails(values).length;

export const renderDefaultText = (count: number): string =>
  count === 1 ? 'email' : 'emails';
