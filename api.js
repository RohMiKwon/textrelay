import axios from 'axios/index';
import OksusuUtils from '../../../../../common/js/OksusuUtils';
import extend from 'object-extend';

const API = {
    TEXT_RELAY: '/api/sport/baseball/relay/text'
};

export default function (params) {
    let apiUrl = API.TEXT_RELAY,
        urlParam = {
            gameId: OksusuUtils.getUrlParam('gameId')
        };

    if(params) {
        return axios.get(apiUrl, {
            params: extend(urlParam, params)
        });
    }else {
        return axios.get(apiUrl, {
            params: urlParam
        });
    }
}

