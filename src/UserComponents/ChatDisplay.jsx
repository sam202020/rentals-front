import React from "react";
import { ChatFeed, Message } from "react-chat-ui";

export default class ChatDisplay extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const messages = this.props.messages.map(
      msg => new Message({ id: msg._id, message: msg.message })
    );
    return (
      <ChatFeed
        messages={messages} // Boolean: list of message objects
        isTyping={false} // Boolean: is the recipient typing
        hasInputField={true} // Boolean: use our input, or use your own
        showSenderName={false} // show the name of the user who sent the message
        bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
        // JSON: Custom bubble styles
        bubbleStyles={{
          text: {
            fontSize: 30
          },
          chatbubble: {
            borderRadius: 70,
            padding: 40
          }
        }}
      />
    );
  }
}
