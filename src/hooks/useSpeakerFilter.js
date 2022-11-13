import { useState } from "react";

const useSpeakerFilter = (startingShowSessions, startingEventYear) => {
  const [showSessions, setShowSessions] = useState(startingShowSessions);
  const [eventYear, setEventYear] = useState(startingEventYear);
  const [searchQuery, setSearchQuery] = useState('');

  const EVENT_YEARS = [ ...Array(11) ].map((e, i) => (2008+i).toString());


  return {
    showSessions,
    setShowSessions,
    eventYear,
    setEventYear,
    searchQuery,
    setSearchQuery,
    EVENT_YEARS
  };
}

export default useSpeakerFilter;