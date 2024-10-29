import { Company, User } from "../../domain/entities"
import { ConflictError } from "../../errors"
import type { ICompaniesRepository, ICryptoProvider, IUsersRepository } from "../../interfaces"
import type { UserDto, CompanyDto } from '@stocker/core/dtos'

type Request = {
    userDto: UserDto,
    companyDto: CompanyDto
  }

export class SubscribeUseCase {
    private readonly usersRepository: IUsersRepository
    private readonly companiesRepository: ICompaniesRepository
    private readonly cryptoProvider: ICryptoProvider

    constructor(
        usersRepository: IUsersRepository,
        companiesRepository: ICompaniesRepository,
        cryptoProvider: ICryptoProvider
    ) {
        this.usersRepository = usersRepository
        this.companiesRepository = companiesRepository
        this.cryptoProvider = cryptoProvider
    }

    async execute({ userDto, companyDto }: Request) {
        const existingUser = await this.usersRepository.findByEmail(userDto.email)
        if(existingUser !== null) {
            throw new ConflictError
        }

        const existingCompany = await this.companiesRepository.findByCnpj(companyDto.cnpj)
        if(existingCompany !== null) {
            throw new ConflictError
        }

        const company = Company.create(companyDto)
        await this.companiesRepository.add(company)

        const user = User.create(userDto)
        await this.usersRepository.add(user)
    }
}