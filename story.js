// const ID_USER = require('RelayAPIConfigDefaults').actorID;
// const FB_DTSG = require('DTSGInitData').token;

(async () => {
    if (document.getElementsByClassName('btn-react').length > 0) return;
    try {
        const emojiJson = await fetch(chrome.extension.getURL('/db/emoji.json'));
        const EMOJI_LIST = await emojiJson.json();
        loadModal(EMOJI_LIST);
    } catch (e) {
        console.error(e);
    }

})();


function loadModal(EMOJI_LIST) {
    const fb_dtsg = getFbdtsg();
    const user_id = getUserId();
    console.log({fb_dtsg, user_id});
    const timeoutCheckStoriesFooter = setInterval(() => {
        const btnReact = document.createElement('div');
        btnReact.textContent = "MORE";
        btnReact.setAttribute('class', 'btn-react');

        const emojiGroup = document.createElement('ul');
        emojiGroup.setAttribute('class', 'emoji-group');

        btnReact.onclick = function () {
            emojiGroup.classList.toggle('emoji-group--show');
        }

        EMOJI_LIST.forEach(emoji => {
            const emojiLi = document.createElement('li');
            emojiLi.setAttribute('class', 'emoji');
            emojiLi.setAttribute('value', emoji.value);
            emojiLi.textContent = emoji.value;
            emojiLi.onclick = async function () {
                const storyId = getStoryId();
                try {
                    await reactStory(user_id, fb_dtsg, storyId, emoji.value);
                    console.log(storyId + " : " + emoji.value);
                } catch (e) {
                    console.error(e);
                }
            }

            emojiGroup.appendChild(emojiLi);
        });

        const reactContainer = document.createElement('div');
        reactContainer.setAttribute('class', 'react-container');
        reactContainer.appendChild(btnReact);
        reactContainer.appendChild(emojiGroup);

        const storiesFooter = document.getElementsByClassName('x11lhmoz x78zum5 x1q0g3np xsdox4t x10l6tqk xtzzx4i xwa60dl xl56j7k xtuxyv6');
        if (storiesFooter.length > 0) {
            clearInterval(timeoutCheckStoriesFooter);
            storiesFooter[storiesFooter.length - 1].appendChild(reactContainer);
        }

    }, 100);
}

function getStoryId() {
    const htmlStory = document.getElementsByClassName('mfclru0v om3e55n1 jcxyg2ei pytsy3co alzwoclg i85zmo3j');
    return htmlStory[htmlStory.length - 1].getAttribute('data-id');
}


function getFbdtsg() {
    const regex = /"DTSGInitialData",\[],{"token":"(.+?)"/gm;
    const resp = regex.exec(document.documentElement.innerHTML);
    return resp[1];
}

function getUserId() {
    const regex = /c_user=(\d+);/gm;
    const resp = regex.exec(document.cookie);
    return resp[1];
}

function reactStory(user_id, fb_dtsg, story_id, message) {
    return new Promise(async (resolve, reject) => {
        const variables = {
            input: {
                lightweight_reaction_actions: {
                    offsets: [0],
                    reaction: message
                },
                story_id,
                story_reply_type: 'LIGHT_WEIGHT',
                actor_id: user_id,
                client_mutation_id: 7,
            },
        };

        const body = new URLSearchParams();
        body.append('av', user_id);
        body.append('__user', user_id);
        body.append('__a', 1);
        body.append('fb_dtsg', fb_dtsg);
        body.append('fb_api_caller_class', 'RelayModern');
        body.append(
            'fb_api_req_friendly_name',
            'useStoriesSendReplyMutation'
        );
        body.append('variables', JSON.stringify(variables));
        body.append('server_timestamps', true);
        body.append('doc_id', '3769885849805751');

        try {
            const response = await fetch(
                'https://www.facebook.com/api/graphql/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body,
                }
            );
            const res = await response.json();
            if (res.errors) return reject(res);
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
}
