export interface CityInfo {
  name: string;
  province: string;
  postalCode: string;
  estimatedDeliveryDays: string;
  deliveryFee: number;
  isMajorHub?: boolean;
  aliases?: string[];
}

export const PAKISTAN_PROVINCES = [
  'Punjab',
  'Sindh',
  'Khyber Pakhtunkhwa (KPK)',
  'Balochistan',
  'Islamabad Capital Territory (ICT)',
  'Azad Jammu & Kashmir (AJK)',
  'Gilgit-Baltistan (GB)'
] as const;

export const PAKISTAN_CITIES: CityInfo[] = [
  // ==================== MAJOR METROPOLITAN HUBS ====================
  { 
    name: 'Karachi', 
    province: 'Sindh', 
    postalCode: '74200', 
    estimatedDeliveryDays: '1-2 Days', 
    deliveryFee: 150, 
    isMajorHub: true, 
    aliases: ['khi', 'karachi south', 'karachi central', 'karachi east', 'karachi west', 'malir', 'korangi', 'clifton', 'dha karachi', 'gulshan', 'nazimabad', 'saddar karachi', 'north nazimabad', 'pechs', 'bahria town karachi'] 
  },
  { 
    name: 'Lahore', 
    province: 'Punjab', 
    postalCode: '54000', 
    estimatedDeliveryDays: '1-2 Days', 
    deliveryFee: 150, 
    isMajorHub: true, 
    aliases: ['lhr', 'lahore cantt', 'dha lahore', 'gulberg', 'model town', 'johar town', 'iqbal town', 'bahria town lahore', 'wapda town', 'valancia', 'lake city', 'cavalry ground', 'faisal town', 'shadman', 'samnabad', 'raiwind'] 
  },
  { 
    name: 'Islamabad', 
    province: 'Islamabad Capital Territory (ICT)', 
    postalCode: '44000', 
    estimatedDeliveryDays: '1-2 Days', 
    deliveryFee: 150, 
    isMajorHub: true, 
    aliases: ['isb', 'ict', 'capital', 'blue area', 'f-6', 'f-7', 'f-8', 'f-10', 'f-11', 'g-11', 'g-10', 'g-9', 'g-13', 'i-8', 'e-11', 'bahria islamabad', 'dha islamabad', 'pwd', 'soan gardens'] 
  },
  { 
    name: 'Rawalpindi', 
    province: 'Punjab', 
    postalCode: '46000', 
    estimatedDeliveryDays: '1-2 Days', 
    deliveryFee: 150, 
    isMajorHub: true, 
    aliases: ['rwp', 'pindi', 'rawalpindi cantt', 'saddar pindi', 'satellite town', 'bahria town rawalpindi', 'dha rawalpindi', 'chaklala', 'westridge', 'peshawar road', 'adiala'] 
  },
  { 
    name: 'Faisalabad', 
    province: 'Punjab', 
    postalCode: '38000', 
    estimatedDeliveryDays: '2-3 Days', 
    deliveryFee: 180, 
    isMajorHub: true, 
    aliases: ['fsd', 'lyallpur', 'd ground', 'madina town', 'peoples colony', 'samundri road', 'jaranwala road', 'canal road fsd'] 
  },
  { 
    name: 'Multan', 
    province: 'Punjab', 
    postalCode: '60000', 
    estimatedDeliveryDays: '2-3 Days', 
    deliveryFee: 180, 
    isMajorHub: true, 
    aliases: ['mux', 'multan cantt', 'gulgasht', 'bosan road', 'shah rukn e alam', 'new multan', 'mumtazabad'] 
  },
  { 
    name: 'Peshawar', 
    province: 'Khyber Pakhtunkhwa (KPK)', 
    postalCode: '25000', 
    estimatedDeliveryDays: '2-3 Days', 
    deliveryFee: 180, 
    isMajorHub: true, 
    aliases: ['pew', 'peshawar cantt', 'hayatabad', 'university town', 'saddar peshawar', 'warsak road', 'ring road peshawar', 'gulbahar'] 
  },
  { 
    name: 'Quetta', 
    province: 'Balochistan', 
    postalCode: '87300', 
    estimatedDeliveryDays: '3-4 Days', 
    deliveryFee: 220, 
    isMajorHub: true, 
    aliases: ['uet', 'quetta cantt', 'jinnah road', 'zarghoon road', 'samungli road', 'alamdar road', 'chaman phattak'] 
  },
  { 
    name: 'Gujranwala', 
    province: 'Punjab', 
    postalCode: '52250', 
    estimatedDeliveryDays: '2-3 Days', 
    deliveryFee: 180, 
    isMajorHub: true, 
    aliases: ['grw', 'model town grw', 'dc colony', 'rahwali cantt', 'wapda town grw', 'peoples colony grw', 'gt road grw'] 
  },
  { 
    name: 'Sialkot', 
    province: 'Punjab', 
    postalCode: '51310', 
    estimatedDeliveryDays: '2-3 Days', 
    deliveryFee: 180, 
    isMajorHub: true, 
    aliases: ['skt', 'sialkot cantt', 'paris road', 'kashmir road sialkot', 'ugoki', 'sambrial', 'daska'] 
  },
  { 
    name: 'Hyderabad', 
    province: 'Sindh', 
    postalCode: '71000', 
    estimatedDeliveryDays: '2-3 Days', 
    deliveryFee: 180, 
    isMajorHub: true, 
    aliases: ['hyd', 'latifabad', 'qasimabad', 'hyderabad cantt', 'autobahn road', 'saddar hyderabad'] 
  },

  // ==================== PUNJAB HUBS & CITIES ====================
  { name: 'Gujrat', province: 'Punjab', postalCode: '50700', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['gjt', 'servis mor', 'shadman colony', 'jalalpur jattan', 'kunjah'] },
  { name: 'Bahawalpur', province: 'Punjab', postalCode: '63100', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['bwp', 'model town bwp', 'baghdad ul jadeed', 'satellite town bwp'] },
  { name: 'Sargodha', province: 'Punjab', postalCode: '40100', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['sgd', 'satellite town sgd', 'university road sgd', 'cantt sgd'] },
  { name: 'Sahiwal', province: 'Punjab', postalCode: '57000', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['swl', 'montgomery', 'farid town', 'fateh sher colony'] },
  { name: 'Okara', province: 'Punjab', postalCode: '56300', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['okr', 'okara cantt', 'samadpura'] },
  { name: 'Rahim Yar Khan', province: 'Punjab', postalCode: '64200', estimatedDeliveryDays: '3-4 Days', deliveryFee: 190, aliases: ['ryk', 'rahimyar khan', 'model town ryk', 'abbasina'] },
  { name: 'Dera Ghazi Khan', province: 'Punjab', postalCode: '32200', estimatedDeliveryDays: '3-4 Days', deliveryFee: 190, aliases: ['dg khan', 'dgk', 'dera ghazi', 'multan road dgk', 'taunsa'] },
  { name: 'Jhang', province: 'Punjab', postalCode: '35200', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['jhg', 'jhang sadar', 'jhang city', 'satellite town jhang'] },
  { name: 'Kasur', province: 'Punjab', postalCode: '55000', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['ksr', 'mustafabad kasur', 'ganda singh'] },
  { name: 'Sheikhupura', province: 'Punjab', postalCode: '39350', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['skp', 'housing colony skp', 'tariq road'] },
  { name: 'Jhelum', province: 'Punjab', postalCode: '49600', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['jlm', 'jhelum cantt', 'civil lines jhelum', 'jadah'] },
  { name: 'Mandi Bahauddin', province: 'Punjab', postalCode: '50400', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['mbd', 'mandi baha ud din', 'phalia road'] },
  { name: 'Hafizabad', province: 'Punjab', postalCode: '52110', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['hfz', 'hafizabad city', 'kassoki road'] },
  { name: 'Khanewal', province: 'Punjab', postalCode: '58150', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['khl', 'khanewal city', 'peoples colony khl'] },
  { name: 'Vehari', province: 'Punjab', postalCode: '61100', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['vhr', 'vehari city', 'danewal'] },
  { name: 'Burewala', province: 'Punjab', postalCode: '61010', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['mandi burewala', 'yaqoobabad', 'model town burewala'] },
  { name: 'Bahawalnagar', province: 'Punjab', postalCode: '62300', estimatedDeliveryDays: '3-4 Days', deliveryFee: 190, aliases: ['bwn', 'minchinabad road', 'model town bwn'] },
  { name: 'Muzaffargarh', province: 'Punjab', postalCode: '34200', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['mzg', 'muzaffar garh', 'alipur road'] },
  { name: 'Chiniot', province: 'Punjab', postalCode: '35400', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['cnt', 'chenab nagar', 'rabwah', 'faisalabad road chiniot'] },
  { name: 'Toba Tek Singh', province: 'Punjab', postalCode: '36050', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['tts', 'toba', 'housing colony toba'] },
  { name: 'Chakwal', province: 'Punjab', postalCode: '48800', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['ckl', 'bhaun road', 'talagang road ckl'] },
  { name: 'Attock', province: 'Punjab', postalCode: '43600', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['atk', 'attock city', 'campbellpur', 'kamra'] },
  { name: 'Wah Cantt', province: 'Punjab', postalCode: '47040', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['wah', 'poof wah', 'aslam market wah', 'lalarukh'] },
  { name: 'Taxila', province: 'Punjab', postalCode: '47080', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['hit taxila', 'heavy mechanical complex', 'museum road taxila'] },
  { name: 'Muridke', province: 'Punjab', postalCode: '39000', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['gt road muridke', 'sheikhupura road muridke'] },
  { name: 'Kamoke', province: 'Punjab', postalCode: '50400', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['kamoki', 'gt road kamoke'] },
  { name: 'Wazirabad', province: 'Punjab', postalCode: '52000', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['wzb', 'cutlery city', 'sialkot road wazirabad'] },
  { name: 'Daska', province: 'Punjab', postalCode: '51010', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['daska sialkot', 'sambrial road daska'] },
  { name: 'Gojra', province: 'Punjab', postalCode: '36120', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['gojra mandi', 'samundri road gojra'] },
  { name: 'Jaranwala', province: 'Punjab', postalCode: '37200', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['jaranwala city', 'lahore road jaranwala'] },
  { name: 'Samundri', province: 'Punjab', postalCode: '37500', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['samundari', 'gojra road samundri'] },
  { name: 'Pakpattan', province: 'Punjab', postalCode: '57400', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['pkp', 'pakpattan sharif', 'sahiwal road pakpattan'] },
  { name: 'Arifwala', province: 'Punjab', postalCode: '57450', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['arif wala', 'qabul road arifwala'] },
  { name: 'Chichawatni', province: 'Punjab', postalCode: '57200', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['chichawatni city', 'kamalia road'] },
  { name: 'Mianwali', province: 'Punjab', postalCode: '42200', estimatedDeliveryDays: '3-4 Days', deliveryFee: 190, aliases: ['mnw', 'mianwali city', 'ballo khel', 'paf colony mianwali'] },
  { name: 'Khushab', province: 'Punjab', postalCode: '41000', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['khb', 'joharabad', 'hadali'] },
  { name: 'Bhakkar', province: 'Punjab', postalCode: '30000', estimatedDeliveryDays: '3-4 Days', deliveryFee: 190, aliases: ['bhk', 'bhakkar city', 'darya khan'] },
  { name: 'Layyah', province: 'Punjab', postalCode: '31200', estimatedDeliveryDays: '3-4 Days', deliveryFee: 190, aliases: ['lyh', 'layyah city', 'karor lal esan', 'fatehpur'] },
  { name: 'Lodhran', province: 'Punjab', postalCode: '59320', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['ldn', 'dunyapur', 'kehror pacca'] },
  { name: 'Khanpur', province: 'Punjab', postalCode: '64100', estimatedDeliveryDays: '3-4 Days', deliveryFee: 190, aliases: ['khanpur katora', 'kpt'] },
  { name: 'Sadiqabad', province: 'Punjab', postalCode: '64350', estimatedDeliveryDays: '3-4 Days', deliveryFee: 190, aliases: ['sadiq abad', 'ffc township sadiqabad'] },
  { name: 'Liaquatpur', province: 'Punjab', postalCode: '64000', estimatedDeliveryDays: '3-4 Days', deliveryFee: 190, aliases: ['liaqatpur', 'lqp'] },
  { name: 'Ahmedpur East', province: 'Punjab', postalCode: '63300', estimatedDeliveryDays: '3-4 Days', deliveryFee: 190, aliases: ['ahmadpur sharqia', 'derawar fort'] },
  { name: 'Chishtian', province: 'Punjab', postalCode: '62350', estimatedDeliveryDays: '3-4 Days', deliveryFee: 190, aliases: ['chishtian mandi', 'sugar mill colony'] },
  { name: 'Haroonabad', province: 'Punjab', postalCode: '62100', estimatedDeliveryDays: '3-4 Days', deliveryFee: 190, aliases: ['harunabad', 'fort abbas'] },
  { name: 'Nankana Sahib', province: 'Punjab', postalCode: '39100', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['nks', 'sangla hill', 'shahkot'] },
  { name: 'Narowal', province: 'Punjab', postalCode: '51600', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['nwl', 'shakargarh', 'zafarwal', 'kartarpur'] },
  { name: 'Mian Channu', province: 'Punjab', postalCode: '58000', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['mian channu city', 'talamba'] },
  { name: 'Kabirwala', province: 'Punjab', postalCode: '58250', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['kabir wala', 'nestle kabirwala'] },
  { name: 'Kot Addu', province: 'Punjab', postalCode: '34050', estimatedDeliveryDays: '3-4 Days', deliveryFee: 190, aliases: ['kot adu', 'kapco township'] },
  { name: 'Taunsa Sharif', province: 'Punjab', postalCode: '32100', estimatedDeliveryDays: '3-4 Days', deliveryFee: 190, aliases: ['taunsa', 'taunsa barrage'] },
  { name: 'Pattoki', province: 'Punjab', postalCode: '55300', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['flower city', 'chunian', 'kot radha kishan'] },
  { name: 'Lalamusa', province: 'Punjab', postalCode: '50200', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['lala musa', 'gt road lalamusa'] },
  { name: 'Kharian', province: 'Punjab', postalCode: '50090', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['kharian cantt', 'little norway'] },
  { name: 'Talagang', province: 'Punjab', postalCode: '48100', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['talagang city', 'mianwali road talagang'] },
  { name: 'Hasan Abdal', province: 'Punjab', postalCode: '43730', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['punja sahib', 'cadet college hasanabdal'] },
  { name: 'Dina', province: 'Punjab', postalCode: '49400', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['dina jhelum', 'mangla dam road'] },
  { name: 'Kamalia', province: 'Punjab', postalCode: '36300', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['kamalia khaddar', 'rajana'] },
  { name: 'Pir Mahal', province: 'Punjab', postalCode: '36200', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['pirmahal', 'shorkot road'] },
  { name: 'Shorkot', province: 'Punjab', postalCode: '35000', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['shorkot cantt', 'rafiqui base'] },
  { name: 'Phalia', province: 'Punjab', postalCode: '50430', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['phalia mandi bahauddin'] },
  { name: 'Bhalwal', province: 'Punjab', postalCode: '40410', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['bhalwal sargodha', 'kinnow city'] },
  { name: 'Kotri', province: 'Sindh', postalCode: '76000', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['jamshoro', 'kotri site'] },

  // ==================== SINDH HUBS & CITIES ====================
  { name: 'Sukkur', province: 'Sindh', postalCode: '65200', estimatedDeliveryDays: '2-3 Days', deliveryFee: 190, aliases: ['skr', 'rohri', 'military road sukkur', 'barrage colony'] },
  { name: 'Larkana', province: 'Sindh', postalCode: '77150', estimatedDeliveryDays: '3-4 Days', deliveryFee: 200, aliases: ['lkn', 'larkano', 'vip road larkana', 'mohenjo daro'] },
  { name: 'Nawabshah', province: 'Sindh', postalCode: '67450', estimatedDeliveryDays: '2-3 Days', deliveryFee: 190, aliases: ['shaheed benazirabad', 'sba', 'society road nawabshah'] },
  { name: 'Mirpur Khas', province: 'Sindh', postalCode: '69000', estimatedDeliveryDays: '2-4 Days', deliveryFee: 190, aliases: ['mpk', 'mirpurkhas', 'mango city'] },
  { name: 'Jacobabad', province: 'Sindh', postalCode: '79000', estimatedDeliveryDays: '3-4 Days', deliveryFee: 200, aliases: ['jcd', 'shahbaz air base', 'dc road jacobabad'] },
  { name: 'Shikarpur', province: 'Sindh', postalCode: '78100', estimatedDeliveryDays: '3-4 Days', deliveryFee: 200, aliases: ['shk', 'achar city', 'lakhi dar'] },
  { name: 'Khairpur', province: 'Sindh', postalCode: '66020', estimatedDeliveryDays: '3-4 Days', deliveryFee: 200, aliases: ['khairpur mirs', 'luqman khairpur'] },
  { name: 'Dadu', province: 'Sindh', postalCode: '76200', estimatedDeliveryDays: '3-4 Days', deliveryFee: 200, aliases: ['dadu city', 'mehar', 'khairpur nathan shah'] },
  { name: 'Ghotki', province: 'Sindh', postalCode: '65010', estimatedDeliveryDays: '3-4 Days', deliveryFee: 200, aliases: ['mirpur mathelo', 'daharki', 'engro township'] },
  { name: 'Badin', province: 'Sindh', postalCode: '70000', estimatedDeliveryDays: '3-4 Days', deliveryFee: 200, aliases: ['badin city', 'tando bago', 'golarchi'] },
  { name: 'Thatta', province: 'Sindh', postalCode: '73130', estimatedDeliveryDays: '2-3 Days', deliveryFee: 190, aliases: ['makli', 'sajawal', 'gharo'] },
  { name: 'Tando Adam', province: 'Sindh', postalCode: '68000', estimatedDeliveryDays: '2-3 Days', deliveryFee: 190, aliases: ['tando adam khan', 'muhammadia colony'] },
  { name: 'Tando Allahyar', province: 'Sindh', postalCode: '70010', estimatedDeliveryDays: '2-3 Days', deliveryFee: 190, aliases: ['tando allah yar', 'nasarpur'] },
  { name: 'Umerkot', province: 'Sindh', postalCode: '69100', estimatedDeliveryDays: '3-4 Days', deliveryFee: 210, aliases: ['amarkot', 'thar desert'] },
  { name: 'Sanghar', province: 'Sindh', postalCode: '68100', estimatedDeliveryDays: '3-4 Days', deliveryFee: 200, aliases: ['shahdadpur', 'sinjhoro'] },
  { name: 'Kandhkot', province: 'Sindh', postalCode: '79150', estimatedDeliveryDays: '4-5 Days', deliveryFee: 220, aliases: ['kashmore', 'kashmore city'] },
  { name: 'Moro', province: 'Sindh', postalCode: '67120', estimatedDeliveryDays: '3-4 Days', deliveryFee: 200, aliases: ['naushahro feroze', 'kandiaro'] },
  { name: 'Mithi', province: 'Sindh', postalCode: '69230', estimatedDeliveryDays: '4-5 Days', deliveryFee: 230, aliases: ['tharparkar', 'islamkot'] },

  // ==================== KHYBER PAKHTUNKHWA (KPK) ====================
  { name: 'Abbottabad', province: 'Khyber Pakhtunkhwa (KPK)', postalCode: '22010', estimatedDeliveryDays: '2-3 Days', deliveryFee: 190, aliases: ['atd', 'mandian', 'kakul', 'pma kakul', 'supply abbottabad', 'havelian'] },
  { name: 'Mardan', province: 'Khyber Pakhtunkhwa (KPK)', postalCode: '23200', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['mdn', 'mardan cantt', 'bagh e haram', 'takht bhai'] },
  { name: 'Swat', province: 'Khyber Pakhtunkhwa (KPK)', postalCode: '19130', estimatedDeliveryDays: '3-4 Days', deliveryFee: 200, aliases: ['mingora', 'saidu sharif', 'malam jabba', 'fizagat', 'matta'] },
  { name: 'Dera Ismail Khan', province: 'Khyber Pakhtunkhwa (KPK)', postalCode: '29050', estimatedDeliveryDays: '3-4 Days', deliveryFee: 200, aliases: ['di khan', 'dik', 'dera ismail', 'circular road dik'] },
  { name: 'Mansehra', province: 'Khyber Pakhtunkhwa (KPK)', postalCode: '21300', estimatedDeliveryDays: '2-4 Days', deliveryFee: 190, aliases: ['mns', 'shinkiari', 'balakot', 'kaghan'] },
  { name: 'Haripur', province: 'Khyber Pakhtunkhwa (KPK)', postalCode: '22620', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['hrp', 'hattar industrial', 'khanpur road'] },
  { name: 'Nowshera', province: 'Khyber Pakhtunkhwa (KPK)', postalCode: '24100', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['nwr', 'nowshera cantt', 'risalpur', 'pabbi'] },
  { name: 'Charsadda', province: 'Khyber Pakhtunkhwa (KPK)', postalCode: '24420', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['csd', 'shabqadar', 'tangi', 'rajjar'] },
  { name: 'Kohat', province: 'Khyber Pakhtunkhwa (KPK)', postalCode: '26000', estimatedDeliveryDays: '2-3 Days', deliveryFee: 190, aliases: ['kht', 'kohat cantt', 'kda kohat', 'tanda dam'] },
  { name: 'Bannu', province: 'Khyber Pakhtunkhwa (KPK)', postalCode: '28100', estimatedDeliveryDays: '3-4 Days', deliveryFee: 210, aliases: ['bnu', 'bannu cantt', 'bannu township'] },
  { name: 'Swabi', province: 'Khyber Pakhtunkhwa (KPK)', postalCode: '23430', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['swb', 'topi', 'giki swabi', 'tarbela dam'] },
  { name: 'Timergara', province: 'Khyber Pakhtunkhwa (KPK)', postalCode: '18300', estimatedDeliveryDays: '3-5 Days', deliveryFee: 220, aliases: ['lower dir', 'dir', 'timergara city'] },
  { name: 'Chitral', province: 'Khyber Pakhtunkhwa (KPK)', postalCode: '17200', estimatedDeliveryDays: '4-6 Days', deliveryFee: 250, aliases: ['cht', 'drosh', 'kalash valley', 'ayun'] },
  { name: 'Karak', province: 'Khyber Pakhtunkhwa (KPK)', postalCode: '27200', estimatedDeliveryDays: '3-4 Days', deliveryFee: 210, aliases: ['krk', 'takht e nasrati', 'banda daud shah'] },
  { name: 'Hangu', province: 'Khyber Pakhtunkhwa (KPK)', postalCode: '26100', estimatedDeliveryDays: '3-5 Days', deliveryFee: 220, aliases: ['thal', 'samana'] },
  { name: 'Malakand', province: 'Khyber Pakhtunkhwa (KPK)', postalCode: '19500', estimatedDeliveryDays: '3-4 Days', deliveryFee: 200, aliases: ['batkhela', 'dargai', 'thana'] },

  // ==================== BALOCHISTAN HUBS & CITIES ====================
  { name: 'Gwadar', province: 'Balochistan', postalCode: '91200', estimatedDeliveryDays: '4-5 Days', deliveryFee: 240, aliases: ['gwd', 'gwadar port', 'marine drive gwadar', 'new town gwadar'] },
  { name: 'Turbat', province: 'Balochistan', postalCode: '92600', estimatedDeliveryDays: '4-5 Days', deliveryFee: 240, aliases: ['tbt', 'kech', 'makran', 'absor'] },
  { name: 'Khuzdar', province: 'Balochistan', postalCode: '89100', estimatedDeliveryDays: '3-5 Days', deliveryFee: 230, aliases: ['kzd', 'khuzdar cantt', 'jhalawan'] },
  { name: 'Hub', province: 'Balochistan', postalCode: '90150', estimatedDeliveryDays: '2-3 Days', deliveryFee: 180, aliases: ['hub chowki', 'lasbela', 'gadani'] },
  { name: 'Chaman', province: 'Balochistan', postalCode: '86000', estimatedDeliveryDays: '4-5 Days', deliveryFee: 240, aliases: ['chmn', 'killa abdullah', 'border town'] },
  { name: 'Sibi', province: 'Balochistan', postalCode: '82000', estimatedDeliveryDays: '3-4 Days', deliveryFee: 220, aliases: ['sbi', 'sibi city', 'dhadar'] },
  { name: 'Zhob', province: 'Balochistan', postalCode: '85200', estimatedDeliveryDays: '4-5 Days', deliveryFee: 240, aliases: ['fort sandeman', 'apozai'] },
  { name: 'Loralai', province: 'Balochistan', postalCode: '84800', estimatedDeliveryDays: '4-5 Days', deliveryFee: 240, aliases: ['loralai cantt', 'bhamber'] },
  { name: 'Pishin', province: 'Balochistan', postalCode: '86400', estimatedDeliveryDays: '3-4 Days', deliveryFee: 230, aliases: ['pishin city', 'saranan'] },
  { name: 'Jafarabad', province: 'Balochistan', postalCode: '80000', estimatedDeliveryDays: '4-5 Days', deliveryFee: 230, aliases: ['dera allah yar', 'usta muhammad'] },
  { name: 'Pasni', province: 'Balochistan', postalCode: '91300', estimatedDeliveryDays: '4-6 Days', deliveryFee: 250, aliases: ['pasni coastal', 'ormara'] },

  // ==================== AZAD JAMMU & KASHMIR (AJK) ====================
  { name: 'Mirpur', province: 'Azad Jammu & Kashmir (AJK)', postalCode: '10250', estimatedDeliveryDays: '2-3 Days', deliveryFee: 190, aliases: ['mrp', 'mirpur ajk', 'sector f-1 mirpur', 'new mirpur city', 'chaksawari', 'islamgarh'] },
  { name: 'Muzaffarabad', province: 'Azad Jammu & Kashmir (AJK)', postalCode: '13100', estimatedDeliveryDays: '3-4 Days', deliveryFee: 200, aliases: ['mzd', 'muzaffarabad city', 'domel', 'plate', 'chehla bandi'] },
  { name: 'Rawalakot', province: 'Azad Jammu & Kashmir (AJK)', postalCode: '12350', estimatedDeliveryDays: '3-4 Days', deliveryFee: 210, aliases: ['rwk', 'poonch', 'hussain kot', 'banjosa'] },
  { name: 'Kotli', province: 'Azad Jammu & Kashmir (AJK)', postalCode: '11100', estimatedDeliveryDays: '3-4 Days', deliveryFee: 200, aliases: ['kotli ajk', 'sehnsa', 'fatehpur thakiala'] },
  { name: 'Bhimber', province: 'Azad Jammu & Kashmir (AJK)', postalCode: '10050', estimatedDeliveryDays: '2-3 Days', deliveryFee: 190, aliases: ['bhimber ajk', 'samani', 'barnala'] },
  { name: 'Bagh', province: 'Azad Jammu & Kashmir (AJK)', postalCode: '12500', estimatedDeliveryDays: '3-4 Days', deliveryFee: 210, aliases: ['bagh ajk', 'dhirkot', 'hari ghel'] },
  { name: 'Pallandri', province: 'Azad Jammu & Kashmir (AJK)', postalCode: '12050', estimatedDeliveryDays: '3-4 Days', deliveryFee: 210, aliases: ['sudhanoti', 'trarkhel'] },

  // ==================== GILGIT-BALTISTAN (GB) ====================
  { name: 'Gilgit', province: 'Gilgit-Baltistan (GB)', postalCode: '15100', estimatedDeliveryDays: '4-5 Days', deliveryFee: 240, aliases: ['glt', 'gilgit city', 'jutial', 'danyore', 'river view'] },
  { name: 'Skardu', province: 'Gilgit-Baltistan (GB)', postalCode: '16100', estimatedDeliveryDays: '4-6 Days', deliveryFee: 250, aliases: ['kdu', 'skardu city', 'shigar', 'khaplu', 'kachura'] },
  { name: 'Hunza', province: 'Gilgit-Baltistan (GB)', postalCode: '15700', estimatedDeliveryDays: '4-6 Days', deliveryFee: 250, aliases: ['karimabad', 'aliabad', 'passu', 'attabad'] },
  { name: 'Chilas', province: 'Gilgit-Baltistan (GB)', postalCode: '14100', estimatedDeliveryDays: '4-6 Days', deliveryFee: 250, aliases: ['diamer', 'babuser'] },
  { name: 'Gahkuch', province: 'Gilgit-Baltistan (GB)', postalCode: '15200', estimatedDeliveryDays: '4-6 Days', deliveryFee: 250, aliases: ['ghizer', 'phander'] }
];

/**
 * Intelligent fuzzy and alias-aware search for Pakistan cities and delivery hubs
 */
export function searchPakistanCities(query: string, provinceFilter?: string): CityInfo[] {
  const cleanQuery = query.trim().toLowerCase().replace(/[^a-z0-9\s]/g, '');
  
  let list = PAKISTAN_CITIES;

  if (provinceFilter && provinceFilter !== 'all') {
    list = list.filter(c => c.province.toLowerCase().includes(provinceFilter.toLowerCase()));
  }

  if (!cleanQuery) {
    // If no query, return major metropolitan hubs first, followed by remainder alphabetically
    return [...list].sort((a, b) => {
      if (a.isMajorHub && !b.isMajorHub) return -1;
      if (!a.isMajorHub && b.isMajorHub) return 1;
      return a.name.localeCompare(b.name);
    });
  }

  // Scoring function for highly accurate ranking:
  // 100+: Exact full city name match
  // 80+: City name starts with query
  // 60+: Exact alias match (e.g. "lhr", "isb", "dg khan")
  // 50+: Substring in city name
  // 40+: Alias contains query
  // 30+: Postal code match
  // 20+: Province match
  const scored = list.map(city => {
    const cityNameLower = city.name.toLowerCase();
    let score = 0;

    if (cityNameLower === cleanQuery) {
      score = 150;
    } else if (cityNameLower.startsWith(cleanQuery)) {
      score = 100;
    } else if (city.aliases?.some(alias => alias.toLowerCase() === cleanQuery)) {
      score = 90;
    } else if (cityNameLower.includes(cleanQuery)) {
      score = 70;
    } else if (city.aliases?.some(alias => alias.toLowerCase().includes(cleanQuery))) {
      score = 55;
    } else if (city.postalCode.startsWith(cleanQuery)) {
      score = 45;
    } else if (city.province.toLowerCase().includes(cleanQuery)) {
      score = 30;
    }

    // Boost major hubs slightly for ambiguous short inputs like "k" or "l"
    if (score > 0 && city.isMajorHub) {
      score += 5;
    }

    return { city, score };
  });

  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.city);
}

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

export const DEFAULT_BANK_ACCOUNTS = [
  {
    id: 'meezan',
    bankName: 'Meezan Bank Ltd',
    shortName: 'Meezan Islamic Bank',
    accountTitle: 'AuraPK Retail (Pvt) Ltd',
    accountNumber: '0109-0104829101',
    iban: 'PK54MEZN0001090104829101',
    branchCode: '0109',
    branchName: 'DHA Phase 5 Commercial Branch, Lahore',
    raastId: '03008451992',
    isActive: true,
    isPopular: true,
    notes: '0% fees, Instant 1LINK & Raast clearing 24/7'
  },
  {
    id: 'hbl',
    bankName: 'Habib Bank Limited (HBL)',
    shortName: 'HBL Pakistan',
    accountTitle: 'AuraPK Official Commerce',
    accountNumber: '2345-7901234503',
    iban: 'PK12HABB0023457901234503',
    branchCode: '2345',
    branchName: 'Main Gulberg Boulevard Branch, Lahore',
    raastId: 'aurapk@hbl',
    isActive: true,
    isPopular: true,
    notes: 'Supports HBL Mobile App & Konnect instant transfer'
  },
  {
    id: 'alfalah',
    bankName: 'Bank Alfalah',
    shortName: 'Bank Alfalah / Alfa',
    accountTitle: 'AuraPK Online Store',
    accountNumber: '5601-1008291002',
    iban: 'PK36ALFH0056011008291002',
    branchCode: '5601',
    branchName: 'Blue Area Branch, Islamabad',
    raastId: '03455551992',
    isActive: true,
    isPopular: false,
    notes: 'Instant clearing via Alfa App & QR'
  },
  {
    id: 'ubl',
    bankName: 'United Bank Limited (UBL)',
    shortName: 'UBL Digital',
    accountTitle: 'AuraPK E-Commerce Hub',
    accountNumber: '0981-2244556677',
    iban: 'PK76UNIL0009812244556677',
    branchCode: '0981',
    branchName: 'I.I. Chundrigar Corporate Branch, Karachi',
    raastId: '03001234567',
    isActive: true,
    isPopular: false,
    notes: 'Direct transfer via UBL Digital App & Omni'
  },
  {
    id: 'mcb',
    bankName: 'MCB Bank Limited',
    shortName: 'MCB Live',
    accountTitle: 'AuraPK Logistics & Retail',
    accountNumber: '1122-334455667788',
    iban: 'PK23MUCB1122334455667788',
    branchCode: '1122',
    branchName: 'The Mall Road Branch, Rawalpindi',
    raastId: '03123456789',
    isActive: true,
    isPopular: false,
    notes: 'MCB Live App & 1Link IBFT supported'
  },
  {
    id: 'raast_direct',
    bankName: 'State Bank of Pakistan (RAAST Instant ID)',
    shortName: 'Raast Instant Pay',
    accountTitle: 'AuraPK Official Store (SBP Raast)',
    accountNumber: '03008451992',
    iban: 'PK54MEZN0001090104829101',
    branchCode: 'RAAST',
    branchName: 'State Bank of Pakistan Instant Clearing Grid',
    raastId: '03008451992',
    isActive: true,
    isPopular: true,
    notes: 'Zero transaction charges from ANY Pakistani banking app'
  }
];

export const DEFAULT_BANK_SETTINGS = {
  enabled: true,
  accounts: DEFAULT_BANK_ACCOUNTS,
  instructions: 'Transfer the exact order total to any of the official AuraPK verified Pakistani accounts below via Mobile App, Internet Banking, or ATM. Share your screenshot or Transaction ID for instant 1-click dispatch.',
  whatsappVerificationNumber: '+92 300 8451992'
};

export const formatPKR = (amount: number): string => {
  return '₨ ' + amount.toLocaleString('en-PK');
};

export const validatePakistaniPhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  // Matches 03001234567, 923001234567, +923001234567, 03xx xxxxxxx
  const regex = /^(?:\+92|92|0)?3[0-9]{9}$/;
  return regex.test(cleanPhone);
};
