# mv-spinner

MvSpinner is a spinner component based on lit-element.

## Quick Start

To experiment with the MvSpinner component.

1. Clone this repo.
2. Serve the project from the root directory with some http server (best served with meveo itself)
3. Update the spinner demo component in demo.js file

## Dependencies
* [mv-input](https://github.com/meveo-org/mv-input)

## Sample usage

```html
<mv-spinner
  name="spinner-name"                     // the name of of the spinner, this is returned in the details
                                          // when an spinner-change event is dispatched.
  .value="${this.spinnerValue}"           // the value of the spinner
  step="1"                                // the increment used when clicking the spinner buttons
  precision="1"                           // indicate the precision when the step is a decimal value
                                          // between 0 and 1, otherwise, the increment/decrement value
                                          // will not be precise
  min="1"                                 // set the minimum value for the spinner
  max="10"                                // set the maximum value for the spinner
  placeholder="Enter text here"           // placeholder shown on spinner when no value is entered yet
  rounded                                 // the spinner is rendered with rounded ends
  has-error                               // the spinner is rendered with error borders
  @spinner-change="${this.changeValue}"   // custom event dispatched when the spinner value is changed
  disabled                                // the spinner is disabled
  required                                // the spinner's placeholder has a bolder text to indicate that
                                          // it is required
  immediate                               // this will immediately trigger the @spinner-change event on
                                          // key press otherwise, it waits for the focus to change or
                                          // enter key is pressed
></mv-spinner>
```

You can also check this [demo](https://spinner.meveo.org/)
