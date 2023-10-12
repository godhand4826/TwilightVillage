async function getPodcastList() {
    const res = await fetch("https://asia-east1-cryptobrother.cloudfunctions.net/soundonRss", {
        "method": "GET"
    });
    return JSON.parse(await res.text())
}

function barSetState(podcastList) {
    var barContent = document.querySelector("#bar-notice > .content");
    const content = podcastList.episode.map(item => {
        return `<div class="pod-item">
        ${item.title}
        <p>${item.author}</p>
        </div>`
    }).join("");
    barContent.innerHTML = content;
}

