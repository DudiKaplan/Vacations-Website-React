export class Vacation {
    public constructor(
        public vacationID?: number,
        public description?: string,
        public destination?: string,
        public imageName?: string,
        public startDate?: string,
        public endDate?: string,
        public price?: number,
        public userID?:number | null
    ){ }
}