import {IMLocalized} from "../config/i18n";

class RequestExpoAPI {
    async sendAPILike (token){
        fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-Encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: token,
                data: { extraData: 'Some data' },
                title: IMLocalized('notif_like_title'),
                body: IMLocalized('notif_like_body'),
            }),
        }).then(console.log).catch(console.log)
    };

    async sendAPIMatch (token){
        fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-Encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: token,
                data: { extraData: 'Some data' },
                title: IMLocalized('notif_match_title'),
                body: IMLocalized('notif_match_body'),
            }),
        }).then(console.log).catch(console.log)
    };
}
export default new RequestExpoAPI();