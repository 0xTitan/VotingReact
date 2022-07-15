import { useState, useEffect } from "react";
import "./EventDisplayer.css";

function EventDisplayer({ raisedEvent, showEvent }) {
  useEffect(() => {
    const interval = setInterval(() => {
      if (raisedEvent && raisedEvent.length > 0) {
        showEvent("");
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [raisedEvent, showEvent]);

  return (
    <div>
      {raisedEvent.length > 0 && (
        <div className="eventDisplayer-container">
          <span>{raisedEvent}</span>
        </div>
      )}
    </div>
  );
}

export default EventDisplayer;
