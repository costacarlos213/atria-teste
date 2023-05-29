type Equipment = {
  id: string;
  serialNumber: string;
  model: string;
  manufacturerId: string;
};

type Manufacturer = {
  id: string;
  name: string;
};

declare type JoinedEquipment = Equipment & {
  manufacturer: Manufacturer;
};

declare type JoinedManufacturer = Manufacturer & {
  equipments: Equipment[];
};
