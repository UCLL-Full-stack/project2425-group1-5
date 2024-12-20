import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DoctorDetails from '../components/doctors/DoctorDetails';
import { Doctor } from '@/types';

// const doctors = [
//   { id: 11, user: { name: 'Dr. John Smith' }, speciality: "Cardiology", availability: true, service: { name: "Cardiolody", description: "Heart care services", price: 150 } },
//   { id: 12, user: { name: 'Dr. Emily Jones' }, speciality: "Neurology", availability: false, service: { name: "Neurology", description: "Nervous system care services", price: 150 } },
//   { id: 13, user: { name: 'Dr. Michael Brown' }, speciality: "Pediatrics", availability: true, service: { name: "Pediatrics", description: "Child care services", price: 150 } },
//   { id: 14, user: { name: 'Dr. Sarah Wilson' }, speciality: "Orthopedics", availability: true, service: { name: "Orthopedics", description: "Musculoskeletal system care services", price: 150 } },
//   { id: 15, user: { name: 'Dr. David Miller' }, speciality: "General Medicine", availability: false, service: { name: "General Medicine", description: "Acute and chronic illness care services", price: 150 } },
// ];

const doctor: Doctor = {
    id: 11,
    user: { name: 'Dr. John Smith', email: 'john.smith@hospital.com', password: '$2b$12$y6NgLiqcTCH..t6P3iUrRe7pV5S5M7lSl52AId8Rt0xqKafNp2RS2' },
    speciality: 'Cardiology',
    availability: true,
    service: { name: 'Cardiology', description: 'Heart care services', price: 150 },
  };
  
  test('renders doctor details correctly', () => {
    render(<DoctorDetails doctor={doctor} />);
  
    screen.getByText('ID:');
    screen.getByText('11');
    screen.getByText('Name:');
    screen.getByText('Dr. John Smith');
    screen.getByText('Email:');
    screen.getByText('john.smith@hospital.com');
    screen.getByText('Password:');
    screen.getByText('$2b$12$y6NgLiqcTCH..t6P3iUrRe7pV5S5M7lSl52AId8Rt0xqKafNp2RS2');
    screen.getByText('Speciality:');
    screen.getByText('Cardiology');
    screen.getByText('Availability:');
    screen.getByText('Available');
  });

  const doctor2: Doctor = {
    id: 12,
    user: { name: 'Dr. Emily Jones', email: 'emily.jones@hospital.com', password: '$2b$12$VE.wvipGoasfjmfVsP.ME.0eTCPu//gKahv5YKegXiTu3PgK18SGC' },
    speciality: 'Neurology',
    availability: false,
    service: { name: 'Neurology', description: 'Nervous system care services', price: 150 },
  };
  
  test('renders another doctor details correctly', () => {
    render(<DoctorDetails doctor={doctor2} />);
  
    screen.getByText('ID:');
    screen.getByText('12');
    screen.getByText('Name:');
    screen.getByText('Dr. Emily Jones');
    screen.getByText('Email:');
    screen.getByText('emily.jones@hospital.com');
    screen.getByText('Password:');
    screen.getByText('$2b$12$VE.wvipGoasfjmfVsP.ME.0eTCPu//gKahv5YKegXiTu3PgK18SGC');
    screen.getByText('Speciality:');
    screen.getByText('Neurology');
    screen.getByText('Availability:');
    screen.getByText('Not Available');
  });