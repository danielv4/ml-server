

export const fetchx = (method, url, postData, callback) => {

    var params = {};
    params["method"] = method;
    params["headers"] = {'Content-Type': 'application/json'};

    if (method == 'POST') {
        params["body"] = JSON.stringify(postData);
    }

    fetch(url, params).then(response => {
        if (!response.ok) {
            callback(null, "fetch error");
            return
        }
        return response.json();
    }).then(data => {
        if(data?.status == 400) {
            callback(null, data);
            return
        } else {
            callback(data, null);
            return
        }
    }).catch((error) => {
        console.log(error);
    });
};


export const sendEmail = (data, callback) => {
    fetchx('POST', '/api/email/send', data, callback);
};


export const listEmails = (callback) => {
    fetchx('GET', '/api/email/list', null, callback);
};