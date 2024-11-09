export interface IWs {
  on<Payload = unknown>(
    event: string,
    roomId: string,
    callback?: (payload: Payload) => void,
  ): void
  emit(event: string, roomId: string, payload: unknown): void
  join(roomId: string, socket: unknown): void
  broadcast(event: string, payload?: unknown): void
}
