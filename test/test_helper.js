//Le fichier test_helper est appelé automatiquement lors de l'éxécution des tests
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

before(done => {
  //Definition  de la connection à la base en local
  mongoose.connect("mongodb://localhost/user_test", { useMongoClient: true });

  //Tentative de connection, la première fois que ça marche on log ok, si on reçoit une erreur à n'importe quel moment on log cette erreur.
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", error => {
      console.warn("Warning", error);
    });
});

/**
 * astuces
 * 
 * mettre it.only permet def aire en sore que seule le test it s'éxécute
 * 
 * 
 */

/**
 * Avant chaque test on néttoie la base
 * Cette opération n'est pas instantanée 
 * Il faut donc attendre qu'elle soit terminée avant de lancer le test.
 */
beforeEach(done => {
  //mongoose lower automatiquement les noms des collections dans ce cas.
  //c'est donc blogpost au lieux de blogPost
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    //Ici le code du callback après l'opération drop
    //Une fois drop terminé on peut lancer le test

    comments.drop(() => {
      blogposts.drop(() => {
        //Lorsque le callback done est placé en paramètre mocha attend qu'elle soit appelée
        //Avant de lancer le test suivant
        done();
      });
    });
  });
});
