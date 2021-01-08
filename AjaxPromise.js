let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime()
{
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "Secs";
}

function makePromiseCall(methodType, url, async = true, data = null)
{
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            //console.log(methodType + " State changed called, ready state: " + xhr.readyState + " status: " + xhr.status);
            if(xhr.readyState === 4)
            {
                if (xhr.status === 200 || xhr.status === 201)
                {
                    resolve(xhr.responseText);
                }
                else if(xhr.status >= 400)
                {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("handle 400 client error or 500 server error at: " + showTime());
                }
            }
        }
        xhr.open(methodType, url, async);
        if(data)
        {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        }
        else xhr.send();
        console.log(methodType + " request sent to the server at: " + showTime());    
    });
}

const getURL = "http://localhost:3000/employees";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get user data: " + responseText)
    })
    .catch(error => console.log("Get error status: " + JSON.stringify(error)));

const deleteURL = "http://localhost:3000/employees/2";
makePromiseCall("DELETE", deleteURL, false)
    .then(responseText => {
        console.log("User deleted: " + responseText)
    })
    .catch(error => console.log("Get error status: " + JSON.stringify(error)));

const postURL = "http://localhost:3000/employees";
const emplData = {"name": "Jerry", "salary": "9000"};
makePromiseCall("POST", postURL, true, emplData)
    .then(responseText => {
        console.log("User added: " + responseText)
    })
    .catch(error => console.log("Get error status: " + JSON.stringify(error)));
