import { observable, action } from 'mobx'
import messageStore from './messageStore'

class SocketStore {
  @observable socket: WebSocket | null
  @observable connected: boolean = false
  @observable error: Event
  @observable listeners = []

  @action initializeConnection(host: string) {
    if (this.connected) {
      return
    }

    this.socket = new WebSocket((window.location.protocol === 'https:' ? 'wss://' : 'ws://') + host)
    this.socket.onopen = action((e) => { this.connected = true })
    this.socket.onerror = this.setError
    this.socket.onclose = action((e) => {
      this.connected = false
    })
    this.socket.onmessage = messageStore.addMessageByString.bind(messageStore)
  }

  @action closeConnection() {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }

    this.connected = false
  }

  @action setError(e: Event) {
    this.error = e
  }
}

export default new SocketStore()
