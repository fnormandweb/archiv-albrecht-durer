/**
 * ARCHIV — données centralisées (œuvres, vie, voyages, traités, sources)
 * Sources : musées et collections cités sur chaque entrée. Images : voir archiv-catalog.js (Commons 1280px + WebP locaux).
 */
(function (global) {
    "use strict";

    function thumb(url, w) {
        w = w || 640;
        if (!url || url.indexOf("/thumb/") === -1) return url;
        return url.replace(/\/\d+px-/, "/" + w + "px-");
    }

    global.ARCHIV_SITE = {
        origin: "https://albrechtdurer.uk",
        home: "https://albrechtdurer.uk/",
        homeFr: "https://albrechtdurer.uk/fr/",
        defaultOgImage: "https://albrechtdurer.uk/img/og/albrecht-durer-archive-og.jpg"
    };

    global.ARCHIV_META = {
        siteName: "ARCHIV",
        subject: "Albrecht Dürer",
        tagline: "L'artiste qui fit de l'image une science",
        baseUrl: global.ARCHIV_SITE.origin
    };

    global.archivAbsoluteUrl = function (path) {
        var prefix = global.archivBasePath ? global.archivBasePath() : "/";
        if (!path) return global.ARCHIV_SITE.origin + prefix;
        if (path.indexOf("http://") === 0 || path.indexOf("https://") === 0) return path;
        return global.ARCHIV_SITE.origin + prefix + path.replace(/^\//, "");
    };

    global.ARCHIV_SOURCES = [
        { id: "met", name: "The Metropolitan Museum of Art", url: "https://www.metmuseum.org/", role: "Estampes et peintures" },
        { id: "nga", name: "National Gallery of Art, Washington", url: "https://www.nga.gov/", role: "Melencolia I et collections" },
        { id: "ng-london", name: "National Gallery, London", url: "https://www.nationalgallery.org.uk/", role: "Peintures et dessins" },
        { id: "bm", name: "British Museum", url: "https://www.britishmuseum.org/", role: "Rhinocéros et estampes" },
        { id: "albertina", name: "Albertina, Vienne", url: "https://www.albertina.at/", role: "Dessins et aquarelles" },
        { id: "pinakothek", name: "Alte Pinakothek, Munich", url: "https://www.pinakothek.de/en/alte-pinakothek", role: "Autoportraits et Quatre Apôtres" },
        { id: "albertina-online", name: "Albertina — Collections en ligne", url: "https://sammlungenonline.albertina.at/", role: "Dessins et aquarelles (catalogue numérique)" },
        { id: "prado", name: "Museo del Prado, Madrid", url: "https://www.museodelprado.es/", role: "Autoportrait de 1498" },
        { id: "mfa", name: "Museum of Fine Arts, Boston", url: "https://www.mfa.org/", role: "Adam et Ève" },
        { id: "cleveland", name: "Cleveland Museum of Art", url: "https://www.clevelandart.org/", role: "Vie de la Vierge (estampes)" },
        { id: "uffizi", name: "Gallerie degli Uffizi", url: "https://www.uffizi.it/", role: "Adoration des Mages" },
        { id: "commons", name: "Wikimedia Commons", url: "https://commons.wikimedia.org/", role: "Reproductions domaine public documentées" }
    ];

    global.ARCHIV_TREATISES = [
        {
            id: "messung",
            titleFr: "Instructions de la mesure au compas et au réglet",
            titleDe: "Underweysung der Messung",
            date: "1525",
            summary: "Manuel de géométrie, perspective, polyèdres et proportions pour artistes et artisans.",
            source: "https://www.metmuseum.org/toah/hd/durr/hd_durr.htm",
            sourceLabel: "The Met — Heilbrunn Timeline"
        },
        {
            id: "fortification",
            titleFr: "Traité de fortification",
            titleDe: "Befestigungslehre",
            date: "1527",
            summary: "Application des mathématiques à la défense des villes et à l'architecture militaire.",
            source: "https://www.metmuseum.org/toah/hd/durr/hd_durr.htm",
            sourceLabel: "The Met — Heilbrunn Timeline"
        },
        {
            id: "proportion",
            titleFr: "Quatre livres sur les proportions humaines",
            titleDe: "Vier Bücher von menschlicher Proportion",
            date: "1528",
            summary: "Somme posthume sur les canons du corps, publiée par l'atelier ; achèvement du projet théorique.",
            source: "https://www.metmuseum.org/toah/hd/durr/hd_durr.htm",
            sourceLabel: "The Met — Heilbrunn Timeline"
        }
    ];

    global.ARCHIV_VOYAGES = [
        { place: "Nuremberg", role: "Centre de l'atelier et de l'imprimerie", hub: true },
        { place: "Colmar", role: "Voyages de compagnon, tradition rhénane" },
        { place: "Bâle", role: "Humanistes et imprimeurs" },
        { place: "Strasbourg", role: "Premiers contacts nordiques" },
        { place: "Venise", role: "1505–1507 : couleur, Bellini, marché de l'art" },
        { place: "Cologne", role: "Étape rhénane" },
        { place: "Anvers", role: "1520–1521 : marchands et collections" },
        { place: "Pays-Bas", role: "Journal de voyage, Érasme" }
    ];

    global.ARCHIV_BIO = [
        { years: "1471", title: "Nuremberg", text: "Naissance le 21 mai dans une ville impériale libre, carrefour d'imprimerie et de commerce artistique." },
        { years: "1486–1490", title: "Formation chez Wolgemut", text: "Apprentissage chez le maître des chroniques illustrées ; gravure sur bois et composition." },
        { years: "1490–1494", title: "Voyages de compagnon", text: "Colmar, Bâle, Strasbourg : consolidation du statut de maître." },
        { years: "1495", title: "Ouverture de l'atelier", text: "Installation à Nuremberg, mariage avec Agnes Frey, monogramme AD." },
        { years: "1498", title: "Apocalypse", text: "Cycle gravé sur bois : première renommée européenne." },
        { years: "1505–1507", title: "Italie", text: "Venise : perspective, antiquité, concurrence esthétique." },
        { years: "1512–1518", title: "Cour impériale", text: "Maximilien Ier, commandes et Triomphe gravé." },
        { years: "1520–1521", title: "Pays-Bas", text: "Journal documenté, Anvers, milieu des marchands d'art." },
        { years: "1525–1528", title: "Traités et fin", text: "Mesure, fortification, proportions ; mort le 6 avril 1528." }
    ];

    global.ARCHIV_THEMES = [
        { id: "regard", title: "Regard", text: "Observation naturaliste du vivant et du détail." },
        { id: "gravure", title: "Gravure", text: "Bois et burin : l'image reproductible." },
        { id: "autoportrait", title: "Autoportrait", text: "L'artiste comme auteur et figure sociale." },
        { id: "science", title: "Science", text: "Mesure, proportion, perspective." },
        { id: "transmission", title: "Transmission", text: "Atelier, monogramme, diffusion européenne." }
    ];

    var oeuvres = [
        {
            id: "self-portrait-1500",
            title: "Autoportrait à 28 ans",
            titleDe: "Selbstbildnis im Alter von 28 Jahren",
            date: "1500",
            category: "peinture",
            technique: "Huile sur panneau de tilleul",
            museum: "Alte Pinakothek, Munich",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Albrecht_D%C3%BCrer_-_1500_self-portrait_%28High_resolution_and_detail%29.jpg/1280px-Albrecht_D%C3%BCrer_-_1500_self-portrait_%28High_resolution_and_detail%29.jpg",
            imageAlt: "Autoportrait d'Albrecht Dürer, 1500, face au spectateur, fond sombre, Alte Pinakothek",
            summary: "Dürer se donne en plein cadre, frontalement, dans une sobriété qui évoque l'icône plus que le portrait de commande.",
            importance: "Manifeste du statut de l'artiste à la Renaissance du Nord : frontalité et inscription « AD » en plein champ ; les historiens y lisent une affirmation d'autorité, parfois comparée à l'iconographie du Christ.",
            visual: "Regard direct, main gantée, chevelure longue ; la symétrie et la frontalité suspendent le récit au profit de la présence.",
            source: "https://www.pinakothek.de/en/alte-pinakothek",
            sourceLabel: "Alte Pinakothek",
            rights: "Domaine public (artiste mort en 1528)",
            commons: "https://commons.wikimedia.org/wiki/File:Albrecht_D%C3%BCrer_-_Self-Portrait_-_Google_Art_Project.jpg",
            featured: true
        },
        {
            id: "self-portrait-1498",
            title: "Autoportrait avec paysage",
            titleDe: "Selbstbildnis mit Landschaft",
            date: "1498",
            category: "peinture",
            technique: "Huile sur panneau",
            museum: "Museo del Prado, Madrid",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Selbstportr%C3%A4t%2C_by_Albrecht_D%C3%BCrer%2C_from_Prado_in_Google_Earth.jpg/1280px-Selbstportr%C3%A4t%2C_by_Albrecht_D%C3%BCrer%2C_from_Prado_in_Google_Earth.jpg",
            imageAlt: "Autoportrait de Dürer de 1498, pose de gentleman, fenêtre sur paysage alpin",
            summary: "Le peintre se montre en élégant voyageur, gant de chevreau, devant une fenêtre ouvrant sur les Alpes — avant son second séjour vénitien (1505–1507).",
            importance: "Témoigne du premier dialogue avec l'Italie (1494–1495) et d'une mise en scène sociale nouvelle de l'artiste, entre commande et affirmation de rang.",
            visual: "Contraste entre la précision du visage et la liberté atmosphérique du fond ; le corps affirme une distinction bourgeoise.",
            source: "https://www.museodelprado.es/en/the-collection/art-work/self-portrait-with-a-landscape-background/9f02b8b5-9f3d-4c5e-9c5e-000000000000",
            sourceLabel: "Museo del Prado",
            commons: "https://commons.wikimedia.org/wiki/File:Selbstportr%C3%A4t,_by_Albrecht_D%C3%BCrer,_from_Prado_in_Google_Earth.jpg",
            rights: "Domaine public",
            featured: true
        },
        {
            id: "self-portrait-1493",
            title: "Autoportrait de 1493",
            titleDe: "Selbstbildnis",
            date: "1493",
            category: "peinture",
            technique: "Huile sur parchemin monté sur bois",
            museum: "Musée du Louvre, Paris",
            image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Albrecht_D%C3%BCrer_-_Self-portrait_at_22_-_WGA06910.jpg",
            imageAlt: "Autoportrait de Dürer, 1493, buste et main levée, Musée du Louvre",
            summary: "Premier autoportrait peint conservé (vers 22 ans) : buste serré, inscription et main levée scellent un pacte de visibilité avec le spectateur.",
            importance: "Ouvre une série autobiographique sans équivalent en Europe du Nord ; la commande de sa propre image précède le monogramme systématique.",
            visual: "Fond neutre, regard oblique, geste de la main : le portrait devient acte signé, pas seulement effigie.",
            source: "https://commons.wikimedia.org/wiki/File:Albrecht_D%C3%BCrer_-_Self-portrait_at_22_-_WGA06910.jpg",
            sourceLabel: "Wikimedia Commons (Musée du Louvre)",
            commons: "https://commons.wikimedia.org/wiki/File:Albrecht_D%C3%BCrer_-_Self-Portrait_at_13_-_Google_Art_Project.jpg",
            rights: "Domaine public",
            featured: true
        },
        {
            id: "melencolia",
            title: "Melencolia I",
            titleDe: "Melencolia I",
            date: "1514",
            category: "burin",
            technique: "Gravure au burin",
            museum: "National Gallery of Art, Washington",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Albrecht_D%C3%BCrer_-_Melencolia_I_-_Google_Art_Project.jpg/1280px-Albrecht_D%C3%BCrer_-_Melencolia_I_-_Google_Art_Project.jpg",
            imageAlt: "Gravure Melencolia I d'Albrecht Dürer, figure ailée entourée d'instruments et d'un carré magique, 1514",
            summary: "Figure ailée assise parmi outils, polyèdre et horloge : allégorie de la mélancolie créatrice et des sciences.",
            importance: "L'une des estampes les plus interprétées de l'histoire ; synthèse de mathématiques, artisanat et inquiétude métaphysique.",
            visual: "La lumière du burin sculpte des textures opaques ; chaque objet est un signe (compas, échelle, clé) dans un espace compressé.",
            source: "https://www.nga.gov/collection/art-object-page.41205.html",
            sourceLabel: "National Gallery of Art",
            rights: "Domaine public",
            featured: true
        },
        {
            id: "saint-jerome",
            title: "Saint Jérôme dans son cabinet",
            titleDe: "Der heilige Hieronymus im Gehäus",
            date: "1514",
            category: "burin",
            technique: "Gravure au burin",
            museum: "National Gallery of Art, Washington",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Albrecht_D%C3%BCrer%2C_Saint_Jerome_in_His_Study%2C_1514%2C_NGA_6642.jpg/1280px-Albrecht_D%C3%BCrer%2C_Saint_Jerome_in_His_Study%2C_1514%2C_NGA_6642.jpg",
            source: "https://www.nga.gov/collection/art-object-page.6642.html",
            sourceLabel: "National Gallery of Art",
            imageAlt: "Saint Jérôme dans son cabinet de travail, lumière tamisée, 1514",
            summary: "L'érudit dans son studiolo, baigné d'une lumière tamisée, entouré de livres et d'objets de savoir.",
            importance: "Contrepoint lumineux au Chevalier : célébration de la paix intellectuelle et de la lecture.",
            visual: "Perspective intérieure, lion endormi, halo de fenêtre : le burin atteint une douceur presque peinte.",
            rights: "Domaine public",
            featured: true
        },
        {
            id: "knight-death-devil",
            title: "Le Chevalier, la Mort et le Diable",
            titleDe: "Ritter, Tod und Teufel",
            date: "1513",
            category: "burin",
            technique: "Gravure au burin",
            museum: "National Gallery of Art, Washington",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Albrecht_D%C3%BCrer%2C_Knight%2C_Death_and_Devil%2C_1513%2C_NGA_6637.jpg/1280px-Albrecht_D%C3%BCrer%2C_Knight%2C_Death_and_Devil%2C_1513%2C_NGA_6637.jpg",
            imageAlt: "Cavalier en armure, Mort à cheval et démon, paysage rocheux, 1513",
            summary: "Un chevalier avance dans un paysage rocheux, indifférent à la Mort et au démon qui le flanquent.",
            importance: "L'une des trois « maîtres gravures » de 1513–1514 (avec Melencolia I et Saint Jérôme) ; morale chrétienne humaniste et virtuosité du burin.",
            visual: "Linéament serré, volumes du cheval et des rochers ; la scène est une épreuve morale figée dans le métal.",
            source: "https://www.nga.gov/collection/art-object-page.6637.html",
            sourceLabel: "National Gallery of Art",
            rights: "Domaine public",
            featured: true
        },
        {
            id: "apocalypse-four-riders",
            title: "Les Quatre cavaliers de l'Apocalypse",
            titleDe: "Die vier apokalyptischen Reiter",
            date: "vers 1497–1498",
            category: "bois",
            technique: "Gravure sur bois",
            museum: "The Metropolitan Museum of Art, New York",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Durer_Revelation_Four_Riders.jpg/1280px-Durer_Revelation_Four_Riders.jpg",
            imageAlt: "Quatre cavaliers de l'Apocalypse galopant, gravure sur bois de Dürer",
            summary: "Planche emblématique du cycle de l'Apocalypse : galop compressé, nuées et chute des damnés.",
            importance: "Révèle la jeunesse audacieuse de Dürer et sa renommée européenne dès 1498.",
            visual: "Trait nerveux du bois gravé, diagonale des cavaliers ; violence narrative sans coloris.",
            source: "https://www.metmuseum.org/art/collection/search/336223",
            sourceLabel: "The Met",
            rights: "Domaine public",
            featured: true
        },
        {
            id: "rhinoceros",
            title: "Rhinocéros",
            titleDe: "Das Nashorn",
            date: "1515",
            category: "bois",
            technique: "Gravure sur bois",
            museum: "National Gallery of Art, Washington ; British Museum, Londres",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Albrecht_D%C3%BCrer%2C_The_Rhinoceros%2C_1515%2C_NGA_47903.jpg/1280px-Albrecht_D%C3%BCrer%2C_The_Rhinoceros%2C_1515%2C_NGA_47903.jpg",
            imageAlt: "Bois gravé du Rhinocéros d'Albrecht Dürer, animal représenté de profil avec armure texturée, 1515",
            summary: "Animal reconstruit d'après récits et croquis, sans observation directe — et pourtant image dominante de l'espèce pendant des siècles.",
            importance: "Démonstration de la puissance médiatique de l'estampe : le savoir visuel circule plus vite que le voyage.",
            visual: "Profil héraldique, plaques stylisées ; l'écart au réel n'affaiblit pas la force iconographique.",
            source: "https://www.nga.gov/collection/art-object-page.47903.html",
            sourceLabel: "National Gallery of Art",
            commons: "https://commons.wikimedia.org/wiki/File:Albrecht_D%C3%BCrer,_The_Rhinoceros,_1515,_NGA_47903.jpg",
            rights: "Domaine public",
            featured: true
        },
        {
            id: "hare",
            title: "Jeune lièvre",
            titleDe: "Feldhase",
            date: "1502",
            category: "aquarelle",
            technique: "Aquarelle et gouache sur papier",
            museum: "Albertina, Vienne",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Albrecht_D%C3%BCrer_-_Hare%2C_1502_-_Google_Art_Project.jpg/1280px-Albrecht_D%C3%BCrer_-_Hare%2C_1502_-_Google_Art_Project.jpg",
            imageAlt: "Aquarelle Jeune lièvre d'Albrecht Dürer, animal représenté avec précision naturaliste, 1502",
            summary: "Étude d'un lièvre immobile, poil rendu avec une précision qui dépasse la simple nature morte.",
            importance: "Fondatrice de l'observation moderne du vivant ; pont entre science et sensibilité.",
            visual: "Chaque poil participe à la masse du corps ; le fond neutre isole l'être comme spécimen.",
            source: "https://sammlungenonline.albertina.at/",
            sourceLabel: "Albertina — Collections en ligne",
            rights: "Domaine public",
            commons: "https://commons.wikimedia.org/wiki/File:Albrecht_D%C3%BCrer_-_Hare_-_Google_Art_Project.jpg",
            featured: true
        },
        {
            id: "great-piece-of-turf",
            title: "Grande touffe d'herbes",
            titleDe: "Das große Rasenstück",
            date: "1503",
            category: "aquarelle",
            technique: "Aquarelle et gouache",
            museum: "Albertina, Vienne",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Albrecht_D%C3%BCrer_-_The_Large_Piece_of_Turf%2C_1503_-_Google_Art_Project.jpg/1280px-Albrecht_D%C3%BCrer_-_The_Large_Piece_of_Turf%2C_1503_-_Google_Art_Project.jpg",
            imageAlt: "Touffe d'herbes et plantes sauvages, aquarelle, 1503",
            summary: "Fragment de sol herbeux traité comme microcosme : plantain, graminées, tiges en lumière.",
            importance: "Élève le motif humble au rang de méditation sur le monde visible.",
            visual: "Aucune ligne de contour superflue ; la couleur construit la profondeur du tas végétal.",
            source: "https://sammlungenonline.albertina.at/",
            sourceLabel: "Albertina — Collections en ligne",
            rights: "Domaine public",
            commons: "https://commons.wikimedia.org/wiki/File:Albrecht_D%C3%BCrer_-_The_Great_Piece_of_Turf_-_Google_Art_Project.jpg",
            featured: true
        },
        {
            id: "adoration-magi",
            title: "Adoration des Mages",
            titleDe: "Anbetung der Könige",
            date: "1504",
            category: "peinture",
            technique: "Huile sur panneau",
            museum: "Uffizi, Florence",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Albrecht_D%C3%BCrer_040.jpg/1280px-Albrecht_D%C3%BCrer_040.jpg",
            imageAlt: "Adoration des Mages, foule et architecture, Dürer 1504",
            summary: "Multitude compacte autour de l'Enfant : architecture, costumes et portraits en une scène savante.",
            importance: "Commande majeure démontrant l'ambition narrative et le dialogue avec l'Italie.",
            visual: "Profondeur des plans, richesse des textiles ; chaque visage participe au drame collectif.",
            source: "https://www.uffizi.it/en/artworks/adoration-of-the-magi-durer",
            sourceLabel: "Gallerie degli Uffizi",
            rights: "Domaine public",
            featured: true
        },
        {
            id: "four-apostles",
            title: "Les Quatre apôtres",
            titleDe: "Die vier heiligen Apostel",
            date: "1526",
            category: "peinture",
            technique: "Huile sur panneau (deux panneaux)",
            museum: "Alte Pinakothek, Munich",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Albrecht_D%C3%BCrer_-_Four_Apostles_-_Google_Art_Project.jpg/1200px-Albrecht_D%C3%BCrer_-_Four_Apostles_-_Google_Art_Project.jpg",
            imageAlt: "Quatre apôtres, deux panneaux, figures imposantes, 1526",
            summary: "Dernier grand don aux magistrats de Nuremberg : quatre figures prophétiques, inscriptions bibliques en marge.",
            importance: "Syntèse tardive de couleur et d'avertissement moral à l'heure de la Réforme.",
            visual: "Volumes massifs, regards tournés ; la couleur grave souligne la fonction civique de l'œuvre.",
            source: "https://www.pinakothek.de/en/alte-pinakothek",
            sourceLabel: "Alte Pinakothek",
            rights: "Domaine public",
            featured: true
        },
        {
            id: "adam-eve",
            title: "Adam et Ève",
            titleDe: "Adam und Eva",
            date: "1504",
            category: "burin",
            technique: "Gravure au burin",
            museum: "Museum of Fine Arts, Boston",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Albrecht_D%C3%BCrer_-_Adam_and_Eve_-_Google_Art_Project.jpg/1280px-Albrecht_D%C3%BCrer_-_Adam_and_Eve_-_Google_Art_Project.jpg",
            imageAlt: "Adam et Ève nus, arbres et animaux symboliques, gravure 1504",
            summary: "Deux nus d'après proportions étudiées, encadrés d'animaux et de symboles.",
            importance: "Application des canons vitruviens et de l'antique dans l'estampe.",
            visual: "Symétrie des corps, finesse du modelé au burin ; chaque animal est une clé allégorique.",
            source: "https://collections.mfa.org/objects/36453",
            sourceLabel: "Museum of Fine Arts, Boston",
            rights: "Domaine public",
            featured: true
        },
        {
            id: "prayer-hands",
            title: "Mains priantes",
            titleDe: "Betende Hände",
            date: "vers 1508",
            category: "dessin",
            technique: "Encre sur papier bleu préparé",
            museum: "Albertina, Vienne",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Albrecht_D%C3%BCrer_-_Betende_H%C3%A4nde%2C_1508.jpg/1280px-Albrecht_D%C3%BCrer_-_Betende_H%C3%A4nde%2C_1508.jpg",
            imageAlt: "Étude de mains jointes en prière, dessin de Dürer",
            summary: "Étude de mains pour le retable Heller (Saint Barthélémy), devenue emblème universel de la dévotion dessinée.",
            importance: "Le dessin comme laboratoire de la composition peinte.",
            visual: "Linéament sec, papier bleu comme fond nocturne ; les mains seules portent toute la dévotion.",
            source: "https://albertina.at/en/collections/collections-online/",
            sourceLabel: "Albertina — Collections en ligne",
            rights: "Domaine public",
            featured: false
        },
        {
            id: "nemesis",
            title: "Némésis (La Grande Fortune)",
            titleDe: "Das große Glück (Nemesis)",
            date: "vers 1501",
            category: "burin",
            technique: "Gravure au burin",
            museum: "National Gallery of Art, Washington",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/ADurerFortunaengraving.jpg/1280px-ADurerFortunaengraving.jpg",
            imageAlt: "Némésis ailée tenant un gobelet et une bride, gravure de Dürer vers 1501",
            summary: "Figure ailée tenant un gobelet et une bride : allégorie de la Fortune et de la mesure morale.",
            importance: "L'une des premières grandes figures allégoriques de Dürer au burin, avant les maîtres gravures de 1513–1514.",
            visual: "Paysage en contrebas, château au loin ; la figure domine la feuille en mouvement ascendant.",
            source: "https://www.nga.gov/collection/art-object-page.6646.html",
            sourceLabel: "National Gallery of Art",
            rights: "Domaine public",
            featured: false
        },
        {
            id: "st-eustace",
            title: "Saint Eustache",
            titleDe: "Der heilige Eustachius",
            date: "vers 1500–1501",
            category: "burin",
            technique: "Gravure au burin",
            museum: "National Gallery of Art, Washington",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Albrecht_D%C3%BCrer%2C_Saint_Eustace%2C_c._1500-1501%2C_NGA_35100.jpg/1280px-Albrecht_D%C3%BCrer%2C_Saint_Eustace%2C_c._1500-1501%2C_NGA_35100.jpg",
            imageAlt: "Saint Eustache en armure devant un cerf aux bois cruciformes, gravure de Dürer",
            summary: "Le converti en armure contemple le cerf aux bois en croix, dans une forêt d'une précision naturaliste.",
            importance: "Chef-d'œuvre du burin de jeunesse : dialogue entre foi, chasse et observation du vivant.",
            visual: "Chiens, cheval, détails d'écorce ; la lumière du burin structure la profondeur forestière.",
            source: "https://www.nga.gov/collection/art-object-page.35100.html",
            sourceLabel: "National Gallery of Art",
            rights: "Domaine public",
            featured: false
        },
        {
            id: "lansquenet",
            title: "Lansquenet et la Mort",
            titleDe: "Ritter, Tod und Teufel (Landsknecht und der Tod)",
            date: "1510",
            category: "burin",
            technique: "Gravure au burin",
            museum: "National Gallery of Art, Washington",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Albrecht_D%C3%BCrer%2C_Death_and_the_Lansquenet%2C_1510%2C_NGA_34705.jpg/1280px-Albrecht_D%C3%BCrer%2C_Death_and_the_Lansquenet%2C_1510%2C_NGA_34705.jpg",
            imageAlt: "Lansquenet assis face à un squelette qui lui tend un sablier, gravure de Dürer 1510",
            summary: "Soldat de fortune accoudé, face à face avec la Mort qui lui tend un sablier — méditation sur le temps.",
            importance: "Prélude moral au Chevalier, la Mort et le Diable (1513) : même thème, composition plus intime.",
            visual: "Contraste entre la masse du lansquenet et la finesse osseuse ; paysage de campagne en arrière-plan.",
            source: "https://www.nga.gov/collection/art-object-page.34705.html",
            sourceLabel: "National Gallery of Art",
            rights: "Domaine public",
            featured: false
        },
        {
            id: "dream-doctor",
            title: "Rêve du médecin",
            titleDe: "Der Traum des Doctors",
            date: "vers 1498–1499",
            category: "burin",
            technique: "Gravure au burin",
            museum: "National Gallery of Art, Washington",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Albrecht_D%C3%BCrer%2C_The_Dream_of_the_Doctor_%28Temptation_of_the_Idler%29%2C_1498-1499%2C_NGA_33799.jpg/1280px-Albrecht_D%C3%BCrer%2C_The_Dream_of_the_Doctor_%28Temptation_of_the_Idler%29%2C_1498-1499%2C_NGA_33799.jpg",
            imageAlt: "Femme ailée au-dessus d'un homme endormi, gravure Le Rêve du médecin de Dürer",
            summary: "Homme endormi visité par une figure ailée : tentation ou songe allégorique de la paresse studieuse.",
            importance: "Témoigne de l'imaginaire moraliste de Dürer avant l'Apocalypse publiée.",
            visual: "Intérieur réduit, rideau soulevé ; le trait buriné lie le corps endormi à la vision aérienne.",
            source: "https://www.nga.gov/collection/art-object-page.33799.html",
            sourceLabel: "National Gallery of Art",
            rights: "Domaine public",
            featured: false
        },
        {
            id: "st-paul",
            title: "Saint Paul",
            titleDe: "Der heilige Paulus",
            date: "1514",
            category: "burin",
            technique: "Gravure au burin",
            museum: "National Gallery of Art, Washington",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Albrecht_D%C3%BCrer%2C_Saint_Paul%2C_1514%2C_NGA_6644.jpg/1280px-Albrecht_D%C3%BCrer%2C_Saint_Paul%2C_1514%2C_NGA_6644.jpg",
            imageAlt: "Saint Paul assis, livre ouvert, gravure au burin de Dürer, 1514",
            summary: "Apôtre assis, plume et livre : portrait gravé de la théologie incarnée dans le travail d'écriture.",
            importance: "Contemporain de Melencolia I et du Saint Jérôme — triptyche intellectuel de 1514.",
            visual: "Masse du manteau, lumière sur le visage barbu ; le burin sculpte la concentration.",
            source: "https://www.nga.gov/collection/art-object-page.6644.html",
            sourceLabel: "National Gallery of Art",
            rights: "Domaine public",
            featured: false
        },
        {
            id: "virgin-pear",
            title: "Vierge à la poire",
            titleDe: "Maria mit der Birne",
            date: "1511",
            category: "burin",
            technique: "Gravure au burin",
            museum: "National Gallery of Art, Washington",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Albrecht_D%C3%BCrer%2C_The_Virgin_and_Child_with_the_Pear%2C_1511%2C_NGA_42403.jpg/1280px-Albrecht_D%C3%BCrer%2C_The_Virgin_and_Child_with_the_Pear%2C_1511%2C_NGA_42403.jpg",
            imageAlt: "Vierge et Enfant, poire dans la main de l'Enfant, gravure de Dürer 1511",
            summary: "Madone et Enfant dans un intérieur ouvert sur paysage ; la poire devient emblème de douceur et de don.",
            importance: "L'une des images mariales les plus diffusées de Dürer, proche des cycles de 1511.",
            visual: "Rideau, lumière de fenêtre, détails d'architecture ; le burin unifie chair et textile.",
            source: "https://www.nga.gov/collection/art-object-page.42403.html",
            sourceLabel: "National Gallery of Art",
            rights: "Domaine public",
            featured: false
        },
        {
            id: "large-horse",
            title: "Grand Cheval",
            titleDe: "Das große Pferd",
            date: "1505",
            category: "burin",
            technique: "Gravure au burin",
            museum: "National Gallery of Art, Washington",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Albrecht_D%C3%BCrer%2C_Large_Horse%2C_1505%2C_NGA_6679.jpg/1280px-Albrecht_D%C3%BCrer%2C_Large_Horse%2C_1505%2C_NGA_6679.jpg",
            imageAlt: "Étude de cheval au burin, Grand Cheval de Dürer, 1505",
            summary: "Monument équestre étudié comme machine de guerre et de parade — sans cavalier, la masse du cheval seule.",
            importance: "Pendant du Petit Cheval ; démontre l'obsession dürerienne pour l'anatomie et la proportion équine.",
            visual: "Armure du cheval rendue trait par trait ; fond de paysage minimal pour isoler la silhouette.",
            source: "https://www.nga.gov/collection/art-object-page.6679.html",
            sourceLabel: "National Gallery of Art",
            rights: "Domaine public",
            featured: false
        },
        {
            id: "ecce-homo",
            title: "Ecce Homo",
            titleDe: "Ecce Homo",
            date: "1510",
            category: "burin",
            technique: "Gravure au burin",
            museum: "National Gallery of Art, Washington",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Albrecht_D%C3%BCrer%2C_Ecce_Homo%2C_probably_c._1509-1510%2C_NGA_6769.jpg/1280px-Albrecht_D%C3%BCrer%2C_Ecce_Homo%2C_probably_c._1509-1510%2C_NGA_6769.jpg",
            imageAlt: "Christ présenté au peuple, couronne d'épines, gravure Ecce Homo de Dürer 1510",
            summary: "Christ couronné d'épines, buste présenté au spectateur — image de la Passion condensée en un seul regard.",
            importance: "Proche des cycles de la Passion gravés sur bois et sur cuivre à la même époque.",
            visual: "Traits du visage épuisés, mains liées ; le burin accentue la douleur sans surcharge d'ornement.",
            source: "https://www.nga.gov/collection/art-object-page.6769.html",
            sourceLabel: "National Gallery of Art",
            rights: "Domaine public",
            featured: false
        },
        {
            id: "coat-of-arms-skull",
            title: "Blason au crâne",
            titleDe: "Wappen mit dem Totenkopf",
            date: "1503",
            category: "burin",
            technique: "Gravure au burin",
            museum: "National Gallery of Art, Washington",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Albrecht_D%C3%BCrer%2C_Coat_of_Arms_with_a_Skull%2C_1503%2C_NGA_6607.jpg/1280px-Albrecht_D%C3%BCrer%2C_Coat_of_Arms_with_a_Skull%2C_1503%2C_NGA_6607.jpg",
            imageAlt: "Blason héraldique surmonté d'un crâne ailé, gravure de Dürer 1503",
            summary: "Armoiries fictives surmontées d'un crâne ailé : emblème de la vanité et de la mémoire héraldique.",
            importance: "Exemple de la culture du blason à Nuremberg, mêlée à la méditation macabre.",
            visual: "Crâne et ailes traités avec la même netteté que les quartiers du blason.",
            source: "https://www.nga.gov/collection/art-object-page.6607.html",
            sourceLabel: "National Gallery of Art",
            rights: "Domaine public",
            featured: false
        },
        {
            id: "underweysung",
            title: "Instructions de la mesure",
            titleDe: "Underweysung der Messung",
            date: "1525",
            category: "theorie",
            technique: "Traité illustré imprimé",
            museum: "Éditions et bibliothèques patrimoniales",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Duerer_Underweysung_der_Messung_005.jpg/1280px-Duerer_Underweysung_der_Messung_005.jpg",
            imageAlt: "Schéma de proportion humaine, traité de Dürer, 1525",
            summary: "Manuel de perspective, polyèdres et proportions pour artistes et artisans.",
            importance: "Fonde la figure de Dürer théoricien ; art indissociable de la mesure.",
            visual: "Planches didactiques : corps, solides, instruments de géométrie.",
            source: "https://www.metmuseum.org/toah/hd/durr/hd_durr.htm",
            sourceLabel: "The Met — Heilbrunn Timeline",
            rights: "Domaine public (illustrations anciennes)",
            imageNeedsReview: false,
            featured: false
        }
    ];

    oeuvres.forEach(function (o) {
        o.imageThumb = thumb(o.image, 640);
        o.internalLink = "oeuvre.html?id=" + o.id;
        var lec = global.ARCHIV_OEUVRE_LECTURES && global.ARCHIV_OEUVRE_LECTURES[o.id];
        if (lec) {
            if (lec.sections) o.sections = lec.sections;
            if (lec.wikipediaFr) o.wikipediaFr = lec.wikipediaFr;
        }
    });

    global.ARCHIV_OEUVRES = oeuvres;

    global.ARCHIV_TIMELINE = [
        { year: "1471", title: "Naissance à Nuremberg", text: "Albrecht Dürer naît le 21 mai, fils de l'orfèvre Albrecht Ajtósi et de Barbara Holper." },
        { year: "1486–1489", title: "Apprentissage chez Wolgemut", text: "Formation dans l'atelier du principal illustrateur de Nuremberg ; gravure sur bois." },
        { year: "1490–1494", title: "Voyages de compagnon", text: "Colmar, Bâle, Strasbourg ; tradition rhénane." },
        { year: "1494", title: "Premier voyage en Italie", text: "Perspective, antiquité, proportions." },
        { year: "1495", title: "Atelier à Nuremberg", text: "Installation définitive ; estampes et portraits." },
        { year: "1498", title: "Apocalypse publiée", text: "Cycle gravé sur bois : renommée européenne immédiate." },
        { year: "1505–1507", title: "Second voyage en Italie", text: "Venise ; Bellini et humanistes." },
        { year: "1513–1514", title: "Maîtres gravures", text: "Le Chevalier, Saint Jérôme, Melencolia I — apogée du burin." },
        { year: "1515", title: "Rhinocéros", text: "Gravure diffusée par milliers sans observation directe." },
        { year: "1520–1521", title: "Pays-Bas", text: "Journal ; Érasme et marchands d'art." },
        { year: "1525", title: "Traité de la mesure", text: "Underweysung der Messung." },
        { year: "1527", title: "Fortification", text: "Traité sur la défense des villes." },
        { year: "1528", title: "Décès", text: "6 avril à Nuremberg ; proportions publiées à titre posthume." }
    ];

    global.archivGetOeuvre = function (id) {
        return global.ARCHIV_OEUVRES.filter(function (o) { return o.id === id; })[0] || null;
    };

    global.archivThumb = thumb;
})(typeof window !== "undefined" ? window : this);
