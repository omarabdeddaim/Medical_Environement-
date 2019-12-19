import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default class ScedulerCalendar extends Component {
  render() {
    return (
      <FullCalendar defaultView="dayGridMonth" plugins={[dayGridPlugin]} />
    );
  }
}
