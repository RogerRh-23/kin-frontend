const axios = require('axios');
const url = 'http://10.11.38.227:8000/empleados/';

(async () => {
    try {
        console.log('Axios version', require('../node_modules/axios/package.json').version);
        const res = await axios.get(url, { timeout: 5000 });
        console.log('HTTP', res.status);
        if (Array.isArray(res.data)) console.log('OK items=' + res.data.length);
        else console.log('OK no-data');
    } catch (e) {
        console.error('ERROR:', e && e.message ? e.message : e);
    }
})();
