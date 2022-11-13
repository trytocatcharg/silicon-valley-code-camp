import { useContext, memo } from "react";
import { SpeakerFilterContext } from "../contexts/SpeakFilterContext";

function Session({ title, room }) {
    return (
      <span className="session w-100">
        {title} <strong>Room: {room.name}</strong>
      </span>
    );
  }
  
  function Sessions({ sessions }) {
    const {eventYear} = useContext(SpeakerFilterContext);

    return (
      <div className="sessionBox card h-250">
        {
          sessions
            .filter((s) => s.eventYear === eventYear)
            .map((s) => {
              return (
                <div className="session w-100" key={s.id}> 
                  <Session {...s} />
                </div>
              )
            })
        }
        <Session {...sessions[0]} />
      </div>
    );
  }
  
  function SpeakerImage({ id, first, last }) {
    return (
      <div className="speaker-img d-flex flex-row justify-content-center align-items-center h-300">
        <img
          className="contain-fit"
          src={`/images/speaker-${id}.jpg`}
          width="300"
          alt={`${first} ${last}`}
        />
      </div>
    );
  }

  function SpeakerFavorite({favorite, onFavoriteToggle}) {

    function doneCallback() {
      console.log('lala');
    }

    return (
      <div className="action padB1">
        <span
          onClick={() => {
            return onFavoriteToggle(doneCallback);
          }}
         >
          <i className={
            favorite ? 'fa fa-star orange' :  'fa fa-star-o orange'
          }>{" "}
          Favorite {" "}
          </i>
        </span>
      </div>
    )
  }
  
  function SpeakerDemographics({
    first,
    last,
    bio,
    company,
    twitterHandle,
    favorite,
    onFavoriteToggle
  }) {
    return (
      <div className="speaker-info">
        <div className="d-flex justify-content-between mb-3">
          <h3 className="text-truncate w-200">
            {first} {last}
          </h3>
        </div>
        <SpeakerFavorite
           favorite={favorite}
           onFavoriteToggle={onFavoriteToggle}
         />
        <div>
          <p className="card-description">{bio}</p>
          <div className="social d-flex flex-row mt-4">
            <div className="company">
              <h5>Company</h5>
              <h6>{company}</h6>
            </div>
            <div className="twitter">
              <h5>Twitter</h5>
              <h6>{twitterHandle}</h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const Speaker = memo(function Speaker({ speaker, showSessions, onFavoriteToggle }) {
    const { id, first, last, sessions } = speaker;
    return (
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-sm-12 col-xs-12">
        <div className="card card-height p-4 mt-4">
          <SpeakerImage id={id} first={first} last={last} />
          <SpeakerDemographics {...speaker} onFavoriteToggle={onFavoriteToggle} />
        </div>
        {showSessions=== true &&
          <Sessions sessions={sessions} />
        }
      </div>
    );
  }, areEqualSpeaker);

  function areEqualSpeaker (prevProps, nextProps) {
    return (prevProps.speaker.favorite === nextProps.speaker.favorite);
  }
  
  export default Speaker;