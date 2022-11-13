import {data} from '../../SpeakerData'
import {useState, useEffect} from 'react';
import axios from 'axios';

export const REQUEST_STATUS = {
    LOADING: 'loading',
    SUCCESS: 'success',
    FAILURE: 'error'
}

export const useRequestSpeakers = (delayTime = 1000)  => {
    const [speakersData, setSpeakersData] = useState([]);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  
  
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
  
    useEffect(() => {
      try {
        async function delayFn() {
          // await delay(delayTime);
          const result = await axios.get('api/speakers')
          setSpeakersData(result.data);
          setRequestStatus(REQUEST_STATUS.SUCCESS);
        }
    
        delayFn();  
      } catch (error) {
        setRequestStatus(REQUEST_STATUS.FAILURE);
      }
    }, []);

    function onFavoriteToggle(id, doneCallback) {
        const speakersRecPrevious = speakersData.find(e => e.id === id);
    
        const speakerRecUpdated = {
          ...speakersRecPrevious,
          favorite: !speakersRecPrevious.favorite
        }
        const speakersDataNew = speakersData
                .map(rec => rec.id === id ? speakerRecUpdated : rec);
        async function delayUpdate() {
            setSpeakersData(speakersDataNew);
            await delay(delayTime);
            if (doneCallback) {
                doneCallback();
            }
        }
        delayUpdate();
      }

    return {
        speakersData,
        requestStatus,
        onFavoriteToggle
    }
}
