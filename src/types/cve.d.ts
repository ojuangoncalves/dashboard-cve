interface Address {
    addressPk: number; // integer($int32)
    city: string;
    cityNumber: string;
    complement: string;
    country: string; // Enum: Array [ 270 ]
    district: string;
    houseNumber: string;
    state: string;
    street: string;
    zipCode: string;
  }
  
  interface Time {
    date: number; // integer($int32)
    day: number; // integer($int32)
    hours: number; // integer($int32)
    minutes: number; // integer($int32)
    month: number; // integer($int32)
    seconds: number; // integer($int32)
    time: number; // integer($int64)
    timezoneOffset: number; // integer($int32)
    year: number; // integer($int32)
  }
  
  interface ConnectorStatus {
    connectorTypePk: number; // integer($int32)
    dynamicPricingUuid: string;
    erroInfo: string;
    errorCode: string;
    hasPayment: boolean;
    idleConnectorFee: boolean;
    moneyPerDurationIncome: number; // number($double)
    moneyPerDurationIncomeHumanReadable: string;
    moneyPerKilowattIncome: number; // number($double)
    moneyPerKilowattIncomeHumanReadable: string;
    moneyPerTransactionIncome: number; // number($double)
    moneyPerTransactionIncomeHumanReadable: string;
    paymentChargeTypeIncome: string; // Enum: Array [ 2 ]
    powerMax: number; // integer($int32)
    socPercentage: string;
    status: string;
    taxIncome: number; // number($double)
    taxIncomeHumanReadable: string;
    timeStamp: string; // Pode ser alterado para Date se necessário
    totalDuration: number; // Pode ser alterado conforme necessário
    usage: number; // integer($int32)
  }
  
  interface Connector {
    connectorId: number; // integer($int32)
    connectorPk: number; // integer($int32)
    connectorType: string;
    connectorUuid: string; // string($uuid)
    currentType: string;
    dynamicPricingUuid: string;
    lastStatus: ConnectorStatus;
    moneyPerDurationIncome: number; // number($double)
    moneyPerKilowattIncome: number; // number($double)
    powerMax: number; // integer($int32)
    speed: string;
    unusualStatus: string;
  }
  
  interface SpeedCount {
    nrFastAvailable: number; // integer($int32)
    nrFastTotal: number; // integer($int32)
    nrSlowAvailable: number; // integer($int32)
    nrSlowTotal: number; // integer($int32)
  }
  
  interface ChargePoint {
    active: boolean;
    address: Address;
    chargeBoxGroupName: string;
    chargeBoxGroupPk: number; // integer($int32)
    chargeBoxId: string;
    chargeBoxPk: number; // integer($int32)
    chargeBoxSerialNumber: string;
    chargePointModel: string;
    chargePointSerialNumber: string;
    chargePointVendor: string;
    closeTime: Time;
    connectors: Connector[];
    description: string;
    deviceReaderMac: string;
    endpointAddress: string;
    externalId: string;
    fwVersion: string;
    hasPayment: boolean;
    insertTimestamp: string; // Pode ser alterado para Date se necessário
    isHubjectCompatible: boolean;
    isMode1And2Only: boolean;
    isOcpiCompatible: boolean;
    isOpen_24Hours: boolean;
    lastHeartbeatTimestamp: string; // Pode ser alterado para Date se necessário
    locationLatitude: number;
    locationLongitude: number;
    master: boolean;
    moneyPerDurationCost: number; // number($double)
    moneyPerDurationIncome: number; // number($double)
    moneyPerKilowattCost: number; // number($double)
    moneyPerKilowattIncome: number; // number($double)
    moneyPerTransactionCost: number; // number($double)
    moneyPerTransactionIncome: number; // number($double)
    monthConsumption: number;
    ocppProtocol: string;
    openTime: Time;
    origin: string;
    owner: boolean;
    paymentChargeByIncome: string; // Enum: Array [ 2 ]
    paymentChargeTypeCost: string; // Enum: Array [ 2 ]
    paymentChargeTypeIncome: string; // Enum: Array [ 2 ]
    phase: string;
    registrationStatus: string;
    reservation: boolean;
    showLocation: boolean;
    speedCount: SpeedCount;
    system: string;
    taxIncome: number; // number($double)
    tenantDeviceReader: boolean;
    tenantName: string;
    tenantPk: number; // integer($int32)
    typeOf: string; // Enum: Array [ 2 ]
    usage: number; // integer($int32)
    uuid: string;
    voltage: number; // integer($int32)
  }
  
  interface ChargePointListResponse {
    chargePointList: ChargePoint[];
    error: string;
  }
  
  // Interface para cada notificação individual
  interface chargeBoxNotification {
  type: string;
  chargeBoxId: string;
  addressState: string | null;
  addressCity: string | null;
  addressStreet: string | null;
  registrationStatus: string;
  connectorErrorCode: string | null;
  connectorErrorMsg: string | null;
  chargeBoxName: string;
  notificationTimestampDT: string;
  userName: string | null;
  lastName: string | null;
  idTag: string | null;
  connectorType: string | null;
  userExternalId: string | null;
  chargeBoxGroupExternalId: string | null;
  notificationPk: number;
  connectorId: string | null;
  transactionId: string | null;
  userPk: number | null;
  }
  
  // Interface para o retorno completo do JSON
  interface chargeBoxNotificationResponse {
  error: string | null;
  notificationList: chargeBoxNotificationList[];
  }


  interface customRequestHeaders extends object {
    Platform: string;
    Authorization: string | undefined;
    Accept: string;
  }