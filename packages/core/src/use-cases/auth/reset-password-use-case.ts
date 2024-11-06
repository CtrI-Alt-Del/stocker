import { NotFoundError } from "../../errors";
import type { ICryptoProvider, IUsersRepository } from "../../interfaces";

type Request = {
    email: string,
    newPassword: string
}
export class ResetPasswordUseCase {
    private readonly usersRepository: IUsersRepository
    private readonly cryptoProvider: ICryptoProvider

    constructor(usersRepository: IUsersRepository, cryptoProvider: ICryptoProvider) {
        this.usersRepository = usersRepository
        this.cryptoProvider = cryptoProvider
    }

    async execute({email, newPassword}: Request) {
        const user = await this.usersRepository.findByEmail(email)
        if (!user) {
            throw new NotFoundError('Usuário não encontrado')
        }
        const hashedNewPassword = await this.cryptoProvider.hash(newPassword)
        await this.usersRepository.updatePassword(user.id, hashedNewPassword)
    }
}