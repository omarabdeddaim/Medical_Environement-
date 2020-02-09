import React from "react";
import { render } from "react-dom";
import ReactDOM from "react-dom";

import FullCalendar from "sardius-fullcalendar-wrapper";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import Modal from "./Modal";

const today = new Date();
const tomorrow = new Date();

class Calendar1 extends React.Component {
  constructor(props) {
    super(props);
    // Create a reference to the component to use Full Calendar methods
    this.calendarApiRef = React.createRef();
    this.state = {
      isShowing: false,
      eventLimit: true,
      events: [
        {
          title: "omar",
          start: today
        },
        {
          title: "Example Event",
          start: tomorrow.setDate(today.getDate() + 1)
        }
      ]
    };
  }
  openModalHandler = () => {
    this.setState({
      isShowing: true
    });
  };

  closeModalHandler = () => {
    this.setState({
      isShowing: false
    });
  };

  eventClicked = () => {
    this.setState({
      isShowing: true
    });
  };

  getView = () => {
    // Use reference to call Full Calendar Methods
    const view = this.calendarApiRef.current.calendar.getView();
  };

  selectEvent = selectionInfo => {
    this.setState({
      isShowing: false
    });
  };

  render() {
    return (
      <>
        <FullCalendar
          ref={this.calendarApiRef}
          nowIndicator
          header={{
            left: "prev,today,next",
            center: "title",
            right: "dayGridMonth, dayGridWeek, dayGridDay"
          }}
          navLinks
          events={this.state.events}
          select={selectionInfo => {
            this.selectEvent(selectionInfo);
          }}
          // Another example of a callback / handler function
          eventClick={eventClickInfo => {
            this.eventClicked(eventClickInfo);
          }}
          dateClick={this.handleDateClick}
          plugins={[interactionPlugin, dayGridPlugin]}
          editable
          selectable
          snapDuration="00:05"
          allDaySlot={false}
          defaultView="dayGridMonth"
        />
        <div>
          {this.state.isShowing ? (
            <div onClick={this.closeModalHandler} className="back-drop"></div>
          ) : null}

          <button className="open-modal-btn" onClick={this.eventClicked}>
            Open Modal
          </button>

          <Modal
            className="modal"
            show={this.state.isShowing}
            close={this.closeModalHandler}
          >
            Modal Realised for medecin
          </Modal>
        </div>
      </>
    );
  }
  handleDateClick = arg => {};
}

render(<Calendar1 />, document.getElementById("root"));
