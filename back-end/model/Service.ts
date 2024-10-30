import { Doctor } from "./Doctor";

export class Service{
    private id?: number;
    private name : string;
    private description: string;
    private price : number;
    private doctors : Doctor[];

    constructor(service:{
        id?:number;
        name : string;
        description : string;
        price : number;
        doctors : Doctor[]
    }){
        this.validate(service);
        this.id = service.id;
        this.name = service.name;
        this.description = service.description;
        this.price = service.price;
        this.doctors = service.doctors;
    }

    validate(service:{
        name:string;
        description:string;
        price:number;
        doctors : Doctor[];
    }){
        if(!service.name){
            throw new Error('Service name is required.');
        }
        if(!service.description){
            throw new Error('Service description is required.');
        }
        if (service.price === undefined || service.price < 0) {
            throw new Error('Service price is required and must be a positive number.');
        }
        if (!service.doctors || service.doctors.length === 0) {
            throw new Error('At least one doctor must be provided for the service.');
        }
    }

    getId(): number | undefined {
        return this.id;
    }
    getName(): string{
        return this.name;
    }
    getDescription():string{
        return this.description;
    }
    getPrice(): number{
        return this.price;
    }
    getDoctors(): Doctor[]{
        return this.doctors;
    }

    equals(service: Service): boolean{
        return(
            this.id === service.getId()&&
            this.name === service.getName()&&
            this.description === service.getDescription()&&
            this.price === service.getPrice()&&
            this.doctors.every((doctor, index) =>doctor.equals(service.getDoctors()[index]))
        );
    }

}