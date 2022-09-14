// (function() {
//     var getWebSocketMessages = function(onMessageReceived)
//     {
//         var url = `wss://localhost:44374/ws`
//         console.log('url is: ' + url);

//         var webSocket = new WebSocket(url);

//         webSocket.addEventListener("open", (ev => {
//             console.log('opened')
//           }));
//           console.log(webSocket.readyState);
//         webSocket.onmessage = onMessageReceived;
//     };

//     // var ulElement = document.getElementById('StreamToMe');

//     getWebSocketMessages(function (message) {
//         // ulElement.innerHTML = ulElement.innerHTML += `<li>${message.data}</li>`
//         console.log(message);
//     });
// }());