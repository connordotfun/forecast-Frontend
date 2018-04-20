import { observable, action } from 'mobx'
import Message from '../models/Message';

export class MessageStore {
    @observable $latestMessages: Map<string, Message> = new Map()

    @action
    public addMessage(message: Message): void {
        this.$latestMessages.set(message.ID, message)
    }

    public addMessageByString(messageData: string): void {
        this.addMessage(JSON.parse(messageData) as Message)
    }

    public getMessage(id: string): Message | undefined {
        return this.$latestMessages.get(id)
    }
}

export default new MessageStore()