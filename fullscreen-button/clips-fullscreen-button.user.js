// ==UserScript==
// @name         Fullscreen Button for Twitch Clip Creation
// @namespace    https://github.com/Charleeh/TwitchClipsFullScreen
// @version      1.0
// @description  Adds a fullscreen button & double-click functionality for Twitch clip creation
// @updateURL    https://raw.githubusercontent.com/Charleeh/TwitchClipsFullScreen/refs/heads/main/fullscreen-button/clips-fullscreen-button.user.js
// @downloadURL  https://raw.githubusercontent.com/Charleeh/TwitchClipsFullScreen/refs/heads/main/fullscreen-button/clips-fullscreen-button.user.js
// @author       charleeh
// @match        *://clips.twitch.tv/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const loadFontAwesome = () => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
        document.head.appendChild(link);
    };

    const addFullscreenButton = (video) => {
        if (document.querySelector('.twitch-fullscreen-button')) return;
        const button = document.createElement('button');
        button.className = 'twitch-fullscreen-button';
        button.innerHTML = '<i class="fas fa-expand"></i>';

        Object.assign(button.style, {
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '3rem',
            height: '3rem',
            backgroundColor: 'white',
            color: 'black',
            border: 'none',
            borderRadius: '0.6rem',
            cursor: 'pointer',
            fontSize: '17px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '1000',
            transition: 'background-color 0.2s ease'
        });

        button.onmouseover = () => { button.style.backgroundColor = '#e2e2e6'; };
        button.onmouseout = () => { button.style.backgroundColor = 'white'; };

        const enterFullscreen = () => {
            if (video.requestFullscreen) video.requestFullscreen();
            else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
            else if (video.msRequestFullscreen) video.msRequestFullscreen();
        };

        button.onclick = enterFullscreen;
        video.ondblclick = enterFullscreen;
        video.parentNode.appendChild(button);
    };

    const observeVideo = () => {
        new MutationObserver(() => {
            const video = document.querySelector('.Layout-sc-1xcs6mc-0 video');
            if (video) addFullscreenButton(video);
        }).observe(document.body, { childList: true, subtree: true });
    };

    loadFontAwesome();
    window.addEventListener('load', observeVideo);
})();
