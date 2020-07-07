import { stripe_service } from '../services/stripe_service';

export const getOAuthLink = () => {
    return stripe_service.getOAuthLink().then(data => {
        if (data.url) {
            window.location = data.url;
        } else {
            console.log("data", data);
        }
    });
};