import AppointmentLocationService from "@/services/AppointmentLocationService";
import AppointmentService from "@/services/AppointmentService";
import DoctorService from "@/services/DoctorService";
import PatientService from "@/services/PatientService";
import { AppointmentLocation, Doctor, Patient, Role } from "@/types";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
    appointmentId : string;
}

const UpdateAppointmentForm = ({appointmentId}: Props) => {
    const [start_time, setStart_time] = useState<Date | null>(null);
    const [end_time, setEnd_time] = useState<Date | null>(null);
    const [date, setDate] = useState<Date | null>(null);
    // const [patient, setPatient] = useState<Patient | null>(null);
    const [doctorId, setDoctorId] = useState<number | null>(null);
    const [patientId, setPatientId] = useState<number | null>(null);
    const [locationId, setLocationId] = useState<number | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [errors, setErrors] = useState<string[]>([]);
    const [appointmentStatus, setAppointmentStatus] = useState<string>('');
    const [patient, setPatient] = useState<Array<Patient> | null>(null);
    const [appointmentLocation, setAppointmentLocation] = useState<Array<AppointmentLocation> | null>(null);
    const [doctor, setDoctor] = useState<Array<Doctor> | null>(null);


    // const locations: AppointmentLocation[] = [
    //     { id: 7, street_number: 123, city: 'New York', postal_code: 10001 },
    //     { id: 8, street_number: 456, city: 'Los Angeles', postal_code: 90001 },
    //     { id: 9, street_number: 789, city: 'Chicago', postal_code: 60601 },
    // ];

    // const patients: Patient[] = [
    //     { id: 11, user: { name: "Alice Johnson", email: "alice.johnson@hospital.com", password: "alice123", role: "patient" } },
    //     { id: 12, user: { name: "Bob Williams", email: "bob.williams@hospital.com", password: "bob123", role: "patient" } },
    //     { id: 13, user: { name: "Carla Brown", email: "carla.brown@hospital.com", password: "carla123", role: "patient" } },
    //     { id: 14, user: { name: "David Smith", email: "david.smith@hospital.com", password: "david123", role: "patient" } },
    //     { id: 15, user: { name: "Ella Davis", email: "ella.davis@gmail.com", password: "ella123", role: "patient" } },
    // ];


    // const doctors: Doctor[] = [
    //     { id: 11, speciality: "Cardiology", availability: true, user: { name: "Dr. John Smith", email: "john.smith@hospital.com", password: "smith123", role: "doctor" }, service: { name: "Cardiology", description: "Heart care services", price: 150 } },
    //     { id: 12, speciality: "Neurology", availability: false, user: { name: "Dr. Emily Jones", email: "emily.jones@hospital.com", password: "jones123", role: "doctor" }, service: { name: "Neurology", description: "Nervous system care services", price: 150 } },
    //     { id: 13, speciality: "Pediatrics", availability: true, user: { name: "Dr. Michel Brown", email: "michael.brown@hospital.com", password: "brown123", role: "doctor" }, service: { name: "Pediatrics", description: "Child care services", price: 150 } },
    //     { id: 14, speciality: "Orthopedics", availability: true, user: { name: "Dr. Sarah Wilson", email: "sarah.wilson@hospital.com", password: "wilson123", role: "doctor" }, service: { name: "Orthopedics", description: "Musculoskeleton system care services", price: 150 } },
    //     { id: 15, speciality: "General Medicine", availability: false, user: { name: "Dr. David Miller", email: "david.miller@hospital.com", password: "miller123", role: "doctor" }, service: { name: "General Medicine", description: "Acute and Chronic illnesses care services", price: 150 } },

    // ];

    const fetchData = async () => {
        try {
            // Fetch patients
            const patientResponse = await PatientService.getAllPatients();
            const patientsData: Patient[] = await patientResponse.json();
            setPatient(patientsData);

            // Fetch locations
            const locationResponse = await AppointmentLocationService.getAllAppointmentLocations();
            const locationsData: AppointmentLocation[] = await locationResponse.json();
            setAppointmentLocation(locationsData);

            //Fetch doctors
            const doctorResponse = await DoctorService.getAllDoctors();
            const doctorsData : Doctor[] = await doctorResponse.json();
            setDoctor(doctorsData);
        } catch (error) {
            setErrors((errors) => [...errors, "Failed to load data for patients or locations."]);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);


    const validate = () => {
        let result = true;
        setErrors([]);

        if (!start_time) {
            setErrors((errors) => [...errors, 'Start time is required.']);
            result = false;
        }
        if (!end_time) {
            setErrors((errors) => [...errors, 'End time is required.']);
            result = false;
        }
        if (start_time && end_time && start_time > end_time) {
            setErrors((errors) => [...errors, 'Start time must be before end time.']);
            result = false;
        }
        if (!status) {
            setErrors((errors) => [...errors, 'Status is required.']);
            result = false;
        }
        if (!date) {
            setErrors((errors) => [...errors, 'Date is required.']);
            result = false;
        }
        if (!doctorId) {
            setErrors((errors) => [...errors, "Doctor is required."]);
            result = false;
        }
        if (!patientId) {
            setErrors((errors) => [...errors, "Patient is required."]);
            result = false;
        }
        if (!locationId) {
            setErrors((errors) => [...errors, "Location is required."]);
            result = false;
        }
        return result;
    };
    

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        const selectedDoctor = doctor?.find(d => d.id === doctorId);
        const selectedPatient = patient?.find(p => p.id === patientId);
        const selectedLocation = appointmentLocation?.find(l => l.id === locationId);


        if (!selectedDoctor) {
            setErrors((errors) => [...errors, "Selected doctor not found."]);
            return;
        }
        if (!selectedPatient) {
            setErrors((errors) => [...errors, "Selected patient not found."]);
            return;
        }

        if (!selectedLocation) {
            setErrors((errors) => [...errors, "Selected location not found."]);
            return;
        }

        const appointment = {
            start_time: start_time as Date,
            end_time: end_time as Date,
            date: date as Date,
            status: status || "Scheduled",
            doctor: selectedDoctor,
            patient: selectedPatient, // Use the full Patient object
            location: selectedLocation, // Use the full AppointmentLocation object
        };

        try {
            const response = await AppointmentService.updateAppointment(appointmentId as string, appointment);
            const data = await response.json();

            if (!response.ok) {
                setErrors((errors) => [...errors, data.message]);
            } else {
                setAppointmentStatus(`Appointment is ${status} successfully`);
            }

            console.log("Submitted Appointment:", appointment);
        } catch (error) {
            setErrors((errors) => [...errors, "An error occurred while creating the appointment."]);
        }
    };

    return (
        <div className="form ">
        <form onSubmit={handleSubmit}>
            <div  className="status-message-container">
                {!!errors.length && (
                    <ul className="text-red-800 mb-4">
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                )}
                {appointmentStatus && (
                    <div className="text-green-800 bg-green-100 p-2 rounded-md mb-4">
                        {appointmentStatus}
                    </div>
                )}
            </div>
            <div className="mb-4">
                <label className="block font-medium">Doctor:</label>
                <select
                    value={doctorId || ""}
                    onChange={(e) => setDoctorId(Number(e.target.value))}
                    className="border rounded-md p-2 w-full"
                >
                    <option value="">Select a doctor</option>
                    {doctor?.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                            {doctor.user.name} - {doctor.speciality}
                        </option>
                    ))}
                </select>
            </div>


            <div className="mb-4">
                <label className="block font-medium">Start Time:</label>
                <DatePicker
                    selected={start_time}
                    onChange={(date) => setStart_time(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    placeholderText="Select start time"
                    className="border rounded-md p-2 w-full"
                />
            </div>


            <div className="mb-4">
                <label className="block font-medium">End Time:</label>
                <DatePicker
                    selected={end_time}
                    onChange={(date) => setEnd_time(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    placeholderText="Select end time"
                    className="border rounded-md p-2 w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block font-medium">Date:</label>
                <DatePicker
                    selected={date}
                    onChange={(selectedDate) => setDate(selectedDate)}
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select date"
                    className="border rounded-md p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block font-medium">Status:</label>
                <select
                    value={status || ""}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border rounded-md p-2 w-full"
                >
                    <option value="">Select Status</option>
                    <option value="Schedule">Schedule</option>
                    <option value="Reschedule">Reschedule</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block font-medium">Patient:</label>
                <select
                    value={patientId || ""}
                    onChange={(e) => setPatientId(Number(e.target.value))}
                >
                    <option value="">Select a patient</option>
                    {patient?.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.user.name} - {p.user.email} 
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block font-medium">Location:</label>
                <select
                    value={locationId || ""}
                    onChange={(e) => setLocationId(Number(e.target.value))}
                >
                    <option value="">Select a location</option>
                    {appointmentLocation?.map((location) => (
                        <option key={location.id} value={location.id}>
                            {`${location.street_number}, ${location.city}, ${location.postal_code}`}
                        </option>
                    ))}
                </select>
            </div>
            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Create Appointment
            </button>

        </form>
        </div>
    );


};

export default UpdateAppointmentForm;