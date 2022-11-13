import Speaker from "./Speaker";
import ReactPlaceHolder from 'react-placeholder';
import {REQUEST_STATUS, useRequestSpeakers} from '../hooks/useRequestSpeakers';
import { useContext } from "react";
import { SpeakerFilterContext } from "../contexts/SpeakFilterContext";

function SpeakersList({  showSessions }) {

  const {
    speakersData,
    requestStatus,
    onFavoriteToggle
  } = useRequestSpeakers(2000);

  const {searchQuery, eventYear} = useContext(SpeakerFilterContext);

  if (requestStatus === REQUEST_STATUS.FAILURE) {
    return <div>Error...</div>
  }

  return (
    <div className="container speakers-list">
      <ReactPlaceHolder
        type='media'
        rows={15}
        className="speakerslist-placeholder"
        ready={requestStatus === REQUEST_STATUS.SUCCESS}
      >
      <div className="row">
        {speakersData
          .filter((d) => {
            return (d.first.toLowerCase().includes(searchQuery) ||
            d.last.toLowerCase().includes(searchQuery))
          })
          .filter((d) => {
           return d.sessions.find((s) => {
              return s.eventYear === eventYear
            })
          })
          .map(function (speaker) {
            return <Speaker key={speaker.id} 
                speaker={speaker} showSessions={showSessions}
                onFavoriteToggle={(doneCallback) => {
                  onFavoriteToggle(speaker.id, doneCallback)
                }} />;
          })
        }
      </div>
      </ReactPlaceHolder>
    </div>
  );
}

export default SpeakersList;