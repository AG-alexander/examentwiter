
var BaseApiUrl = "http://localhost/twiterBackend/index.php/api/login/";

window.onload = function () {     

    var vm = new Vue({
        el: '#app', 
        data: {
            isTrue: false,
            IsLogin: false,
            user: "",
            pass: ""
        },
        mounted () {
            this.MyWebSocketCall();
        },
        methods: {
            LoginUser(){
                var url = BaseApiUrl + 'authenticationUser';
                let data = new FormData();
                data.append("user", this.user)
                data.append("password", this.pass)
                axios.post(url, data).then((response) => {
                    //ws.send("select");
                    console.log(response);
                    this.makeToast("Noticia Creada");
                    this.isTrue = true;
                }).catch( error => { 
                    console.log(error); 
                    this.makeToast("Error al crear la noticia" + error, "danger");});
            },
            MyWebSocketCall() {
                if ("WebSocket" in window) { //condicional para verificar si el navegador es compatible con html5 web soket
                    console.log("WebSocket is supported by your Browser!");
                    // Let us open a web socket
                    //personalizamos la url con nuestro propio room_id
                    //wss://connect.websocket.in/YOUR_CHANNEL_ID?room_id=YOUR_ROOM_ID
                    ws = new WebSocket("wss://connect.websocket.in/canalalex?room_id=2155664"); //
                    ws.onopen = function() {
                        // Web Socket is connected, send data using send()
                        ws.send("open");
                        console.log("WebSocket is open...");
                    };
                    ws.onmessage = function(evt) { //cuando alguien haga un send a esa url se envia el onmessage
                        //cada vez que se invoca el ws.send() se recibe una respuesta de forma asincrónica
                        vm.getData(); //se usa vm en lugar de this, ya que se estan anidando eventos 
                        console.log("Message is received: " + evt.data); //evt.data contiene el msj recibido
                    };
                    ws.onclose = function() {
                        // websocket is closed.
                        console.log("Connection is closed...");
                    };
                } else {
                    // The browser doesn't support WebSocket
                    alert("WebSocket NOT supported by your Browser!");
                }
            } ,
            makeToast(message, variants = "success") {
                this.$bvToast.toast(message, {
                  title: 'BootstrapVue Toast',
                  autoHideDelay: 5000,
                  appendToast: true,
                  variant: variants,
                    solid: true
                });
            }
        },
        
        
    });
    
}