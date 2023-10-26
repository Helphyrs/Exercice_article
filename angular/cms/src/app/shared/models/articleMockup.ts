import { Article, Author } from "./article";

export const ARTICLES: Article[] = [
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
    },
    {
        id: "1",
        imageUrl: "../../assets/croissant.webp",
        title: "Croissant",
        summary: "Les croissants et leurs amies",
        content: "Pourquoi les croissants + chocolat chaud est supérieur en absolument tout point que les croissant avec café et n'oublions pas ceux qui utilisent du ... Thé. Impardonnable.",
        author: {
            id: "1",
            name: "Beu Rrine",
            bio: "fervent admirateur des viennoiseries, je m'attarderai sur rien pour en manger."
        },
        keywords: ["sucré", "viennoiseries", "salé"]
    },
    {
        id: "2",
        imageUrl: "../../assets/eclair.jpg",
        title: "éclair au chocolat",
        summary: "Pourquoi les éclairs au chocolats sont supérieurs en tout point à l'infec... l'imparfait éclair au café",
        content: "Cette article est totalement objectif.",
        author: {
            id: "2",
            name: "Antonin Carême",
            bio: "Créateur des choux"
        },
        keywords: ["sucré", "crême"]
    },
    {
        id: "3",
        imageUrl: "../../assets/religieuse.jpg",
        title: "Religieuse",
        summary: "C'est là pour faire beau, mais soyons honnête, tout le monde déteste cette infâme crême au beurre",
        content: "Rebelotte qu'avec les éclairs, excepté cette fois-ci que nous allons discuter de cette ignoble création qu'est la crème au beurre qui fait tâche sur cette pâtisserie",
        author: {
            id: "2",
            name: "Antonin Carême",
            bio: "Créateur des choux"
        },
        keywords: ["sucré", "crême"]
    },
    {
        id: "4",
        imageUrl: "../../assets/jambon.jpg",
        title: "charcuterie",
        summary: "le jambon c'est bon.",
        content: "Le jambon c'est bon, fin du contenu.",
        author: {
            id: "3",
            name: "Jean Bhon",
            bio: "J'aime le jambon"
        },
        keywords: ["viande", "charcuterie"]
    }
]
export const AUTHOR: Author[] = [
    {
        id: "1",
        name: "Beu Rrine",
        bio: "fervent admirateur des viennoiseries, je m'attarderai sur rien pour en manger."
    },
    {
        id: "2",
        name: "Antonin Carême",
        bio: "Créateur des choux"
    },
    {
        id: "3",
        name: "Jean Bhon",
        bio: "J'aime le jambon"
    }
]