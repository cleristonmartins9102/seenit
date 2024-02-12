import { type Controller } from '../../contract'
import { type HttpRequest, type HttpResponse } from '../../helpers/http'
import { badRequest, created, serverError } from '../../helpers/http-returns'
import { type SignupUserModel } from '../../../models'
import { type UpdateUser, type CreateUser } from '../../../domain/user-contracts'
import { type Validation } from '../../../domain/validation'
import { type SaveFile, type Hasher } from '../../../domain'
import { type Encrypter } from '../../../domain/encrypter'
import { Permissions, type AppSecurity } from '../../../main/middlewares/permission-middleware'
import { FileStorageAdapter } from '../../../infra/adapters/file-storage-adapter'

export class SignupController implements Controller {
  constructor (
    private readonly validator: Validation,
    private readonly userRepository: CreateUser & UpdateUser,
    private readonly cryptorAdapter: Hasher,
    private readonly jwtAdapter: Encrypter,
    private readonly fileStorageAdapter: SaveFile
  ) {}

  async handle (input: HttpRequest<SignupUserModel>): Promise<HttpResponse<unknown>> {
    try {
      const { body, locals } = input
      const error = this.validator.validate(body)
      if (error) return badRequest(error)
      const hashedPassword = await this.cryptorAdapter.hash(body.password!)
      const defaultPermissions: AppSecurity[] = [
        {
          app: {
            name: 'user',
            id: '1',
            module: [
              {
                name: 'load',
                id: '1',
                accepted: Permissions.read
              },
              {
                name: 'update',
                id: '2',
                accepted: Permissions.update
              },
              {
                name: 'delete',
                id: '3',
                accepted: Permissions.delete
              }
            ]
          }
        },
        {
          app: {
            name: 'project',
            id: '2',
            module: [
              {
                name: 'create',
                id: '1',
                accepted: Permissions.create
              },
              {
                name: 'load',
                id: '2',
                accepted: Permissions.read
              },
              {
                name: 'update',
                id: '3',
                accepted: Permissions.update
              },
              {
                name: 'delete',
                id: '4',
                accepted: Permissions.delete
              }
            ]
          }
        }

      ]
      const user = this.userRepository.create({ ...body, password: hashedPassword, permissions: defaultPermissions })
      const token = await this.jwtAdapter.encrypt({ id: user.id!, firstName: body.firstName!, surname: body.surname!, email: body.email!, permissions: defaultPermissions })
      const refreshToken = await this.jwtAdapter.encrypt({ id: user.id!, firstName: body.firstName!, surname: body.surname!, email: body.email!, permissions: defaultPermissions })
      this.userRepository.update({ id: user.id!, token, refresh_token: refreshToken })
      if (locals?.cookieConfig) {
        locals.cookieConfig.set({ sessionName: 'token', value: token })
        locals.cookieConfig.set({ sessionName: 'refresh_token', value: refreshToken })
      }
      const fileResponse = { url: '' }
      try {
        fileResponse.url = (await this.fileStorageAdapter.save(body.avatar)).url
      } catch (error) {

      }
      const { avatar, password, ...bodyWithoutPasswordAvatar } = body
      return created({ ...bodyWithoutPasswordAvatar, avatarUrl: fileResponse.url ?? null, token, refresh_token: refreshToken, permissions: body.permissions })
    } catch (error) {
      if (error instanceof Error) {
        return serverError(error)
      }
      return serverError(new Error())
    }
  }
}
