import { AppointmentLocation } from "../../model/AppointmentLocation";
import appointmentLocationDb from "../../repository/appointmentLocation.db";
import appointmentLocationService from "../../service/appointmentLocation.service";

const appointmentLocation = new AppointmentLocation({
    id: 7,
    street_number : 123,
    city: "New York",
    postal_code: 1000
});

const appointmentLocation1 = new AppointmentLocation({
    id: 8,
    street_number : 456,
    city: "Los Angeles",
    postal_code: 90001
});

let mockAppointmentLocationdbGetAllAppointmentLocations : jest.Mock;
let mockAppointmentLocationdbGetAppointmentLocationById : jest.Mock;

beforeEach(() =>{
    mockAppointmentLocationdbGetAllAppointmentLocations = jest.fn();
    mockAppointmentLocationdbGetAppointmentLocationById = jest.fn();
});

afterEach(() =>{
    jest.clearAllMocks();
})

test("given: a valid appointmentLocation id, when: get appointmentLocation by id, then: appointmentLocation with corresponding id is retrieved", async() =>{
    const appointmentLocationId = 7;

    mockAppointmentLocationdbGetAppointmentLocationById.mockResolvedValue(appointmentLocation);

    appointmentLocationDb.getAppointmentLocationById = mockAppointmentLocationdbGetAppointmentLocationById;

    const result = await appointmentLocationService.getAppointmentLocationById(7);

    expect(mockAppointmentLocationdbGetAppointmentLocationById).toHaveBeenCalledWith({ id: appointmentLocationId });
    expect(result).toBe(appointmentLocation);
    expect(result?.getId()).toBe(appointmentLocationId);

});

test("given: a request to get all appointmentLocations, when: get all appointmentLocations, then: all the appointmentLocations are displayed.",async() =>{
    const allAppointmentLocations = [appointmentLocation, appointmentLocation1];

    mockAppointmentLocationdbGetAllAppointmentLocations.mockReturnValue(allAppointmentLocations);

    appointmentLocationDb.getAllAppointmentLocations = mockAppointmentLocationdbGetAllAppointmentLocations;

    const result = await appointmentLocationService.getAllAppointmentLocations();

    expect(mockAppointmentLocationdbGetAllAppointmentLocations).toHaveBeenCalled(); 
    expect(result).toEqual(allAppointmentLocations);
});