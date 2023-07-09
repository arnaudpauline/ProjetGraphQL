A la place d'utiliser des musiques, j'ai décidé de partir sur des livres.
Et pour remplacer le panier, j'ai utilisé une PAL, c'est tout simplement une "Pile A Lire".
Mais le principe restait le même.

Pour la PAP, j'ai pensé à une solution qui était d'ajouter un champs "presentPAL" qui aurait été un bool.
Ce bool aurait permis de savoir si le livre était présent ou non dans la PAL.
Mais cette solution ne fonctionnerai pas étant donné que cela voudrai dire que dans un système plus vaste avec des utilisateurs, 
chaque utilisateur aurait le livre dans sa PAL (à partir du moment où quelqu'un l'a ajouté), 
ce qui ne convient pas.

Je suis donc partie sur un type PAL qui contient un ID, un titre et une liste d'ID de livres.

Vous trouverez tout ci-dessous des exemples d'ajouts.

mutation AddBook {
  addBook(
    title: "Harry Potter"
    autor: "J. K. Rowling"
    summary: "À l’école des sorciers"
    year: 1997
    genre: "Fantasy"
    cover: "https://pictures.abebooks.com/inventory/31296688678.jpg"
  ) {
    id
    title
    autor
    summary
    year
    genre
    cover
  }
}

mutation AddBook {
  addBook(
    title: "Le journal d'Anne Frank"
    autor: "Anne Frank"
    summary: ""
    year: 1947
    genre: "Journal autobiographique"
    cover: "https://www.livredepoche.com/sites/default/files/images/livres/couv/9782253073093-001-T.jpeg"
  ) {
    id
    title
    autor
    summary
    year
    genre
    cover
  }
}



mutation AddBook {
  addBook(
    title: "Hunger Games"
    autor: "Suzanne Collins"
    summary: ""
    year: 2008
    genre: "Distopie"
    cover: "https://m.media-amazon.com/images/I/61+t8dh4BEL._AC_UF1000,1000_QL80_.jpg"
  ) {
    id
    title
    autor
    summary
    year
    genre
    cover
  }
}

