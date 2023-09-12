import { FormControl } from '@angular/forms';

export const equalField = (fieldKey: string, fieldName?: string) => {
  return (control: FormControl) => {
    if (control.parent) {
      const field = control.parent.get(fieldKey);
      if (field && field.value !== control.value) {
        return {
          equalField: { fieldName: fieldName || fieldKey },
        };
      }
    }
    return null;
  };
};
