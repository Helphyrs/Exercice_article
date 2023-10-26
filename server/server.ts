import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import router from './routes';
import passportInstance from './auth';
import session from 'express-session';
import cookieParser from 'cookie-parser';
const MongoDBStore = require('connect-mongodb-session')(session);
import bodyParser from 'body-parser';
import { Article } from '../angular/cms/src/app/shared/models/article';

const port: number = 3000;
const database: string = "mongodb://127.0.0.1:27017/cms";
const app = express();

const sessionStore = new MongoDBStore({
  uri: database,
  collection: "sessions"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard badger',
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));
app.use(passportInstance.authenticate('session'));

app.use((err: any, req: any, res: any, next: any) => {
  if (err) {
    const status = err.status || 500;
    res.status(status).json({
      status: 'error',
      statusCode: status,
      stack: err.stack
    });
  }
});

app.use(express.static(path.join(__dirname, '../www')));
app.use("/api", router);
app.all('/admin',
  (req, res, next) => {
    if (!req.user) {
      res.redirect('/home');
    } else {
      next();
    }
  }
)
app.all(/^[^.]*$/,
  (req, res, next) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../www') });
  }
);
const ARTICLES: Article[] = [
  {
    id: "0",
    imageUrl: "../../assets/chocolatine.jpg",
    title: "Chocolatine",
    summary: "Chocolatine >>>>>>> Pains aux chocolats",
    content: "Tout ce que vous devez savoir sur les chocolatines et non pains aux chocolats.",
    author: {
      id: "1",
      name: "Beu Rrine",
      bio: "fervent admirateur des viennoiseries, je m'attarderai sur rien pour en manger."
    },
    keywords: ["sucré", "viennoiseries"]
  }
  // {
  //   id: "1",
  //   imageUrl: "../../assets/croissant.webp",
  //   title: "Croissant",
  //   summary: "Les croissants et leurs amies",
  //   content: "Pourquoi les croissants + chocolat chaud est supérieur en absolument tout point que les croissant avec café et n'oublions pas ceux qui utilisent du ... Thé. Impardonnable.",
  //   author: {
  //     id: "1",
  //     name: "Beu Rrine",
  //     bio: "fervent admirateur des viennoiseries, je m'attarderai sur rien pour en manger."
  //   },
  //   keywords: ["sucré", "viennoiseries", "salé"]
  // },
  // {
  //   id: "2",
  //   imageUrl: "../../assets/eclair.jpg",
  //   title: "éclair au chocolat",
  //   summary: "Pourquoi les éclairs au chocolats sont supérieurs en tout point à l'infec... l'imparfait éclair au café",
  //   content: "Cette article est totalement objectif.",
  //   author: {
  //     id: "2",
  //     name: "Antonin Carême",
  //     bio: "Créateur des choux"
  //   },
  //   keywords: ["sucré", "crême"]
  // },
  // {
  //   id: "3",
  //   imageUrl: "../../assets/religieuse.jpg",
  //   title: "Religieuse",
  //   summary: "C'est là pour faire beau, mais soyons honnête, tout le monde déteste cette infâme crême au beurre",
  //   content: "Rebelotte qu'avec les éclairs, excepté cette fois-ci que nous allons discuter de cette ignoble création qu'est la crème au beurre qui fait tâche sur cette pâtisserie",
  //   author: {
  //     id: "2",
  //     name: "Antonin Carême",
  //     bio: "Créateur des choux"
  //   },
  //   keywords: ["sucré", "crême"]
  // },
  // {
  //   id: "4",
  //   imageUrl: "../../assets/jambon.jpg",
  //   title: "charcuterie",
  //   summary: "le jambon c'est bon.",
  //   content: "Le jambon c'est bon, fin du contenu.",
  //   author: {
  //     id: "3",
  //     name: "Jean Bhon",
  //     bio: "J'aime le jambon"
  //   },
  //   keywords: ["viande", "charcuterie"]
  // }
]
const ArticleSchema = new mongoose.Schema({
  id: String,
  imageUrl: String,
  title: String,
  summary: String,
  content: String,
  author: {
    id: String,
    name: String,
    bio: String
  },
  keywords: [String]
});


const Article = mongoose.model('Article', ArticleSchema);
export { Article }
const SettingsSchema = new mongoose.Schema({
  featured_articleId: String
});
const Settings = mongoose.model('Settings', SettingsSchema);
export { Settings };
//Settings.insertMany(ARTICLES)

app.listen(3000, () => {
  console.log(`listening http://localhost:${port}`)

  mongoose.connect(database);
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
  db.once('open', () => {
    console.log('Connecté à la base de données MongoDB.');
  });
});

