import type { IHttp } from "@stocker/core/interfaces";

interface Body {
    companyId: string
}
export class LogoutController {
    async handle(http: IHttp) {
        const companyId = http.getBody<Body>()

        await http.destroyJwt()
    }
}