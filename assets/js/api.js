const CRICKET_API = "https://sportscore.com/api/widget/matches/?sport=cricket&limit=50&src=cricketstream.live";

async function getCricketMatches() {
  const response = await fetch(CRICKET_API, { headers: { "Accept": "application/json" } });
  if (!response.ok) throw new Error("Cricket API request failed");
  const data = await response.json();
  return Array.isArray(data.matches) ? data.matches : (Array.isArray(data) ? data : []);
}

function fallbackMatches() {
  return [
    {home_team:"Pakistan", away_team:"India", home_score:"—", away_score:"—", status:"Upcoming", competition:"International Cricket"},
    {home_team:"South Africa", away_team:"Sri Lanka", home_score:"—", away_score:"—", status:"Upcoming", competition:"T20 Cricket"},
    {home_team:"England", away_team:"West Indies", home_score:"—", away_score:"—", status:"Upcoming", competition:"International Cricket"}
  ];
}