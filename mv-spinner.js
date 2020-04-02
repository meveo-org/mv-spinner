import { LitElement, html, css } from "lit-element";
import "mv-input";

export class MvSpinner extends LitElement {
  static get properties() {
    return {
      name: { type: String, attribute: true },
      value: { type: String, attribute: true },
      step: { type: Number, attribute: true },
      // when using fractional step between 0 and 1
      // specify a precision of how many decimal places to round off to
      precision: { type: Number, attribute: true },
      rounded: { type: Boolean, attribute: true },
      placeholder: { type: String, attribute: true },
      focus: { type: Boolean, attribute: false },
      hasError: { type: Boolean, attribute: "has-error", reflect: true },
      disabled: { type: Boolean, attribute: true },
      required: { type: Boolean, attribute: true },
      immediate: { type: Boolean, attribute: true }
    };
  }

  static get styles() {
    return css`
      .buttons {
        padding: 0;
        margin: -6px 10px 0 0;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 3px;
        width: 5px;
      }

      .buttons > button {
        font-size: 12px;
        outline: none;
        padding: 0;
        margin: 0;
        background: transparent;
        border: none;
        height: 8px;
        width: 8px;
        text-align: center;
        cursor: pointer;
      }

      .buttons > button:hover {
        color: #4e686d;
      }

      .buttons > button:disabled {
        cursor: default;
      }
    `;
  }

  constructor() {
    super();
    this.focus = false;
    this.rounded = false;
    this.hasError = false;
    this.disabled = false;
    this.required = false;
    this.step = 1;
    this.precision = 0;
    this.value = 0;
  }

  render() {
    return html`
      <mv-input
        .name="${this.name}"
        .placeholder="${this.placeholder}"
        .value="${this.value}"
        .focus="${this.focus}"
        ?rounded="${this.rounded}"
        ?has-error="${this.hasError}"
        ?disabled="${this.disabled}"
        ?required="${this.required}"
        ?immediate="${this.immediate}"
        @input-change="${this.inputChange}"
      >
        <div class="buttons" slot="suffix">
          <button
            class="up"
            .disabled="${this.disabled}"
            @click="${this.add(this.step)}"
          >
            &#x25B2;
          </button>
          <button
            class="down"
            .disabled="${this.disabled}"
            @click="${this.add(-this.step)}"
          >
            &#x25BC;
          </button>
        </div>
      </mv-input>
    `;
  }

  inputChange = event => {
    const { detail } = event;
    const { name, value, originalEvent } = detail;
    const numberValue = new Number(value);
    this.hasError = isNaN(numberValue);
    this.changeValue({ name, value, originalEvent, invalid: this.hasError });
  };

  add = step => originalEvent => {
    const mvInput = this.shadowRoot.querySelector("mv-input");
    const { name, value } = mvInput;
    const factor = Math.pow(10, this.precision);
    const numberValue = new Number(value);
    const stepValue = new Number(step);
    this.hasError = isNaN(numberValue);
    const newValue = this.hasError
      ? value
      : (numberValue * factor + stepValue * factor) / factor;
    this.changeValue({
      name,
      value: newValue,
      originalEvent,
      invalid: this.hasError
    });
  };

  changeValue = detail => {
    if (detail.value !== Number.NaN) {
      this.value = detail.value;
    }
    this.dispatchEvent(new CustomEvent("spinner-change", { detail }));
  };
}

customElements.define("mv-spinner", MvSpinner);