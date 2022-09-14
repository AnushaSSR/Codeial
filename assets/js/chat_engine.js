class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`${chatBoxId}`);
        this.userEmail = userEmail;

        //initiate the connection on port on which socket server is running 
        //io is a gloabl variable which will be vaialble as soon as we included the cdn link in home.ejs
        // no one is available to connection now at that port, have to be checked
        this.socket = io.connect('http://localhost:5000');
        // connectionHandler has to be called from the constructor

        if (this.userEmail) {
            this.connectionHandler();
        }
        // we have to initialise this class
    }
    // this will have to and fro intercation b/w the observer and the subscriber
    //runs with emit and on(detecting an event)
    connectionHandler() {
        let self = this;

        //first event is connection
        this.socket.on('connect', function () {
            console.log('connection established using sockets...!');
            //name of the event 
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'

            });
            //when this event is emmited it will be recieved on chat_sockets

            self.socket.on('user_joined', function (data) {
                console.log('A user joined', data);
            })
        });


        //CHANGE : send a message on clicking the send message button

        $('#send-message').click(function () {
            let msg = $('#chat-message-input').val();

            if (msg != '') {
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }

        });

        self.socket.on('recieve_message', function(data){
            console.log('message recieved',data.message);

            let newMessage = $('<li>');

            let messageType= 'other-message';

            if(data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html' : data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);



        })



    }
}

TextDecoderStream;