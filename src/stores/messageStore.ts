import { observable, action } from 'mobx'
import Message from '../models/Message';

class MessageStore {
    @observable $latestMessages: {[key: string]: Message}

    @action
    public addMessage(message: Message): void {
        this.$latestMessages[message.ID] = message
    }

    public addMessageByString(messageData: string): void {
        this.addMessage(JSON.parse(messageData) as Message)
    }

    public getMessage(id: string): Message | null {
        if (id in this.$latestMessages) {
            return this.$latestMessages[id]
        }

        return null
    }
}

export default new MessageStore()