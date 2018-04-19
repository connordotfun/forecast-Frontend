import { observable, action } from 'mobx'
import messageStore from './messageStore'

export class SSEStore {
  @observable evtSource: EventSource | null
  @observable connected: boolean = false
  @observable error: Event
  @observable listeners = []

  @action public initializeConnection(url: string) {
    if (this.connected) {
      return
    }

    this.evtSource = new EventSource(url, {withCredentials: false})
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

  @action private setError(e: Event) {
    this.error = e
  }
}

export default new SSEStore()
