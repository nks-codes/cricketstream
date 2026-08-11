const flagMap = {
  Pakistan:"🇵🇰", India:"🇮🇳", Australia:"🇦🇺", England:"🏴", "South Africa":"🇿🇦",
  "Sri Lanka":"🇱🇰", "New Zealand":"🇳🇿", "West Indies":"🏝️", Bangladesh:"🇧🇩",
  Afghanistan:"🇦🇫", Zimbabwe:"🇿🇼", Ireland:"🇮🇪", Nepal:"🇳🇵"
};
function toggleMenu(){ const m=document.getElementById("mobileMenu"); if(m)m.classList.toggle("open"); }

function esc(value){
  return String(value ?? "—").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}
function flag(team){ return flagMap[team] || "🏏"; }

function renderMatches(matches){
  const grid=document.getElementById("matchGrid");
  if(!grid)return;
  if(!matches.length){ grid.innerHTML='<div class="loading-card">No cricket matches available right now.</div>'; return; }
  grid.innerHTML=matches.slice(0,12).map(m=>{
    const home=m.home_team || m.home || m.team1 || "Team 1";
    const away=m.away_team || m.away || m.team2 || "Team 2";
    const hs=m.home_score ?? m.homeScore ?? "—";
    const as=m.away_score ?? m.awayScore ?? "—";
    const status=m.status || m.state || "Upcoming";
    const comp=m.competition || m.league || m.tournament || "Cricket";
    const isLive=/live|inplay|playing/i.test(status);
    return `<article class="match-card">
      <div class="match-status"><span>${esc(comp)}</span><span class="${isLive?'live':''}">${isLive?'● LIVE':esc(status)}</span></div>
      <div class="match-teams">
        <div class="team"><span class="flag">${flag(home)}</span><strong>${esc(home)}</strong><small>${esc(hs)}</small></div>
        <span class="vs">VS</span>
        <div class="team"><span class="flag">${flag(away)}</span><strong>${esc(away)}</strong><small>${esc(as)}</small></div>
      </div>
      <div class="match-comp">${isLive?'Live score':'Match details'} · CricketStream.live</div>
    </article>`;
  }).join("");
}

async function loadMatches(){
  const status=document.getElementById("apiStatus");
  try{
    const matches=await getCricketMatches();
    renderMatches(matches);
    if(status) status.innerHTML='Live data provided by <a href="https://sportscore.com/" rel="dofollow" style="color:#ff6688">SportScore</a>.';
  }catch(error){
    renderMatches(fallbackMatches());
    if(status) status.textContent="Live data is temporarily unavailable. Showing placeholder matches.";
    console.error(error);
  }
}
document.addEventListener("DOMContentLoaded",loadMatches);