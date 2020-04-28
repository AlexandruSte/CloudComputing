let btn = document.createElement('button');
btn.textContent = 'click';
document.body.appendChild(btn);
btn.addEventListener('click', () => {
    console.log(window.location.href);
    // fetch('https://testezfunction.azurewebsites.net/api/HttpTrigger1?code=8QA8CybweJRarvZVB1bGkilajsB/xbcOvMOykfe/0xeq7TjiEbu4zA==&name=ana')
    //     .then(data => {
    //         reader = data.body.getReader();
    //         reader.read().then(({ done, value }) => {
    //             if (done) {
    //                 return;
    //             }
    //             console.log(new TextDecoder('utf-8').decode(value));
    //         })
    //     })
});