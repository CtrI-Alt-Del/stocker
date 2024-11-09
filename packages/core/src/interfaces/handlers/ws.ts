export interface IWs {
  on<Payload = unknown>(event: string, callback?: (payload: Payload) => void): void
  emit(event: string, payload: unknown): void
  broadcast(event: string, payload?: unknown): void
}
