import { Location } from "../../model/Location";

const streetNumber=  123;   
const city =  'New York';    
const postalCode=  10001;  

test('given: valid values for location, when: location is created, then:location is created with those values', () =>{
    const location = 
    new Location({
        id: 1,
        streetNumber : 123,
        city : 'New York',
        postalCode : 10001
    });

    expect(location.getStreetNumber()).toEqual(streetNumber);
    expect(location.getCity()).toEqual(city);
    expect(location.getPostalCode()).toEqual(postalCode);

});

test('given: street number is missing, when: location is created, then:an error is thrown',() =>{
    const location = () => new Location({streetNumber: undefined as unknown as number,city,postalCode});

    expect(location).toThrow('Street Number is required.');
});

test('given: city is missing, when: location is created, then:an error is thrown',() =>{
    const location = () => new Location({streetNumber,city: '',postalCode});

    expect(location).toThrow('City is required.');
});

test('given: postal code is missing, when: location is created, then:an error is thrown',() =>{
    const location = () => new Location({streetNumber,city,postalCode: undefined as unknown as number});

    expect(location).toThrow('Postal Code is required.');
});