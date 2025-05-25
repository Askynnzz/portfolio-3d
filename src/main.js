import './style.css'
let skillsOpen = false;
    
      AFRAME.registerComponent('neon-pulse', {
        schema: { color: {type: 'color', default: '#00fff7'} },
        tick: function(time, delta) {
          const intensity = 0.5 + 0.5 * Math.sin(time / 500);
          this.el.setAttribute('material', 'emissiveIntensity', intensity);
          this.el.setAttribute('material', 'emissive', this.data.color);
        }
      });

      // Composant interaction + hover correct pour lien
      AFRAME.registerComponent('clickable-link', {
        schema: { url: {type: 'string'} },
        init: function() {
          this.el.setAttribute('class', 'clickable');
          this.el.addEventListener('click', () => {
            window.open(this.data.url, '_blank');
          });
          this.el.addEventListener('mouseenter', () => {
            this.el.setAttribute('scale', '1.1 1.1 1.1');
          });
          this.el.addEventListener('mouseleave', () => {
            this.el.setAttribute('scale', '1 1 1');
          });
        }
      });

            async function loadProjects() {
        console.log("Chargement des projets...");

        try {
          const res = await fetch('http://localhost:8000/api/projects');
          const projects = await res.json();
          console.log("Projets récupérés :", projects);

          const container = document.querySelector('#projectsContainer');
          container.innerHTML = '';
          container.setAttribute('visible', 'true');

          // Animation d'ouverture globale
          container.object3D.scale.set(0.1, 0.1, 0.1);
          let startTime = performance.now();
          function animateOpen(time) {
            let elapsed = time - startTime;
            let s = Math.min(1, elapsed / 1000);
            container.object3D.scale.set(s, s, s);
            if (s < 1) requestAnimationFrame(animateOpen);
          }
          requestAnimationFrame(animateOpen);

          // Création des cartes projets
          projects.forEach((project, i) => {
            const card = document.createElement('a-entity');
            card.setAttribute('position', `0 ${-i * 0.8} 0`);

            // Fond panneau rectangulaire
            const bg = document.createElement('a-plane');
            bg.setAttribute('width', 3);
            bg.setAttribute('height', 0.6);
            bg.setAttribute('color', '#001522');
            bg.setAttribute('material', 'shader: standard; emissive: #003355; emissiveIntensity: 0.4');
            bg.setAttribute('neon-pulse', 'color: #00ffff');
            card.appendChild(bg);

            // Cadre néon autour (plus fin)
            const border = document.createElement('a-plane');
            border.setAttribute('width', 3.1);
            border.setAttribute('height', 0.7);
            border.setAttribute('color', '#00ffff');
            border.setAttribute('material', 'shader: flat; transparent: true; opacity: 0.3');
            border.setAttribute('position', '0 0 0.01');
            card.appendChild(border);

            // Texte du projet
            const text = document.createElement('a-text');
            text.setAttribute('value', `${project.name} - ${project.technologies.join(', ')}`);
            text.setAttribute('color', '#00ffff');
            text.setAttribute('position', '-1.4 0 0.02');
            text.setAttribute('width', 2.6);
            text.setAttribute('font', 'mozillavr');
            card.appendChild(text);

            container.appendChild(card);

            // Animation pop par carte
            card.object3D.scale.set(0.8, 0.8, 0.8);
            setTimeout(() => {
              let t0 = performance.now();
              function scaleUp(t) {
                let dt = t - t0;
                let sc = Math.min(1, 0.8 + 0.2 * dt / 500);
                card.object3D.scale.set(sc, sc, sc);
                if (sc < 1) requestAnimationFrame(scaleUp);
              }
              requestAnimationFrame(scaleUp);
            }, i * 150);
          });

          // Panneau cliquable GitHub
          const githubCard = document.createElement('a-entity');
          githubCard.setAttribute('position', `0 ${-(projects.length) * 0.8 - 0.8} 0`);

          const githubBg = document.createElement('a-plane');
          githubBg.setAttribute('width', 3);
          githubBg.setAttribute('height', 0.6);
          githubBg.setAttribute('color', '#330022');
          githubBg.setAttribute('material', 'shader: standard; emissive: #ff0077; emissiveIntensity: 0.5');
          githubCard.appendChild(githubBg);

          const githubBorder = document.createElement('a-plane');
          githubBorder.setAttribute('width', 3.1);
          githubBorder.setAttribute('height', 0.7);
          githubBorder.setAttribute('color', '#ff0077');
          githubBorder.setAttribute('material', 'shader: flat; transparent: true; opacity: 0.3');
          githubBorder.setAttribute('position', '0 0 0.01');
          githubCard.appendChild(githubBorder);

          const githubText = document.createElement('a-text');
          githubText.setAttribute('value', 'Voir mon GitHub');
          githubText.setAttribute('color', '#c2005a');
          githubText.setAttribute('position', '-1.2 0 0.02');
          githubText.setAttribute('width', 2.6);
          githubText.setAttribute('font', 'mozillavr');
          githubCard.appendChild(githubText);

          // Hitbox invisible large pour cliquer plus facilement
          const hitbox = document.createElement('a-plane');
          hitbox.setAttribute('width', 3);
          hitbox.setAttribute('height', 0.6);
          hitbox.setAttribute('position', '0 0 0.03');
          hitbox.setAttribute('material', 'opacity: 0; transparent: true;');
          hitbox.setAttribute('clickable-link', 'url: https://github.com/Askynnzz');
          githubCard.appendChild(hitbox);

          container.appendChild(githubCard);

        } catch (err) {
          console.error('Erreur de chargement des projets :', err);
        }
      }


      let musicStarted = false;
window.addEventListener('click', () => {
  if (!musicStarted) {
    const music = document.getElementById('backgroundMusic');
    music.volume = 0.1;
    music.play();
    musicStarted = true;
    console.log("Musique lancée !");
  }
});


  document.addEventListener('DOMContentLoaded', function () {
    const video = document.querySelector('#sf2-video');
    video.play().catch((e) => {
      console.log("Autoplay failed:", e);
    });
  });


      let originalCamPos = null;
      let originalCamRot = null;
      let popupOpen = false;

      const menuItems = document.querySelectorAll("#menuOptions li");
      let selectedIndex = 0;

      const navSound = document.getElementById("navSound");
      const clickSound = document.getElementById("clickSound");
      const enterSound = document.getElementById("enterSound");

      function updateMenuSelection(index) {
        selectedIndex = index;
        menuItems.forEach((item, i) => {
          item.classList.toggle("selected", i === selectedIndex);
        });
      }

function vec3ToObj(vec3) {
  return { x: vec3.x, y: vec3.y, z: vec3.z };
}

function togglePopup(state) {
  const menu = document.getElementById("popupMenu");
  const cam = document.querySelector("#mainCamera");

  if (state && !popupOpen) {
    popupOpen = true;
    clickSound.play();

    // Sauvegarde en plain object
    const pos = cam.getAttribute("position");
    originalCamPos = vec3ToObj(pos);

    const rot = cam.getAttribute("rotation");
    originalCamRot = vec3ToObj(rot);

    setTimeout(() => {
      cam.setAttribute("look-controls", "enabled", false);
      cam.setAttribute("wasd-controls", "enabled", false);

      cam.setAttribute("position", { x: 0, y: 4, z: -0.4 });

      enterSound.play();
      menu.classList.add("active");
      updateMenuSelection(0);
    }, 600);
  } else {
    popupOpen = false;

    if (originalCamPos) cam.setAttribute("position", originalCamPos);
    if (originalCamRot) cam.setAttribute("rotation", originalCamRot);

    cam.setAttribute("look-controls", "enabled", true);
    cam.setAttribute("wasd-controls", "enabled", true);
    menu.classList.remove("active");
  }
}


      window.addEventListener("keydown", (e) => {
        const valideSound = document.getElementById("valideSound");
        if (!popupOpen) return;

        

        if (e.key === "ArrowDown") {
          selectedIndex = (selectedIndex + 1) % menuItems.length;
          navSound.currentTime = 0;
          navSound.play();
          updateMenuSelection(selectedIndex);
        } else if (e.key === "ArrowUp") {
          selectedIndex = (selectedIndex - 1 + menuItems.length) % menuItems.length;
          navSound.currentTime = 0;
          navSound.play();
          updateMenuSelection(selectedIndex);
        } else if (e.key === "Enter") {
          valideSound.play();
          switch (selectedIndex) {
            case 0: // Projets
              loadProjects();
              showProjectInfo();
              togglePopup(false);
              break;
            case 1: // CV
              window.open("https://github.com/Askynnzz/Resume/blob/main/YassineBCV2025pdf.pdf", "_blank");
              togglePopup(false);
              break;
            case 2: // Mini-jeu
              launchMiniGame();
              togglePopup(false);
              break;
            case 3: // Rapport de stage
              window.open("https://github.com/Askynnzz/rapportstage", "_blank");
              togglePopup(false);
              break;
            default:
              console.log("Option inconnue");
          }
        }
          else if (e.key === "Escape") {
                    togglePopup(false);
                  }
                });

      AFRAME.registerComponent("glow-hover-model", {
        init: function () {
          const el = this.el;
          let originalEmissives = new Map();

          function setEmissive(color, intensity) {
            const mesh = el.getObject3D("mesh");
            if (!mesh) return;
            mesh.traverse((node) => {
              if (node.isMesh) {
                if (!originalEmissives.has(node.uuid)) {
                  originalEmissives.set(node.uuid, node.material.emissive.clone());
                }
                node.material.emissive = new THREE.Color(color);
                node.material.emissiveIntensity = intensity;
                node.material.needsUpdate = true;
              }
            });
          }

          el.addEventListener("mouseenter", () => setEmissive("#ffffff", 0.7));
          el.addEventListener("mouseleave", () => {
            const mesh = el.getObject3D("mesh");
            if (!mesh) return;
            mesh.traverse((node) => {
              if (node.isMesh) {
                const original = originalEmissives.get(node.uuid);
                if (original) node.material.emissive.copy(original);
                else node.material.emissive.set(0x000000);
                node.material.emissiveIntensity = 0;
                node.material.needsUpdate = true;
              }
            });
          });
        },
      });

      AFRAME.registerComponent("video-texture", {
        init: function () {
          const video = document.querySelector("#sf2-video");
          this.el.addEventListener("model-loaded", () => {
            const mesh = this.el.getObject3D("mesh");
            if (!mesh) return;
            mesh.traverse((node) => {
              if (node.isMesh && node.material.name === "Street_Fighter_II") {
                node.material.map = new THREE.VideoTexture(video);
                node.material.map.minFilter = THREE.LinearFilter;
                node.material.map.magFilter = THREE.LinearFilter;
                node.material.map.format = THREE.RGBFormat;
                node.material.needsUpdate = true;
              }
            });
          });
        },
      });

      AFRAME.registerComponent("arcade-launch", {
        init: function () {
          this.el.addEventListener("click", () => {
            togglePopup(true);
          });
        },
      });

      window.launchMiniGame = function () {
        const container = document.getElementById("gameContainer");
        const frame = document.getElementById("gameFrame");

        frame.src = 'snakefinal/index.html';
        container.style.display = "block";

        // Ajoute un effet CRT à l'ouverture
        const crt = container.querySelector('.crt-effect');
        if (crt) {
          crt.classList.remove('crt-effect'); // Reset animation
          void crt.offsetWidth; // Force reflow
          crt.classList.add('crt-effect'); // Relance l'animation
        }
      };


      window.closeGame = function () {
        const container = document.getElementById("gameContainer");
        const frame = document.getElementById("gameFrame");

        container.classList.add("closing");
        const closeSound = document.getElementById("closeSound");
        closeSound.currentTime = 0;
        closeSound.play();

        // Attendre la fin de l'animation (~500ms) avant de cacher réellement
        setTimeout(() => {
          container.style.display = "none";
          frame.src = "";
          container.classList.remove("closing"); // Reset pour une prochaine ouverture
        }, 500);
      };

      

      function showBootIntro(callback) {
        const boot = document.getElementById("bootIntro");
        const typeSound = document.getElementById("typeSound");
        const lines = [
          ">> SYSTEM BOOTING...",
          ">> MEMORY OK",
          ">> CONNECTING TO SKILL MODULE...",
          ">> MODULE LOADED ✓",
          ">> DISPLAYING DATA..."
        ];

        boot.innerText = "";
        boot.style.display = "block";

        let i = 0;
        const interval = setInterval(() => {
          if (i < lines.length) {
            boot.innerText += lines[i] + "\n";

            typeSound.currentTime = 0;
            typeSound.play();
            
            i++;
          } else {
            clearInterval(interval);
            setTimeout(() => {
              boot.style.display = "none";
                typeSound.pause();
                typeSound.currentTime = 0;
              callback();
            }, 800); // Pause avant d’afficher les stats
          }
        }, 600); // vitesse d’affichage ligne par ligne
      }




AFRAME.registerComponent("skills-launch", {
  init: function () {
    this.el.addEventListener("click", () => {
      if (skillsOpen) return; // Empêche l'ouverture multiple
      skillsOpen = true;

      const cam = document.querySelector("#mainCamera");
      const clickSound = document.getElementById("clickSound");
      const enterSound = document.getElementById("enterSound");
      const crt = document.getElementById("skillsCRT");

      // Sauvegarde position + rotation actuelle
      originalCamPos = vec3ToObj(cam.getAttribute("position"));
      originalCamRot = vec3ToObj(cam.getAttribute("rotation"));

      // Zoom vers la borne de stats
      cam.setAttribute("look-controls", "enabled", false);
      cam.setAttribute("wasd-controls", "enabled", false);
      cam.setAttribute("position", { x: -3.1, y: 2.1, z: -6.2 }); // ajuste au besoin

      clickSound.play();

      setTimeout(() => {
        showBootIntro(() => {
          crt.classList.add("showing");
          crt.style.display = "block";
          enterSound.play();
        });
      }, 500);
    });
  }
});


      window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.getElementById("skillsCRT").style.display === "block") {
        skillsOpen = false;
        const cam = document.querySelector("#mainCamera");
        const crt = document.getElementById("skillsCRT");
        const closeSound = document.getElementById("closeSound");
 

        cam.setAttribute("position", originalCamPos);
        cam.setAttribute("rotation", originalCamRot);
        cam.setAttribute("look-controls", "enabled", true);
        cam.setAttribute("wasd-controls", "enabled", true);

        crt.style.display = "none";
        crt.classList.remove("showing");
        closeSound.currentTime = 0;
        closeSound.play();
        }
      });

        window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loadingScreen");
    const startPrompt = document.getElementById("startPrompt");
    const loadingText = document.getElementById("loadingText");

    // Simulation de chargement (ex: textures, assets, etc.)
    setTimeout(() => {
      loadingText.style.display = "none";
      startPrompt.style.display = "block";

      startPrompt.addEventListener("click", () => {
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
          loadingScreen.remove();
        }, 1000);

        // Lancer la musique ou activer les interactions ici
        const music = document.getElementById("backgroundMusic");
        if (music) {
          music.volume = 0.2;
          music.play().catch(() => {});
        }
      });
    }, 2000); // ← tu peux ajuster la durée du faux chargement
  });


  const totalFrames = 15;
  const frames = [];

  // Génère dynamiquement les ID (#idle1 à #idle15)
  for (let j = 1; j <= totalFrames; j++) {
    frames.push(`#idle${j}`);
  }

  let i = 0;
  setInterval(() => {
    const sprite = document.querySelector('#idleSprite');
    sprite.setAttribute('src', frames[i % totalFrames]);
    i++;
  }, 100); // 10 FPS, change si tu veux une vitesse différente




function showProjectInfo() {
  // Supprime l'existant s'il y en a un
  const existing = document.getElementById("projectInfo");
  if (existing) existing.remove();

  const info = document.createElement("div");
  info.id = "projectInfo";
  info.className = "popup-info"; // on applique une classe de base
  info.innerHTML = `
    <h2>📁 Mes projets</h2>
    <p>Mes projets sont en cours de connexion avec une API.<br>
    En attendant, vous pouvez consulter mon GitHub 👇</p>
    <a href="https://github.com/Askynnzz" target="_blank">🔗 github.com/Askynnzz</a><br><br>
    <button id="closeProjectBtn">Fermer</button>
  `;

  document.body.appendChild(info);

  // Lier le bouton après ajout
  document.getElementById("closeProjectBtn").addEventListener("click", window.closeProjectInfo);
}

window.closeProjectInfo = function () {
  const info = document.getElementById("projectInfo");
  if (!info) return;

  const closeSound = document.getElementById("closeSound");
  closeSound.currentTime = 0;
  closeSound.play();

  info.classList.add("closing");

  setTimeout(() => {
    info.remove();
  }, 500);
};
