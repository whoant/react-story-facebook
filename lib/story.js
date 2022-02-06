const ID_USER = require('RelayAPIConfigDefaults').actorID;
const FB_DTSG = require('DTSGInitData').token;

const listStory = document.getElementsByClassName('b3onmgus ph5uu5jm g3eujd1d');
for (let i = 0; i < listStory.length; i++) {
    listStory[i].addEventListener('click', loadModal, false);
}

loadModal();

function loadModal() {

    const timeoutCheckStoriesFooter = setInterval(() => {

        const btnReact = document.createElement('div');
        btnReact.textContent = "MORE";
        btnReact.setAttribute('id', 'btn-react')
        btnReact.setAttribute('class', 'btn-react');

        const emojiGroup = document.createElement('ul');
        emojiGroup.setAttribute('id', 'emoji-group');
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
                console.log(getIdStory());
                console.log(emoji.value);
                try {
                    const res = await reactStory(getIdStory(), emoji.value);
                    console.log(res);
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

        const storiesFooter = document.getElementsByClassName('py2didcb j83agx80 btwxx1t3 m7zwrmfr pmk7jnqg kfkz5moi rk01pc8j taijpn5t lqlvxoni');
        if (storiesFooter.length > 0) {
            clearInterval(timeoutCheckStoriesFooter);
            storiesFooter[storiesFooter.length - 1].appendChild(reactContainer);
        }

    }, 100);
}

function getIdStory() {
    const htmlStory = document.getElementsByClassName('k4urcfbm l9j0dhe7 taijpn5t datstx6m j83agx80 bp9cbjyn');
    return htmlStory[htmlStory.length - 1].getAttribute('data-id');
}

function reactStory(story_id, message) {
    return new Promise(async (resolve, reject) => {
        const variables = {
            input: {
                lightweight_reaction_actions: {
                    offsets: [0],
                    reaction: message
                },
                story_id,
                story_reply_type: 'LIGHT_WEIGHT',
                actor_id: ID_USER,
                client_mutation_id: 7,
            },
        };

        const body = new URLSearchParams();
        body.append('av', ID_USER);
        body.append('__user', ID_USER);
        body.append('__a', 1);
        body.append('fb_dtsg', FB_DTSG);
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
            let res = await response.json();
            if (res.errors) return reject(res);
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
}
