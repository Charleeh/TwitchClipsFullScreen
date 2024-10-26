// ==UserScript==
// @name         Twitch Clips Native Player Controls
// @namespace    https://github.com/Charleeh/TwitchClipsFullScreen
// @version      1.0
// @description  Adds native player controls to twitch clips creation
// @updateURL    https://raw.githubusercontent.com/Charleeh/TwitchClipsFullScreen/refs/heads/main/native-controls/clips-native-controls.js
// @downloadURL  hhttps://raw.githubusercontent.com/Charleeh/TwitchClipsFullScreen/refs/heads/main/native-controls/clips-native-controls.js
// @author       charleeh
// @match        *://clips.twitch.tv/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const addControlsAttribute = () => {
        const video = document.querySelector('.Layout-sc-1xcs6mc-0 video');
        if (video && !video.hasAttribute('controls')) {
            video.setAttribute('controls', '');
        }
    };

    const observeVideo = () => {
        new MutationObserver(() => {
            addControlsAttribute();
        }).observe(document.body, { childList: true, subtree: true });
    };

    window.addEventListener('load', observeVideo);
})();
