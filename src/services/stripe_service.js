import axios from 'axios';

class StripeService {
    getOAuthLink() {
        return new Promise((resolve, reject) => {
            axios.get("/get-oauth-link")
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => { 
                reject(err);
            });
        });
    }
}

export const stripe_service = new StripeService();