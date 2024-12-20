import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DoctorOverview from '../components/doctors/DoctorOverview';

const doctors = [
  { id: 11, user: { name: 'Dr. John Smith' }, speciality: "Cardiology", availability: true, service: { name: "Cardiolody", description: "Heart care services", price: 150 } },
  { id: 12, user: { name: 'Dr. Emily Jones' }, speciality: "Neurology", availability: false, service: { name: "Neurology", description: "Nervous system care services", price: 150 } },
  { id: 13, user: { name: 'Dr. Michael Brown' }, speciality: "Pediatrics", availability: true, service: { name: "Pediatrics", description: "Child care services", price: 150 } },
  { id: 14, user: { name: 'Dr. Sarah Wilson' }, speciality: "Orthopedics", availability: true, service: { name: "Orthopedics", description: "Musculoskeletal system care services", price: 150 } },
  { id: 15, user: { name: 'Dr. David Miller' }, speciality: "General Medicine", availability: false, service: { name: "General Medicine", description: "Acute and chronic illness care services", price: 150 } },
];

window.React = React
let selectDoctor:jest.Mock;
selectDoctor=jest.fn();

test('clicking a doctor row calls selectDoctor', () => {
    render(<DoctorOverview doctors={doctors} selectDoctor={selectDoctor} />);
  
    expect(screen.getByText("Dr. John Smith"));
    expect(screen.getByText("Dr. Emily Jones"));
    expect(screen.getByText("Dr. Michael Brown"));
    expect(screen.getByText("Dr. Sarah Wilson"));
    expect(screen.getByText("Dr. David Miller"));

    
  }
);


test('clicking a doctor row calls selectDoctor with the correct doctor', () => {
  render(<DoctorOverview doctors={doctors} selectDoctor={selectDoctor} />);

  const doctorRow = screen.getByText('Dr. John Smith').closest('tr');
  if (doctorRow) {
    fireEvent.click(doctorRow);
    expect(selectDoctor).toHaveBeenCalledWith(doctors[0]);
  } else {
    throw new Error('Doctor row not found');
  }
});