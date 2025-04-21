import { SessionModel } from '../models/session'

export type SessionParams = {
  movie_id?: string
  cinema_id?: string
  day_of_week?: string
  date?: Date
}

export abstract class SessionRepository {
  abstract create(session: SessionParams): Promise<string>;
  abstract deleteById(id: string): Promise<SessionModel | null>;
  abstract loadAll(): Promise<SessionModel[]>;
  abstract updateById(session: SessionParams, id: string): Promise<void>;
  abstract loadById(id: string): Promise<SessionModel | null>;
}