import log from '@/log';

function main() {
    log('INFO', 'Installing observer...');

    let hiding = false;

    new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.target.nodeType !== mutation.target.ELEMENT_NODE || !(mutation.target instanceof HTMLDivElement) || mutation.target.id !== 'movie_player') {
                continue;
            }

            if (mutation.target.classList.contains('ad-showing') && !hiding) {
                log('INFO', 'Ad detected, hiding screen...');

                mutation.target.style.visibility = 'hidden';

                const muteButtonElements = [...mutation.target.getElementsByClassName('ytp-mute-button')];

                if (muteButtonElements.length === 0) {
                    log('ERROR', 'Mute button not found');
                } else {
                    if (muteButtonElements.length > 1) {
                        log('WARN', 'Multiple mute buttons found');
                    }

                    const muteButton = muteButtonElements[0];

                    if (!(muteButton instanceof HTMLButtonElement)) {
                        log('ERROR', 'Mute button is not a button element');
                    } else {
                        if (!muteButton.getAttribute('title')?.toLowerCase().startsWith('unmute')) {
                            muteButton.click();
                        }
                    }
                }

                const styleElement = document.createElement('style');
                styleElement.id = 'youtube-quiet-ads-style';
                styleElement.textContent = `
                    #youtube-quiet-ads-message {
                        visibility: visible;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        translate: -50% -50%;
                        font-family: monospace;
                        opacity: 0.5;
                    }

                    .ytp-skip-ad-button {
                        display: flex !important;
                        visibility: visible;
                        top: 50%;
                        left: 50%;
                        width: fit-content;
                        translate: -50% calc(-50% + 3.5rem);
                        padding: 0 1.75rem !important;
                        background: transparent;
                        opacity: 1 !important;
                    }

                    .ytp-skip-ad-button:hover {
                        background: inherit !important;
                    }

                    .ytp-skip-ad-button__text {
                        font-family: monospace;
                        font-size: 1.2rem;
                        text-transform: lowercase;
                    }

                    .ytp-skip-ad-button__icon {
                        display: none;
                    }
                `;
                mutation.target.appendChild(styleElement);

                const messageElement = document.createElement('p');
                messageElement.id = 'youtube-quiet-ads-message';
                messageElement.textContent = '[ an ad is playing ]';
                mutation.target.appendChild(messageElement);

                hiding = true;
            } else if (mutation.target.classList.contains('ad-showing') && hiding && mutation.target.classList.contains('paused-mode')) {
                log('WARN', 'Ad is paused, playing...');

                const playButtonElements = [...mutation.target.getElementsByClassName('ytp-play-button')];

                if (playButtonElements.length === 0) {
                    log('ERROR', 'Play button not found');
                } else {
                    if (playButtonElements.length > 1) {
                        log('WARN', 'Multiple play buttons found');
                    }

                    const playButton = playButtonElements[0];

                    if (!(playButton instanceof HTMLButtonElement)) {
                        log('ERROR', 'Play button is not a button element');
                    } else {
                        playButton.click();
                    }
                }
            } else if (!mutation.target.classList.contains('ad-showing') && hiding) {
                log('INFO', 'Ad ended, showing screen...');

                const muteButtonElements = [...mutation.target.getElementsByClassName('ytp-mute-button')];

                if (muteButtonElements.length === 0) {
                    log('ERROR', 'Mute button not found');
                } else {
                    if (muteButtonElements.length > 1) {
                        log('WARN', 'Multiple mute buttons found');
                    }

                    const muteButton = muteButtonElements[0];

                    if (!(muteButton instanceof HTMLButtonElement)) {
                        log('ERROR', 'Mute button is not a button element');
                    } else {
                        if (!muteButton.getAttribute('title')?.toLowerCase().startsWith('mute')) {
                            muteButton.click();
                        }
                    }
                }

                const messageElement = document.getElementById('youtube-quiet-ads-message');
                if (messageElement !== null) {
                    messageElement.remove();
                }

                const styleElement = document.getElementById('youtube-quiet-ads-style');
                if (styleElement !== null) {
                    styleElement.remove();
                }

                mutation.target.style.visibility = 'visible';

                hiding = false;
            }

            break;
        }
    }).observe(document.documentElement, {
        subtree: true,
        attributeFilter: ['class']
    });
}

main();
