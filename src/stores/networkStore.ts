import { observable, action } from 'mobx'
import messageStore from './messageStore'
import Message from '../models/Message';

/* This is using SSE + fetch */

export class NetworkStore {
  @observable evtSource: EventSource | null
  @observable connected: boolean = false
  @observable error: Event
  @observable listeners = []
  private serverUrl: string

  @action public initializeConnection(url: string) {
    this.serverUrl = url
    if (this.connected) {
      return
    }

    this.evtSource = new EventSource(this.serverUrl, {withCredentials: false})
    this.evtSource.onopen = action((e) => { this.connected = true })
    this.evtSource.onerror = this.setError
    this.evtSource.onmessage = this.onMessage
  }

  @action public closeConnection() {
    if (this.evtSource) {
      this.evtSource.close()
      this.evtSource = null
    }

    this.connected = false
  }

  public onMessage(evt: MessageEvent) {
    messageStore.addMessageByString(evt.data)
  }

  public fetchCurrentData() {
    return fetch(this.serverUrl + '/current')
    .then(response => response.text())
    .then(text => {
      let messages: Message[] = JSON.parse(JSON.parse(text))
      messages.forEach(message => messageStore.addMessage(message))
    })
  }

  @action private setError(e: Event) {
    this.error = e
  }
}

export default new NetworkStore()
