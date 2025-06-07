const valeurInput = document.getElementById("valeurInput")
const affichageList  = document.getElementById("affichage"); 
const boutonAjouter  = document.getElementById("ajouterTache"); 

function creerTache(titre, statut = false ) {
    return {
        titre, 
        statut, 
        afficheInfo : function(){
            return `Titre : ${titre}, statut : ${statut ? "Fais" : "A faire"}`
        }
    }
}
  
// objet pour gerer les ajouts , les suppression...
const gestionnaireTache  = {

    // Tableau tache pour remplir les taches
    tableauTaches : [], 
    // une methode pour  ajouter les taches dans le tableau 
    addTache : function(tache){
      this.tableauTaches.push(tache); 
    }, 
    // une mehode pour afficher les taches 
    afficheTache : function(){
        affichageList.innerHTML = ""; // vide l'affichage actuelle
        let self = this ; // Pour garder la référence à gestionTache dans les fonctions internes
    
    // on parcourt chaque element du tableau pour les afficher sous formes de listes 
      this.tableauTaches.forEach((tache,indexTache) => {
         
        const li =  document.createElement("li"); 
        li.innerHTML = tache.afficheInfo(); 
    
        const checkbox  = document.createElement("input"); 
        checkbox.type = "checkbox"; 
        // ici, on initialise la case selon la tâche
        checkbox.checked = tache.statut;

        checkbox.addEventListener('change', function(){
            tache.statut = checkbox.checked;//Si la case est cochée, le statut devient true. Sinon, false
            self.save(); // pour sauvegarder le changement 
        })

        const suppElement = document.createElement("button"); 
        suppElement.innerHTML= "supprimer"; 
        suppElement.addEventListener('click', function(){
          self.tableauTaches.splice(indexTache , 1); 
          self.save()
          self.afficheTache()// pour mettre à jour la sauvegarde 
        })
        //assemblage
        li.appendChild(checkbox);
        li.appendChild(suppElement); 
        affichageList.appendChild(li);      
      });
    }, 

    save : function(){
        // stockage des donnees dans le navigateur, même apres un rechargement ou la fermeture de la page 
        localStorage.setItem("taches", JSON.stringify(this.tableauTaches));

    }
}

boutonAjouter.addEventListener('click', function(){

    const recupValeur = valeurInput.value.trim(); 
    // onn verifie si une tache existe comme ca on le cree
    if(recupValeur !== ""){
        const nouvelleValeur  = creerTache(recupValeur); 
        gestionnaireTache.addTache(nouvelleValeur); 
        gestionnaireTache.save(); 
        gestionnaireTache.afficheTache(); 
        valeurInput.value = ""; 
    }
})

// Au chargement de la page, on récupère les tâches stockées
window.addEventListener('load', function(){

    // on enregistre les données  dans le navigateur

     // ON recupere les taches stockées
     const  donnees  =  localStorage.getItem("taches");
   
    if(donnees) {

   // on transforme les taches(textes) en objets bruts sans methods; 
   let objetBrut = JSON.parse(donnees); 

     // on reconstruit 

    const gestionnaireObjetTache = {

        tableauTaches : [],
        // les taches sous formes de propriete
        bruts : objetBrut, //  
        afficheTacheObjets : function(){
            
           this.bruts.forEach(donnee => {
                let tache  = creerTache(donnee.titre, donnee.statut)
                this.ajouterTache(tache)
             });
        }, 

        ajouterTache : function(tache){
            this.tableauTaches.push(tache)
        }
        
     }
     gestionnaireObjetTache.afficheTacheObjets(); 
     gestionnaireTache.tableauTaches =  gestionnaireObjetTache.tableauTaches; 
     gestionnaireTache.afficheTache()
     
    }
   
})