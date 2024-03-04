import Audit from "./Audit"

class User extends Audit {
    userId: string
    userName?: string
    firstName?: string
    lastName?: string
    email?: string
    loginType?: string
    password?: string

    constructor(userId: string) {
        super()
        this.userId = userId
     }
}


export {
    User
}