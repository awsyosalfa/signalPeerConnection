const userName = "Rob-"+Math.floor(Math.random() * 100000)
const password = "x";
document.querySelector('#user-name').innerHTML = userName;

// const socket = io.connect('https://localhost:8181/',{
//     auth: {
//         userName,password
//     }
// })

const localVideoEl = document.querySelector('#local-video');
const remoteVideoEl = document.querySelector('#remote-video');

let localStream; //a var to hold the local video stream
let remoteStream; //a var to hold the remote video stream
let peerConnection; //the peerConnection that the two clients use to talk

document.querySelector('#stop').disabled = true

const call = async e=>{
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true
    })

    localStream = stream

    localVideoEl.srcObject = stream

    document.querySelector('#stop').disabled = false

}

document.querySelector('#call').addEventListener('click', call)
document.querySelector("#stop").addEventListener('click', e => {
    const el = document.querySelector('#stop')
    // if (el.textContent === "disconnect" ) {
// el.textContent = "connect"
    // localVideoEl.srcObject = null
    // }
    // else {
        // el.textContent = "disconnect"
        // localVideoEl.srcObject = localStream
    // }

    localStream.getTracks().forEach( track => {
        if (track.readyState === "live") {
            track.stop()
        }
    })

    el.disabled = true
    
})