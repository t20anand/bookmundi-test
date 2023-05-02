// Task 1
const app = (()=>{
    const changeClass = (selector, className) => {
        let elements = document.querySelectorAll(selector);
        elements.forEach((element)=>{
            element.className = className;
        });
    }

    const getDataSet = (selector) => document.querySelector(selector).dataset;

    const addElement = (selector, element) => {
        document.querySelector(selector).appendChild(element);
    }

    const setValue = (selector, value) => {
        document.querySelector(selector).value = value;
    }

    const getValue = (selector) => document.querySelector(selector).value;

    const ajax = ({url, method, data}, callback) => {
        let allowedMethod = ["GET", "POST"];
        
        if(!url || "" == url.trim() || null == url)
            throw new Error("Missing URL");

        if(!method || "" == method.trim() || null == method || !allowedMethod.includes(method)) 
            throw new Error("Missing Method");
        
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if(4 == xhr.readyState && 200 == xhr.status) {
                callback(xhr.responseText);
            }
        }
        
        xhr.open(method, url, true);

        if("POST" == method) {
            xhr.setRequestHeader("Content-type", "application/json");
            try {
                let parseData = JSON.stringify(data);
                xhr.send(parseData);
            } catch (error) {
                throw new Error("Invalid Data");
            }
        } else {
            xhr.send();
        }
    }

    
    return {
        changeClass,
        getDataSet,
        addElement,
        setValue,
        getValue,
        ajax,
        get: (url, callback) => {
            ajax({url : url, method : "GET"}, callback);
        }
    }
})(); 

// Task 2
const simultaneousRequest = () => {

    const handleResponse = () => {
        if (xhr1.readyState === 4 && xhr2.readyState === 4 && xhr3.readyState === 4) {
          if (xhr1.status === 200 && xhr2.status === 200 && xhr3.status === 200) {
            console.log("Response:=> " + xhr1.responseText  + "//" + xhr2.responseText + "/" + xhr3.responseText);
          } else {
            console.log("Error:=> " + xhr1.statusText  + "//" + xhr2.statusText + "/" + xhr3.statusText);
          }
        }
    }

    let xhr1 = new XMLHttpRequest();
    let formData = new FormData();

     
    xhr1.onreadystatechange = handleResponse;
    xhr1.open('POST', 'http://localhost/bookmundi-test/task4.php');
    formData.set("id", 1);
    formData.set("value", "Anand");
    xhr1.send(formData);
    
    let xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = handleResponse;
    xhr2.open('POST', 'http://localhost/bookmundi-test/task4.php');
    formData.set("id", 2);
    formData.set("value", "Kumar");
    xhr2.send(formData);
    
    let xhr3 = new XMLHttpRequest();
    xhr3.onreadystatechange = handleResponse;
    xhr3.open('POST', 'http://localhost/bookmundi-test/task4.php');
    formData.set("id", 3);
    formData.set("value", "Shah");
    xhr3.send(formData);
}

// Task 3
const enableCopy = (selector) => {
    let elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
        element.addEventListener("dblclick",  () => {
            navigator.clipboard.writeText(element.innerText).then(() => {
                navigator.clipboard.readText().then((copiedText) => alert('Text copied: '+copiedText));
            });
        })
    });
}

// Task 4
const bindInput2WayData = (selector1, selector2) => {
    let aname = document.querySelector(selector1);
    let bname = document.querySelector(selector2);
    
    aname.addEventListener('input', () => bname.value = aname.value);
    bname.addEventListener('input', () => aname.value = bname.value);
}
