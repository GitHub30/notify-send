const KEY = 'AAAA4sVvz64:APA91bFPFIuVCdLo0rdPsaFO1ERf3pRAxoEMTO8sEpeY8wnwud32C0V4GYuxcEyup6FW8_B7BQJ-Y59HoyRHaFywHUz3nqO-OzT2uVeynKa428Tn46UuhvCU1xRRlHr6soVe5QzTbcPX'

const curl = (to) => `curl https://fcm.googleapis.com/fcm/send \\
  -H 'authorization: key=${KEY}' \\
  -H 'content-type: application/json' \\
  -d '{"to":"${to}","notification":{"title":"Hello","body":"Hello from Firebase","click_action":"https://example.com"}}'`;

const wget = (to) => `wget https://fcm.googleapis.com/fcm/send \\
  --header='authorization: key=${KEY}' \\
  --header='Content-Type:application/json' \\
  --post-data='{"to":"${to}","notification":{"title":"Hello","body":"Hello from Firebase","click_action":"https://example.com"}}' -qO-`;

const Python = (to) => `import requests

headers = {
    'authorization': 'key=${KEY}'
}

json = {
    'to': '${to}',
    'notification': {
        'title': 'Hello',
        'body': 'Hello from Firebase',
        'click_action': 'https://example.com'
    }
}

requests.post('https://fcm.googleapis.com/fcm/send', headers=headers, json=json)`;

const JavaScript = (to) => `fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'key=${KEY}'
    },
    body: JSON.stringify({
        to: '${to}',
        notification: {
            title: 'Hello',
            body: 'Hello from Firebase',
            click_action: 'https://example.com'
        }
    })
})`;

const firebaseConfig = {
    apiKey: "AIzaSyC8bXJ5D6leHu6_9oI0_IdUJXYYQ7ZEoMM",
    authDomain: "fcm2me.firebaseapp.com",
    projectId: "fcm2me",
    storageBucket: "fcm2me.appspot.com",
    messagingSenderId: "973975048110",
    appId: "1:973975048110:web:7b4317ca97213a8b70c23f",
    measurementId: "G-SQVJNDEXZC"
};

new Vue({
    el: '#app',
    async mounted() {
        firebase.initializeApp(firebaseConfig);
        const swRegistration = await navigator.serviceWorker.register('/notify-send/firebase-messaging-sw.js')
        try {
            const token = await firebase.messaging().getToken({ serviceWorkerRegistration: swRegistration })
            console.log(token)
            this.token = token
            firebase.messaging().onMessage(({ notification }) => {
                console.log(notification)
                const newNotification = new Notification(notification.title, notification)
                if (notification.click_action) newNotification.onclick = e => open(notification.click_action)
            })
        } catch (error) {
            console.error(error)
            this.permissionBlocked = true
        }
    },
    data() {
        return {
            permissionBlocked: false,
            token: '',
            languages: { curl, wget, JavaScript, Python },
            topic: '',
            topics: []
        };
    },
    methods: {
        execute(to) {
            fetch('https://fcm.googleapis.com/fcm/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'key=' + KEY
                },
                body: JSON.stringify({
                    to,
                    notification: {
                        title: 'Hello',
                        body: 'Hello from Firebase',
                        click_action: 'https://example.com'
                    }
                })
            })
        },
        add(e) {
            e.preventDefault()
            this.topics.unshift(this.topic)
            fetch('https://iid.googleapis.com/iid/v1/' + this.token + '/rel/topics/' + this.topic, { method: 'POST', headers: { Authorization: 'key=' + KEY } })
            this.topic = ''
            this.$nextTick(() => Prism.highlightAll())
        },
        detectLang(language) {
            if (language === 'JavaScript') return 'language-javascript'
            if (language === 'Python') return 'language-python'
            return 'language-bash'
        },
        copy(code) {
            var textarea = document.createElement('textarea')
            textarea.value = code
            document.body.appendChild(textarea)
            textarea.select()
            document.execCommand('copy')
            document.body.removeChild(textarea)
            new Notification('Copied!')
        }
    }
})
