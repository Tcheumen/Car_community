export interface User {
  email: string;
  firstName: string;
  lastName: string;
  userRole: string;
}

export interface BinRequest {
  id: string,
  car_id: string,
  location: {
    city: string,
    streetName: string,
    houseNumber: string,
  },
  name: string,
  status: string,
  plate: string,
  uid_request: string,
  uid_storage: string,
}

export interface Appointments {
  id: number;
  uid_request: string;
  car: string;
  date: string;
  bin: StorageBin;
}

export enum ParkingSpaceStatusEnum {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
}

export interface Cars {
  id: string;
  plate: string
  name: string,
  brand: string;
  year: string;
  location?: string,
  status?: string;
}

export interface StorageBin {
  name: string;
  location: {
    houseNumber: number;
    streetName: string;
    city: string;
  };
  serviceTime: { start: string; end: string };
  uid: string;
}
