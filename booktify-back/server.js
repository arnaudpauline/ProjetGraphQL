// Import des dépendances
import { Sequelize, DataTypes } from 'sequelize'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const sequelize = new Sequelize('sqlite::memory:')
// Nous verrons plus tard ce que sont les typeDefs et resolvers

const typeDefs = `#graphql
type Book {
  id: ID!
  title: String
  autor: String
  summary: String
  year: Int
  genre: String
  cover: String
}

type Pal {
  id: ID!
  title: String
  booksIds: [ID]
}

type Query {
  books: [Book]
  book(id: ID!): Book
  pal(id: ID!): Pal
}

type Mutation {
    addBook(title: String, autor: String, summary: String, year: Int, genre: String, cover: String): Book
    updateBook(id: ID!, title: String, autor: String, summary: String, year: Int, genre: String, cover: String): Book
    deleteBook(id: ID!): Book

    initPal: Pal
    addBookToPal(id: ID!, booksIds: [ID]): Pal
    removeBooksFromPal(id: ID!, booksIds: [ID]): Pal
    updatePalInfos(id: ID!, title: String): Pal
}
`

// Definition d'un model de base de données
const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    autor: DataTypes.STRING,
    summary: DataTypes.STRING,
    year: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    cover: DataTypes.STRING
})

const Pal = sequelize.define('Pal', {
  title: DataTypes.STRING,
  booksIds: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  }
});

  
await sequelize.sync()

// On laisse l'objet vide pour le moment
const resolvers = {
    Query: {
        books: async () => {
            return await Book.findAll()
        },
        
        book: async (parent, args) => {
            return await Book.findByPk(args.id)
        },

        pal: async (parent, args) => {
            return await Pal.findByPk(args.id);
        }
    },
    Mutation: {
        addBook: async (parent, args) => {
            const { title, autor, summary, year, genre, cover } = args
            return await Book.create({ title, autor, summary, year, genre, cover })
          },
        updateBook: async (parent, args) => {
            const { id, title, autor, summary, year, genre, cover } = args
            await Book.update(
              { title, autor, summary, year, genre, cover },
              { where: { id } }
            )
            return await Book.findByPk(id)
        },
        deleteBook: async (parent, args) => {
            const { id } = args
            const book = await Book.findByPk(id)
            await Book.destroy({ where: { id } })
            return book
        },

        initPal: async (parent, args) =>{
          return await Pal.create();
        },

        addBookToPal: async (parent, args) => {
          const { id, booksIds } = args;
          const pal = await Pal.findByPk(id);
          const updatedBooksIds = pal.booksIds ? [...pal.booksIds, ...booksIds] : booksIds;
          await Pal.update({ booksIds: updatedBooksIds }, { where: { id } });
          return await Pal.findByPk(id);
        },

        updatePalInfos: async (parent, args) =>{
          const { id, title } = args;
          await Pal.update({ title }, { where: { id } });
          return await Pal.findByPk(id);
        },

        removeBooksFromPal: async (parent, args) => {
          const { id, booksIds } = args;
          const pal = await Pal.findByPk(id);
          const updatedBooksIds = pal.booksIds.filter(bookId => !booksIds.includes(bookId));
          await Pal.update({ booksIds: updatedBooksIds }, { where: { id } });
          return await Pal.findByPk(id);
        },        
    },
  }

// Création de l'instance Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// Démarrage du serveur
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
})

// Message de confirmation que le serveur est bien lancé
console.log(`🚀  Le serveur tourne sur: ${url}`)

