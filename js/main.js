/* WC 2026 ULTIMATE ENGINE - FINAL POLISHED
    Author: Gemini AI
*/

const app = (() => {
    // --- Data Definitions ---
    const TEAMS_DB = {
        // CONMEBOL
        "AR": {name: "Argentina", flag: "ar"}, "BO": {name: "Bolivia", flag: "bo"}, "BR": {name: "Brazil", flag: "br"},
        "CL": {name: "Chile", flag: "cl"}, "CO": {name: "Colombia", flag: "co"}, "EC": {name: "Ecuador", flag: "ec"},
        "PY": {name: "Paraguay", flag: "py"}, "PE": {name: "Peru", flag: "pe"}, "UY": {name: "Uruguay", flag: "uy"},
        "VE": {name: "Venezuela", flag: "ve"},
        
        // UEFA
        "FR": {name: "France", flag: "fr"}, "ES": {name: "Spain", flag: "es"}, "GB-ENG": {name: "England", flag: "gb-eng"},
        "PT": {name: "Portugal", flag: "pt"}, "DE": {name: "Germany", flag: "de"}, "NL": {name: "Netherlands", flag: "nl"},
        "IT": {name: "Italy", flag: "it"}, "HR": {name: "Croatia", flag: "hr"}, "BE": {name: "Belgium", flag: "be"},
        "DK": {name: "Denmark", flag: "dk"}, "RS": {name: "Serbia", flag: "rs"}, "CH": {name: "Switzerland", flag: "ch"},
        "PL": {name: "Poland", flag: "pl"}, "UA": {name: "Ukraine", flag: "ua"}, "SE": {name: "Sweden", flag: "se"},
        "NO": {name: "Norway", flag: "no"}, "AT": {name: "Austria", flag: "at"}, "RO": {name: "Romania", flag: "ro"},
        "TR": {name: "Türkiye", flag: "tr"}, "GB-SCT": {name: "Scotland", flag: "gb-sct"}, "GB-WLS": {name: "Wales", flag: "gb-wls"},
        "GB-NIR": {name: "N. Ireland", flag: "gb-nir"}, "IE": {name: "Ireland", flag: "ie"}, "CZ": {name: "Czechia", flag: "cz"},
        "SK": {name: "Slovakia", flag: "sk"}, "AL": {name: "Albania", flag: "al"}, "MK": {name: "N. Macedonia", flag: "mk"},
        "BA": {name: "Bosnia", flag: "ba"}, "XK": {name: "Kosovo", flag: "xk"},

        // CONCACAF
        "US": {name: "USA", flag: "us"}, "MX": {name: "Mexico", flag: "mx"}, "CA": {name: "Canada", flag: "ca"},
        "CR": {name: "Costa Rica", flag: "cr"}, "PA": {name: "Panama", flag: "pa"}, "JM": {name: "Jamaica", flag: "jm"},
        "HT": {name: "Haiti", flag: "ht"}, "CW": {name: "Curaçao", flag: "cw"}, "SR": {name: "Suriname", flag: "sr"},

        // CAF
        "SN": {name: "Senegal", flag: "sn"}, "MA": {name: "Morocco", flag: "ma"}, "TN": {name: "Tunisia", flag: "tn"},
        "EG": {name: "Egypt", flag: "eg"}, "NG": {name: "Nigeria", flag: "ng"}, "DZ": {name: "Algeria", flag: "dz"},
        "CM": {name: "Cameroon", flag: "cm"}, "GH": {name: "Ghana", flag: "gh"}, "CI": {name: "Côte d'Ivoire", flag: "ci"},
        "ZA": {name: "South Africa", flag: "za"}, "CD": {name: "DR Congo", flag: "cd"}, "CV": {name: "Cape Verde", flag: "cv"},

        // AFC
        "JP": {name: "Japan", flag: "jp"}, "IR": {name: "Iran", flag: "ir"}, "KR": {name: "South Korea", flag: "kr"},
        "AU": {name: "Australia", flag: "au"}, "QA": {name: "Qatar", flag: "qa"}, "SA": {name: "Saudi Arabia", flag: "sa"},
        "UZ": {name: "Uzbekistan", flag: "uz"}, "JO": {name: "Jordan", flag: "jo"}, "IQ": {name: "Iraq", flag: "iq"},

        // OFC
        "NZ": {name: "New Zealand", flag: "nz"}, "NC": {name: "New Caledonia", flag: "nc"}
    };

    const INITIAL_GROUPS = {
        "A": ["MX", "ZA", "KR", "Q_PathD"],
        "B": ["CA", "Q_PathA", "QA", "CH"],
        "C": ["BR", "MA", "HT", "GB-SCT"],
        "D": ["US", "PY", "AU", "Q_PathC"],
        "E": ["DE", "CW", "CI", "EC"],
        "F": ["NL", "JP", "Q_PathB", "TN"],
        "G": ["BE", "EG", "IR", "NZ"],
        "H": ["ES", "CV", "SA", "UY"],
        "I": ["FR", "SN", "Q_IC2", "NO"],
        "J": ["AR", "DZ", "AT", "JO"],
        "K": ["PT", "Q_IC1", "UZ", "CO"],
        "L": ["GB-ENG", "HR", "GH", "PA"]
    };

    const QUALIFIER_PATHS = [
        { id: "Q_PathA", name: "UEFA Path A", options: [{code: "IT", name: "Italy", flag: "it"}, {code: "GB-NIR", name: "N. Ireland", flag: "gb-nir"}, {code: "GB-WLS", name: "Wales", flag: "gb-wls"}, {code: "BA", name: "Bosnia", flag: "ba"}]},
        { id: "Q_PathB", name: "UEFA Path B", options: [{code: "UA", name: "Ukraine", flag: "ua"}, {code: "SE", name: "Sweden", flag: "se"}, {code: "PL", name: "Poland", flag: "pl"}, {code: "AL", name: "Albania", flag: "al"}]},
        { id: "Q_PathC", name: "UEFA Path C", options: [{code: "TR", name: "Türkiye", flag: "tr"}, {code: "RO", name: "Romania", flag: "ro"}, {code: "SK", name: "Slovakia", flag: "sk"}, {code: "XK", name: "Kosovo", flag: "xk"}]},
        { id: "Q_PathD", name: "UEFA Path D", options: [{code: "DK", name: "Denmark", flag: "dk"}, {code: "MK", name: "N. Macedonia", flag: "mk"}, {code: "CZ", name: "Czechia", flag: "cz"}, {code: "IE", name: "Ireland", flag: "ie"}]},
        { id: "Q_IC1", name: "Interconfed 1", options: [{code: "NC", name: "New Caledonia", flag: "nc"}, {code: "JM", name: "Jamaica", flag: "jm"}, {code: "CD", name: "DR Congo", flag: "cd"}]},
        { id: "Q_IC2", name: "Interconfed 2", options: [{code: "BO", name: "Bolivia", flag: "bo"}, {code: "SR", name: "Suriname", flag: "sr"}, {code: "IQ", name: "Iraq", flag: "iq"}]}
    ];

    const KEY_QUALS = "wc26_qualifiers";
    const KEY_SCORES = "wc26_group_scores";
    const KEY_KNOCKOUT = "wc26_knockout";

    // --- UTILS ---
    const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
    const load = (k) => { try { return JSON.parse(localStorage.getItem(k)); } catch(e) { return null; } };
    const getFlag = (code) => {
        if(!code || code === "TBD" || code.startsWith("Q_")) return "https://via.placeholder.com/40x30?text=?";
        return `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
    };

    // --- SHARED CALCULATION LOGIC ---
    const calculateAllStandings = () => {
        const scores = load(KEY_SCORES) || {};
        const qualifiers = load(KEY_QUALS) || {};
        const groupData = JSON.parse(JSON.stringify(INITIAL_GROUPS));
        
        for(let g in groupData) {
            groupData[g] = groupData[g].map(t => qualifiers[t]?.code || t);
        }

        const standings = {};
        const thirds = [];
        const allGroups = {};

        Object.keys(groupData).forEach(gName => {
            const teams = groupData[gName].map(t => ({ 
                code: t, 
                name: TEAMS_DB[t]?.name || qualifiers[t]?.name || t, 
                flag: TEAMS_DB[t]?.flag || qualifiers[t]?.code || t,
                pts:0, gd:0, gf:0, w:0, d:0, l:0, p:0
            }));

            const pairs = [[0,1], [2,3], [0,2], [1,3], [0,3], [1,2]];
            
            for(let i=0; i<6; i++) {
                const mid = `${gName}-${i}`;
                if(scores[mid]) {
                    const s1 = parseInt(scores[mid].s1);
                    const s2 = parseInt(scores[mid].s2);
                    if(!isNaN(s1) && !isNaN(s2)) {
                        const t1 = teams[pairs[i][0]];
                        const t2 = teams[pairs[i][1]];
                        t1.p++; t2.p++;
                        t1.gf += s1; t1.gd += (s1-s2);
                        t2.gf += s2; t2.gd += (s2-s1);
                        if(s1 > s2) { t1.w++; t1.pts+=3; t2.l++; }
                        else if(s2 > s1) { t2.w++; t2.pts+=3; t1.l++; }
                        else { t1.d++; t1.pts++; t2.d++; t2.pts++; }
                    }
                }
            }
            teams.sort((a,b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
            allGroups[gName] = teams;
            standings[`1${gName}`] = teams[0];
            standings[`2${gName}`] = teams[1];
            if(teams[2]) thirds.push({ ...teams[2], group: gName });
        });

        thirds.sort((a,b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
        return { standings, thirds, allGroups };
    };

    // --- QUALIFIERS ---
    const initQualifiers = () => {
        const container = document.getElementById('qualifiers-container');
        if(!container) return;
        const saved = load(KEY_QUALS) || {};
        container.innerHTML = QUALIFIER_PATHS.map(path => `
            <div class="card">
                <h3>${path.name}</h3>
                <div class="radio-group">
                    ${path.options.map(opt => `
                        <label>
                            <input type="radio" name="${path.id}" value="${opt.code}|${opt.name}" 
                                ${saved[path.id]?.code === opt.code ? 'checked' : ''} onchange="app.saveQualifiers()">
                            <img src="${getFlag(opt.flag)}" class="flag" style="margin-right:8px"> ${opt.name}
                        </label>
                    `).join('')}
                </div>
            </div>`).join('');
    };

    const saveQualifiers = () => {
        const inputs = document.querySelectorAll('input[type=radio]:checked');
        const data = {};
        inputs.forEach(i => {
            const [code, name] = i.value.split('|');
            data[i.name] = { code, name };
        });
        save(KEY_QUALS, data);
    };

    const randomizeQualifiers = () => {
        QUALIFIER_PATHS.forEach(path => {
            const opts = path.options;
            const winner = opts[Math.floor(Math.random() * opts.length)];
            const val = `${winner.code}|${winner.name}`;
            const rad = document.querySelector(`input[name="${path.id}"][value="${val}"]`);
            if(rad) rad.checked = true;
        });
        saveQualifiers();
    };

    // --- GROUPS ---
    const initGroups = () => {
        const grid = document.getElementById('groups-grid');
        if(!grid) return;
        
        const scores = load(KEY_SCORES) || {};
        const qualifiers = load(KEY_QUALS) || {};
        const groupData = JSON.parse(JSON.stringify(INITIAL_GROUPS));
        for(let g in groupData) groupData[g] = groupData[g].map(t => qualifiers[t]?.code || t);

        let html = '';
        Object.keys(groupData).forEach(gName => {
            const teams = groupData[gName];
            const pairs = [[0,1], [2,3], [0,2], [1,3], [0,3], [1,2]];
            let fixtureHtml = pairs.map((pair, idx) => {
                const t1 = TEAMS_DB[teams[pair[0]]] || qualifiers[teams[pair[0]]] || {name: teams[pair[0]], flag: "TBD"};
                const t2 = TEAMS_DB[teams[pair[1]]] || qualifiers[teams[pair[1]]] || {name: teams[pair[1]], flag: "TBD"};
                const id = `${gName}-${idx}`;
                const s1 = scores[id]?.s1 !== undefined ? scores[id].s1 : '';
                const s2 = scores[id]?.s2 !== undefined ? scores[id].s2 : '';

                return `<div class="match-row">
                    <div class="team-name"><img src="${getFlag(t1.flag)}" class="flag"> ${t1.name}</div>
                    <div class="inputs">
                        <input type="number" class="score-input" data-id="${id}" data-type="1" value="${s1}" oninput="app.updateGroups()">
                        -
                        <input type="number" class="score-input" data-id="${id}" data-type="2" value="${s2}" oninput="app.updateGroups()">
                    </div>
                    <div class="team-name" style="justify-content: flex-end;">${t2.name} <img src="${getFlag(t2.flag)}" class="flag"></div>
                </div>`;
            }).join('');

            html += `<div class="group-card"><div class="group-header">Group ${gName}</div><div class="fixtures">${fixtureHtml}</div>
                <table class="table"><thead><tr><th style="text-align:left; padding-left:5px;">Team</th><th>W</th><th>D</th><th>L</th><th>Pts</th></tr></thead><tbody id="tbody-${gName}"></tbody></table></div>`;
        });
        grid.innerHTML = html;
        updateGroups();
    };

    const updateGroups = () => {
        const scores = {};
        document.querySelectorAll('.score-input').forEach(i => {
            const id = i.dataset.id;
            if(!scores[id]) scores[id] = {};
            if(i.dataset.type === "1") scores[id].s1 = i.value;
            else scores[id].s2 = i.value;
        });
        save(KEY_SCORES, scores);

        const { standings, thirds, allGroups } = calculateAllStandings();
        
        // Update Group Tables
        Object.keys(allGroups).forEach(gName => {
            const tbody = document.getElementById(`tbody-${gName}`);
            if(tbody) {
                tbody.innerHTML = allGroups[gName].map((t, i) => `
                    <tr style="${i < 2 ? 'background:rgba(0, 210, 106, 0.1)' : ''}">
                        <td style="text-align:left; padding-left:5px;">
                            <img src="${getFlag(t.flag)}" class="flag"> ${t.code}
                        </td>
                        <td>${t.w}</td><td>${t.d}</td><td>${t.l}</td><td><strong>${t.pts}</strong></td>
                    </tr>
                `).join('');
            }
        });

        // Update Best 3rds Table (Removed Status Column)
        const tBody3 = document.getElementById('third-place-body');
        if(tBody3) {
            tBody3.innerHTML = thirds.map((t, i) => `
                <tr style="${i < 8 ? 'background:rgba(0, 181, 226, 0.1); font-weight:bold' : 'opacity:0.6'}">
                    <td>${i+1}</td>
                    <td><img src="${getFlag(t.flag)}" class="flag"> ${t.name}</td>
                    <td>${t.group}</td><td>${t.pts}</td><td>${t.gd}</td><td>${t.gf}</td>
                </tr>`).join('');
            
            // Fix header if status was removed but HTML header remains
            const thirdTableHead = document.querySelector('.third-table thead tr');
            if(thirdTableHead && thirdTableHead.children.length > 6) {
                thirdTableHead.lastElementChild.remove(); // Remove "Status" header cell
            }
        }
    };

    const randomizeGroups = () => {
        document.querySelectorAll('.score-input').forEach(i => i.value = Math.floor(Math.random() * 4));
        updateGroups();
    };

    // --- KNOCKOUT ---
    const R32_STRUCTURE = [
        {id: 1,  h: "2A", a: "2B"}, {id: 2,  h: "1K", a: "2L"}, 
        {id: 3,  h: "1C", a: "3F"}, {id: 4,  h: "1F", a: "2C"},
        {id: 5,  h: "1E", a: "2D"}, {id: 6,  h: "1I", a: "3G"},
        {id: 7,  h: "1G", a: "3A"}, {id: 8,  h: "2H", a: "2J"},
        {id: 9,  h: "1A", a: "3C"}, {id: 10, h: "2I", a: "2K"},
        {id: 11, h: "1L", a: "3H"}, {id: 12, h: "1D", a: "3B"},
        {id: 13, h: "1J", a: "2E"}, {id: 14, h: "1B", a: "3E"},
        {id: 15, h: "1H", a: "2F"}, {id: 16, h: "2G", a: "3I"} 
    ];
const initKnockout = () => {
        try {
            const root = document.getElementById('bracket-root');
            if(!root) return;

            const { standings, thirds } = calculateAllStandings();
            
            // --- BEST 3RD PLACE MAPPING LOGIC ---
            // 1. Get the Top 8 Third Place Teams
            const best8 = thirds.slice(0, 8);
            
            // 2. Identify the 8 slots in the R32 bracket that expect a 3rd place team
            // (These are hardcoded in R32_STRUCTURE)
            const thirdSlots = ["3F", "3G", "3A", "3C", "3H", "3B", "3E", "3I"];
            
            // 3. Create a map to assign teams to slots
            const thirdMap = {};
            const assignedTeams = new Set();
            const filledSlots = new Set();

            // Pass 1: Direct Matches (If 3A qualifies and there is a 3A slot, put them there)
            best8.forEach(team => {
                const key = "3" + team.group;
                if(thirdSlots.includes(key)) {
                    thirdMap[key] = team;
                    assignedTeams.add(team.group);
                    filledSlots.add(key);
                }
            });

            // Pass 2: Fill Gaps (Put remaining qualified teams into remaining empty slots)
            const remainingTeams = best8.filter(t => !assignedTeams.has(t.group));
            const remainingSlots = thirdSlots.filter(s => !filledSlots.has(s));

            remainingSlots.forEach((slot, idx) => {
                if(remainingTeams[idx]) {
                    thirdMap[slot] = remainingTeams[idx];
                }
            });
            // ------------------------------------

            const getT = (key) => {
                if(!key) return {code: "TBD", name:"TBD", flag: "TBD"};
                
                // If it's a 3rd place slot, check our new map
                if(key.startsWith('3')) {
                    if(thirdMap[key]) return thirdMap[key];
                    // Fallback just in case logic misses something
                    return {code: "TBD", name:"TBD", flag: "TBD"};
                }
                
                // Standard group winner/runner-up
                return standings[key] || {code: "TBD", name: "TBD", flag: "TBD"};
            };

            const bracketData = load(KEY_KNOCKOUT) || {};
            const rounds = [32, 16, 8, 4, 2];
            let html = '';

            rounds.forEach((cnt) => {
                html += `<div class="round" id="round-${cnt}">`;
                const matchCount = cnt / 2;
                
                // Generate Matches for this Round
                for(let i=0; i<matchCount; i++) {
                    let mId = `R${cnt}-${i}`;
                    let match = bracketData[mId] || {};
                    let t1, t2;

                    if(cnt === 32) {
                        const setup = R32_STRUCTURE[i];
                        t1 = getT(setup.h);
                        t2 = getT(setup.a);
                    } else {
                        const prevCnt = cnt * 2;
                        const w1 = bracketData[`R${prevCnt}-${i*2}`]?.winner;
                        const w2 = bracketData[`R${prevCnt}-${(i*2)+1}`]?.winner;
                        t1 = w1 || {code: "TBD", name: "Match "+(i*2+1), flag: "TBD"};
                        t2 = w2 || {code: "TBD", name: "Match "+(i*2+2), flag: "TBD"};
                    }

                    const s1 = match.s1 !== undefined ? match.s1 : '';
                    const s2 = match.s2 !== undefined ? match.s2 : '';
                    const p1 = match.p1 !== undefined ? match.p1 : '';
                    const p2 = match.p2 !== undefined ? match.p2 : '';
                    
                    const isDraw = (s1 !== '' && s2 !== '' && s1 == s2);
                    const wClass1 = (match.winner?.code === t1.code && t1.code !== "TBD") ? "winner" : "";
                    const wClass2 = (match.winner?.code === t2.code && t2.code !== "TBD") ? "winner" : "";

                    // --- FINAL MATCH (GOLD BOX) ---
                    if (cnt === 2) {
                        html += `
                        <div class="final-match-wrapper">
                            <h3>🏆 WORLD CUP FINAL 🏆</h3>
                            <div class="matchup" data-mid="${mId}">
                                <div class="team-slot ${wClass1}">
                                    <span><img src="${getFlag(t1.flag)}" class="flag"> ${t1.code}</span>
                                    <div style="display:flex; flex-direction:column; align-items:flex-end">
                                        <input type="number" class="score-input k-input" value="${s1}" data-mid="${mId}" data-idx="1" oninput="app.updateKnockout(this)">
                                        ${isDraw ? `<input type="number" class="score-input k-input pen-input" placeholder="P" value="${p1}" data-mid="${mId}" data-pidx="1" oninput="app.updateKnockout(this)" style="margin-top:2px;">` : ''}
                                    </div>
                                </div>
                                <div class="team-slot ${wClass2}">
                                    <span><img src="${getFlag(t2.flag)}" class="flag"> ${t2.code}</span>
                                    <div style="display:flex; flex-direction:column; align-items:flex-end">
                                        <input type="number" class="score-input k-input" value="${s2}" data-mid="${mId}" data-idx="2" oninput="app.updateKnockout(this)">
                                        ${isDraw ? `<input type="number" class="score-input k-input pen-input" placeholder="P" value="${p2}" data-mid="${mId}" data-pidx="2" oninput="app.updateKnockout(this)" style="margin-top:2px;">` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    } 
                    // --- STANDARD MATCH ---
                    else {
                        html += `
                        <div class="matchup" data-mid="${mId}">
                            <div class="team-slot ${wClass1}">
                                <span><img src="${getFlag(t1.flag)}" class="flag"> ${t1.code}</span>
                                <div style="display:flex; flex-direction:column; align-items:flex-end">
                                    <input type="number" class="score-input k-input" value="${s1}" data-mid="${mId}" data-idx="1" oninput="app.updateKnockout(this)">
                                    ${isDraw ? `<input type="number" class="score-input k-input pen-input" placeholder="P" value="${p1}" data-mid="${mId}" data-pidx="1" oninput="app.updateKnockout(this)" style="margin-top:2px;">` : ''}
                                </div>
                            </div>
                            <div class="team-slot ${wClass2}">
                                <span><img src="${getFlag(t2.flag)}" class="flag"> ${t2.code}</span>
                                <div style="display:flex; flex-direction:column; align-items:flex-end">
                                    <input type="number" class="score-input k-input" value="${s2}" data-mid="${mId}" data-idx="2" oninput="app.updateKnockout(this)">
                                    ${isDraw ? `<input type="number" class="score-input k-input pen-input" placeholder="P" value="${p2}" data-mid="${mId}" data-pidx="2" oninput="app.updateKnockout(this)" style="margin-top:2px;">` : ''}
                                </div>
                            </div>
                        </div>`;
                    }
                }

                // --- 3RD PLACE MATCH (INJECTED BELOW FINAL) ---
                if(cnt === 2) {
                    const mSemi1 = bracketData["R4-0"];
                    const mSemi2 = bracketData["R4-1"];
                    let t3_1 = {code:"TBD", flag:"TBD"}, t3_2 = {code:"TBD", flag:"TBD"};

                    // Determine losers of Semis
                    if(mSemi1 && mSemi1.winner) {
                        const wQ1 = bracketData["R8-0"]?.winner; 
                        const wQ2 = bracketData["R8-1"]?.winner;
                        if(wQ1 && wQ2) t3_1 = (mSemi1.winner.code === wQ1.code) ? wQ2 : wQ1;
                    }
                    if(mSemi2 && mSemi2.winner) {
                        const wQ3 = bracketData["R8-2"]?.winner; 
                        const wQ4 = bracketData["R8-3"]?.winner;
                        if(wQ3 && wQ4) t3_2 = (mSemi2.winner.code === wQ3.code) ? wQ4 : wQ3;
                    }

                    const m3rd = bracketData["Match3rd"] || {};
                    const s3_1 = m3rd.s1 || '', s3_2 = m3rd.s2 || '';
                    const p3_1 = m3rd.p1 || '', p3_2 = m3rd.p2 || '';
                    const isDraw3 = (s3_1 !== '' && s3_2 !== '' && s3_1 == s3_2);

                    html += `
                    <div class="third-place-wrapper">
                        <h3>🥉 3rd Place Play-off</h3>
                        <div class="matchup" data-mid="Match3rd">
                             <div class="team-slot ${m3rd.winner?.code === t3_1.code && t3_1.code !== "TBD" ? 'winner' : ''}">
                                <span><img src="${getFlag(t3_1.flag)}" class="flag"> ${t3_1.code}</span>
                                <div style="display:flex; flex-direction:column; align-items:flex-end">
                                    <input type="number" class="score-input k-input" value="${s3_1}" data-mid="Match3rd" data-idx="1" oninput="app.updateKnockout(this)">
                                    ${isDraw3 ? `<input type="number" class="score-input k-input pen-input" placeholder="P" value="${p3_1}" data-mid="Match3rd" data-pidx="1" oninput="app.updateKnockout(this)" style="margin-top:2px;">` : ''}
                                </div>
                            </div>
                            <div class="team-slot ${m3rd.winner?.code === t3_2.code && t3_2.code !== "TBD" ? 'winner' : ''}">
                                <span><img src="${getFlag(t3_2.flag)}" class="flag"> ${t3_2.code}</span>
                                <div style="display:flex; flex-direction:column; align-items:flex-end">
                                    <input type="number" class="score-input k-input" value="${s3_2}" data-mid="Match3rd" data-idx="2" oninput="app.updateKnockout(this)">
                                    ${isDraw3 ? `<input type="number" class="score-input k-input pen-input" placeholder="P" value="${p3_2}" data-mid="Match3rd" data-pidx="2" oninput="app.updateKnockout(this)" style="margin-top:2px;">` : ''}
                                </div>
                            </div>
                        </div>
                    </div>`;
                }

                html += `</div>`; // Close Round Div
            });

            root.innerHTML = html;
        } catch(e) {
            console.error(e);
            document.getElementById('bracket-root').innerHTML = `<p style='color:white'>Error loading bracket: ${e.message}</p>`;
        }
    };

    const updateKnockout = (el) => {
        const mid = el.dataset.mid;
        const bracket = load(KEY_KNOCKOUT) || {};
        if(!bracket[mid]) bracket[mid] = {};
        
        // 1. Save Input Values
        if(el.dataset.idx === "1") bracket[mid].s1 = el.value;
        if(el.dataset.idx === "2") bracket[mid].s2 = el.value;
        if(el.dataset.pidx === "1") bracket[mid].p1 = el.value;
        if(el.dataset.pidx === "2") bracket[mid].p2 = el.value;

        // 2. Determine Winner Logic
        const matchDiv = document.querySelector(`div[data-mid="${mid}"]`);
        const getTeam = (idx) => {
             const txt = matchDiv.querySelector(`.team-slot:nth-child(${idx+1}) span`).innerText.trim();
             return { code: txt, flag: txt.toLowerCase() };
        };
        const t1 = getTeam(0); const t2 = getTeam(1);
        const s1 = parseInt(bracket[mid].s1), s2 = parseInt(bracket[mid].s2);
        
        let winner = null;
        if(!isNaN(s1) && !isNaN(s2)) {
            if(s1 > s2) winner = t1;
            else if(s2 > s1) winner = t2;
            else {
                const p1 = parseInt(bracket[mid].p1), p2 = parseInt(bracket[mid].p2);
                if(!isNaN(p1) && !isNaN(p2)) winner = p1 > p2 ? t1 : t2;
            }
        }
        
        bracket[mid].winner = winner;
        save(KEY_KNOCKOUT, bracket);

        if(mid === "R2-0" && winner) celebrate(winner);

        // --- SCROLL FIX START ---
        // Capture current scroll positions
        const wrapper = document.querySelector('.bracket-wrapper');
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const wrapperX = wrapper ? wrapper.scrollLeft : 0;
        const wrapperY = wrapper ? wrapper.scrollTop : 0;

        // Re-render the bracket
        initKnockout(); 

        // Restore scroll positions immediately
        window.scrollTo(scrollX, scrollY);
        if(wrapper) {
            wrapper.scrollLeft = wrapperX;
            wrapper.scrollTop = wrapperY;
        }
        // --- SCROLL FIX END ---

        // Restore Focus to the input you were typing in
        const nextInput = document.querySelector(`input[data-mid="${mid}"][data-idx="${el.dataset.idx||''}"][data-pidx="${el.dataset.pidx||''}"]`);
        if(nextInput) { 
            nextInput.focus(); 
            // set selection range to end to prevent cursor jumping to start
            const val = nextInput.value;
            nextInput.value = '';
            nextInput.value = val;
        }
    };

    const resetAll = () => { if(confirm("Reset Tournament?")) { localStorage.clear(); location.href="index.html"; } };
    const resetGroups = () => { localStorage.removeItem(KEY_SCORES); location.reload(); };
    const downloadJSON = () => {
        const d = { q: load(KEY_QUALS), g: load(KEY_SCORES), k: load(KEY_KNOCKOUT) };
        const b = new Blob([JSON.stringify(d,null,2)],{type:'application/json'});
        const a = document.createElement('a'); a.href=URL.createObjectURL(b); a.download='wc26.json'; a.click();
    };
    const downloadImage = () => {
        if(typeof html2canvas !== 'undefined') {
            // CHANGE: Capture 'bracket-root' (the inner content) instead of 'bracket-view'
            const element = document.getElementById('bracket-root');
            
            const options = {
                useCORS: true,
                allowTaint: true,
                scale: 2,
                backgroundColor: "#10162F",
                // Force full width/height capture
                width: element.offsetWidth, 
                height: element.offsetHeight,
                windowWidth: element.scrollWidth, 
                windowHeight: element.scrollHeight
            };

            html2canvas(element, options).then(canvas => {
                const a = document.createElement('a');
                a.href = canvas.toDataURL("image/png");
                a.download = 'wc26-bracket.png';
                a.click();
            });
        } else alert("html2canvas library not found");
    };
    // Add this helper function
    const celebrate = (team) => {
        let overlay = document.getElementById('celebration-overlay');
        if(!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'celebration-overlay';
            document.body.appendChild(overlay);
        }
        overlay.innerHTML = `<div class="winner-text">🏆 WORLD CHAMPION 🏆<br>${team.code}</div>`;
        overlay.classList.add('active');
        
        // Confetti logic
        for(let i=0; i<100; i++) {
            const c = document.createElement('div');
            c.className = 'confetti';
            c.style.left = Math.random()*100 + '%';
            c.style.animationDuration = (Math.random()*3+2) + 's';
            c.style.backgroundColor = `hsl(${Math.random()*360}, 100%, 50%)`;
            overlay.appendChild(c);
        }
        setTimeout(() => { overlay.classList.remove('active'); overlay.innerHTML=''; }, 5000);
    };
    return {
        initQualifiers, saveQualifiers, randomizeQualifiers,
        initGroups, updateGroups, randomizeGroups, resetGroups,
        initKnockout, updateKnockout, resetAll, downloadJSON, downloadImage,
        saveAndGo: (u) => location.href=u,
        finalizeGroups: () => location.href="knockout.html"
    };

})();
