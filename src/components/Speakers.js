import SpeakersList from "./SpeakersList";
import SpeakersToolbar from "./SpeakersToolbar";
import { SpeakerFilterProvider } from "../contexts/SpeakFilterContext";


function Speakers () {

    return (
        <SpeakerFilterProvider startingShowSessions={false}>
            <SpeakersToolbar />
            <SpeakersList  />
        </SpeakerFilterProvider>
    )
}

export default Speakers;