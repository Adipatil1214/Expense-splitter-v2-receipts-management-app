export const detectCategory = (vendor) => {
  if (!vendor) return "Others";

  const v = vendor.toLowerCase();

  // 🚕 Travel - Transportation, Cab, Flight, Train, Bus
  if (v.includes("uber") || v.includes("ola") || v.includes("rapido") || 
      v.includes("swiggy instamart") || v.includes("zepto") || v.includes("blinkit") ||
      v.includes("taxi") || v.includes("cab") || v.includes("auto") ||
      v.includes("flight") || v.includes("airline") || v.includes("air india") ||
      v.includes("indigo") || v.includes("spicejet") || v.includes("vistara") ||
      v.includes("rail") || v.includes("irctc") || v.includes("train") ||
      v.includes("bus") || v.includes("ksrtc") || v.includes("redbus") ||
      v.includes("parking") || v.includes("toll") || v.includes("fuel") || 
      v.includes("petrol") || v.includes(" diesel") || v.includes("shell") ||
      v.includes("bp") || v.includes("hp") || v.includes("ioc")) {
    return "Travel";
  }

  // 🍽️ Food - Restaurants, Hotels, Cafes, Delivery
  if (v.includes("restaurant") || v.includes("hotel") || v.includes("cafe") ||
      v.includes("coffee") || v.includes("tea") || v.includes("starbucks") ||
      v.includes("domino") || v.includes("pizza") || v.includes("mcdonalds") ||
      v.includes("burger") || v.includes("kfc") || v.includes("subway") ||
      v.includes("swiggy") || v.includes("zomato") || v.includes("foodpanda") ||
      v.includes("dosa") || v.includes("idli") || v.includes("vada") ||
      v.includes("biryani") || v.includes("curry") || v.includes("tiffin") ||
      v.includes("mess") || v.includes("dhaba") || v.includes("bakery") ||
      v.includes("cake") || v.includes("sweet") || v.includes("mithai") ||
      v.includes("lunch") || v.includes("dinner") || v.includes("breakfast")) {
    return "Food";
  }

  // 🏨 Accommodation - Hotels, Resorts, Lodges
  if (v.includes("hotel") || v.includes("resort") || v.includes("lodge") ||
      v.includes("inn") || v.includes("guest house") || v.includes("homestay") ||
      v.includes("OYO") || v.includes("treebo") || v.includes("fabhotels") ||
      v.includes("stay") || v.includes("booking") || v.includes("agoda") ||
      v.includes("makemytrip") || v.includes("goibibo") || v.includes("cleartrip")) {
    return "Accommodation";
  }

  // 🛒 Shopping - Malls, Stores, E-commerce
  if (v.includes("mall") || v.includes("store") || v.includes("shop") ||
      v.includes("market") || v.includes("amazon") || v.includes("flipkart") ||
      v.includes("myntra") || v.includes("meesho") || v.includes("ajio") ||
      v.includes("snapdeal") || v.includes("bigbasket") || v.includes("zepto") ||
      v.includes("reliance") || v.includes("dmart") || v.includes("big bazaar") ||
      v.includes("lifestyle") || v.includes("pantaloon") || v.includes("shoppers stop") ||
      v.includes("electronics") || v.includes("mobile") || v.includes("laptop")) {
    return "Shopping";
  }

  // 💊 Medical - Pharmacy, Hospital, Healthcare
  if (v.includes("pharmacy") || v.includes("medicine") || v.includes("medical") ||
      v.includes("hospital") || v.includes("clinic") || v.includes("doctor") ||
      v.includes("health") || v.includes("apollo") || v.includes("fortis") ||
      v.includes("pathology") || v.includes("diagnostic") || v.includes("lab") ||
      v.includes("chemist") || v.includes("wellness") || v.includes("ayush")) {
    return "Medical";
  }

  // ⛽ Fuel & Vehicle - Petrol, Diesel, Vehicle Service
  if (v.includes("fuel") || v.includes("petrol") || v.includes("diesel") ||
      v.includes("shell") || v.includes("bp") || v.includes("hp") || v.includes("ioc") ||
      v.includes("bpc") || v.includes("hindustan petroleum") || v.includes("indian oil") ||
      v.includes("vehicle") || v.includes("service center") || v.includes("garage") ||
      v.includes("toll") || v.includes("parking") || v.includes("car wash")) {
    return "Fuel & Vehicle";
  }

  // 📱 Communication - Mobile, Internet, SIM
  if (v.includes("airtel") || v.includes("jio") || v.includes("vi") || v.includes("bsnl") ||
      v.includes("mobile") || v.includes("sim") || v.includes("recharge") ||
      v.includes("internet") || v.includes("wifi") || v.includes("broadband") ||
      v.includes("vodafone")) {
    return "Communication";
  }

  // 🎁 Gifts & Donations
  if (v.includes("gift") || v.includes("present") || v.includes("donation") ||
      v.includes("charity") || v.includes("ngo") || v.includes("flower") ||
      v.includes("greeting") || v.includes("card")) {
    return "Gifts & Donations";
  }

  // 📄 Office Supplies - Stationery, Printing
  if (v.includes("stationery") || v.includes("print") || v.includes("copy") ||
      v.includes("paper") || v.includes("pen") || v.includes("notebook") ||
      v.includes("stapler") || v.includes("file") || v.includes("folder") ||
      v.includes("xerox") || v.includes("binding")) {
    return "Office Supplies";
  }

  // 🎫 Entertainment - Movies, Events, Subscriptions
  if (v.includes("movie") || v.includes("cinema") || v.includes("theatre") ||
      v.includes("netflix") || v.includes("amazon prime") || v.includes("hotstar") ||
      v.includes("spotify") || v.includes("youtube") || v.includes("subscription") ||
      v.includes("event") || v.includes("concert") || v.includes("game") ||
      v.includes("play") || v.includes("amusement") || v.includes("park")) {
    return "Entertainment";
  }

  // 🏋️ Fitness - Gym, Sports, Health Club
  if (v.includes("gym") || v.includes("fitness") || v.includes("sports") ||
      v.includes("yoga") || v.includes("health club") || v.includes("cult.fit") ||
      v.includes("cure.fit") || v.includes("complex") || v.includes("swimming") ||
      v.includes("tennis") || v.includes("badminton")) {
    return "Fitness";
  }

  // 📚 Education - Books, Courses, Training
  if (v.includes("book") || v.includes("library") || v.includes("course") ||
      v.includes("training") || v.includes("udemy") || v.includes("coursera") ||
      v.includes("skill") || v.includes("learn") || v.includes("education") ||
      v.includes("school") || v.includes("college") || v.includes("institute") ||
      v.includes("coaching") || v.includes("tutor")) {
    return "Education";
  }

  // 🏠 Maintenance - House, Repair, Cleaning
  if (v.includes("repair") || v.includes("maintenance") || v.includes("plumber") ||
      v.includes("electrician") || v.includes("cleaning") || v.includes("pest") ||
      v.includes("home") || v.includes("house") || v.includes("appliance") ||
      v.includes("service") || v.includes("fix") || v.includes("carpenter")) {
    return "Maintenance";
  }

  // 💼 Professional Services
  if (v.includes("legal") || v.includes("lawyer") || v.includes("advocate") ||
      v.includes("consult") || v.includes("account") || v.includes("ca") ||
      v.includes("cfa") || v.includes("tax") || v.includes("consultancy")) {
    return "Professional Services";
  }

  return "Others";
};