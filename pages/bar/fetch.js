async function getPodcastList() {
    // fetch rss.xml as json object
    const options = {
        ignoreAttributes: false,
        //name: is either tagname, or attribute name
        //jPath: upto the tag name
        isArray: (_name, jpath, _isLeafNode, _isAttribute) => ["rss.channel.item"].includes(jpath)
    };

    const res = await fetch('rss.xml')
        .then(r => r.text())
        .then(xml => new XMLParser(options).parse(xml))
        .then(rssObj => ({
            title: rssObj.rss.channel.title,
            description: rssObj.rss.channel.description.replace(/Hosting provided by SoundOn/gm, ''),
            link: rssObj.rss.channel.link,
            image: rssObj.rss.channel.image.url,
            lastBuildDate: rssObj.rss.channel.lastBuildDate,
            episode: [...rssObj.rss.channel.item.map((item) => ({
                title: item.title,
                description: item.description,
                author: item['dc:creator'],
                pubDate: item.pubDate,
                encodeContent: item['content:encoded'],
                episode: item['itunes:episode'],
            }))]
        }))
    return res;
}



function barSetState(podcastList) {
    var barContent = document.querySelector("#bar-notice > .content");
    const content = podcastList.episode.map((item, i) => {
        return `<div class="pod-item">
        <p>Episode ${item.episode}</p>
        ${item.title}
        <p>${item.author}</p>
        </div>
        `
    }).join("");
    barContent.innerHTML = `
    <p style="color:rgb(255,255,255,0.5);"><a href="https://apple.co/3Fi6xQD" class="link-word">Apple Podcast</a> & <a
    href="https://open.spotify.com/show/75ZbcPo0VQvqfC5Mx2jaAS?si=85c193a4eb6d4b58" class="link-word">Spotify</a> 收聽完整版</p>
    <iframe style="border-radius:12px" src="https://open.spotify.com/embed/show/75ZbcPo0VQvqfC5Mx2jaAS?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>   
    ${content}
    `;
}


async function getHtmlBlog(ep) {
    const res = await fetch(`/blog/${ep}/index.html`)
    const html = await res.text()
    return html;
}

