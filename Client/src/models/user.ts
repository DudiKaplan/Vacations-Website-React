export class User{
    public constructor(
        public userID?: number,
        public firstName?: string,
        public lastName?: string,
        public username?: string,
        public password?: string,
        public userType?: string
    ){ }
}