export interface Appointment {
  id: string;
  nameCustomer: string;
  nameStaff: string | null;
  date: string;
  email: string;
  phone: string;
  time: string;
  status: number;
  description: string;
}
