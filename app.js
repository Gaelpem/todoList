const valeurInput = document.getElementById("valeurInput")
const affichageList  = document.getElementById("affichage"); 
const boutonAjouter  = document.getElementById("ajouer"); 

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
      this.tableauTaches.addTache(tache); 
    }, 
    // une mehode pour afficher les taches 
    afficheTache : function(){
        affichageList.innerHTML = ""; // vide l'affichage actuelle
        let self = this ; // Pour garder la référence à gestionTache dans les fonctions internes
    
    // on parcourt chaque element du tableau pour les afficher sous formes de listes 
      this.taches.forEach(tache => {
         
        const li =  document.createElement("li"); 
        li.innerHTML = tache.afficheInfo(); 
    
        const checkbox  = document.createElement("input"); 
        checkbox.type = "checkbox"; 

        const suppElement = document.createElement("button"); 
        suppElement.text = "supprimer"; 

        suppElement.addEventListener('click', function(){
          self.splice()
        })
        //assemblage
        li.appendChild(checkbox);
        li.appendChild(suppElement); 
        affichageList.appendChild(li);
       
      });
    }
}


boutonAjouter.addEventListener('click', function(){
    const recupValeur = valeurInput.value.trim(); 
    if(recupValeur !== ""){
      
    }
})