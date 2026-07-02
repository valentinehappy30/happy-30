// --- 1. CONFIGURATION & LOGIQUE DE SÉCURITÉ ---

function normalizeString(str) {
    if (!str) return "";
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim();
}

// --- 2. DONNÉES DU JEU (Avec les ID exacts de ton plan) ---
const allWords = [
    { id: 1, mot: "GÊNEGÊNE", definition: "Une belle expression pour vivre un moment de honte avec moins de gêne et plus de rires", auteur: "Louise", groupe: "amis", message: "Une si belle expression pour vivre un moment de honte avec moins de gêne et plus de rires! Il n'y a que toi qui utilise mes expressions aussi bien tous les jours!♥️" },
    { id: 2, mot: "ROTEZBAILLEZ", definition: "1. Entreprise dans le domaine de la charcuterie - franchise fondée en 2025 regroupant trois charcuteries dans le département du puy de dôme (Chappes, Châteaugay et Sauvagnat Sainte Marthe) <br>2. Surnom - désignant une personne sans gêne, qui rote qui baille et qui pète sans vergogne, souvent associée à la région puydomoise, l’expression trouve racine au 1bis Rue de l’enfer, lors d’une soirée particulièrement dégoûtante où aucun autre mot pouvait désigner un tel niveau de crasse chez un être humain ", auteur: "Youssef", groupe: "amis", message: "Bravo la valoche ! C’était pas très compliqué mais ce mot était trop drôle pour pouvoir choisir autre chose ! Encore un joyeux anniversaire à toi, je te souhaite une année pleine de bonheur, de petites et et de grandes joies, je te souhaite surtout une année sereine, que le cap des 30 ans t’apporte la paix de l’âme que l’on recherche tant ! Et même si les occasions de se retrouver se font moindres, je t’aime fort et j’apprécie les moments qu’on peut passer ensemble !" },
    { id: 3, mot: "HYPNOSE", definition: "État dans lequel on peut se transformer devant la télévision, au point de ne plus entendre personne. Même devant les programmes les plus improbables. ", auteur: "Alexia", groupe: "famille", message: "Impossible de choisir un autre mot ! Petite, tu avais ce don incroyable de disparaître dans tout ce que tu regardais. On pouvait parler, rire, faire du bruit… plus rien n’existait autour de toi !<br><br>Ce souvenir me fait toujours autant sourire. Merci pour tous ces moments qui ont construit notre enfance. Je te souhaite des 30 ans aussi beaux que les souvenirs que l’on partage. Je t’aime ❤️" },
    { id: 4, mot: "ACTRICE", definition: "Artiste dont la profession est de jouer un rôle à la scène ou à l'écran.", auteur: "Alice", groupe: "amis" ,message: "30 ans ! il est maintenant tant de montrer au monde la grande actrice qui sommeille en toi ! Celle qui sait prendre la scène et la lumiere quand elle chante comme dans une comedie musicale, comme celle qui sait garder bien pour elle ce qui ne va pas pour ne pas inquiéter les autres, en passant par celle qui chaque jour derriere son bureau arbore son plus beau sourire alors qu'elle serait mieux dans son transat avec sa télécommande de liseuse dans la main. J'aime toutes ces Valentine et j'ai hâte de les voir sur les planches !" },
    { id: 5, mot: "ATTENTIVE", definition: "La qualité que j’admire le plus chez toi et que j’ai très vite osé de dire !", auteur: "Maap", groupe: "amis", message: "Joyeux anniversaire ma Val !<br>Et pour les 30 prochaines années à venir je te souhaite de continuer à rayonner de tes qualités si précieuses : être attentive à celle qui ne dit mot ou reste discrète, prendre le temps de discuter vraiment des choses qui comptent, être généreuse et sur-investie à la moindre occasion pour quelqu’un qui t’est cher, t’émerveiller et partager ce regard réjouis autour de toi, être fidèle et disponible auprès de tes amis et famille. <br>Mais je te souhaite aussi  pour toi : de t’épanouir encore plus comme femme, de t’aimer ! Aussi, de construire de beaux projets de voyage, de famille, avec Kevin, peut être aussi professionnels !<br>J’espère continuer d’être à tes côtés pour ces belles aventures et grandir encore dans notre amitié !<br>Je t’embrasse fort <br>Maap" },
    { id: 6, mot: "ÉTOILE", definition: "Comme une véritable amie, même si on ne la voit pas toujours, on sait qu’elle est toujours là.", auteur: "Tiphaine ", groupe: "amis" ,message: "Bravo pour avoir trouvé ce mot !<br><br>Mais pour le reste... tu auras mon vrai mot dans une lettre 🤫" },
    { id: 7, mot: "EMPATHIE", definition: "Capacité à ressentir les émotions de quelqu'un d'autre", auteur: "Sarah", groupe: "amis" ,message: "Un peu de challenge pour ce mot il est vrai… Mais comment ne pas souligner ta capacité à essayer de comprendre toujours tout le monde, à être là pour tes amis tout en gardant tes petites émotions pour toi. Merci d’être toi et merci de nous transmettre ta joie quand tu t’émerveilles devant tout ! (Une capacité fascinante d’ailleurs)" },
    { id: 8, mot: "PEAGE", definition: "Taxe perçue sur l'autoroute", auteur: "Maman", groupe: "famille", message: "Je suis très fière de la jeune femme que tu es devenue.<br> Joyeux anniversaire  ma poussinette" },
    { id: 9, mot: "DIXIT", definition: "Les apparences sont parfois trompeuses...", auteur: "Floriane", groupe: "famille", message: "Joyeux anniversaire ma sœur ❤️<br>30 ans aujourd’hui… quelle étape !<br>Je te souhaite tout le bonheur du monde, de la joie, des rires, de l’amour, et que tu puisses réaliser plein de beaux projets 🥰<br>Merci d’être toi, avec ta force, ton caractère, ton cœur et tout ce qui fait de toi une personne unique. <br>Tu auras toujours une place immense dans mon cœur.<br>Profite à fond de cette journée et surtout prends soin de toi.<br>Je t’aime. Joyeux 30 ans 🎂🥂❤️" },
    { id: 10, mot: "POUICPOUIC", definition: "La petite boule de poils adorée à longs poils de la maison.", auteur: "Kuzco", groupe: "famille", message: "Joyeux 30 ans maman ! ❤️" },
    { id: 11, mot: "INFINI", definition: "La seule véritable mesure de mon amour pour toi.", auteur: "Kévin ", groupe: "famille" ,message: "Joyeux anniversaire mon chat !<br>Je suis très heureux d'être à tes côtés pour cet événement et pour tous les futurs événements.<br>Je suis également extrêmement fier de toi mon cœur !<br>Je t'aime." },
    { id: 12, mot: "EMERVEILLEMENT", definition: "Sentiment dont tu sais si bien faire preuve et que j’admire chez toi. 🤩Il s’agit de ta capacité à voir le beau partout, et à l’apprécier à sa juste valeur, avec un regard de petite fille parfois ! 🥰C’est une émotion touchante qui t’anime ; un délicat mélange de joie, de reconnaissance et d’excitation qui te rend si facile à vivre.", auteur: "Mathilde ", groupe: "amis", message: "Ma Val chérie💕,<br> qu’il m’est difficile de choisir un terme pour te définir, car tu es avant tout, une amie fidèle, rayonnante, généreuse, attentive et attentionnée, à l’écoute, bienveillante, délicate, réfléchie, à la fois forte et vulnérable, courageuse et résiliante, joyeuse, drôle et excitée #levendredi🙈, etc. <br>Mais ton rayonnement s’exprime particulièrement par ta sensibilité à reconnaître la beauté des autres, des petites choses banales de la vie quotidienne et à être simplement dans la gratitude.😍 Tes yeux pétillants à Pléneuf m’ont particulièrement marquée ! J’aime ce côté illuminé qui te rend si lumineuse justement !✨<br> Finalement, tu incarnais très bien ton rôle dans la vidéo que vous aviez tournée pour notre mariage ! Je crois même que tu surjouais à peine !!!!! 🤣<br>Bref, merci de m’apprendre à me réjouir, à me rendre compte de la chance que j’ai et à m’EMERVEILLER de plus en plus ! <br><br>Merci pour ton amitié si précieuse♥️. <br>Merci pour nos partages, nos longues conversations sur les langages de l’amour, nos échanges sur la religion, ta confiance en St Joseph le best 🙏🏻, nos fous-rires, nos révisions, nos quelques jours de colocation en confinement, nos confidences, etc. Je te souhaite un très joyeux anniversaire !!! Faites que ces 30 ans et tous les accomplissements que tu as vécus ces derniers mois soient le début d’un MERVEILLEUX nouveau chapitre !📖" },
    { id: 13, mot: "PERSEVERANTE", definition: "Obstination, opiniâtreté, ténacité", auteur: "Papa", groupe: "famille", message: "Joyeux anniversaire ! Bonne journée pour tes  30 ans bisous  🍾" },
];

// --- CARTOGRAPHIE EXACTE DE TA GRILLE ---
// Coordonnées calculées d'après ton image (x = colonne, y = ligne)
const layoutMap = {
    1:  { x: 25, y: 1, isHorizontal: false }, // GÊNEGÊNE
    2:  { x: 14, y: 0, isHorizontal: false }, // ROTEZBAILLEZ
    3:  { x: 22, y: 3, isHorizontal: false }, // HYPNOSE
    4:  { x: 33, y: 3, isHorizontal: false }, // ACTRICE
    5:  { x: 1,  y: 4, isHorizontal: false }, // ATTENTIVE
    6:  { x: 31, y: 4, isHorizontal: false }, // ÉTOILE
    7:  { x: 11, y: 5, isHorizontal: false }, // EMPATHIE
    8:  { x: 22, y: 5, isHorizontal: true },  // PEAGE
    9:  { x: 28, y: 6, isHorizontal: false }, // DIXIT
    10: { x: 11, y: 7, isHorizontal: true },  // POUICPOUIC
    11: { x: 28, y: 7, isHorizontal: true },  // INFINI
    12: { x: 22, y: 9, isHorizontal: true },  // EMERVEILLEMENT
    13: { x: 0,  y: 12, isHorizontal: true }  // PERSEVERANTE
};


// --- 3. GESTION DU DÉBLOCAGE TEMPOREL ---
const DEVELOPER_MODE = true; // Remettre à 'false' pour activer le vrai blocage temporel

const today = new Date();
const isJuly3OrLater = DEVELOPER_MODE || (today.getMonth() === 6 && today.getDate() >= 3);
const isJuly4OrLater = DEVELOPER_MODE || (today.getMonth() === 6 && today.getDate() >= 4);

let availableWords = [];
let waitingMessages = [];

if (isJuly3OrLater) {
    availableWords = availableWords.concat(allWords.filter(w => w.groupe === "amis"));
} else {
    waitingMessages.push("🎁 De belles surprises de la part de tes amis arrivent ici le 3 juillet...");
}

if (isJuly4OrLater) {
    availableWords = availableWords.concat(allWords.filter(w => w.groupe === "famille"));
} else {
    waitingMessages.push("👨‍👩‍👧 D'autres petits mots doux de ta famille se débloqueront le 4 juillet...");
}

const waitingContainer = document.getElementById('waiting-messages');
waitingMessages.forEach(msg => {
    const div = document.createElement('div');
    div.className = 'waiting-msg';
    div.textContent = msg;
    waitingContainer.appendChild(div);
});


// --- 4. GÉNÉRATION BASÉE SUR LA CARTE ---
let gridLayout = []; 
let minX = 0, maxX = 35; // Bords fixes pour que la grille ne bouge pas selon les jours
let minY = 0, maxY = 12;
let activeWordId = null;
let savedProgress = JSON.parse(localStorage.getItem('valentine30_crossword_progress')) || [];

function generateGrid(words) {
    if (words.length === 0) return;
    gridLayout = [];

    // On place uniquement les mots qui sont débloqués à la date du jour
    words.forEach(w => {
        const config = layoutMap[w.id];
        if (config) {
            const wordText = normalizeString(w.mot);
            gridLayout.push({
                ...w,
                x: config.x,
                y: config.y,
                isHorizontal: config.isHorizontal,
                length: wordText.length
            });
        }
    });

    // Tri pour l'affichage propre des indices
    gridLayout.sort((a, b) => a.id - b.id);
}


// --- 5. INTERFACE ET RENDU ---
const gridContainer = document.getElementById('crossword-grid');
const hiddenInput = document.getElementById('hidden-input');

function initAndRender() {
    if (availableWords.length === 0) return;
    
    generateGrid(availableWords);
    
    const cols = maxX - minX + 1; // 36 colonnes
    const rows = maxY - minY + 1; // 13 lignes
    
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    gridContainer.innerHTML = '';

    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'cell empty';
            cellDiv.dataset.x = x;
            cellDiv.dataset.y = y;
            gridContainer.appendChild(cellDiv);
        }
    }

    const listHoriz = document.getElementById('clues-horizontal');
    const listVert = document.getElementById('clues-vertical');
    listHoriz.innerHTML = ''; 
    listVert.innerHTML = '';

    gridLayout.forEach((word) => {
        const isFound = savedProgress.includes(word.id);
        const normalizedWordText = normalizeString(word.mot);
        
        const startCell = document.querySelector(`.cell[data-x="${word.x}"][data-y="${word.y}"]`);
        if (startCell) {
            let numSpan = startCell.querySelector('.number');
            if (!numSpan) {
                numSpan = document.createElement('span');
                numSpan.className = 'number';
                numSpan.textContent = word.id;
                startCell.appendChild(numSpan);
            } else {
                numSpan.textContent += ` / ${word.id}`;
            }
        }

        for (let i = 0; i < word.length; i++) {
            const cx = word.isHorizontal ? word.x + i : word.x;
            const cy = word.isHorizontal ? word.y : word.y + i;
            const cell = document.querySelector(`.cell[data-x="${cx}"][data-y="${cy}"]`);
            
            cell.classList.remove('empty');
            
            const currentIds = cell.dataset.wordIds ? cell.dataset.wordIds.split(',') : [];
            if (!currentIds.includes(word.id.toString())) currentIds.push(word.id);
            cell.dataset.wordIds = currentIds.join(',');
            
            cell.dataset[`letter_${word.id}`] = normalizedWordText[i];

            if (isFound) {
                cell.classList.add('found');
                const numSpan = cell.querySelector('.number');
                cell.innerHTML = normalizedWordText[i];
                if (numSpan) cell.appendChild(numSpan);
            }

            cell.addEventListener('click', () => selectWord(word.id));
        }

        const li = document.createElement('li');
        li.innerHTML = `<strong>${word.id}.</strong> ${word.definition}<br>`;
        li.id = `clue-${word.id}`;
        if (isFound) li.classList.add('found');
        
        const btnIndice = document.createElement('button');
        btnIndice.className = 'btn-indice';
        btnIndice.textContent = 'Indice ?';
        btnIndice.onclick = (e) => {
            e.stopPropagation();
            btnIndice.textContent = `Proposé par : ${word.auteur}`;
        };
        li.appendChild(btnIndice);
        li.addEventListener('click', () => selectWord(word.id));

        if (word.isHorizontal) listHoriz.appendChild(li);
        else listVert.appendChild(li);
    });
}


// --- 6. LOGIQUE TACTILE ET SAISIE MOBILE-FIRST ---
function selectWord(id) {
    if (savedProgress.includes(id)) return; 

    activeWordId = id;
    const wordData = gridLayout.find(w => w.id === id);
    
    document.querySelectorAll('.cell').forEach(c => {
        c.classList.remove('active-word', 'active-cell');
    });

    const cells = getCellsForWord(id);
    cells.forEach(c => c.classList.add('active-word'));
    if (cells.length > 0) cells[0].classList.add('active-cell');

    hiddenInput.value = '';
    hiddenInput.maxLength = wordData.length;
    hiddenInput.focus();
}

hiddenInput.addEventListener('input', (e) => {
    if (!activeWordId) return;
    
    const val = normalizeString(e.target.value);
    const cells = getCellsForWord(activeWordId);
    const wordData = gridLayout.find(w => w.id === activeWordId);
    const targetNormalized = normalizeString(wordData.mot);
    
    cells.forEach((cell, index) => {
        cell.classList.remove('active-cell');
        if (!cell.classList.contains('found')) {
            const numSpan = cell.querySelector('.number');
            cell.innerHTML = val[index] || '';
            if (numSpan) cell.appendChild(numSpan);
        }
    });

    if (val.length < cells.length) {
        cells[val.length].classList.add('active-cell');
    } else {
        cells[cells.length - 1].classList.add('active-cell');
    }

    if (val === targetNormalized) {
        handleWin(wordData, cells);
    }
});

function getCellsForWord(id) {
    const cells = [];
    const wordData = gridLayout.find(w => w.id === id);
    for (let i = 0; i < wordData.length; i++) {
        const cx = wordData.isHorizontal ? wordData.x + i : wordData.x;
        const cy = wordData.isHorizontal ? wordData.y : wordData.y + i;
        cells.push(document.querySelector(`.cell[data-x="${cx}"][data-y="${cy}"]`));
    }
    return cells;
}

function handleWin(wordData, cells) {
    savedProgress.push(wordData.id);
    localStorage.setItem('valentine30_crossword_progress', JSON.stringify(savedProgress));

    cells.forEach(c => {
        c.classList.remove('active-word', 'active-cell');
        c.classList.add('found');
    });
    document.getElementById(`clue-${wordData.id}`).classList.add('found');
    hiddenInput.blur();
    activeWordId = null;

    showCelebration(wordData);
}


// --- 7. ANIMATIONS FESTIVES & MODALE ---
const modal = document.getElementById('celebration-modal');
document.getElementById('close-modal').addEventListener('click', () => {
    modal.classList.add('hidden');
});

function showCelebration(wordData) {
    document.getElementById('modal-word-author').textContent = `Mot soufflé par : ${wordData.auteur}`;
    document.getElementById('modal-message').innerHTML = wordData.message; // Utilise innerHTML pour les balises <br>
    modal.classList.remove('hidden');
    fireConfetti();
}

function fireConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#D47A7A', '#F4D03F', '#E8A598', '#88D49E', '#5B8FB9'];
    
    for (let i = 0; i < 60; i++) {
        const conf = document.createElement('div');
        conf.className = 'confetti';
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        conf.style.animationDuration = (Math.random() * 2 + 2) + 's';
        conf.style.opacity = Math.random() + 0.5;
        container.appendChild(conf);
        
        setTimeout(() => conf.remove(), 4000);
    }
}

// Lancement au démarrage
initAndRender();