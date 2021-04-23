async function generateDownloadLink(link) {
    const notValidLink = 'Link is not valid!';

    if (link.includes('?wvideo=')) {
        let index = link.indexOf('?wvideo=');
        if (index > -1) {
            let indexOfQuotes = link.indexOf('"', index);
            let videoId = link.substring(index + 8, indexOfQuotes);
            const newLink = `https://fast.wistia.net/embed/iframe/${videoId}?videoFoam=true`;
            let newVideoURL = await getPage(newLink);
            return newVideoURL;
        } else {
            throw notValidLink;
        }
    } else {
        throw notValidLink;
    }
};

async function getPage(link) {
    let video = null;
    await $.ajax({
        url: link,
        type: 'get',
        dataType: 'html',
        async: true,
        success: function (data) {
            let firstBinIndex = data.indexOf(".bin");
            if (firstBinIndex > -1) {
                let trimmedPage = data.substring(0, firstBinIndex + 4);
                let lastHttpIndex = trimmedPage.lastIndexOf("http");
                if (lastHttpIndex > -1) {
                    let videoURL = trimmedPage.substring(lastHttpIndex, firstBinIndex);
                    videoURL += '.mp4';
                    video = videoURL;;
                }
            }
        }
    });

    return video;
}