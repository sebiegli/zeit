(function() {
    //render promo banners into articles

    let bannerRules = {
        'zeit-magazin': ['ET'],
        'campus': ['PG'],
        'zett': ['PG'],
        'arbeit': ['PG'],
        'kultur': ['PG'],
        'gesellschaft': ['PG', 'ET'],
        'politik': ['ET'],
        'wirtschaft': ['PG', 'ET'],
        'sport': ['PG'],
        'wissen': ['PG'],
        'gesundheit': ['PG']
    };

    if (
        window.Zeit.view.type &&
        window.Zeit.view.type === "article" &&
        window.location.href.indexOf("zeit.de/angebote") === -1 &&
        window.location.href.indexOf("zeit.de/campus/angebote") === -1 &&
        window.location.href.indexOf("zeit.de/zett/angebote") === -1 &&
        window.location.href.indexOf("zeit.de/arbeit/angebote") === -1 &&
        !document.querySelector(".article--visualarticle")
    ) {
        var pageElements = document.querySelectorAll(".article-page");

        if (
            window.Zeit.isMobileApp ||
            pageElements[0].getAttribute("data-page-number") == "1"
        ) {
            if (
                document.querySelectorAll(".article-body .paragraph").length > 3
            ) {
                checkBlacklistAndRender(
                    "https://static.zeit.de/embed/global-blacklist"
                );
            }
        }

        if ((window.location.href.indexOf("angriff-israel-hamas-kibbuz-reim-kinder") !== -1 || window.location.href.indexOf("attack-israel-hamas-kibbutz-reim-children-english") !== -1) && document.querySelector("#paywall")){
            styleMamaArticle();
        }

                  //START Salman Rushdie cover hack
    if (
        window.location.href.indexOf('2024-04/knife-salman-rushdie-attentat-memoiren-buch') !== -1
    ) {
        var pageElements = document.querySelectorAll(".article-page");
        if (
            window.Zeit.isMobileApp ||
            pageElements[0].getAttribute("data-page-number") == "1"
        ) {  
            var imageHtml = '<figure class="article__media article__item article__item--apart scaled-image variant variant--wide" data-ct-block="image"><div class="article__media-container"><img class="article__media-item" alt="" data-alt="" data-src="https://img.zeit.de/kultur/literatur/2024-04/knife-salman-rushdie-attentat-memoiren-buch-coverfoto/original" data-ratio="1.59" decoding="async" src="https://img.zeit.de/kultur/literatur/2024-04/knife-salman-rushdie-attentat-memoiren-buch-coverfoto/original__660x1048__desktop" data-source="https://img.zeit.de/kultur/literatur/2024-04/knife-salman-rushdie-attentat-memoiren-buch-coverfoto/original__660x1048__desktop" data-observed="false"></div><figcaption class="figure__caption"><span class="figure__text">Salman Rushdie, "Knife – Gedanken nach einem Mordversuch", Penguin Verlag, 256 Seiten, 25.- €. Aus dem Englischen von Bernhard Robben.</span> </figcaption></figure>';
    
            if(pageElements[0]){
                // insert image at top of page element
                pageElements[0].insertAdjacentHTML('afterbegin', imageHtml);
            }
        }
    }
    //END Salman Rushdie cover hack
    }

    function checkBlacklistAndRender(blacklistUrl) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(httpRequest.responseText);
                var currentURL = window.location.href;
                var onBlacklist = data.urls.some(function(url) {
                    return currentURL.indexOf(url) !== -1;
                });



                if (!onBlacklist && !hasEmbedAlready()) {
                    whichBanner(bannerRules);
                
                }
            }
        };
        httpRequest.open("GET", blacklistUrl);
        httpRequest.send();
    }

    function styleMamaArticle(){
        let css = '.paragraph--faded:before{background-image: linear-gradient(0deg, rgba(169, 168, 132, 1) 0%, rgba(169, 168, 132, 0) 100%);}@media (prefers-color-scheme:light){html:not(.color-scheme-dark) article.article{--z-color-link:#252525;--z-color-20:#252525;--z-color-30:#252525;--z-color-35:#252525;--z-color-45:#252525;--z-color-45--rgb:37,37,37;--z-color-60--beyond:#252525;--z-color-60:#252525;--z-color-70:#252525;--z-color-80:#252525;--z-color-90:#252525;--z-color-100:#fff;--z-color-link:#252525;--z-color-primary:#252525;--z-border-primary:#252525}html.color-scheme-light article.article .akzE:before,html.color-scheme-light article.article .akzN:before{color:#252525}}html.color-scheme-light article.article{--z-color-link:#252525;--z-color-20:#252525;--z-color-30:#252525;--z-color-35:#252525;--z-color-45:#252525;--z-color-45--rgb:37,37,37;--z-color-60--beyond:#252525;--z-color-60:#252525;--z-color-70:#252525;--z-color-80:#252525;--z-color-90:#252525;--z-color-100:#fff;--z-color-link:#252525;--z-color-primary:#252525;--z-border-primary:#252525}body.fullwidth-page .page__content{background-color:#A9A884}picture.header-fullwidth__media-container{display:none}.header-fullwidth__header{background-color:#A9A884}.header-fullwidth__header .header-fullwidth__overlay{color:#252525;text-shadow:none}.header-fullwidth__header .headline__supertitle,.header-fullwidth--classic .header-fullwidth__header:after,.header-fullwidth__overlay .header-fullwidth__arrow{display:none}.header-fullwidth__overlay .headline__title{font-size:16rem;line-height:100%;letter-spacing:0;font-family:"ZeitTiemannSchmal",Georgia,Palatino,"Palatino Linotype",FreeSerif,serif;font-weight:400;color:#fff}.header-fullwidth__overlay .zplus-logo{color:#fff!important}.header-fullwidth__copyright{display:none}.comment-section{background-color:#fff}@media screen and (max-width:768px){.header-fullwidth__overlay .headline__title{font-size:6rem;line-height:280%;letter-spacing:-2px}}';
        let styleTag = document.createElement('style');
        styleTag.innerHTML = css;

        document.querySelector('head').appendChild(styleTag);
    }
            
    function renderBanner(elem, url) {
        if (elem) {
            var embedContainer = document.createElement("div");
            embedContainer.style.clear = "both";

            elem.after(embedContainer);

            async function getEmbed(url) {
                let response = await fetch(url);
                let embedHTML = await response.text();  

                if (embedHTML) {
                    embedContainer.innerHTML = embedHTML;

                    var scriptTag = embedContainer.querySelector('script');
                    if (scriptTag) {
                        scriptContent = scriptTag.innerHTML;
                        scriptTag.remove();
        
                        var newTag = document.createElement('script');
                        newTag.innerHTML = scriptContent;
        
                        document.querySelector('body').appendChild(newTag);
                    }
                }
            }
            getEmbed(url); 
        }
    }

    function whichBanner(rules){
        //find the banner types for this section
        for (const [section, banners] of Object.entries(rules)) {
            if (section == window.Zeit.view.ressort && banners) {
                console.log('render banner into ' + section);
                let banner;
                //use probability to set which banner will be shown in the case that two are selected for this section
                if (banners.length > 1) {
                    var diceThrow = Math.random();
                    if (diceThrow < 0.5){
                        banner = banners[0];  
                    } else {
                        banner = banners[1];  
                    }    
                } else {
                    banner = banners[0]; 
                }
                
                //render the chosen banner
                switch (banner) {
                    case 'GDAS': 
                        renderBanner(findGapForEmbed(), "https://static.zeit.de/embed/gdas-einschuss-2023"); 
                        break;
                    case 'Verbrechen':
                        renderBanner(findGapForEmbed(), "https://static.zeit.de/embed/verbrechen-einschuss-2023"); 
                        break;
                    case 'Z2X':
                        renderBanner(findGapForEmbed(), "https://static.zeit.de/embed/z2x-einschuss-2024"); 
                        break;
                    case 'PG':
                        renderBanner(findGapForEmbed(), "https://static.zeit.de/embed/plan-d-form-einschuss"); 
                        break;
                    case 'ET':
                        renderBanner(findGapForEmbed(), "https://static.zeit.de/embed/mycountrytalks/mct-embed-et24-iframe"); 
                        break;
                }
            }
        }
    }

    //leaving the old embed classes in in case they are manually included somewhere
    function hasEmbedAlready() {
        if (
            document.querySelector(
                'iframe[src^="https://app.mycountrytalks.org/"]'
            ) ||
            document.querySelector(".ard-container") ||
            document.querySelector(".podfest-signup-wrapper") ||
            document.querySelector(".zoner-wjw-speech-wrapper") ||
            document.querySelector(".zoner-pland-survey") 
        ) {
            return true;
        } else {
            return false;
        }
    }

    function findGapForEmbed() {
        var articleWrapper = document.querySelector(
            ".article-page[data-page-number='1']"
        );

        if (articleWrapper) {
            var articleElems = document.querySelectorAll(".article-page > *");
            var lengthCalc = 0;
            for (var i = 0, len = articleElems.length; i < len; i++) {
                if (articleElems[i].classList.contains("paragraph")) {
                    lengthCalc += articleElems[i].innerText.length;

                    if (
                        articleElems[i + 1] !== undefined &&
                        (articleElems[i + 1].classList.contains("paragraph") ||
                            articleElems[i + 1].classList.contains(
                                "article__subheading"
                            )) &&
                        lengthCalc > 1500
                    ) {
                        //if we place before the last para, it must be at least 200 characters long
                        if (
                            i === len - 2 &&
                            articleElems[len - 1].innerText.length >= 200
                        ) {
                            return articleElems[i];
                        }
                        //if the paragraph is long enough and has a paragraph in front of it, it is viable
                        if (
                            articleElems[i].innerText.length >= 200 &&
                            articleElems[i - 1] !== undefined &&
                            articleElems[i - 1].classList.contains("paragraph")
                        ) {
                            //if the paragraph after is long enough or has a para after it, it is viable
                            if (
                                articleElems[i + 1] !== undefined &&
                                (articleElems[i + 1].innerText.length >= 200 ||
                                    (articleElems[i + 2] !== undefined &&
                                        articleElems[i + 2].classList.contains(
                                            "paragraph"
                                        )))
                            ) {
                                return articleElems[i];
                            }
                        }
                    }
                }
            }
        }
    }
    //END Seitenwechsel banner einschuss logic
})();

