import axios from 'axios';

class MetaDataService {
    getLinkMetaData(link) {
        return new Promise((resolve, reject) => {
            axios.post("/get-metadata", { targetUrl: link })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => { 
                reject(err);
            });
        });
    }
}

export const metadata_service = new MetaDataService();