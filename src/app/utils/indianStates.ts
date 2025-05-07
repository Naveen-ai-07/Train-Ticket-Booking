// List of Indian states
export const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
  "Uttar Pradesh", "Uttarakhand", "West Bengal", 
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
  "Lakshadweep", "Delhi", "Puducherry", "Ladakh", "Jammu and Kashmir"
];

// State-wise districts mapping
export const stateDistricts: Record<string, string[]> = {
  "Andhra Pradesh": [
    "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", 
    "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", 
    "Vizianagaram", "West Godavari", "YSR Kadapa"
  ],
  "Arunachal Pradesh": [
    "Anjaw", "Changlang", "East Kameng", "East Siang", "Kamle", "Kra Daadi", 
    "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", 
    "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", "Papum Pare", 
    "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Dibang Valley", "Upper Siang", 
    "Upper Subansiri", "West Kameng", "West Siang"
  ],
  "Assam": [
    "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", 
    "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", 
    "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", 
    "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", 
    "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", 
    "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"
  ],
  "Bihar": [
    "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", 
    "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", 
    "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", 
    "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", 
    "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", 
    "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", 
    "West Champaran"
  ],
  "Chhattisgarh": [
    "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", 
    "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir-Champa", 
    "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", 
    "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", 
    "Sukma", "Surajpur", "Surguja"
  ],
  // Adding more states and districts...
  "Delhi": [
    "Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", 
    "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", 
    "South West Delhi", "West Delhi"
  ],
  "Gujarat": [
    "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", 
    "Bhavnagar", "Botad", "Chhota Udepur", "Dahod", "Dang", "Devbhoomi Dwarka", 
    "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", 
    "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", 
    "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", 
    "Tapi", "Vadodara", "Valsad"
  ],
  "Maharashtra": [
    "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", 
    "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", 
    "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", 
    "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", 
    "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", 
    "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
  ],
  "Tamil Nadu": [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", 
    "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", 
    "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", 
    "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", 
    "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", 
    "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupattur", 
    "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", 
    "Viluppuram", "Virudhunagar"
  ],
  "Uttar Pradesh": [
    "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", 
    "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", 
    "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", 
    "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", 
    "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", 
    "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", 
    "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", 
    "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", 
    "Kushinagar", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", 
    "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", 
    "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", 
    "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", 
    "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", 
    "Sultanpur", "Unnao", "Varanasi"
  ],
  "West Bengal": [
    "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", 
    "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", 
    "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", 
    "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", 
    "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"
  ]
  // Other states can be added as needed
}; 