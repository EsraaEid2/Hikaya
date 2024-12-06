<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chatbot</title>
    <!-- Include chatbot CSS -->
    <link rel="stylesheet" href="{{ asset('assets/chatbot.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/4.0.2/bootstrap-material-design.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    
     <!-- Include jQuery from a CDN -->
     <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/js/bootstrap.min.js"></script>
     
</head>
<body>
    <div id="body">
        <div id="chat-circle" class="btn btn-raised">
            <div id="chat-overlay"></div>
            <i class="material-icons">speaker_phone</i>
        </div>

        <div class="chat-box">
            <div class="chat-box-header">
                Waqtify
                <span class="chat-box-toggle"><i class="material-icons">close</i></span>
            </div>
            <div class="chat-box-body">
                <div class="chat-box-overlay"></div>
                <div class="chat-logs"></div>
            </div>
            <div class="chat-input">
                <form>
                    <input type="text" id="chat-input" placeholder="Send a message..." />
                    <button type="submit" class="chat-submit" id="chat-submit">
                        <i class="material-icons">send</i>
                    </button>
                </form>
            </div>
        </div>
    </div>

    <!-- Include chatbot JS -->
    <script src="{{ asset('assets/chatbot.js') }}"></script>
</body>
</html>
