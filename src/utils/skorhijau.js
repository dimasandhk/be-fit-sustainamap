const calculateSkorAQI = (aqi) => {
  if (aqi >= 0 && aqi <= 50) return 100;
  if (aqi >= 51 && aqi <= 100) return 80;
  if (aqi >= 101 && aqi <= 150) return 60;
  if (aqi >= 151 && aqi <= 200) return 40;
  if (aqi >= 201 && aqi <= 300) return 20;

  return 0;
};

const calculateSkorPLTU = (km) => {
  if (km > 30) return 100;
  if (km > 25 && km <= 30) return 80;
  if (km > 10 && km <= 25) return 60;
  if (km > 5 && km <= 10) return 40;
  if (km > 1 && km <= 5) return 20;

  return 0;
};

const calculateSkorHijau = (km, aqi, hutan) => {
  const aqip = 0.5;
  const pltup = 0.35;
  const hutanp = 0.15;

  const skorAQI = calculateSkorAQI(aqi);
  const skorPLTU = calculateSkorPLTU(km);

  return {
    skorHijau: skorAQI * aqip + skorPLTU * pltup + hutan * hutanp,
    skorAQI,
    skorPLTU
  };
};

const overallFeedback = (gsCategory) => {
  if (gsCategory == "Excellent")
    return "Your environmental area is excellent! Keep maintaining the good practices and consider becoming an environmental advocate in your community.";

  if (gsCategory == "Good")
    return "Your environmental area is good, but there's still room for improvement. Focus on the areas that need attention.";

  if (gsCategory == "Moderate")
    return "Your environmental area needs improvement. Consider taking action to address the main environmental concerns.";

  if (gsCategory == "Poor")
    return "Your environmental area has significant concerns. It's important to take immediate action to improve the situation.";

  return "Your environmental area is in critical condition. Urgent action is needed to address multiple environmental hazards.";
};

const getScoreAndTips = (km, aqi, hutan) => {
  const { skorHijau, skorAQI, skorPLTU } = calculateSkorHijau(km, aqi, hutan);

  let gsCategory = "Very Poor";
  if (skorHijau <= 100 && skorHijau >= 80) gsCategory = "Excellent";
  if (skorHijau < 80 && skorHijau >= 60) gsCategory = "Good";
  if (skorHijau < 60 && skorHijau >= 40) gsCategory = "Moderate";
  if (skorHijau < 40 && skorHijau >= 20) gsCategory = "Poor";

  // console.log(skorHijau);
  const overallTips = {
    skorHijau,
    skorAQI,
    skorPLTU,
    category: gsCategory,
    feedback: overallFeedback(gsCategory),
    specificTips: []
  };

  //! spec skoraqi
  if (skorAQI <= 60 && skorAQI > 40) {
    overallTips.specificTips.push({
      factor: "Air Quality",
      tips: [
        "Monitor air quality daily and plan outdoor activities accordingly",
        "Use public transportation or electric vehicles to reduce emissions",
        "Support local clean air initiatives",
        "Consider indoor plants to improve air quality"
      ]
    });
  }

  if (skorAQI <= 40 && skorAQI > 0) {
    overallTips.specificTips.push({
      factor: "Air Quality",
      tips: [
        "Use air purifiers indoors, especially in bedrooms",
        "Wear N95 masks when going outside",
        "Limit outdoor activities, especially for children and elderly",
        "Keep windows closed during high pollution hours",
        "Plant air-purifying plants like snake plants or peace lilies"
      ]
    });
  }

  //! spec skor pltu
  if (skorPLTU <= 60 && skorPLTU > 40) {
    overallTips.specificTips.push({
      factor: "Distance from Power Plant",
      tips: [
        "Monitor air quality regularly",
        "Support transition to renewable energy sources",
        "Be aware of wind patterns that may carry emissions",
        "Advocate for stricter emission controls"
      ]
    });
  }

  if (skorPLTU <= 40 && skorPLTU > 0) {
    overallTips.specificTips.push({
      factor: "Distance from Power Plant",
      tips: [
        "Consider relocating if possible to a safer distance",
        "Install air filtration systems in your home",
        "Regularly monitor your health, especially respiratory functions",
        "Join community advocacy groups for cleaner energy",
        "Support renewable energy initiatives in your area"
      ]
    });
  }

  //! spec forest coverage
  if (hutan <= 50 && hutan > 30) {
    overallTips.specificTips.push({
      factor: "Forest Coverage",
      tips: [
        "Support local forest conservation efforts",
        "Practice sustainable living to reduce demand for forest products",
        "Participate in community gardening projects",
        "Educate others about the importance of forests"
      ]
    });
  }

  if (hutan <= 30 && hutan > 0) {
    overallTips.specificTips.push({
      factor: "Forest Coverage",
      tips: [
        "Participate in local reforestation programs",
        "Plant native trees in your area",
        "Support organizations working on forest conservation",
        "Create green spaces in your community",
        "Advocate for urban planning that includes green areas"
      ]
    });
  }

  //! spec anomali
  if (!overallTips.specificTips.length) {
    overallTips.specificTips.push({
      factor: "Maintenance",
      tips: [
        "Continue your excellent environmental practices",
        "Share your knowledge with neighbors and community",
        "Stay informed about environmental issues in your area",
        "Support policies that protect the environment",
        "Consider becoming an environmental volunteer or advocate"
      ]
    });
  }

  return overallTips;
};

module.exports = { getScoreAndTips };
