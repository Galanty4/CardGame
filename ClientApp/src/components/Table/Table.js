
import MessageContainer from "../MessageContainer/MessageContainer";
import SendMessageForm from "./SendMessageForm.js";

const Table = ({messages, sendMessage }) => <div>
    <div className='table'>
        <MessageContainer messages={messages} />
    </div>
</div>

export default Table;