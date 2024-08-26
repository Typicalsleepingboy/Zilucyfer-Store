$(window).on('load', function () {
    $('#typical')[0].value = localStorage.getItem('m3u8-link') || '';
    const urlFromHash = window.location.hash.substring(1);
    if (urlFromHash) {
        playM3u8(urlFromHash);
    }

    $('#play-btn').on('click', function () {
        const url = $('#typical')[0].value;
        localStorage.setItem('m3u8-link', url);
        if (url) {
            playM3u8(url);
        }
    });
    $('#video').on('click', function() {
        this.paused ? this.play() : this.pause();
    });
});

function playM3u8(url) {
    const video = document.getElementById('video');
    if (Hls.isSupported()) {
        video.volume = 0.3;
        const hls = new Hls();
        hls.loadSource(decodeURIComponent(url));
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            video.play();
        });
        document.title = url;
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('canplay', function() {
            video.play();
        });
        video.volume = 0.3;
        document.title = url;
    }
}

function refreshPlayer() {
    location.reload();
}

function changeResolution(resolution) {
    const url = $('#typical')[0].value;
    let modifiedUrl = url;
    switch (resolution) {
        case 'low':
            modifiedUrl = url.replace('high', 'low').replace('medium', 'low');
            break;
        case 'medium':
            modifiedUrl = url.replace('high', 'medium').replace('low', 'medium');
            break;
        case 'high':
            modifiedUrl = url.replace('low', 'high').replace('medium', 'high');
            break;
    }
    playM3u8(modifiedUrl);
}

// Additional functions for controlling video playback with keyboard shortcuts
Mousetrap.bind('space', playPause);
Mousetrap.bind('up', volumeUp);
Mousetrap.bind('down', volumeDown);
Mousetrap.bind('right', seekRight);
Mousetrap.bind('left', seekLeft);
Mousetrap.bind('f', vidFullscreen);
