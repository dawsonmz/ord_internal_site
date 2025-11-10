export function missingError(field: string | undefined): string | null {
  return field ? null : 'Required field';
}

export function numberError(number: string | undefined): string | null {
  if (number && !/^[0-9]+$/.test(number)) {
    return 'Only numbers allowed'
  } else {
    return missingError(number);
  }
}
