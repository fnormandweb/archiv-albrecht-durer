/**
 * ARCHIV — English locale overlay (works, biography, timeline, voyages, treatises, lectures).
 * Active only when document.documentElement.lang starts with "en".
 */
(function (global) {
    "use strict";

    var lang = (document.documentElement && document.documentElement.lang) || "fr";
    if (lang.indexOf("en") !== 0) return;

    global.ARCHIV_OEUVRE_LECTURES_EN = {
        "knight-death-devil": {
            wikipediaEn: "https://en.wikipedia.org/wiki/Knight,_Death_and_the_Devil",
            sections: [
                {
                    title: "Description",
                    paragraphs: [
                        "Engraved in copper in 1513 and signed in a tabula ansata (initials AD and date), Knight, Death and the Devil — in German Ritter, Tod und Teufel — belongs to the three Meisterstiche ('master prints') that Dürer produced between 1513 and 1514, alongside Melencolia I and St. Jerome in His Study. At this date the artist favoured copper over painting or woodcut: the sheet condenses a technical virtuosity and moral charge of exceptional density.",
                        "A knight in full armour advances in profile to the right, followed by his dog, through a narrow rocky gorge. Behind him, Death rides a gaunt steed, cadaverous of face and serpent-haired, and brandishes an hourglass. Below, a hybrid demon — horned, goat-snouted, spear in hand — lurks among the roots. A skull lies in the foreground; a lizard flees in the opposite direction. Each detail participates in a Gothic and humanist iconography still debated today.",
                        "The armour, the horse's harness, the oak leaves and the fortress atop the hill — often linked with Nuremberg — build a landscape seen from below, almost subterranean, as if the rider advances beneath the earth as much as upon it. The fox tail wound around the lance has been read, by some scholars, as marking a warrior in the service of Emperor Maximilian I. The knight's gaze, fixed ahead, refuses to be distracted by the threats at his flanks."
                    ]
                },
                {
                    title: "Genesis and context",
                    paragraphs: [
                        "A drawing of 1498 already shows a mature man on horseback, with an inscription in Dürer's hand noting that such was the armour then worn in Germany. The artist drew on Italian equestrian models — Donatello, Verrocchio, Leonardo's projects — and on contemporary art, such as Hans Burgkmair's equestrian portrait of Maximilian (1508). The horse of 1513, treated with a geometry close to the Renaissance, contrasts with the northern tradition of tangled landscape.",
                        "The work is not an explicit imperial commission: it belongs to Dürer's maturity, when he was in Maximilian's service, yet expresses an autonomous moral meditation. Giorgio Vasari cites it among sheets 'of such excellence that nothing more beautiful can be achieved.' Soon after, the death of the artist's mother (1514) led several historians to find a biographical echo in Death's obsessive presence."
                    ]
                },
                {
                    title: "Interpretation",
                    paragraphs: [
                        "The dominant reading, since Erasmus's Enchiridion militis christiani (1502) and Erwin Panofsky's analysis, sees in the knight the archetype of the Christian who pursues his path undeterred by the devil and unafraid of Death — echoing Psalm 23: 'though I walk through the valley of the shadow of death, I will fear no evil.' The literal armour becomes the 'armour of God' of faith.",
                        "Other historians (Sten Karling, Ursula Meyer, Pierre Vaisse) propose instead a mercenary or Raubritter, proud and doomed: the skull in his path and the nearly empty hourglass would announce a close end, the devil only barely touching his destiny. The title Dürer sometimes notes as Reuter (not Reiter, 'knight') feeds this debate.",
                        "Moritz Thausing saw one of the four temperaments (the sanguine, hence the 'S.' engraved). Between celebration of courage and moral warning, the engraving remains a deliberate enigma: Dürer mingles Gothic and measure, vita activa and memento mori, without delivering a single legend. The visible correction beneath the horse's hind hoof betrays, in turn, the tireless quest for formal perfection."
                    ]
                },
                {
                    title: "Legacy",
                    paragraphs: [
                        "Copied and reprinted from the sixteenth century onward, the print permeated German culture: Friedrich de la Motte Fouqué, Nietzsche (who saw a 'brave future' and gave Wagner a copy), Thomas Mann and Ernst Bertram in the twentieth century. Jorge Luis Borges and other authors devoted texts to it; Paul Gauguin owned a reproduction pasted into his journal.",
                        "Its prestige has also served ideological readings — notably in the twentieth century — that must be distinguished from Dürer's historical intent. For ARCHIV, the work remains above all the summit of the northern burin: a proof where faith, fear and the science of line coexist in a single passage of rock."
                    ]
                }
            ]
        },

        "melencolia": {
            wikipediaEn: "https://en.wikipedia.org/wiki/Melencolia_I",
            wikipediaFr: "https://fr.wikipedia.org/wiki/Melencolia_I",
            sections: [
                {
                    title: "Description",
                    paragraphs: [
                        "Melencolia I was engraved in 1514, the same year as St. Jerome in His Study. A winged figure, crowned with laurel, sits with her face resting on her hand, surrounded by geometrical tools, a compass, a ladder, a key, scales, a bottle, a millstone and a truncated polyhedron in the foreground. A magic square of side four bears the date 1514 at its centre; a bell, a purse and a skull complete this cabinet of intellectual curiosities.",
                        "In the background, a winged child — or putto — traces on a slate or observes an arc of a circle; a bat bears a banner bearing the title. The burin's light sculpts opaque textures: each object is at once real thing and allegorical sign, in a compressed space that refuses clear narrative."
                    ]
                },
                {
                    title: "Significance",
                    paragraphs: [
                        "The work condenses Aristotelian and medieval melancholy: the humour of artists and scholars, capable of genius as of paralysis. Dürer, at the height of his reflection on measure and perspective, gives visual form to the anguish of unfinished knowledge. The polyhedron, instruments and magic square have nourished centuries of mathematical, astrological and philosophical interpretation.",
                        "With the Knight and St. Jerome, Melencolia forms a moral and intellectual triptych: action, studious meditation, creative melancholy. The print is among the most commented in Western art history; it embodies the moment when the northern image becomes thought."
                    ]
                }
            ]
        },

        "saint-jerome": {
            wikipediaEn: "https://en.wikipedia.org/wiki/St._Jerome_in_His_Study_(D%C3%BCrer)",
            wikipediaFr: "https://fr.wikipedia.org/wiki/Saint_J%C3%A9r%C3%B4me_dans_sa_cellule",
            sections: [
                {
                    title: "Description",
                    paragraphs: [
                        "Engraved in 1514, St. Jerome in His Study (Der heilige Hieronymus im Gehäus) shows the scholar in a studiolo bathed in tempered light entering through stained-glass windows at left. Seated in profile, he works at a book; a sleeping lion rests at his feet, emblem of the hagiographic legend. The interior space, organised by rigorous perspective, contrasts with the dark gorge of the Knight engraved the year before.",
                        "The burin here achieves an almost pictorial softness: panelling, cushions, rays of light and the lion's fur are treated with a finesse that makes this sheet the luminous counterpart of the Meisterstiche — a celebration of intellectual peace, reading and the translation of Scripture."
                    ]
                },
                {
                    title: "Context",
                    paragraphs: [
                        "Jerome, father of the Vulgate, embodies theological knowledge in the service of the Church. Dürer, a Protestant sympathiser without open rupture, places study at the centre of the image as a universal value. The engraving echoes stereotypes of the solitary scholar and the humanist ideal of the vita contemplativa.",
                        "Associated with Melencolia I and the Knight, it completes a meditation on modes of life: combat, melancholy, contemplation. Vasari and contemporaries praised its technical mastery; modern collections (National Gallery of Art, Washington) preserve remarkable impressions."
                    ]
                }
            ]
        },

        "hare": {
            wikipediaEn: "https://en.wikipedia.org/wiki/Young_Hare",
            sections: [
                {
                    title: "Description and method",
                    paragraphs: [
                        "Watercolour and gouache on paper (1502), in the Albertina, Vienna: a hare motionless, seen three-quarters, each hair rendered with a precision that exceeds mere still life. The neutral ground isolates the animal as a specimen, in the manner of a scientific study.",
                        "The sheet is not a preparatory sketch but an autonomous work, probably from observation of a dead or anaesthetised animal. Dürer transposes in colour what his engravings achieve in line: an ontology of the visible."
                    ]
                },
                {
                    title: "Significance",
                    paragraphs: [
                        "Young Hare founds modern naturalistic observation in northern Europe and dialogues with The Large Piece of Turf (1503). It manifests the Dürerian ideal: art as a science of looking, on the threshold of the treatises on measure and proportion of the 1520s."
                    ]
                }
            ]
        },

        "rhinoceros": {
            wikipediaEn: "https://en.wikipedia.org/wiki/D%C3%BCrer%27s_Rhinoceros",
            sections: [
                {
                    title: "Description",
                    paragraphs: [
                        "Woodcut of 1515: Dürer never saw the animal, a gift from the Sultan of Cambay to King Manuel I of Portugal, later exhibited in Lisbon. He reconstructed the beast from accounts and sketches, adding plate armour, a secondary horn on the shoulder and stylised scales.",
                        "The gap from the real rhinoceros did not prevent the European diffusion of this image: for two centuries it defined the species' appearance in the collective imagination."
                    ]
                },
                {
                    title: "Significance",
                    paragraphs: [
                        "The print demonstrates the media power of engraving in the age of print: visual knowledge circulated faster than travel. It also illustrates Dürer's method: inventing a coherent form from fragments of information, between nascent science and heraldic fantasy."
                    ]
                }
            ]
        },

        "apocalypse-four-riders": {
            wikipediaEn: "https://en.wikipedia.org/wiki/Four_Horsemen_of_the_Apocalypse_(D%C3%BCrer)",
            sections: [
                {
                    title: "Description",
                    paragraphs: [
                        "Sheet from the Apocalypse cycle published by Dürer in 1498: four horsemen — Conquest, War, Famine and Death — gallop diagonally on a cloud, crushing the victims. The woodcut line, nervous and diagonal, conveys the violence of John's text without recourse to colour.",
                        "At twenty-six, Dürer imposed an unprecedented graphic rhythm and narrative monumentality that eclipsed earlier northern models."
                    ]
                },
                {
                    title: "Significance",
                    paragraphs: [
                        "First major international success of the Nuremberg workshop: the Apocalypse circulated throughout Europe and fixed the renown of the AD monogram. The Four Horsemen sheet is its emblem — a fusion of political actuality (Turkish threats, eschatological fear) and formal invention."
                    ]
                }
            ]
        },

        "adam-eve": {
            wikipediaEn: "https://en.wikipedia.org/wiki/Adam_and_Eve_(D%C3%BCrer)",
            sections: [
                {
                    title: "Description",
                    paragraphs: [
                        "Engraving of 1504: Adam and Eve, nude, on either side of a tree bearing the apple, surrounded by symbolic animals (cat, elk, ox, rabbit, serpent). The bodies obey studied proportions, in dialogue with Vitruvius and antiquity.",
                        "Each animal refers to humours or virtues in medieval tradition; the symmetry of the figures structures an allegory of the Fall and bodily knowledge."
                    ]
                },
                {
                    title: "Significance",
                    paragraphs: [
                        "Masterpiece of early maturity: Dürer proves that the print can rival painting in sensuality and theory. The sheet prepares the treatises on proportion and announces the humanist obsession with the measured nude."
                    ]
                }
            ]
        },

        "self-portrait-1500": {
            wikipediaEn: "https://en.wikipedia.org/wiki/Self-Portrait_(D%C3%BCrer,_1500)",
            sections: [
                {
                    title: "Description",
                    paragraphs: [
                        "Oil on panel (1500), Alte Pinakothek, Munich: Dürer presents himself full-frame, frontal, gloved hand, long hair, uniform dark ground. The inscription records his likeness and date; the gaze fixes the viewer with an almost icon-like intensity.",
                        "Frontality, symmetry and sobriety move the work beyond commissioned portraiture toward an assertion of authority: the artist presents himself as a creator conscious of his worth."
                    ]
                },
                {
                    title: "Significance",
                    paragraphs: [
                        "Manifesto of the artist's status in the northern Renaissance. Historians read a deliberate comparison with Christ Pantocrator iconography, without definitive consensus. The series of self-portraits (1493, 1498, 1500) invents a visual autobiography without parallel."
                    ]
                }
            ]
        },

        "self-portrait-1498": {
            wikipediaEn: "https://en.wikipedia.org/wiki/Self-Portrait_(D%C3%BCrer,_1498)",
            sections: [
                {
                    title: "Reading",
                    paragraphs: [
                        "Painted in 1498, before the second Venetian journey (1505–1507), the Prado self-portrait shows Dürer as a gentleman: kid gloves, dark coat, window opening onto an Alpine landscape. The body asserts a new social distinction, between Italian elegance and the northern precision of the face.",
                        "The work testifies to the first dialogue with Italy (1494–1495): the artist constructs himself as a public figure, not merely a craftsman. The contrast between the portrait's sharpness and the atmospheric freedom of the background structures a tension that runs through his entire career."
                    ]
                }
            ]
        },

        "self-portrait-1493": {
            sections: [
                {
                    title: "Reading",
                    paragraphs: [
                        "Earliest surviving painted self-portrait (c. 1493, aged about twenty-two): tight bust, inscription, raised hand in greeting or oath. The neutral ground and oblique gaze seal a pact of visibility with the viewer.",
                        "Dürer inaugurates a visual autobiographical series without parallel in northern Europe, before the systematic monogram and the fame of the Apocalypse."
                    ]
                }
            ]
        },

        "great-piece-of-turf": {
            wikipediaEn: "https://en.wikipedia.org/wiki/The_Large_Piece_of_Turf",
            sections: [
                {
                    title: "Reading",
                    paragraphs: [
                        "Watercolour (1503, Albertina): plantain, grasses and wild stems compose a fragment of grassy soil treated as microcosm. No superfluous contour line; colour builds the vegetal mass.",
                        "With Young Hare, the sheet elevates the humble motif to the rank of scientific meditation on the visible world — prelude to the treatises on measure and the botany of printed plates."
                    ]
                }
            ]
        },

        "adoration-magi": {
            wikipediaEn: "https://en.wikipedia.org/wiki/Adoration_of_the_Magi_(D%C3%BCrer)",
            sections: [
                {
                    title: "Reading",
                    paragraphs: [
                        "Oil on panel (1504, Uffizi): a compact multitude surrounds the Child — ruined architecture, exotic costumes, probable portraits of patrons. Depth of planes and richness of textiles demonstrate Dürer's narrative ambition after his return from Italy.",
                        "A major commission that brings North and Florence into dialogue: each face participates in the collective drama of the Epiphany."
                    ]
                }
            ]
        },

        "four-apostles": {
            wikipediaEn: "https://en.wikipedia.org/wiki/Four_Apostles",
            sections: [
                {
                    title: "Reading",
                    paragraphs: [
                        "Two panels (1526, Munich) gifted to the Nuremberg magistrates: John, Peter, Mark and Paul as monumental figures, biblical inscriptions at the foot of the images. Dürer's last major painting, in grave colour, at the hour of the Reformation.",
                        "The work functions as moral warning and civic gift: the apostles become prophets of a troubled age, between faith, politics and public responsibility."
                    ]
                }
            ]
        },

        "prayer-hands": {
            wikipediaEn: "https://en.wikipedia.org/wiki/Praying_Hands_(D%C3%BCrer)",
            sections: [
                {
                    title: "Reading",
                    paragraphs: [
                        "Pen study on prepared blue paper (c. 1508, Albertina), drawn for the Heller Altarpiece (St. Bartholomew). The joined hands alone on the sheet condense devotion into a universal motif.",
                        "Drawing as laboratory of painting: Dürer isolates a fragment of the body to make a modern icon of prayer."
                    ]
                }
            ]
        },

        "nemesis": {
            sections: [
                {
                    title: "Reading",
                    paragraphs: [
                        "Engraving (c. 1501): winged figure holding a cup and a bridle, castle in the distance — allegory of Fortune and Nemesis. One of Dürer's first major symbolic figures in the burin.",
                        "The landscape below and ascending movement prefigure the complexity of the Meisterstiche a decade later."
                    ]
                }
            ]
        },

        "st-eustace": {
            sections: [
                {
                    title: "Reading",
                    paragraphs: [
                        "Engraving c. 1500–1501: St. Eustace in armour contemplates the stag with cruciform antlers, dogs and horse, forest of naturalistic precision. Masterpiece of youth mingling faith, aristocratic hunt and observation of the living.",
                        "The burin's light structures a forest depth that announces the landscapes of the mature engravings."
                    ]
                }
            ]
        },

        "lansquenet": {
            sections: [
                {
                    title: "Reading",
                    paragraphs: [
                        "Engraving of 1510: landsknecht leaning, face to face with Death offering an hourglass. Intimate composition on time and vanity, moral prelude to the Knight of 1513.",
                        "The contrast between the soldier's mass and the skeleton's fineness places Dürer in the northern macabre tradition, close to the Italian wars and mercenaries."
                    ]
                }
            ]
        },

        "dream-doctor": {
            sections: [
                {
                    title: "Reading",
                    paragraphs: [
                        "Engraving c. 1498–1499: sleeping man visited by a winged figure — temptation or allegorical dream, sometimes linked to scholarly idleness (Temptation of the Idler).",
                        "Testifies to Dürer's moralist imagination before publication of the Apocalypse, in a reduced interior where line binds body and vision."
                    ]
                }
            ]
        },

        "st-paul": {
            sections: [
                {
                    title: "Reading",
                    paragraphs: [
                        "Engraving of 1514: apostle seated, book and quill, heavy mantle, concentrated face. Contemporary with Melencolia I and St. Jerome, it completes an intellectual triptych of the same year.",
                        "Theology embodied in the work of writing: engraved portrait of a thinking faith."
                    ]
                }
            ]
        },

        "virgin-pear": {
            sections: [
                {
                    title: "Reading",
                    paragraphs: [
                        "Engraving of 1511: Virgin and Child, pear in the Child's hand, curtain and landscape beyond. One of Dürer's most widely diffused Marian images, close to the Life of the Virgin cycles engraved at the same period.",
                        "The burin unifies flesh, textile and architecture in a domestic softness that nourishes private devotion."
                    ]
                }
            ]
        },

        "large-horse": {
            sections: [
                {
                    title: "Reading",
                    paragraphs: [
                        "Engraving of 1505: caparisoned horse without rider, studied as a machine of parade and war. Pendant to the Small Horse; obsession with equine anatomy and proportion, in dialogue with Italian equestrian monuments.",
                        "Each plate of armour is rendered line by line; the minimal ground isolates the silhouette as an ideal model."
                    ]
                }
            ]
        },

        "ecce-homo": {
            sections: [
                {
                    title: "Reading",
                    paragraphs: [
                        "Engraving c. 1509–1510: Christ crowned with thorns, bust presented to the people, hands bound. Passion condensed in a single exhausted gaze.",
                        "Close to Passion cycles on wood and copper: the burin accentuates suffering without ornamental overload."
                    ]
                }
            ]
        },

        "coat-of-arms-skull": {
            sections: [
                {
                    title: "Reading",
                    paragraphs: [
                        "Engraving of 1503: fictive coat of arms surmounted by a winged skull. Vanity and Nuremberg heraldic culture intersect in a modest-format yet symbol-dense print.",
                        "Skull and quarters of the shield share the same sharpness of line — memento mori in the language of arms."
                    ]
                }
            ]
        },

        "underweysung": {
            wikipediaEn: "https://en.wikipedia.org/wiki/Underweysung_der_Messung",
            sections: [
                {
                    title: "Reading",
                    paragraphs: [
                        "Printed treatise of 1525 (Underweysung der Messung): perspective, polyhedra, body proportions and geometrical instruments for artists and artisans. The didactic plates make Dürer a theorist as much as an engraver.",
                        "The work founds the northern artist-scientist figure: image becomes measurable method, prelude to the books on proportion (1528) and fortification (1527)."
                    ]
                }
            ]
        }
    };

    var OEUVRES_EN = {
        "self-portrait-1500": {
            title: "Self-Portrait at Twenty-Eight",
            imageAlt: "Albrecht Dürer self-portrait, 1500, facing the viewer, dark ground, Alte Pinakothek",
            summary: "Dürer presents himself full-frame, frontally, in a sobriety that evokes the icon more than the commissioned portrait.",
            importance: "Manifesto of the artist's status in the northern Renaissance: frontality and the 'AD' inscription in full field; historians read an assertion of authority, sometimes compared to Christ iconography.",
            visual: "Direct gaze, gloved hand, long hair; symmetry and frontality suspend narrative in favour of presence."
        },
        "self-portrait-1498": {
            title: "Self-Portrait with a Landscape Background",
            imageAlt: "Dürer self-portrait of 1498, gentleman pose, window onto Alpine landscape",
            summary: "The painter shows himself as an elegant traveller, kid gloves, before a window opening onto the Alps — before his second Venetian stay (1505–1507).",
            importance: "Testifies to the first dialogue with Italy (1494–1495) and a new social staging of the artist, between commission and assertion of rank.",
            visual: "Contrast between the precision of the face and the atmospheric freedom of the background; the body asserts bourgeois distinction."
        },
        "self-portrait-1493": {
            title: "Self-Portrait (1493)",
            imageAlt: "Dürer self-portrait, 1493, bust and raised hand, Musée du Louvre",
            summary: "Earliest surviving painted self-portrait (aged about twenty-two): tight bust, inscription and raised hand seal a pact of visibility with the viewer.",
            importance: "Opens an autobiographical series without parallel in northern Europe; commissioning one's own image precedes the systematic monogram.",
            visual: "Neutral ground, oblique gaze, gesture of the hand: the portrait becomes a signed act, not merely a likeness."
        },
        "melencolia": {
            title: "Melencolia I",
            imageAlt: "Dürer engraving Melencolia I, winged figure among instruments and a magic square, 1514",
            summary: "Winged figure seated among tools, polyhedron and clock: allegory of creative melancholy and the sciences.",
            importance: "Among the most interpreted prints in history; synthesis of mathematics, craft and metaphysical unease.",
            visual: "The burin's light sculpts opaque textures; each object is a sign (compass, ladder, key) in a compressed space."
        },
        "saint-jerome": {
            title: "St. Jerome in His Study",
            imageAlt: "St. Jerome in his study, tempered light, 1514",
            summary: "The scholar in his studiolo, bathed in tempered light, surrounded by books and objects of learning.",
            importance: "Luminous counterpart to the Knight: celebration of intellectual peace and reading.",
            visual: "Interior perspective, sleeping lion, window halo: the burin achieves an almost painted softness."
        },
        "knight-death-devil": {
            title: "Knight, Death and the Devil",
            imageAlt: "Armoured knight, Death on horseback and demon, rocky landscape, 1513",
            summary: "A knight advances through a rocky landscape, indifferent to Death and the demon flanking him.",
            importance: "One of the three 'master prints' of 1513–1514 (with Melencolia I and St. Jerome); humanist Christian morality and burin virtuosity.",
            visual: "Tight lineament, volumes of horse and rocks; the scene is a moral trial fixed in metal."
        },
        "apocalypse-four-riders": {
            title: "The Four Horsemen of the Apocalypse",
            imageAlt: "Four Horsemen of the Apocalypse galloping, Dürer woodcut",
            summary: "Emblematic sheet from the Apocalypse cycle: compressed gallop, clouds and fall of the damned.",
            importance: "Reveals Dürer's audacious youth and his European renown from 1498 onward.",
            visual: "Nervous woodcut line, diagonal of horsemen; narrative violence without colour."
        },
        "rhinoceros": {
            title: "The Rhinoceros",
            imageAlt: "Dürer woodcut The Rhinoceros, animal in profile with textured armour, 1515",
            summary: "Animal reconstructed from accounts and sketches, without direct observation — yet the dominant image of the species for centuries.",
            importance: "Demonstration of the print's media power: visual knowledge circulated faster than travel.",
            visual: "Heraldic profile, stylised plates; the gap from reality does not weaken iconographic force."
        },
        "hare": {
            title: "Young Hare",
            imageAlt: "Dürer watercolour Young Hare, animal rendered with naturalistic precision, 1502",
            summary: "Study of a motionless hare, fur rendered with a precision that exceeds mere still life.",
            importance: "Foundational to modern observation of the living; bridge between science and sensibility.",
            visual: "Each hair contributes to the body's mass; the neutral ground isolates the being as specimen."
        },
        "great-piece-of-turf": {
            title: "The Large Piece of Turf",
            imageAlt: "Clump of grasses and wild plants, watercolour, 1503",
            summary: "Fragment of grassy soil treated as microcosm: plantain, grasses, stems in light.",
            importance: "Elevates the humble motif to meditation on the visible world.",
            visual: "No superfluous contour line; colour builds the depth of the vegetal mass."
        },
        "adoration-magi": {
            title: "Adoration of the Magi",
            imageAlt: "Adoration of the Magi, crowd and architecture, Dürer 1504",
            summary: "Compact multitude around the Child: architecture, costumes and portraits in a learned scene.",
            importance: "Major commission demonstrating narrative ambition and dialogue with Italy.",
            visual: "Depth of planes, richness of textiles; each face participates in the collective drama."
        },
        "four-apostles": {
            title: "The Four Apostles",
            imageAlt: "Four apostles, two panels, imposing figures, 1526",
            summary: "Last major gift to the Nuremberg magistrates: four prophetic figures, biblical inscriptions in the margin.",
            importance: "Late synthesis of colour and moral warning at the hour of the Reformation.",
            visual: "Massive volumes, turned gazes; grave colour underscores the work's civic function."
        },
        "adam-eve": {
            title: "Adam and Eve",
            imageAlt: "Adam and Eve nude, trees and symbolic animals, engraving 1504",
            summary: "Two nudes after studied proportions, framed by animals and symbols.",
            importance: "Application of Vitruvian and antique canons in the print.",
            visual: "Symmetry of bodies, fineness of burin modelling; each animal is an allegorical key."
        },
        "prayer-hands": {
            title: "Praying Hands",
            imageAlt: "Study of joined hands in prayer, Dürer drawing",
            summary: "Study of hands for the Heller Altarpiece (St. Bartholomew), become a universal emblem of drawn devotion.",
            importance: "Drawing as laboratory of painted composition.",
            visual: "Dry lineament, blue paper as nocturnal ground; the hands alone carry all devotion."
        },
        "nemesis": {
            title: "Nemesis (The Great Fortune)",
            imageAlt: "Winged Nemesis holding a cup and bridle, Dürer engraving c. 1501",
            summary: "Winged figure holding a cup and bridle: allegory of Fortune and moral measure.",
            importance: "One of Dürer's first major allegorical figures in the burin, before the master prints of 1513–1514.",
            visual: "Landscape below, castle in the distance; the figure dominates the sheet in ascending movement."
        },
        "st-eustace": {
            title: "St. Eustace",
            imageAlt: "St. Eustace in armour before a stag with cruciform antlers, Dürer engraving",
            summary: "The convert in armour contemplates the stag with cross-shaped antlers, in a forest of naturalistic precision.",
            importance: "Masterpiece of youthful burin: dialogue between faith, hunt and observation of the living.",
            visual: "Dogs, horse, bark details; the burin's light structures forest depth."
        },
        "lansquenet": {
            title: "Death and the Landsknecht",
            imageAlt: "Landsknecht seated facing a skeleton offering an hourglass, Dürer engraving 1510",
            summary: "Mercenary leaning, face to face with Death offering an hourglass — meditation on time.",
            importance: "Moral prelude to Knight, Death and the Devil (1513): same theme, more intimate composition.",
            visual: "Contrast between the landsknecht's mass and bony fineness; countryside landscape behind."
        },
        "dream-doctor": {
            title: "The Dream of the Doctor",
            imageAlt: "Winged woman above a sleeping man, Dürer engraving The Dream of the Doctor",
            summary: "Sleeping man visited by a winged figure: temptation or allegorical dream of scholarly idleness.",
            importance: "Testifies to Dürer's moralist imagination before the published Apocalypse.",
            visual: "Reduced interior, raised curtain; burin line binds sleeping body to aerial vision."
        },
        "st-paul": {
            title: "St. Paul",
            imageAlt: "St. Paul seated, open book, Dürer burin engraving, 1514",
            summary: "Apostle seated, quill and book: engraved portrait of theology embodied in writing.",
            importance: "Contemporary with Melencolia I and St. Jerome — intellectual triptych of 1514.",
            visual: "Mass of mantle, light on bearded face; the burin sculpts concentration."
        },
        "virgin-pear": {
            title: "The Virgin and Child with the Pear",
            imageAlt: "Virgin and Child, pear in the Child's hand, Dürer engraving 1511",
            summary: "Madonna and Child in an interior opening onto landscape; the pear becomes emblem of sweetness and gift.",
            importance: "One of Dürer's most diffused Marian images, close to the cycles of 1511.",
            visual: "Curtain, window light, architectural details; the burin unifies flesh and textile."
        },
        "large-horse": {
            title: "The Large Horse",
            imageAlt: "Burin study of a horse, Dürer Large Horse, 1505",
            summary: "Equestrian monument studied as machine of war and parade — without rider, the horse's mass alone.",
            importance: "Pendant to the Small Horse; demonstrates Dürer's obsession with equine anatomy and proportion.",
            visual: "Horse armour rendered line by line; minimal landscape ground isolates the silhouette."
        },
        "ecce-homo": {
            title: "Ecce Homo",
            imageAlt: "Christ presented to the people, crown of thorns, Dürer Ecce Homo engraving 1510",
            summary: "Christ crowned with thorns, bust presented to the viewer — image of the Passion condensed in a single gaze.",
            importance: "Close to Passion cycles engraved on wood and copper at the same period.",
            visual: "Exhausted facial features, bound hands; the burin accentuates suffering without ornamental overload."
        },
        "coat-of-arms-skull": {
            title: "Coat of Arms with a Skull",
            imageAlt: "Heraldic coat of arms surmounted by a winged skull, Dürer engraving 1503",
            summary: "Fictive arms surmounted by a winged skull: emblem of vanity and heraldic memory.",
            importance: "Example of Nuremberg armorial culture mingled with macabre meditation.",
            visual: "Skull and wings treated with the same sharpness as the shield's quarters."
        },
        "underweysung": {
            title: "Treatise on Measurement",
            imageAlt: "Human proportion diagram, Dürer treatise, 1525",
            summary: "Manual of perspective, polyhedra and proportions for artists and artisans.",
            importance: "Founds Dürer's figure as theorist; art inseparable from measure.",
            visual: "Didactic plates: body, solids, geometrical instruments."
        }
    };

    var BIO_EN = [
        { years: "1471", title: "Nuremberg", text: "Born 21 May in a free imperial city, crossroads of printing and artistic commerce." },
        { years: "1486–1490", title: "Training with Wolgemut", text: "Apprenticeship with the master of illustrated chronicles; woodcut and composition." },
        { years: "1490–1494", title: "Journeyman travels", text: "Colmar, Basel, Strasbourg: consolidation of master status." },
        { years: "1495", title: "Opening of the workshop", text: "Settled in Nuremberg, marriage to Agnes Frey, AD monogram." },
        { years: "1498", title: "Apocalypse", text: "Woodcut cycle: first European renown." },
        { years: "1505–1507", title: "Italy", text: "Venice: perspective, antiquity, aesthetic rivalry." },
        { years: "1512–1518", title: "Imperial court", text: "Maximilian I, commissions and the Triumphal Arch." },
        { years: "1520–1521", title: "Netherlands", text: "Documented journal, Antwerp, art-dealer milieu." },
        { years: "1525–1528", title: "Treatises and end", text: "Measurement, fortification, proportions; died 6 April 1528." }
    ];

    var TIMELINE_EN = [
        { year: "1471", title: "Birth in Nuremberg", text: "Albrecht Dürer born 21 May, son of the goldsmith Albrecht Ajtósi and Barbara Holper." },
        { year: "1486–1489", title: "Apprenticeship with Wolgemut", text: "Training in Nuremberg's leading illustrator's workshop; woodcut." },
        { year: "1490–1494", title: "Journeyman travels", text: "Colmar, Basel, Strasbourg; Rhenish tradition." },
        { year: "1494", title: "First journey to Italy", text: "Perspective, antiquity, proportions." },
        { year: "1495", title: "Workshop in Nuremberg", text: "Permanent settlement; prints and portraits." },
        { year: "1498", title: "Apocalypse published", text: "Woodcut cycle: immediate European renown." },
        { year: "1505–1507", title: "Second journey to Italy", text: "Venice; Bellini and humanists." },
        { year: "1513–1514", title: "Master prints", text: "Knight, Death and the Devil, St. Jerome, Melencolia I — apex of the burin." },
        { year: "1515", title: "The Rhinoceros", text: "Print diffused by thousands without direct observation." },
        { year: "1520–1521", title: "Netherlands", text: "Journal; Erasmus and art dealers." },
        { year: "1525", title: "Treatise on measurement", text: "Underweysung der Messung." },
        { year: "1527", title: "Fortification", text: "Treatise on the defence of cities." },
        { year: "1528", title: "Death", text: "6 April in Nuremberg; proportions published posthumously." }
    ];

    var VOYAGES_EN = [
        { place: "Nuremberg", role: "Centre of workshop and printing", hub: true },
        { place: "Colmar", role: "Journeyman travels, Rhenish tradition" },
        { place: "Basel", role: "Humanists and printers" },
        { place: "Strasbourg", role: "First northern contacts" },
        { place: "Venice", role: "1505–1507: colour, Bellini, art market" },
        { place: "Cologne", role: "Rhenish stage" },
        { place: "Antwerp", role: "1520–1521: merchants and collections" },
        { place: "Netherlands", role: "Travel journal, Erasmus" }
    ];

    var TREATISES_EN = [
        {
            id: "messung",
            titleFr: "Instructions on Measurement with Compass and Ruler",
            titleDe: "Underweysung der Messung",
            date: "1525",
            summary: "Manual of geometry, perspective, polyhedra and proportions for artists and artisans.",
            source: "https://www.metmuseum.org/toah/hd/durr/hd_durr.htm",
            sourceLabel: "The Met — Heilbrunn Timeline"
        },
        {
            id: "fortification",
            titleFr: "Treatise on Fortification",
            titleDe: "Befestigungslehre",
            date: "1527",
            summary: "Application of mathematics to city defence and military architecture.",
            source: "https://www.metmuseum.org/toah/hd/durr/hd_durr.htm",
            sourceLabel: "The Met — Heilbrunn Timeline"
        },
        {
            id: "proportion",
            titleFr: "Four Books on Human Proportion",
            titleDe: "Vier Bücher von menschlicher Proportion",
            date: "1528",
            summary: "Posthumous sum on body canons, published by the workshop; completion of the theoretical project.",
            source: "https://www.metmuseum.org/toah/hd/durr/hd_durr.htm",
            sourceLabel: "The Met — Heilbrunn Timeline"
        }
    ];

    var EDITION_STATUS = { "À venir": "Coming soon", "Disponible": "Available" };
    var EDITION_CATEGORIES = {
        "Tirage d'archive": "Archive print",
        "Planche pédagogique": "Teaching plate",
        "Dossier numérique": "Digital dossier",
        "Collection future": "Future collection"
    };

    global.applyArchivEnglishLocale = function () {
        if (global.ARCHIV_META) {
            global.ARCHIV_META.tagline = "The artist who made image a science";
        }

        if (global.ARCHIV_EDITIONS_DISCLAIMER) {
            global.ARCHIV_EDITIONS_DISCLAIMER =
                "ARCHIV is not affiliated with the museums mentioned. Sources and credits are provided for documentation. No edition is offered for sale until commercial reproduction rights are confirmed.";
        }
        if (global.ARCHIV_EDITION_CATEGORIES) {
            global.ARCHIV_EDITION_CATEGORIES.forEach(function (c) {
                if (EDITION_CATEGORIES[c.label]) c.label = EDITION_CATEGORIES[c.label];
            });
        }
        if (global.ARCHIV_EDITIONS) {
            global.ARCHIV_EDITIONS.forEach(function (ed) {
                if (EDITION_CATEGORIES[ed.category]) ed.category = EDITION_CATEGORIES[ed.category];
                if (EDITION_STATUS[ed.status]) ed.status = EDITION_STATUS[ed.status];
                if (ed.ctaLabel === "Demander disponibilité") ed.ctaLabel = "Request availability";
                if (ed.format === "À définir") ed.format = "To be defined";
                if (ed.paper && ed.paper.indexOf("à définir") !== -1) ed.paper = "Archive paper — to be defined";
                if (ed.rightsStatus && ed.rightsStatus.indexOf("à vérifier") !== -1) {
                    ed.rightsStatus = "Commercial rights to be verified before edition";
                }
            });
        }

        global.ARCHIV_BIO = BIO_EN;
        global.ARCHIV_TIMELINE = TIMELINE_EN;
        global.ARCHIV_VOYAGES = VOYAGES_EN;
        global.ARCHIV_TREATISES = TREATISES_EN;

        var frWikiByWork = {};
        if (global.ARCHIV_OEUVRE_LECTURES) {
            Object.keys(global.ARCHIV_OEUVRE_LECTURES).forEach(function (id) {
                var frLec = global.ARCHIV_OEUVRE_LECTURES[id];
                if (frLec && frLec.wikipediaFr) frWikiByWork[id] = frLec.wikipediaFr;
            });
        }
        if (global.ARCHIV_OEUVRE_LECTURES_EN) {
            global.ARCHIV_OEUVRE_LECTURES = global.ARCHIV_OEUVRE_LECTURES || {};
            Object.keys(global.ARCHIV_OEUVRE_LECTURES_EN).forEach(function (id) {
                global.ARCHIV_OEUVRE_LECTURES[id] = global.ARCHIV_OEUVRE_LECTURES_EN[id];
            });
        }

        if (!global.ARCHIV_OEUVRES) return;

        global.ARCHIV_OEUVRES.forEach(function (o) {
            var en = OEUVRES_EN[o.id];
            if (en) {
                if (en.title) o.title = en.title;
                if (en.summary) o.summary = en.summary;
                if (en.importance) o.importance = en.importance;
                if (en.visual) o.visual = en.visual;
                if (en.imageAlt) o.imageAlt = en.imageAlt;
            }
            o.internalLink = "oeuvre.html?id=" + o.id;

            var lec = global.ARCHIV_OEUVRE_LECTURES && global.ARCHIV_OEUVRE_LECTURES[o.id];
            if (lec) {
                if (lec.sections) o.sections = lec.sections;
                if (lec.wikipediaEn) o.wikipediaEn = lec.wikipediaEn;
                if (frWikiByWork[o.id]) o.wikipediaFr = frWikiByWork[o.id];
                else if (lec.wikipediaFr) o.wikipediaFr = lec.wikipediaFr;
            }
        });
    };

    global.applyArchivEnglishLocale();
})(typeof window !== "undefined" ? window : this);
