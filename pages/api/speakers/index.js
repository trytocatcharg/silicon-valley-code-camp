import {data} from '../../../SpeakerData';
export default async function handler (req, res) {

    res.setHeader('Contenty-type', "application/json");
    return res.status(200).send(JSON.stringify(data, null, 2));
}