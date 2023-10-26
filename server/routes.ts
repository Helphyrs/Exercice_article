import { Router } from "express";
import passportInstance from './auth';
import { Article, Settings } from "./server";
import { Article as modelArticle } from "../angular/cms/src/app/shared/models/article";

const router: Router = Router();

router.get('/all', async (req, res, next) => {
    try {
        const articles = await Article.find({});
        const featured_articleId = await Settings.find({})
        res.json({ articles: articles, user: req.user?.username, featuredID: featured_articleId });
    } catch (error) {
        next(error);
    }
});
router.get('/idFeatured', async (req, res, next) => {
    try {
        const featured_articleId = await Settings.find({})
        res.json(featured_articleId)
    } catch (error) {
        next(error)
    }
});
router.get('/logout', async (req, res) => {
    req.logOut({}, (err) => {
        res.clearCookie('connect.sid');
        res.redirect('/home');

    });
});
router.post('/select/:id', async (req, res) => {
    try {
        await Settings.deleteMany({});
        let elementId = req.params.id
        const newSettings = new Settings({
            featured_articleId: elementId
        });
        await Settings.insertMany(newSettings);
        res.json(newSettings.id)
    } catch (error) {
        throw (error);
    }
});
router.put('/editArticle/:id/:image/:title/:summary/:content/:keywords/:auteurID/:auteurBio/:auteurName', async (req, res) => {
    try {
        const foundArticle = await Article.findOne({ id: req.params.id });
        let newKeyWords = req.params.keywords.split(','), decodedBio = decodeURIComponent(req.params.auteurBio), decodedName = decodeURIComponent(req.params.auteurName), decodeImage = decodeURIComponent(req.params.image)
        let articleEdit: Article = {
            id: req.params.id,
            imageUrl: req.params.image,
            title: req.params.title,
            summary: req.params.summary,
            content: req.params.content,
            author: {
                id: req.params.auteurID,
                name: decodedName,
                bio: decodedBio
            },
            keywords: newKeyWords
        }
        if (foundArticle !== null) {
            await Article.findByIdAndUpdate(foundArticle._id, articleEdit, { new: true })
        }
        res.json({ succes: true, message: "article bien modifié" })
    } catch (error) {
        throw (error);
    }
});
router.put('/editAuthor/:id/:name/:bio', async (req, res) => {
    try {
        let decodeName = decodeURIComponent(req.params.name), decodeBio = decodeURIComponent(req.params.bio);
        await Article.updateMany({ 'author.id': req.params.id }, { $set: { 'author.bio': decodeBio, 'author.name': decodeName } });
        res.json({ succes: true, message: "nom et bio bien modifié" })
    } catch (error) {
        throw (error);
    }
})
router.post('/login',
    (req, res, next) => {
        passportInstance.authenticate('local', (err: any, user: Express.User, data: any) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            if (!user) {
                return res.json({ success: false, message: "Nom d'utilisateur ou mot de passe incorrect" });
            }
            req.login(user, loginErr => {
                if (loginErr) {
                    return next(loginErr);
                }
                return res.json({ success: true, message: "Connexion établie", user: req.user });
            });
        })(req, res, next);
    }
);

router.post('/signup',
    (req, res, next) => {
        passportInstance.authenticate('local-signup', (err: any, user: Express.User, data: any) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            if (user) {
                return res.json({ success: true, message: "Utilisateur enregistré" });
            } else {
                return res.json({ success: false, ...data });
            }
        })(req, res, next);
    }
);

export default router;