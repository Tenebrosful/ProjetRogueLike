document.addEventListener('DOMContentLoaded', function () {
  sendXHR();
  async function sendXHR() {

    const token = localStorage.getItem("token");

    const result = await fetch("/api/account/history", {
      body: JSON.stringify({
        token,
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    }).then((res) => res.json());
    if (result.status === "ok") {
      console.log("Got history:", result.data);
      addGamesToDom(result.data)
    } else
      alert(result.error);
    console.log(result);
  }
});

function addGamesToDom(games){
if(!games) return
if(games !== "[]"){
  let divHistory = document.getElementById('history')
  let table = document.createElement('table')
    table.classList.add("table")
  initThead(table)
  initTbody(table,games)
  divHistory.appendChild(table)
}else{
  let divHistory = document.getElementById('history')
  let h2 = document.createElement('h2')
    h2.innerText="Vous n'avez pas de partie récente"
    divHistory.appendChild(h2)
  }

function initTbody(table,games){
  const gamesAsJson = JSON.parse(games)
  console.log(gamesAsJson)
  //Ajouter le Tbody
  let tbody = document.createElement('tbody')
    table.appendChild(tbody)
  gamesAsJson.forEach(partie => {
    let line_tr = document.createElement('tr')
    let date_th = document.createElement('th')
      date_th.setAttribute('score','row')
      date_th.innerText = "24/02/2020"
    let killedMonster_td = document.createElement('td')
      killedMonster_td.innerText = partie[0].killedMonsters
    
    let coveredStages_td = document.createElement('td')
      coveredStages_td.innerText = partie[1].coveredStages

    let collectedItem_td = document.createElement('td')
      collectedItem_td.innerText = partie[2].collectedItems
    
    line_tr.appendChild(date_th)
    line_tr.appendChild(collectedItem_td)
    line_tr.appendChild(killedMonster_td)
    line_tr.appendChild(coveredStages_td)
    tbody.appendChild(line_tr)
  });
}

function initThead(table){
  let thead = document.createElement('thead')
  let head_tr = document.createElement('tr')
  
  let date_th = document.createElement('th')
    date_th.setAttribute('scope','col')
    date_th.innerText="Date"
  
  let collectedItem_th = document.createElement('th')
    collectedItem_th.setAttribute('scope','col')
    collectedItem_th.innerText="Objets ramassés"
  
  let killedMonster_th = document.createElement('th')
    killedMonster_th.setAttribute('scope','col')
    killedMonster_th.innerText="Monstres tués"
  
  let coveredStages_th = document.createElement('th')
    coveredStages_th.setAttribute('scope','col')
    coveredStages_th.innerText="Etages parcourus"
  
  head_tr.appendChild(date_th)
  head_tr.appendChild(collectedItem_th)
  head_tr.appendChild(killedMonster_th)
  head_tr.appendChild(coveredStages_th)
  
  thead.appendChild(head_tr)
  table.appendChild(thead)
}
}