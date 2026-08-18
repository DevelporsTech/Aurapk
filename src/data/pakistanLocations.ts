export interface CityInfo {
  name: string;
  province: string;
  postalCode: string;
  estimatedDeliveryDays: string;
  deliveryFee: number;
}

export const PAKISTAN_PROVINCES = [
  'Punjab',
  'Sindh',
  'Khyber Pakhtunkhwa (KPK)',
  'Balochistan',
  'Islamabad Capital Territory (ICT)',
  'Azad Jammu & Kashmir (AJK)',
  'Gilgit-Baltistan (GB)'
];

export const PAKISTAN_CITIES: CityInfo[] = [
  { name: 'Karachi', province: 'Sindh', postalCode: '74200', estimatedDeliveryDays: '1-2 Days', deliveryFee: 150 },
  { name: 'Lahore', province: 'Punjab', postalCode: '54000', estimatedDeliveryDays: '1-2 Days', deliveryFee: 150 },
  { name: 'Islamabad', province: 'Islamabad Capital Territory (ICT)', postalCode: '44000', estimatedDeliveryDays: '1-2 Days', deliveryFee: 150 },
  { name: 'Rawalpindi', province: 'Punjab', postalCode: '46000', estimatedDeliveryDays: '1-2 Days', deliveryFee: 150 },
  { name: 'Faisalabad', province: 'Punjab', postalCode: '38000', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180 },
  { name: 'Multan', province: 'Punjab', postalCode: '60000', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180 },
  { name: 'Peshawar', province: 'Khyber Pakhtunkhwa (KPK)', postalCode: '25000', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180 },
  { name: 'Quetta', province: 'Balochistan', postalCode: '87300', estimatedDeliveryDays: '3-4 Days', deliveryFee: 220 },
  { name: 'Sialkot', province: 'Punjab', postalCode: '51310', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180 },
  { name: 'Gujranwala', province: 'Punjab', postalCode: '52250', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180 },
  { name: 'Hyderabad', province: 'Sindh', postalCode: '71000', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180 },
  { name: 'Bahawalpur', province: 'Punjab', postalCode: '63100', estimatedDeliveryDays: '2-4 Days', deliveryFee: 190 },
  { name: 'Sargodha', province: 'Punjab', postalCode: '40100', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180 },
  { name: 'Abbottabad', province: 'Khyber Pakhtunkhwa (KPK)', postalCode: '22010', estimatedDeliveryDays: '2-3 Days', deliveryFee: 190 },
  { name: 'Sukkur', province: 'Sindh', postalCode: '65200', estimatedDeliveryDays: '2-4 Days', deliveryFee: 200 },
  { name: 'Mirpur', province: 'Azad Jammu & Kashmir (AJK)', postalCode: '10250', estimatedDeliveryDays: '3-4 Days', deliveryFee: 200 },
  { name: 'Muzaffarabad', province: 'Azad Jammu & Kashmir (AJK)', postalCode: '13100', estimatedDeliveryDays: '3-4 Days', deliveryFee: 210 },
  { name: 'Gilgit', province: 'Gilgit-Baltistan (GB)', postalCode: '15100', estimatedDeliveryDays: '4-5 Days', deliveryFee: 250 },
  { name: 'Skardu', province: 'Gilgit-Baltistan (GB)', postalCode: '16100', estimatedDeliveryDays: '4-6 Days', deliveryFee: 250 },
  { name: 'Gwadar', province: 'Balochistan', postalCode: '91200', estimatedDeliveryDays: '4-5 Days', deliveryFee: 250 },
  { name: 'Rahim Yar Khan', province: 'Punjab', postalCode: '64200', estimatedDeliveryDays: '3-4 Days', deliveryFee: 190 },
  { name: 'Sheikhupura', province: 'Punjab', postalCode: '39350', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180 },
  { name: 'Jhelum', province: 'Punjab', postalCode: '49600', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180 },
  { name: 'Mardan', province: 'Khyber Pakhtunkhwa (KPK)', postalCode: '23200', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180 },
  { name: 'Larkana', province: 'Sindh', postalCode: '77150', estimatedDeliveryDays: '3-4 Days', deliveryFee: 200 },
  { name: 'Okara', province: 'Punjab', postalCode: '56300', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180 },
  { name: 'Sahiwal', province: 'Punjab', postalCode: '57000', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180 },
  { name: 'Wah Cantt', province: 'Punjab', postalCode: '47040', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180 },
  { name: 'Kasur', province: 'Punjab', postalCode: '55000', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180 }
];

export const PAKISTAN_COURIERS = [
  { id: 'tcs', name: 'TCS Express Pakistan', code: 'TCS', trackingUrlPattern: 'https://www.tcsexpress.com/tracking?track=' },
  { id: 'leopards', name: 'Leopards Courier Service', code: 'LCS', trackingUrlPattern: 'https://leopardscourier.com/tracking/' },
  { id: 'trax', name: 'Trax Logistics Pakistan', code: 'TRX', trackingUrlPattern: 'https://sonic.pk/tracking?tracking_number=' },
  { id: 'callcourier', name: 'Call Courier Logistics', code: 'CCL', trackingUrlPattern: 'https://callcourier.com.pk/tracking/' },
  { id: 'post_ex', name: 'PostEx Instant Cash & Delivery', code: 'PEX', trackingUrlPattern: 'https://postex.pk/tracking?cn=' }
];

export const AVAILABLE_COUPONS = [
  {
    code: 'WELCOMEPK',
    discountType: 'percentage' as const,
    discountValue: 15,
    minSpend: 1500,
    description: '15% Off on your first order across Pakistan (Min. ₨1,500)',
    expiryDate: '2026-12-31'
  },
  {
    code: 'AZADI500',
    discountType: 'fixed' as const,
    discountValue: 500,
    minSpend: 3000,
    description: 'Flat ₨500 Instant Discount on orders over ₨3,000',
    expiryDate: '2026-12-31'
  },
  {
    code: 'FREEDEL',
    discountType: 'fixed' as const,
    discountValue: 200,
    minSpend: 2000,
    description: 'Free Nationwide Courier Delivery Voucher',
    expiryDate: '2026-12-31'
  },
  {
    code: 'EIDSALE20',
    discountType: 'percentage' as const,
    discountValue: 20,
    minSpend: 4000,
    description: 'Mega 20% Festive Savings (Max Discount ₨1,500)',
    expiryDate: '2026-12-31'
  }
];

export const formatPKR = (amount: number): string => {
  return '₨ ' + amount.toLocaleString('en-PK');
};

export const validatePakistaniPhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  // Matches 03001234567, 923001234567, +923001234567, 03xx xxxxxxx
  const regex = /^(?:\+92|92|0)?3[0-9]{9}$/;
  return regex.test(cleanPhone);
};
