export interface StorageBin {
  name: string;
  location: {
    houseNumber: number;
    streetName: string;
    city: string;
  };
  serviceTime: { 
    start: string; 
    end: string 
  };
  uid: string;
}
