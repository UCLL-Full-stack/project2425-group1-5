export class Location{
    private id?: number;
    private streetNumber : number;
    private city : string;
    private postalCode: number;

    constructor(location:{
        id?:number;
        streetNumber : number;
        city : string;
        postalCode : number;
    }){
        this.id = location.id;
        this.streetNumber = location.streetNumber;
        this.city = location.city;
        this.postalCode = location.postalCode;
    }

    validate(location: {
        streetNumber : number;
        city : string;
        postalCode : number;
    }) {
        if (!location.streetNumber) {
            throw new Error('Street Number is required');
        }
        if (!location.city) {
            throw new Error('City is required');
        }
        if (!location.postalCode) {
            throw new Error('Postal Code is required');
        }
    }

    getId(): number | undefined {
        return this.id;
    }
    getStreetNumber(): number{
        return this.streetNumber;
    }
    getCity():string{
        return this.city;
    }
    getPostalCode(): number{
        return this.postalCode;
    }

    equals(location : Location): boolean{
        return(
            this.id === location.getId() &&
            this.streetNumber === location.getStreetNumber()&&
            this.city === location.getCity()&&
            this.postalCode === location.getPostalCode()

        );
    }

}