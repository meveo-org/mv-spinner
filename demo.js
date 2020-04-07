import { LitElement, html, css } from "lit-element";
import "mv-container";
import "./mv-spinner.js";

export class MvInputDemo extends LitElement {
  static get properties() {
    return {
      detail: { type: Object, attribute: false },
      theme: { type: String, attribute: true },
      hasError: { type: Boolean, attribute: false, reflect: true },
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        font-size: var(--font-size-m, 10pt);
      }

      mv-container {
        --mv-container-min-width: 300px;
        --mv-container-min-height: 200px;
        --mv-container-margin: 20px auto;
        --mv-container-padding: 20px 30px;
      }

      i {
        font-style: normal;
        color: #00b7ff;
        font-weight: bold;
        font-size: 1.2em;
      }

      fieldset > label,
      label > spinner {
        cursor: pointer;
      }

      fieldset {
        width: 120px;
        margin-left: 10px;
        border: 2px solid red;
        -moz-border-radius: 8px;
        -webkit-border-radius: 8px;
        border-radius: 8px;
        color: #818181;
      }

      legend {
        font-weight: 500;
        color: red;
      }

      .prefix-suffix {
        --mv-spinner-prefix-width: 24px;
        --mv-spinner-suffix-width: 24px;
      }
    `;
  }

  constructor() {
    super();
    this.detail = {};
    this.hasError = false;
    this.theme = "light";
    this.customValue = 50;
  }

  render() {
    const { theme } = this;
    return html`
      <fieldset>
        <legend>Theme</legend>
        <label>
          <input
            type="radio"
            name="theme"
            value="light"
            checked
            @change="${this.changeTheme}"
          />Light
        </label>
        <label>
          <input
            type="radio"
            name="theme"
            value="dark"
            @change="${this.changeTheme}"
          />Dark
        </label>
      </fieldset>
      <mv-container .theme="${theme}">
        <h2>Default</h2>
        <mv-spinner
          name="default"
          placeholder="Default"
          @spinner-change="${this.changeValue}"
        ></mv-spinner>

        <h2>Rounded</h2>
        <mv-spinner
          name="rounded"
          placeholder="Rounded"
          rounded
          @spinner-change="${this.changeValue}"
        ></mv-spinner>

        <h2>Has error if value < 0</h2>
        <mv-spinner
          name="has error"
          placeholder="Error"
          ?has-error="${this.hasError}"
          @spinner-change="${this.changeError}"
        ></mv-spinner>

        <h2>Disabled</h2>
        <mv-spinner
          name="disabled"
          placeholder="Disabled"
          @spinner-change="${this.changeValue}"
          disabled
        ></mv-spinner>

        <h2>Required</h2>
        <mv-spinner
          name="required"
          placeholder="Required"
          @spinner-change="${this.changeValue}"
          required
        ></mv-spinner>

        <h2>Immediate</h2>
        <mv-spinner
          name="immediate"
          placeholder="Immediate"
          @spinner-change="${this.changeValue}"
          immediate
        ></mv-spinner>

        <h2>Custom default value=50 and step=0.005</h2>
        <mv-spinner
          name="custom"
          placeholder="Custom value"
          .value="${this.customValue}"
          step="0.005"
          precision="2"
          @spinner-change="${this.changeCustomValue}"
        ></mv-spinner>

        <h2>min=0, max = 5</h2>
        <mv-spinner
          name="min-max"
          placeholder="mininum: 0, maximum: 5"
          @spinner-change="${this.changeValue}"
          min="0"
          max="5"
        ></mv-spinner>
      </mv-container>
      <mv-container .theme="${theme}">
        <pre>${JSON.stringify(this.detail, null, 2)}</pre>
      </mv-container>
    `;
  }

  changeValue = (event) => {
    const { detail } = event;
    this.detail = detail;
  };

  changeError = (event) => {
    const { detail } = event;
    this.detail = detail;
    this.hasError = detail.invalid || detail.value < 0;
  };

  changeCustomValue = (event) => {
    const { detail } = event;
    this.detail = detail;
    this.customValue = detail.value;
  };

  changeTheme = (originalEvent) => {
    this.theme = originalEvent.target.value;
  };
}

customElements.define("mv-spinner-demo", MvInputDemo);
