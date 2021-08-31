const RESERVED_KEYWORDS = ['_HIDE', '_EXAMPLE'];
const button_type = {
    BLOCK: 'block',
    UNBLOCK: 'unblock'
};

// let storedData = browser.storage.local.get();
// storedData.then(data => {
//     let showFilteredResults = getOptionsOrDefault(data);
//     let filteredDomains = getBlacklistOrDefault(data);

//     let list = document.querySelector('#blacklist');


//     /**
//      * Other useful commands: 
//      * document.body.onload = addElement;

//         function addElement () {
//             // create a new div element
//             const newDiv = document.createElement("div");

//             // and give it some content
//             const newContent = document.createTextNode("Hi there and greetings!");

//             // add the text node to the newly created div
//             newDiv.appendChild(newContent);

//             // add the newly created element and its content into the DOM
//             const currentDiv = document.getElementById("div1");
//             document.body.insertBefore(newDiv, currentDiv);
//         }
//      */
//     for (let domain of filteredDomains) {
//         // Create the list item:
//         let listItem = document.createElement('li');
//         let removeButton = document.createElement('button');
//         removeButton.innerHTML = "Remove";
//         removeButton.onclick = getBlacklistRemoveCallback(domain);
//         removeButton.classList.add("remove");
//         // Set its contents:
//         listItem.appendChild(removeButton);
//         listItem.appendChild(document.createTextNode(domain));

//         // Add it to the list:
//         list.appendChild(listItem);
//     }

//     let checkShowFilteredResults = document.querySelector('#checkShowFiltered');
//     checkShowFilteredResults.checked = showFilteredResults;
//     checkShowFilteredResults.addEventListener('change', (event) => {
//         storeShowFilteredOption();
//     });
// });

// function storeShowFilteredOption() {
//     let checkbox = document.querySelector('#checkShowFiltered');
//     let checked = checkbox.checked;
//     browser.storage.local.set({
//         "showFilteredResults": checked
//     });
// }

// function getBlacklistRemoveCallback(domain) {
//     return function () { removeItemFromBlacklist(domain); };
// }

// function removeItemFromBlacklist(domain) {
//     browser.storage.local.get('filteredDomains')
//         .then((storedData) => {
//             if (!storedData.filteredDomains) {
//                 storedData.filteredDomains = [];
//             }
//             let blacklist = storedData.filteredDomains;
//             if (blacklist.includes(domain)) {
//                 blacklist.splice(blacklist.indexOf(domain), 1);
//             }
//             browser.storage.local.set({
//                 "filteredDomains": blacklist
//             });
//         });
// }

// // Convert to map, which will allow for more options in fucture
// function getOptionsOrDefault(data) {
//     /* Return "Show Filtered Results on Page or default (true)" */
//     if (data.showFilteredResults === null) {
//         return true;
//     }
//     return data.showFilteredResults;
// }


// // Convert to Map
// function getBlacklistOrDefault(data) {
//     /* Return stored blacklist of domain or empty array [] */
//     if (!data.filteredDomains) {
//         return [];
//     }
//     return data.filteredDomains;
// }






// /**
//  * Currently uses a list (BAD)
//  * Change to a dictionary
//  * Identify google result root by looking at the the "cite" element for each result, class="iUh30 Zu0yb qLRx3b tjvcx"
//  */


//  function filterResults(mutationsList) {
//     /* Identify all results whose data-domain attribute matches one in the blacklist
//         and then apply filtering to it so that its not visible.
//     */
//     let storedData = browser.storage.local.get();
//     storedData.then((data) => {
//         let showFilteredResults = getOptionsOrDefault(data);
//         let filteredDomains = getBlacklistOrDefault(data);
//         mutationsList.forEach((mutation) => {
//             if (mutation.type === 'childList') { // a child node was added
//                 mutation.addedNodes.forEach((node) => {
//                     if (node.classList.contains('result')) {
//                         let liveNode = document.querySelector("#" + node.id);
//                         let gotFiltered = false;
//                         for (let blacklistedDomain of filteredDomains) {
//                             let liveNode = document.querySelector("#" + node.id);
//                             nodeDomain = liveNode.dataset.domain;
//                             if (nodeDomain && nodeDomain.includes(blacklistedDomain)) {
//                                 if (showFilteredResults) {
//                                     wrapAndCollapseResult(liveNode);
//                                 } else {
//                                     liveNode.remove();
//                                 }
//                                 gotFiltered = true;
//                                 break;
//                             }
//                         }
//                         if (!gotFiltered && liveNode.dataset.domain !== undefined) {
//                             // if its a valid result node add a button to allow filtering
//                             addBlacklistButton(liveNode);
//                         }
//                     }
//                 }
//                 );
//             }
//         });
//     });
// }

// function getOptionsOrDefault(data) {
//     /* Return "Show Filtered Results on Page or default (true)" */
//     if (data.showFilteredResults === null) {
//         return true;
//     }
//     return data.showFilteredResults;
// }

// // TODO: Convert to dictionary
// function getBlacklistOrDefault(data) {
//     /* Return stored blacklist of domain or empty array [] */
//     if (!data.filteredDomains) {
//         return [];
//     }
//     return data.filteredDomains;
// }

// function addBlacklistButton(elem) {
//     /* add <a> element that triggers addDomainToFilter blacklist for a given result */
//     let filterBtn = document.createElement('a');
//     filterBtn.id = "filter_" + elem.id;
//     filterBtn.href = '#';
//     filterBtn.innerHTML = "Filter " + elem.dataset.domain + " from future searches";
//     filterBtn.onclick = function () { addDomainToFilter(elem.dataset.domain); };
//     filterBtn.classList.add('.feedback-prompt');
//     elem.parentNode.insertBefore(filterBtn, elem.nextSibling);
// }



/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Storage is the API to access key/value pairs
 * @param {string} domain 
 * @returns 
 */
function domainIsBlocklisted(domain) {
    var result = localStorage.getItem(domain);
    if (result === null || result === false) {
        return false;
    }
    return true;
}

function addDomainToFilter(domain) {
    /* Callback in onclick to add given domain to the blacklist */
    console.log('adding domain ' + domain);
    
    if (!domainIsBlocklisted(domain) && !RESERVED_KEYWORDS.includes(domain)) {
        //todo: parse domain and set as wildcard *.whatever.com        
        localStorage.setItem(domain, true);
    }  else {
        console.log('item already blocklisted.');
    }
    console.log('done');
}
function toggleDomainInFilter(domain) {
    /* Callback in onclick to add given domain to the blacklist */
    console.log('toggle domain ' + domain);
    
    if (!RESERVED_KEYWORDS.includes(domain)) {
        if (!domainIsBlocklisted(domain)) {
            //todo: parse domain and set as wildcard *.whatever.com        
            localStorage.setItem(domain, true);
        }  else {
            localStorage.removeItem(domain);
            console.log('removed domain from blocklist.');
        }
    }
    
    console.log('done');
}

function readDomainFilter(domain) {
    /* Callback in onclick to add given domain to the blacklist */
    for(var i =0; i < localStorage.length; i++){
        console.log(localStorage.getItem(localStorage.key(i)));
    }
}

function wrapAndCollapseResult(resultNode, domain) {
    /* Wrap the blacklisted result with a <details> element so we can autocollapse it */
    let wrapper = document.createElement('details');
    wrapper.id = resultNode.id + "_wrapper";
    wrapper.classList.add('.feedback-prompt');

    let filterSummary = document.createElement('summary');
    filterSummary.textContent = "Filtered " + domain + " from results";

    wrapper.appendChild(filterSummary);
    resultNode.parentNode.insertBefore(wrapper, resultNode);
    
    // let spacer = document.createElement('div');
    // spacer.classList.add('vert-spacer');
    // wrapper.appendChild(spacer);
    wrapper.appendChild(resultNode);
    return wrapper;
    // wrapper.append(spacer)
    // wrapper.append(spacer);
}

// /*
// register the observer on the results page to watch for child node changes on the results div
// that are elements with a data-domain element.
// */

// // Calls filterResults when changes occur in the DOM

function getToggledButtonText(currButtonText) {
    switch (currButtonText) {
        case button_type.BLOCK:
            return button_type.UNBLOCK;
        // Do something for summer beginning
        case button_type.UNBLOCK:
            return button_type.BLOCK;
    }
}

function createButton(buttonName, url) {
    let but = document.createElement('a')
    // but.textContent
    but.href = '#';
    but.innerHTML = buttonName;
    but.classList.add('blocklist-button');
    but.onclick = function () { 
        console.log('you clicked the button'); 
        addDomainToFilter(url);
        // readDomainFilter(url);
    };
    but.classList.add('.feedback-prompt');
    return but;
}
function createToggleButton(buttonName, url) {
    let but = document.createElement('a')
    // but.textContent
    but.href = '#';
    but.innerHTML = buttonName;
    but.classList.add('blocklist-button');
    but.onclick = function () { 
        console.log('you clicked the button'); 
        toggleDomainInFilter(url);
        console.log('but.innerText = ' + but.innerText);
        var arr = but.innerText.split(' ');
        console.log('arr = ' + arr);
        var newValue = getToggledButtonText(arr[0]);
        console.log('newValue = ' + newValue)
        but.innerHTML = newValue + ' ' + arr[1];
        // readDomainFilter(url);
    };
    but.classList.add('.feedback-prompt');
    return but;
}


document.body.style.border = "5px solid red";
console.log('you should see this on page load');

// document.body.textContent = "";

// var header = document.createElement('h1');
// var wrapper = document.createElement('div');
// var styler = document.createAttribute( 'style')
// styler.value = "background-color:blue";
// wrapper.style('background-color:blue')

// header.textContent = "This page has been eaten";
// wrapper.appendChild(header)
// document.body.appendChild(header);



// document.body.appendChild(createButton('BUTTON HERE!'));





/**
 * Create an observer that will observe the first element that is found
 * @param {string} query : string to uqery for
 * @returns 
 */
function createObserver(query) {
    // Options for the observer (which mutations to observe)
    const config = { attributes: true, href: true };

    // Callback function to execute when mutations are observed
    const callback = function(mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                console.log('A child node has been added or removed.');
            }
            else if (mutation.type === 'attributes') {
                console.log('The ' + mutation.attributeName + ' attribute was modified.');
            }
        }
    };

    let resultsObserver = new MutationObserver(callback);

    // select element to watch
    let resultDiv = document.querySelector(query);

    console.log(resultDiv)
    // if any elements match the query
    if (resultDiv) {
        resultsObserver.observe(resultDiv, config);
    }    
    return resultsObserver;
}


function insertButtonBeforeQuery(qSelector, thingToInsert) {
    let elem = document.querySelector(qSelector);
    elem.parentNode.insertBefore(thingToInsert, elem.nextSibling);
}
function insertButtonBeforeElement(elem, thingToInsert) {
    elem.parentNode.insertBefore(thingToInsert, elem);
}


function addButtonsBeforeLinks() {
    // largest container that has relevant unique url
    let results = document.getElementsByClassName('g');
    let arr = [];
    if (results) {
        for (const val of results) {
            // selects all websites regardless of if they are recommending theri base page or not 
            // ex. finds "msn.com > en-us > Sports" and "foxnews.com"
            linkPart = val.querySelector('cite')
            // handles the discrepency in the above format, selects url
            parsedUrl = linkPart.innerText.split(' ')[0];
            console.log(parsedUrl);
            
            
            // remove if it matches this statement
            if (domainIsBlocklisted(parsedUrl)) {
                // formatting errors caused by div: id="eob_14", very first search result is blacklisted.
                button = createToggleButton(button_type.UNBLOCK + ' ' + parsedUrl, parsedUrl);
                wrapper = wrapAndCollapseResult(val, parsedUrl);
                insertButtonBeforeElement(val, button);
            } else {
                button = createToggleButton(button_type.BLOCK + ' ' + parsedUrl, parsedUrl);
                insertButtonBeforeElement(val, button);
                arr.push(parsedUrl);
            }
            
            // console.log(val.firstElementChild.previousSibling.data);
        }
        
    }
    console.log(arr);
}

// let observer = createObserver('.g')
// let resultsObserver = createObserver(':link')
// let button2 = createButton('Button2');
// let button3 = createButton('Button3');
// insertButtonBeforeQuery(':link', button2);
// insertButtonBeforeQuery(':link', button3);

// represents result with span
// example: msn.com > en-us > Sports
addButtonsBeforeLinks();

// document.body.appendChild(wrapper);

// gbqfbb

// document.body.onload = addElement;

// function addElement () {
//   // create a new div element
//   const newDiv = document.createElement("div");

//   // and give it some content
//   const newContent = document.createTextNode("Hi there and greetings!");

//   // add the text node to the newly created div
//   newDiv.appendChild(newContent);

//   // add the newly created element and its content into the DOM
//   const currentDiv = document.getElementsByClassName("gNO89b");
//   console.log(currentDiv);
//   for (let current in currentDiv) {
//       console.log(current);
//       current.appendChild(newDiv)
//   }
// //   document.body.insertBefore(newDiv, currentDiv);
// }
// function addElement () {
//   // create a new div element
//   const newDiv = document.createElement("div");

//   // and give it some content
//   const newContent = document.createTextNode("Hi there and greetings!");

//   // add the text node to the newly created div
//   newDiv.appendChild(newContent);

//   // add the newly created element and its content into the DOM
//   const currentDiv = document.getElementById("div1");
//   document.body.insertBefore(newDiv, currentDiv);
// }

// var data = JSON.parse({'classname': 'hello', 'color': 'blue'});
// var div = document.createElement("div");
// div.className = data.className;
// div.textContent = "Your favorite color is now " + data.color;
// addonElement.appendChild(div);