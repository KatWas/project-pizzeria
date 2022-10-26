import { select, settings, templates } from '../settings.js';
import utils from '..utils/';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';



class Booking {
  constructor(element) {
    const thisBooking = this;

    thisBooking.render(element);
    thisBooking.initWidget();
    thisBooking.getData();
  }
  getData(){
    const thisBooking = this;

    const startDateParam = settings.db.dateStartParamKey + '=' + utils.dateToStr(thisBooking.datePicker.minDate),
    const endDateParam = settings.db.dateEndParamKey + '=' + utils.dateToStr(thisBooking.datePicker.maxDate),

    const params = {
      booking:[
        startDateParam,
        endDateParam,
        
      ],
      eventsCurrent:[
        settings.db.notRepeatParam,
        startDateParam,
        endDateParam,
      ],
      eventsRepeat:[
        settings.db.repeatParam,
        endDateParam,
       
      ],
    };
    //console.log('getData params', params);

    const urls = {
      booking:       settings.db.url + '/' + settings.db.bookings 
                                     + '?' + params.booking.join('&'), 
      eventsCurrent: settings.db.url + '/' + settings.db.events   
                                     + '?' + params.eventsCurrent.join('&'),
      eventsRepeat:  settings.db.url + '/' + settings.db.events   
                                     + '?' + params.eventsRepeat.join('&'),
    };
    //console.log('getData urls', urls);

    fetch(urls.bookings)
      .then(function(bookingsResponse){
        return bookingsResponse.json();
      })
      .then(function(bookings){
        console.log(bookings);
      });
  }

  render(element) {
    const thisBooking = this;

    const generatedHTML = templates.bookingWidget();

    thisBooking.dom = {};
    thisBooking.dom.wrapper = element;
    thisBooking.dom.wrapper.innerHTML = generatedHTML;

    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(
      select.booking.peopleAmount
    );
    thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(
      select.booking.hoursAmount
    );
    thisBooking.dom.datePicker = thisBooking.dom.wrapper.querySelector(
      select.widgets.datePicker.wrapper
    );
    thisBooking.dom.hourPicker = thisBooking.dom.wrapper.querySelector(
      select.widgets.hourPicker.wrapper
    );

  }

  initWidget() {
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.dom.peopleAmount.addEventListener('click', function () {});

    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
    thisBooking.dom.hoursAmount.addEventListener('click', function () {});

    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);
    thisBooking.dom.hourPicker.addEventListener('click', function () {});

    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
    thisBooking.dom.datePicker.addEventListener('click', function () {});
   
  }

}

export default Booking;