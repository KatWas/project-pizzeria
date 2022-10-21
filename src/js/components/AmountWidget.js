import { settings, select} from '../settings.js';

class AmountWidget {
  constructor(element) {
    const thisWidget = this;
    thisWidget.getElements(element);
    //console.log('AmountWidget:', thisWidget);
    //console.log('consrucrot argument:', element);
    thisWidget.setValue(
      thisWidget.input.value || settings.amountWidget.defaultValue
    );
    thisWidget.initActions();
  }

  getElements(element) {
    const thisWidget = this;

    thisWidget.element = element;
    thisWidget.input = thisWidget.element.querySelector(
      select.widgets.amount.input
    );
    thisWidget.linkDecrease = thisWidget.element.querySelector(
      select.widgets.amount.linkDecrease
    );
    thisWidget.linkIncrease = thisWidget.element.querySelector(
      select.widgets.amount.linkIncrease
    );
  }

  setValue(value) {
    const thisWidget = this;

    // console.log(thisWidget.value, 'thisssssssssssssssssss');

    /* czy mogłem to tak zapisac!!!!!!!!!!!!!!!
      const newValue = parseInt(value);
      if (thisWidget.value !== newValue) {
        thisWidget.value == newValue;
      } else {
        if (isNaN(newValue)) thisWidget.value == newValue;
      }
      */
    const newValue = parseInt(value);
    if (
      thisWidget.value !== newValue &&
        !isNaN(newValue) &&
        newValue >= settings.amountWidget.defaultMin &&
        newValue <= settings.amountWidget.defaultMax
    ) {
      thisWidget.value = newValue; // on mi ustawia wartoś inpouta
      // console.log(thisWidget.value, 'this value');
    }
    thisWidget.input.value = thisWidget.value;
    thisWidget.announce();
    //settings.amountWidget.defaultMax
  }

  initActions() {
    const thisWidget = this;

    thisWidget.input.addEventListener('change', function () {
      thisWidget.setValue(thisWidget.input.value);
    });
    thisWidget.linkDecrease.addEventListener('click', function (event) {
      event.preventDefault();
      thisWidget.setValue(thisWidget.value - 1);
    });

    thisWidget.linkIncrease.addEventListener('click', function (event) {
      event.preventDefault;
      thisWidget.setValue(thisWidget.value + 1);
    });
  }

  announce() {
    const thisWidget = this;
    const event = new CustomEvent('updated', {
      bubbles: true,
    });
    thisWidget.element.dispatchEvent(event);
  }
}
export default AmountWidget;