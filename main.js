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

function playPause() {
    const video = document.getElementById('video');
    video.paused ? video.play() : video.pause();
}

function volumeUp() {
    const video = document.getElementById('video');
    if (video.volume <= 0.9) video.volume += 0.1;
}

function volumeDown() {
    const video = document.getElementById('video');
    if (video.volume >= 0.1) video.volume -= 0.1;
}

function seekRight() {
    const video = document.getElementById('video');
    video.currentTime += 5;
}

function seekLeft() {
    const video = document.getElementById('video');
    video.currentTime -= 5;
}

function vidFullscreen() {
    const video = document.getElementById('video');
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }
}

Mousetrap.bind('space', playPause);
Mousetrap.bind('up', volumeUp);
Mousetrap.bind('down', volumeDown);
Mousetrap.bind('right', seekRight);
Mousetrap.bind('left', seekLeft);
Mousetrap.bind('f', vidFullscreen);
