function setInnerHTML(elm, html) {
    elm.innerHTML = html;
    
    Array.from(elm.querySelectorAll("script"))
      .forEach( oldScriptEl => {
        const newScriptEl = document.createElement("script");
        
        Array.from(oldScriptEl.attributes).forEach( attr => {
          newScriptEl.setAttribute(attr.name, attr.value) 
        });
        
        const scriptText = document.createTextNode(oldScriptEl.innerHTML);
        newScriptEl.appendChild(scriptText);
        
        oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
    });
  }

async function includeHTML() {
    /*loop through a collection of all HTML elements:*/
    const z = Array.from(document.getElementsByTagName("*"));

    return await Promise.all(z.filter(e => e.getAttribute("w3-include-html")).map((elmnt) => {
        return new Promise((resolve) => {
            const file = elmnt.getAttribute("w3-include-html");
            if (file) {
                /*make an HTTP request using the attribute value as the file name:*/
                const xhttp = new XMLHttpRequest();
                xhttp.onload = () => {
                    if (xhttp.status == 200) { 
                        // elmnt.innerHTML = xhttp.responseText;
                        setInnerHTML(elmnt, xhttp.responseText); 
                    }
                    if (xhttp.status == 404) { elmnt.innerHTML = "Page not found."; }
                    elmnt.removeAttribute("w3-include-html");
                    resolve(`Include ${file} Success`)
                };

                xhttp.open("GET", file, true);
                xhttp.send();
                /*exit the function:*/
                return;
            }
        })

    }))

    //Original Code
    // for (i = 0; i < z.length; i++) {
    //     elmnt = z[i];
    //     /*search for elements with a certain attribute:*/
    //     file = elmnt.getAttribute("w3-include-html");
    //     if (file) {
    //         /*make an HTTP request using the attribute value as the file name:*/
    //         xhttp = new XMLHttpRequest();
    //         xhttp.onreadystatechange = function () {
    //             if (this.readyState == 4) {
    //                 if (this.status == 200) { elmnt.innerHTML = this.responseText; }
    //                 if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
    //                 /*remove the attribute, and call this function once more:*/
    //                 elmnt.removeAttribute("w3-include-html");
    //                 // includeHTML();
    //             }
    //         }
    //         xhttp.open("GET", file, true);
    //         xhttp.send();
    //         /*exit the function:*/
    //         return;
    //     }
    // }
};
