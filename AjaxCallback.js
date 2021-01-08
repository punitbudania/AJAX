let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime()
{
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "Secs";
}

function makeAJAXCall(methodType, url, callback, async = true, data = null)
{
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        //console.log(methodType + " State changed called, ready state: " + xhr.readyState + " status: " + xhr.status);
        if(xhr.readyState === 4)
        {
            if (xhr.status === 200 || xhr.status === 201)
            {
                callback(xhr.responseText);
            }
            else if(xhr.status >= 400)
            {
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
}

const getURL = "http://localhost:3000/employees";
function getUserDetails(data)
{
    console.log("Get user data: " + data);
}
makeAJAXCall("GET", getURL, getUserDetails, true);

const deleteURL = "http://localhost:3000/employees/1";
function userDeleted(data)
{
    console.log("User Deleted " + data);
}
makeAJAXCall("DELETE", deleteURL, userDeleted, false);

const postURL = "http://localhost:3000/employees";
const emplData = {"name": "Harry", "salary": "5000"};
function userAdded(data)
{
    console.log("User added: " + data);
}
makeAJAXCall("POST", postURL, userAdded, true, emplData);