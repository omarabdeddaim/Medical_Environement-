import React from "react";
import { render } from "react-dom";
//import ReactDOM from "react-dom";
import "./Modal.css";

import FullCalendar from "sardius-fullcalendar-wrapper";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import Modal from "./Modal";
import Draggable from "react-draggable";

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
      activeDrags: 0,
      deltaPosition: {
        x: 0,
        y: 0
      },
      controlledPosition: {
        x: 0,
        y: 0
      },
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
  // Drag
  handleDrag = (e, ui) => {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY
      }
    });
  };

  onStart = () => {
    this.setState({ activeDrags: ++this.state.activeDrags });
  };

  onStop = () => {
    this.setState({ activeDrags: --this.state.activeDrags });
  };

  // For controlled component
  adjustXPos = e => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = this.state.controlledPosition;
    this.setState({ controlledPosition: { x: x - 10, y } });
  };

  adjustYPos = e => {
    e.preventDefault();
    e.stopPropagation();
    const { controlledPosition } = this.state;
    const { x, y } = controlledPosition;
    this.setState({ controlledPosition: { x, y: y - 10 } });
  };

  onControlledDrag = (e, position) => {
    const { x, y } = position;
    this.setState({ controlledPosition: { x, y } });
  };

  onControlledDragStop = (e, position) => {
    this.onControlledDrag(e, position);
    this.onStop();
  };
  // End drag

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPosition, controlledPosition } = this.state;

    return (
      <>
        <FullCalendar
          ref={this.calendarApiRef}
          nowIndicator
          header={{
            left: "prev,today,next",
            center: "title",
            right: "dayGridMonth, dayGridWeek, dayGridDay",
            center: "addEventButton"
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

        <Draggable
          position={controlledPosition}
          {...dragHandlers}
          onStop={this.onControlledDragStop}
        >
          <p className="center">
            <a href="#" onClick={this.adjustXPos}></a>

            <Modal
              className="center"
              show={this.state.isShowing}
              close={this.closeModalHandler}
            >
              Modal Realised for medecin
            </Modal>
          </p>
        </Draggable>
      </>
    );
  }
  handleDateClick = arg => {};
}

render(<Calendar1 />, document.getElementById("root"));
