class BaseWidget {
  constructor (wrraperElement, initialValue){
    const thisWidget = this;

    thisWidget.dom = {};
    thisWidget.dom.wrapper = wrraperElement;

    thisWidget.value = initialValue;

  }
  setValue(value) {
    const thisWidget = this;

    const newValue = thisWidget.parseValue(value);
    if ( newValue != thisWidget.value && thisWidget.isValid(newValue)) {
      thisWidget.value = newValue; 
      thisWidget.announce();
    }

    thisWidget.renderValue();
  }
  parseValue(value){
    return parseInt(value);
  }

  isValid(value){
    return !isNaN(value);
  }
}

export default BaseWidget;