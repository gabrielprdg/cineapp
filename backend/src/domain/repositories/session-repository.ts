import { SessionModel } from '../models/session'

export type SessionParams = {
  movieId?: string
  cinemaId?: string
  dayOfWeek?: string
  date?: Date
}

export abstract class SessionRepository {
  abstract create(session: SessionParams): Promise<string>;
  abstract deleteById(id: string): Promise<SessionModel | null>;
  abstract loadAll(): Promise<SessionModel[]>;
  abstract updateById(session: SessionParams, id: string): Promise<void>;
}