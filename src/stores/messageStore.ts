import { observable, action } from 'mobx'
import Message from '../models/Message';
// tslint:disable no-console
export class MessageStore {
    @observable $latestMessages: Map<string, Message> = new Map()

    @action
    public addMessage(message: Message): void {
        let prev = this.getMessage(message.ID)
        if (prev) {
            let sDiff = message.sentiment - prev.sentiment
            let tDiff = message.weather.main.temp - prev.weather.main.temp
            console.log(`${message.region.name} update: ΔS = ${sDiff}, ΔT = ${tDiff}`)
        }
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