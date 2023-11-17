This is a simple `DateOfBirthPicker` component, built on top of the [`DatePickerDemo`](https://ui.shadcn.com/docs/components/date-picker) from [shadcn/ui](https://ui.shadcn.com/). Adds a `YearPicker` and a `MonthPicker` to facilitate easier date of birth selection.

## Notes

-   To use the `DateOfBirthPicker` component in a form:
-   Destructure `formData` and `setFormData` props inside the component.
-   Un-comment the line which updates `formData` with the `date` state from the picker.
-   Create the `formData` state in the parent component containing the form, and pass `formData` and `setFormData` to the `DateOfBirthPicker` component.
