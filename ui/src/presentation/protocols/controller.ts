import { ControllerRequest } from '../model/controller-request'

export interface Controller<ParamType, ResponseType> {
  handle (param?: ControllerRequest<ParamType>): Promise<ResponseType>
}
