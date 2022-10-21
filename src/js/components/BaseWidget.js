class BaseWidget {
  constructor (wrraperElement, initialValue){
    const thisWidget = this;

    thisWidget.dom = {};
    thisWidget.dom.wrapper = wrraperElement;

    thisWidget.value = initialValue;

  }
}
export default BaseWidget;