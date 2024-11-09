type RealtimeResponseProps<Payload> = {
  event: string
  payload: Payload
}

export class RealtimeResponse<Payload> {
  event: string
  payload: Payload

  constructor({ event, payload }: RealtimeResponseProps<Payload>) {
    this.event = event
    this.payload = payload
  }

  static parseMessage(message: string) {
    const data = JSON.parse(message.toString())
    return new RealtimeResponse({ event: data.event, payload: data.payload })
  }

  get message() {
    return JSON.stringify({ event: this.event, payload: this.payload })
  }
}
