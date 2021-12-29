import {u} from "./utils.js";
import {T, R} from "./tables.js";

// notes:

// user authentication

// create table
// create source

// fix table collapse bug

// sdt remains highlighted when filters change
// text filter

// pressing enter on sdt will rtnRstFrmTableAndDspHTML($(this), dts, document.querySelector(`#history`));

// rstPath should be obj that includes timestamp and pcts for each stage.
// then there should be rstPaths, an arr of all rstPaths

class DT extends T {
    constructor({
        name,
        ents,
        tags = null,
    }) {
        super ({
            name,
            ents,
        });
        this.tags = tags;
        this.catTable();
    }
    catTable() {
        if (this.tags.areSpellScrollsCantrip
            || this.tags.areSpellScrollsLvl1
            || this.tags.areSpellScrollsLvl2
            ) { this.tags.areSpellScrolls = true;
        }
        if (this.tags.areSimpleMeleeWeapons
            || this.tags.areSimpleRangedWeapons
            || this.tags.areMartialMeleeWeapons
            || this.tags.areMartialRangedWeapons
            || this.tags.areAmmunition
            ) { this.tags.areWeapons = true;
        }
        if (this.tags.isAmmunition
            || this.tags.isSimpleMeleeWeapon
            || this.tags.isSimpleRangedWeapon
            || this.tags.isMartialWeapon
            || this.tags.isMartialRangedWeapon
            ) { this.isWeapon = true; };
        if (this.tags.areMagicItems
            || this.tags.areSpellScrolls
            || this.tags.areWeapons
            || this.tags.areGemstones
            || this.tags.areMundaneItems
            || this.tags.isWeapon
            ) { this.tags.areEqp = true;
        }
    }
}
const dtMethods = new DT({
    name: `dtMethods`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
    },
});
class DR extends R {
    constructor({
        name,
        traits,
        href,
        dsc,
        tags = null,
    }) {
        super({
            name,
            traits,
            href,
            dsc,
        });
        this.tags = tags;
        this.catRst();
    }
    catRst() {
        if (this.tags.isSpellScrollCantrip || this.tags.isSpellScrollLvl1 || this.tags.isSpellScrollLvl2) {
            this.tags.isSpellScroll = true;
        }
        if (this.tags.isPotion) {
            this.tags.isMagicItem = true;
        }
        if (this.tags.isSpellScroll
            || this.tags.isMagicItem
            || this.tags.isGemstone
            || this.tags.isMundaneItem) {
            this.tags.isEqp = true;
        }
    }
}
const ctrs = {};
ctrs.sdtRowCtr = 0;
ctrs.historyCtr = 0;
const drs = {};
const dts = {};
dts[`Conditions`] = new DT({
    name: `Conditions`,
    tags: {
        user: null,
        source: {
            name: `DungeonTables`,
            href: null,
        },
        areAdjs: true,
    },
    ents: [
        [`Broken`, .05],
        [`Rusted`, .1],
        [`Normal`, .7],
        [`Polished`, .15],
    ],
})
dts[`Creatures`] = new DT({
    name: `Creatures`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        areAdjs: true,
    },
    ents: [
        `Basilisk`,
        `Bat`,
        `Bear`,
        `Boa`,
        `Cat`,
        `Chimera`,
        `Deer`,
        `Dragon`,
        `Griffon`,
        `Horse`,
        `Hydra`,
        `Lizard`,
        `Manticore`,
        `Minotaur`,
        `Piranha`,
        `Rat`,
        `Siren`,
        `Sphinx`,
        `Toad`,
        `Unicorn`,
        `Wolf`,
    ],
})
dts[`Fabric`] = new DT({
    name: `Fabric`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        areAdjs: true,
    },
    ents: [
        `Linen`,
        `Cotton`,
        `Wool`,
        `Burlap`,
        `Silk`,
        `Felt`,
        `Velvet`,
        `Gold silk`,
    ],
})
dts[`Materials`] = new DT({
    name: `Materials`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        areAdjs: true,
    },
    ents: [
        `Brass`,
        `Wood`,
        `Stone`,
        `Copper`,
        `Bone`,
        `Clay`,
    ],
})
dts[`Fine Materials`] = new DT({
    name: `Fine Materials`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        areAdjs: true,
    },
    ents: [
        `Brass`,
        `Wood`,
        `Stone`,
        `Copper`,
        `Bone`,
        `Clay`,
        `Pewter`,
        `Silver`,
        `Bronze`,
        `Ivory/ bone`,
        `Gold-plated`,
    ],
})
dts[`Symbols`] = new DT({
    name: `Symbols`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        areAdjs: true,
    },
    ents: [
        `Celestial object`,
        `Weapon`,
        `Royal crest`,
        `Holy symbol`,
    ],
})
drs[`Potion of Healing`] = new DR({
    name: `Potion of Healing`,
    href: `https://www.aidedd.org/dnd/om.php?vo=potion-of-healing`,
    dsc: `The potion's red liquid glimmers when agitated.
            <br>You regain 2d4 + 2 hit points when you drink this potion.`,
    traits: {
        [`Rarity`]: `Common`,
    },
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isPotion: true,
    },
})
drs[`Potion of Climbing`] = new DR({
    name: `Potion of Climbing`,
    href: `https://www.aidedd.org/dnd/om.php?vo=potion-of-climbing`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isPotion: true,
    },
})
drs[`Spell Scroll Cantrip: Acid Splash`] = new DR({
    name: `Spell Scroll Cantrip: Acid Splash`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Blade Ward`] = new DR({
    name: `Spell Scroll Cantrip: Blade Ward`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Chill Touch`] = new DR({
    name: `Spell Scroll Cantrip: Chill Touch`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Dancing Lights`] = new DR({
    name: `Spell Scroll Cantrip: Dancing Lights`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Druidcraft`] = new DR({
    name: `Spell Scroll Cantrip: Druidcraft`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Eldritch Blast`] = new DR({
    name: `Spell Scroll Cantrip: Eldritch Blast`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Fire Bolt`] = new DR({
    name: `Spell Scroll Cantrip: Fire Bolt`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Friends`] = new DR({
    name: `Spell Scroll Cantrip: Friends`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Guidance`] = new DR({
    name: `Spell Scroll Cantrip: Guidance`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Light`] = new DR({
    name: `Spell Scroll Cantrip: Light`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Mage Hand`] = new DR({
    name: `Spell Scroll Cantrip: Mage Hand`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Mending`] = new DR({
    name: `Spell Scroll Cantrip: Mending`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Message`] = new DR({
    name: `Spell Scroll Cantrip: Message`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Minor Illusion`] = new DR({
    name: `Spell Scroll Cantrip: Minor Illusion`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Poison Spray`] = new DR({
    name: `Spell Scroll Cantrip: Poison Spray`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Prestidigitation`] = new DR({
    name: `Spell Scroll Cantrip: Prestidigitation`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Produce Flame`] = new DR({
    name: `Spell Scroll Cantrip: Produce Flame`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Ray of Frost`] = new DR({
    name: `Spell Scroll Cantrip: Ray of Frost`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Resistance`] = new DR({
    name: `Spell Scroll Cantrip: Resistance`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Sacred Flame`] = new DR({
    name: `Spell Scroll Cantrip: Sacred Flame`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Shillelagh`] = new DR({
    name: `Spell Scroll Cantrip: Shillelagh`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Shocking Grasp`] = new DR({
    name: `Spell Scroll Cantrip: Shocking Grasp`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Spare the Dying`] = new DR({
    name: `Spell Scroll Cantrip: Spare the Dying`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Thaumaturgy`] = new DR({
    name: `Spell Scroll Cantrip: Thaumaturgy`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Thorn Whip`] = new DR({
    name: `Spell Scroll Cantrip: Thorn Whip`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: True Strike`] = new DR({
    name: `Spell Scroll Cantrip: True Strike`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Cantrip: Vicious Mockery`] = new DR({
    name: `Spell Scroll Cantrip: Vicious Mockery`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollCantrip: true,   
    },
})
drs[`Spell Scroll Lvl 1`] = new DR({
    name: `Spell Scroll Lvl 1`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollLvl1: true,
    },
})
drs[`Spell Scroll Lvl 2`] = new DR({
    name: `Spell Scroll Lvl 2`,
    href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSpellScrollLvl2: true,
    },
})
drs[`Potion of Greater Healing`] = new DR({
    name: `Potion of Greater Healing`,
    href: `https://www.aidedd.org/dnd/om.php?vo=potion-of-healing`,
    dsc: `The potion's red liquid glimmers when agitated.
    <br>You regain 4d4 + 4 hit points when you drink this potion.`,
    traits: {
        [`Rarity`]: `Uncommon`,
    },
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isPotion: true,
    },
})
drs[`Bag of Holding`] = new DR({
    name: `Bag of Holding`,
    href: `https://www.aidedd.org/dnd/om.php?vo=bag-of-holding`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMagicItem: true,
    },
})
drs[`Drift Globe`] = new DR({
    name: `Drift Globe`,
    href: `https://www.aidedd.org/dnd/om.php?vo=driftglobe`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMagicItem: true,
    },
})
drs[`Azurite`] = new DR({
    name: `Azurite`,
    href: `https://dungeonmastertools.github.io/treasure.html`,
    traits: {
        [`Worth`]: 10,
    },
    dsc: `Opaque mottled deep blue.`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isGemstone: true,
    },
})
drs[`Banded Agate`] = new DR({
    name: `Banded Agate`,
    href: `https://dungeonmastertools.github.io/treasure.html`,
    traits: {
        [`Worth`]: 10,
        [`Color`]: {
            name: `Banded Agate Colors`,
            ents: [`Brown`, `Blue`, `White`, `Red`],
        },
    },
    dsc: `Translucent striped color.`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isGemstone: true,
    },
})
drs[`Blue Quartz`] = new DR({
    name: `Blue Quartz`,
    href: `https://dungeonmastertools.github.io/treasure.html`,
    traits: {
        [`Worth`]: 10,
    },
    dsc: `Transparent pale blue.`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isGemstone: true,
    },
})
drs[`Eye Agate`] = new DR({
    name: `Eye Agate`,
    href: `https://dungeonmastertools.github.io/treasure.html`,
    traits: {
        [`Worth`]: 10,
        [`Color`]: {
            name: `Eye Agate Colors`,
            ents: [
                `Gray`,
                `White`,
                `Brown`,
                `Blue`,
                `Green`,
            ],
        }
    },
    dsc: `Translucent circles of gray, white, brown, blue, or green.`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isGemstone: true,
    },
})
drs[`Hematite`] = new DR({
    name: `Hematite`,
    href: `https://dungeonmastertools.github.io/treasure.html`,
    traits: {
        [`Worth`]: 10,
    },
    dsc: `Opaque gray-black.`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isGemstone: true,
    },
})
drs[`Lapis Lazuli`] = new DR({
    name: `Lapis Lazuli`,
    href: `https://dungeonmastertools.github.io/treasure.html`,
    traits: {
        [`Worth`]: 10,
    },
    dsc: `Opaque light and dark blue with yellow flecks.`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isGemstone: true,
    },
})
drs[`Malachite`] = new DR({
    name: `Malachite`,
    href: `https://dungeonmastertools.github.io/treasure.html`,
    traits: {
        [`Worth`]: 10,
    },
    dsc: `Opaque striated light and dark green.`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isGemstone: true,
    },
})
drs[`Moss Agate`] = new DR({
    name: `Moss Agate`,
    href: `https://dungeonmastertools.github.io/treasure.html`,
    traits: {
        [`Worth`]: 10,
        [`Color`]: {
            name: `Moss Agate Colors`,
            ents: [
                `Pink`,
                `Mossy Gray`,
            ],
        },
        [`Markings`]: {
            name: `Moss Agate Markings`,
            ents: [
                `Mossy Gray`,
                `Mossy Green`,
            ],
        },
    },
    dsc: `Translucent pink or yellow-white with mossy gray or green markings.`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isGemstone: true,
    },
})
drs[`Obsidian`] = new DR({
    name: `Obsidian`,
    href: `https://dungeonmastertools.github.io/treasure.html`,
    traits: {
        [`Worth`]: 10,
    },
    dsc: `Opaque black.`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isGemstone: true,
    },
})
drs[`Rhodochrosite`] = new DR({
    name: `Rhodochrosite`,
    href: `https://dungeonmastertools.github.io/treasure.html`,
    traits: {
        [`Worth`]: 10,
    },
    dsc: `Opaque light pink.`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isGemstone: true,
    },
})
drs[`Tiger Eye`] = new DR({
    name: `Tiger Eye`,
    href: `https://dungeonmastertools.github.io/treasure.html`,
    traits: {
        [`Worth`]: 10,
    },
    dsc: `Translucent brown with golden center.`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isGemstone: true,
    },
})
drs[`Turquoise`] = new DR({
    name: `Turquoise`,
    href: `https://dungeonmastertools.github.io/treasure.html`,
    traits: {
        [`Worth`]: 10,
    },
    dsc: `Opaque light blue-green.`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isGemstone: true,
    },
})
dts[`Colors`] = new DT({
    name: `Colors`,
    ents: [
        `Beige`,
        `Black`,
        `Blue`,
        `Gold`,
        `Grey`,
        `Olive`,
        `Orange`,
        `Red`,
        `Violet`,
        `White`,
        `Navy`,
        `Light Blue`,
    ],
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        areAdjs: true,
    },
})
dts[`Spell Scrolls Cantrip`] = new DT({
    name: `Spell Scrolls Cantrip`,
    ents: [
        drs[`Spell Scroll Cantrip: Acid Splash`],
        drs[`Spell Scroll Cantrip: Blade Ward`],
        drs[`Spell Scroll Cantrip: Chill Touch`],
        drs[`Spell Scroll Cantrip: Dancing Lights`],
        drs[`Spell Scroll Cantrip: Druidcraft`],
        drs[`Spell Scroll Cantrip: Eldritch Blast`],
        drs[`Spell Scroll Cantrip: Fire Bolt`],
        drs[`Spell Scroll Cantrip: Friends`],
        drs[`Spell Scroll Cantrip: Guidance`],
        drs[`Spell Scroll Cantrip: Light`],
        drs[`Spell Scroll Cantrip: Mage Hand`],
        drs[`Spell Scroll Cantrip: Mending`],
        drs[`Spell Scroll Cantrip: Message`],
        drs[`Spell Scroll Cantrip: Minor Illusion`],
        drs[`Spell Scroll Cantrip: Poison Spray`],
        drs[`Spell Scroll Cantrip: Prestidigitation`],
        drs[`Spell Scroll Cantrip: Produce Flame`],
        drs[`Spell Scroll Cantrip: Ray of Frost`],
        drs[`Spell Scroll Cantrip: Resistance`],
        drs[`Spell Scroll Cantrip: Sacred Flame`],
        drs[`Spell Scroll Cantrip: Shillelagh`],
        drs[`Spell Scroll Cantrip: Shocking Grasp`],
        drs[`Spell Scroll Cantrip: Spare the Dying`],
        drs[`Spell Scroll Cantrip: Thaumaturgy`],
        drs[`Spell Scroll Cantrip: Thorn Whip`],
        drs[`Spell Scroll Cantrip: True Strike`],
        drs[`Spell Scroll Cantrip: Vicious Mockery`],
    ],
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        areSpellScrollsCantrip: true,
    },
})
dts[`Magic Items A`] = new DT({
    name: `Magic Items A`,
    ents: [
        [drs[`Potion of Healing`], .5],
        [drs[`Potion of Climbing`], .1],
        [dts[`Spell Scrolls Cantrip`], .1],
        [drs[`Spell Scroll Lvl 1`], .2],
        [drs[`Spell Scroll Lvl 2`], .04],
        [drs[`Potion of Greater Healing`], .04],
        [drs[`Bag of Holding`], .01],
        [drs[`Drift Globe`], .01],
    ],
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        areMagicItems: true,
    },
})
dts[`10 GP Gemstones`] = new DT({
    name: `10 GP Gemstones`,
    ents: [
        drs[`Azurite`],
        drs[`Banded Agate`],
        drs[`Blue Quartz`],
        drs[`Eye Agate`],
        drs[`Hematite`],
        drs[`Lapis Lazuli`],
        drs[`Malachite`],
        drs[`Moss Agate`],
        drs[`Obsidian`],
        drs[`Rhodochrosite`],
        drs[`Tiger Eye`],
        drs[`Turquoise`],
    ],
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        areGemstones: true,
    }
})
drs[`Amulet`] = new DR({
    name: `Amulet`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Material`]: dts[`Materials`],
    },
})
drs[`Awl`] = new DR({
    name: `Awl`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Material`]: dts[`Materials`],
    },
})
drs[`Bandages`] = new DR({
    name: `Bandages`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Fabric`]: dts[`Fabric`],
    },
})
drs[`Bell, half dented`] = new DR({
    name: `Bell, half dented`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Fine Materials`]: dts[`Fine Materials`],
    },
})
drs[`Berries, handful`] = new DR({
    name: `Berries, handful`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Colors`]: dts[`Colors`],
    },
})
drs[`Bodily organ`] = new DR({
    name: `Bodily organ`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Bone from humanoid`] = new DR({
    name: `Bone from humanoid`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Bones`] = new DR({
    name: `Bones`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Creature`]: dts[`Creatures`],
    },
})
drs[`Book, ruined`] = new DR({
    name: `Book, ruined`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Bottle of sand`] = new DR({
    name: `Bottle of sand`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Bottle, glass`] = new DR({
    name: `Bottle, glass`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Bowl`] = new DR({
    name: `Bowl`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Color`]: dts[`Colors`],
        [`Material`]: dts[`Materials`],
    },
})
drs[`Small bracelet`] = new DR({
    name: `Small bracelet`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Fine Materials`]: dts[`Fine Materials`],
    },
})
drs[`Brush`] = new DR({
    name: `Brush`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Buttons`] = new DR({
    name: `Buttons`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Color`]: dts[`Colors`],
        [`Material`]: dts[`Materials`],
    },
})
drs[`Candle`] = new DR({
    name: `Candle`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Candle snuffer`] = new DR({
    name: `Candle snuffer`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Material`]: dts[`Materials`],
    },
})
drs[`Candlestick`] = new DR({
    name: `Candlestick`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Material`]: dts[`Materials`],
    },
})
drs[`Cane/ walking stick`] = new DR({
    name: `Cane/ walking stick`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Ceramic shards`] = new DR({
    name: `Ceramic shards`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Color`]: dts[`Colors`],
    },
})
drs[`Chalice`] = new DR({
    name: `Chalice`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Fine Materials`]: dts[`Fine Materials`],
    },
})
drs[`Charcoal`] = new DR({
    name: `Charcoal`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Chess piece`] = new DR({
    name: `Chess piece`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Material`]: dts[`Materials`],
        [`Color`]: dts[`Colors`],
    },
})
drs[`Cloak, ripped`] = new DR({
    name: `Cloak, ripped`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Fabric`]: dts[`Fabrics`],
    },
})
drs[`Cloth-of-gold vestments`] = new DR({
    name: `Cloth-of-gold vestments`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Coffer`] = new DR({
    name: `Coffer`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Creature`]: dts[`Creatures`],
        [`Symbol`]: dts[`Symbols`],
    },
})
drs[`Perfume`] = new DR({
    name: `Perfume`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Creature`]: dts[`Creatures`],
    },
})
drs[`Comb`] = new DR({
    name: `Comb`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Fine Materials`]: dts[`Fine Materials`],
    },
})
drs[`Cup`] = new DR({
    name: `Cup`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Material`]: dts[`Materials`],
    },
})
drs[`Diary`] = new DR({
    name: `Diary`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Dish`] = new DR({
    name: `Dish`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Material`]: dts[`Materials`],
    },
})
drs[`Dwarven doll`] = new DR({
    name: `Dwarven doll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Ear spoon`] = new DR({
    name: `Ear spoon`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Material`]: dts[`Materials`],
    },
})
drs[`Elvish doll`] = new DR({
    name: `Elvish doll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Ewer`] = new DR({
    name: `Ewer`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Material`]: dts[`Materials`],
    },
})
drs[`Fish, rotting`] = new DR({
    name: `Fish, rotting`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Color`]: dts[`Colors`],
    },
})
drs[`Tankard`] = new DR({
    name: `Tankard`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Material`]: dts[`Materials`],
    },
})
drs[`Flask/ jar`] = new DR({
    name: `Flask/ jar`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Food`] = new DR({
    name: `Food`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Fork`] = new DR({
    name: `Fork`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Material`]: dts[`Materials`],
    },
})
drs[`Gloves`] = new DR({
    name: `Gloves`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Grater`] = new DR({
    name: `Grater`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Hard tack biscuit`] = new DR({
    name: `Hard tack biscuit`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Horn, drinking`] = new DR({
    name: `Horn, drinking`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Hourglass`] = new DR({
    name: `Hourglass`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Human doll`] = new DR({
    name: `Human doll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Jug/ pitcher`] = new DR({
    name: `Jug/ pitcher`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Material`]: dts[`Materials`],
    },
})
drs[`Kettle`] = new DR({
    name: `Kettle`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Material`]: dts[`Materials`],
    },
})
drs[`Key`] = new DR({
    name: `Key`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Material`]: dts[`Materials`],
    },
})
drs[`Knife`] = new DR({
    name: `Knife`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Material`]: dts[`Materials`],
    },
})
drs[`Knucklebones/ dice`] = new DR({
    name: `Knucklebones/ dice`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Material`]: dts[`Materials`],
    },
})
drs[`Ladle`] = new DR({
    name: `Ladle`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Material`]: dts[`Materials`],
    },
})
drs[`Lamp/ lantern`] = new DR({
    name: `Lamp/ lantern`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Letter`] = new DR({
    name: `Letter`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Locket with portrait`] = new DR({
    name: `Locket with portrait`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Fine Materials`]: dts[`Fine Materials`],
    },
})
drs[`Mask`] = new DR({
    name: `Mask`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Fine Materials`]: dts[`Fine Materials`],
        [`Color`]: dts[`Colors`],
    },
})
drs[`Mirror with handle`] = new DR({
    name: `Mirror with handle`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Fine Materials`]: dts[`Fine Materials`],
    },
})
drs[`Mixed nuts, handful`] = new DR({
    name: `Mixed nuts, handful`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Mortar & pestle`] = new DR({
    name: `Mortar & pestle`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Necklace`] = new DR({
    name: `Necklace`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Creature`]: dts[`Creatures`],
    },
})
drs[`Needle(s)`] = new DR({
    name: `Needle(s)`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Oil, scented`] = new DR({
    name: `Oil, scented`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Color`]: dts[`Colors`],
    },
})
drs[`Pan`] = new DR({
    name: `Pan`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Material`]: dts[`Materials`],
    },
})
drs[`Parchment`] = new DR({
    name: `Parchment`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Pipe, musical`] = new DR({
    name: `Pipe, musical`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Color`]: dts[`Colors`],
    },
})
drs[`Pipe, smoking`] = new DR({
    name: `Pipe, smoking`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Material`]: dts[`Materials`],
        [`Color`]: dts[`Colors`],
    },
})
drs[`Saucer`] = new DR({
    name: `Saucer`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Material`]: dts[`Materials`],
    },
})
drs[`Poetry`] = new DR({
    name: `Poetry`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Pot`] = new DR({
    name: `Pot`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Material`]: dts[`Materials`],
    },
})
drs[`Empty pouch`] = new DR({
    name: `Empty pouch`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Fabric`]: dts[`Fabrics`],
    },
})
drs[`Powder puff`] = new DR({
    name: `Powder puff`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Quill`] = new DR({
    name: `Quill`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Rag`] = new DR({
    name: `Rag`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Fabric`]: dts[`Fabrics`],
    },
})
drs[`Razor`] = new DR({
    name: `Razor`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Rope, 10 ft`] = new DR({
    name: `Rope, 10 ft`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Salve/ unguent`] = new DR({
    name: `Salve/ unguent`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Color`]: dts[`Colors`],
    },
})
drs[`Scroll`] = new DR({
    name: `Scroll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Shaker`] = new DR({
    name: `Shaker`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Color`]: dts[`Colors`],
    },
})
drs[`Small wooden ball`] = new DR({
    name: `Small wooden ball`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Soap`] = new DR({
    name: `Soap`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Color`]: dts[`Colors`],
    },
})
drs[`Spoon`] = new DR({
    name: `Spoon`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Material`]: dts[`Materials`],
    },
})
drs[`Statuette`] = new DR({
    name: `Statuette`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Fine Materials`]: dts[`Fine Materials`],
    },
})
drs[`Stuffed creature`] = new DR({
    name: `Stuffed creature`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Creature`]: dts[`Creatures`],
    },
})
drs[`Stuffed creature, torn`] = new DR({
    name: `Stuffed creature, torn`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Creature`]: dts[`Creatures`],
    },
})
drs[`Tambourine`] = new DR({
    name: `Tambourine`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Teeth of a creature`] = new DR({
    name: `Teeth of a creature`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Creature`]: dts[`Creatures`],
    },
})
drs[`Tinderbox, flint & steel`] = new DR({
    name: `Tinderbox, flint & steel`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Tiefling doll`] = new DR({
    name: `Tiefling doll`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`To-do list`] = new DR({
    name: `To-do list`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Tureen`] = new DR({
    name: `Tureen`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Fine Materials`]: dts[`Fine Materials`],
    },
})
drs[`Twine`] = new DR({
    name: `Twine`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Vase`] = new DR({
    name: `Vase`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Fine Materials`]: dts[`Fine Materials`],
    },
})
drs[`Vial`] = new DR({
    name: `Vial`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Vial of ink`] = new DR({
    name: `Vial of ink`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
    traits: {
        [`Color`]: dts[`Colors`],
    },
})
drs[`Vial of cheap wine`] = new DR({
    name: `Vial of cheap wine`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Washcloth`] = new DR({
    name: `Washcloth`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Whetstone, worn`] = new DR({
    name: `Whetstone, worn`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Wig`] = new DR({
    name: `Wig`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Wool`] = new DR({
    name: `Wool`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
drs[`Yarn`] = new DR({
    name: `Yarn`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMundaneItem: true,
    },
})
dts[`Mundane Items`] = new DT({
    name: `Mundane Items`,
    ents: [
        drs[`Amulet`],
        drs[`Awl`],
        drs[`Bandages`],
        drs[`Bell, half dented`],
        drs[`Berries, handful`],
        drs[`Bodily organ`],
        drs[`Bone from humanoid`],
        drs[`Bones`],
        drs[`Book, ruined`],
        drs[`Bottle of sand`],
        drs[`Bottle, glass`],
        drs[`Bowl`],
        drs[`Small bracelet`],
        drs[`Brush`],
        drs[`Buttons`],
        drs[`Candle`],
        drs[`Candle snuffer`],
        drs[`Candlestick`],
        drs[`Cane/ walking stick`],
        drs[`Ceramic shards`],
        drs[`Chalice`],
        drs[`Charcoal`],
        drs[`Chess piece`],
        drs[`Cloak, ripped`],
        drs[`Cloth-of-gold vestments`],
        drs[`Coffer`],
        drs[`Perfume`],
        drs[`Comb`],
        drs[`Cup`],
        drs[`Diary`],
        drs[`Dish`],
        drs[`Dwarven doll`],
        drs[`Ear spoon`],
        drs[`Elvish doll`],
        drs[`Ewer`],
        drs[`Fish, rotting`],
        drs[`Tankard`],
        drs[`Flask/ jar`],
        drs[`Food`],
        drs[`Fork`],
        drs[`Gloves`],
        drs[`Grater`],
        drs[`Hard tack biscuit`],
        drs[`Horn, drinking`],
        drs[`Hourglass`],
        drs[`Human doll`],
        drs[`Jug/ pitcher`],
        drs[`Kettle`],
        drs[`Key`],
        drs[`Knife`],
        drs[`Knucklebones/ dice`],
        drs[`Ladle`],
        drs[`Lamp/ lantern`],
        drs[`Letter`],
        drs[`Locket with portrait`],
        drs[`Mask`],
        drs[`Mirror with handle`],
        drs[`Mixed nuts, handful`],
        drs[`Mortar & pestle`],
        drs[`Necklace`],
        drs[`Needle(s)`],
        drs[`Oil, scented`],
        drs[`Pan`],
        drs[`Parchment`],
        drs[`Pipe, musical`],
        drs[`Pipe, smoking`],
        drs[`Saucer`],
        drs[`Poetry`],
        drs[`Pot`],
        drs[`Empty pouch`],
        drs[`Powder puff`],
        drs[`Quill`],
        drs[`Rag`],
        drs[`Razor`],
        drs[`Rope, 10 ft`],
        drs[`Salve/ unguent`],
        drs[`Scroll`],
        drs[`Shaker`],
        drs[`Small wooden ball`],
        drs[`Soap`],
        drs[`Spoon`],
        drs[`Statuette`],
        drs[`Stuffed creature`],
        drs[`Stuffed creature, torn`],
        drs[`Tambourine`],
        drs[`Teeth of a creature`],
        drs[`Tinderbox, flint & steel`],
        drs[`Tiefling doll`],
        drs[`To-do list`],
        drs[`Tureen`],
        drs[`Twine`],
        drs[`Vase`],
        drs[`Vial`],
        drs[`Vial of ink`],
        drs[`Vial of cheap wine`],
        drs[`Washcloth`],
        drs[`Whetstone, worn`],
        drs[`Wig`],
        drs[`Wool`],
        drs[`Yarn`],
    ],
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        areMundaneItems: true,
    }
})
drs[`Club`] = new DR({
    name: `Club`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSimpleMeleeWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `1 sp`,
        [`Damage`]: `1d4 bludgeoning`,
        [`Weight`]: `2 lb.`,
        [`Properties`]: `Light`,
    },
})
drs[`Dagger`] = new DR({
    name: `Dagger`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSimpleMeleeWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `2 gp`,
        [`Damage`]: `1d4 piercing`,
        [`Weight`]: `1 lb.`,
        [`Properties`]: `Finesse, light, thrown (range 20/60)`,
    },
})
drs[`Greatclub`] = new DR({
    name: `Greatclub`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSimpleMeleeWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `2 sp`,
        [`Damage`]: `1d8 bludgeoning`,
        [`Weight`]: `10 lb.`,
        [`Properties`]: `Two-handed`,
    },
})
drs[`Handaxe`] = new DR({
    name: `Handaxe`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSimpleMeleeWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `5 gp`,
        [`Damage`]: `1d6 slashing`,
        [`Weight`]: `2 lb.`,
        [`Properties`]: `Light, thrown (range 20/60)`,
    },
})
drs[`Javelin`] = new DR({
    name: `Javelin`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSimpleMeleeWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `5 sp`,
        [`Damage`]: `1d6 piercing`,
        [`Weight`]: `2 lb.`,
        [`Properties`]: `Thrown (range 30/120)`,
    },
})
drs[`Light Hammer`] = new DR({
    name: `Light Hammer`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSimpleMeleeWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `2 sp`,
        [`Damage`]: `1d4 bludgeoning`,
        [`Weight`]: `2 lb.`,
        [`Properties`]: `Light, thrown (range 20/60)`,
    },
})
drs[`Mace`] = new DR({
    name: `Mace`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSimpleMeleeWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `5 gp`,
        [`Damage`]: `1d6 bludgeoning`,
        [`Weight`]: `4 lb.`,
        [`Properties`]: `-`,
    },
})
drs[`Quarterstaff`] = new DR({
    name: `Quarterstaff`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSimpleMeleeWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `2 sp`,
        [`Damage`]: `1d6 bludgeoning`,
        [`Weight`]: `4 lb.`,
        [`Properties`]: `Versatile (1d8)`,
    },
})
drs[`Sickle`] = new DR({
    name: `Sickle`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSimpleMeleeWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `1 gp`,
        [`Damage`]: `1d4 slashing`,
        [`Weight`]: `2 lb.`,
        [`Properties`]: `Light`,
    },
})
drs[`Spear`] = new DR({
    name: `Spear`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSimpleMeleeWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `1 gp`,
        [`Damage`]: `1d6 piercing`,
        [`Weight`]: `3 lb.`,
        [`Properties`]: `Thrown (range 20/60), versatile (1d8)`,
    },
})
drs[`Shortbow`] = new DR({
    name: `Shortbow`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSimpleRangedWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `25 gp`,
        [`Damage`]: `1d6 piercing`,
        [`Weight`]: `2 lb.`,
        [`Properties`]: `Ammunition (range 80/320), two-handed`,
    },
})
drs[`Sling`] = new DR({
    name: `Sling`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSimpleRangedWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `1 sp`,
        [`Damage`]: `1d4 bludgeoning`,
        [`Weight`]: `—`,
        [`Properties`]: `Ammunition (range 30/120)`,
    },
})
drs[`Dart`] = new DR({
    name: `Dart`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSimpleRangedWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `5 cp`,
        [`Damage`]: `1d4 piercing`,
        [`Weight`]: `¼ lb.`,
        [`Properties`]: `Finesse, thrown (range 20/60)`,
    },
})
drs[`Crossbow, Light`] = new DR({
    name: `Crossbow, Light`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isSimpleRangedWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `25 gp`,
        [`Damage`]: `1d8 piercing`,
        [`Weight`]: `5 lb.`,
        [`Properties`]: `Ammunition (range 80/320), loading, two-handed`,
    },
})
drs[`Battleaxe`] = new DR({
    name: `Battleaxe`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMartialWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `10 Gp`,
        [`Damage`]: `1D8 Slashing`,
        [`Weight`]: `4 Lbs`,
        [`Properties`]: `Versatile (1D10)`,
    },
})
drs[`Flail`] = new DR({
    name: `Flail`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMartialWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `10 Gp`,
        [`Damage`]: `1D8 Bludgeoning`,
        [`Weight`]: `2 Lbs`,
        [`Properties`]: `-`,
    },
})
drs[`Glaive`] = new DR({
    name: `Glaive`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMartialWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `20 Gp`,
        [`Damage`]: `1D10 Slashing`,
        [`Weight`]: `6 Lbs`,
        [`Properties`]: `Heavy, Reach, Two-Handed`,
    },
})
drs[`Greataxe`] = new DR({
    name: `Greataxe`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMartialWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `30 Gp`,
        [`Damage`]: `1D12 Slashing`,
        [`Weight`]: `7 Lbs`,
        [`Properties`]: `Heavy, Two-Handed`,
    },
})
drs[`Great-sword`] = new DR({
    name: `Great-sword`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMartialWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `50 Gp`,
        [`Damage`]: `2D6 Slashing`,
        [`Weight`]: `6 Lbs`,
        [`Properties`]: `Heavy, Two-Handed`,
    },
})
drs[`Halberd`] = new DR({
    name: `Halberd`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMartialWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `20 Gp`,
        [`Damage`]: `1D10 Slashing`,
        [`Weight`]: `6 Lbs`,
        [`Properties`]: `Heavy, Reach, Two-Handed`,			
    },
})
drs[`Lance`] = new DR({
    name: `Lance`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMartialWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `10 Gp`,
        [`Damage`]: `1D12 Piercing`,
        [`Weight`]: `6 Lbs`,
        [`Properties`]: `Reach, Special`,			
    },
})
drs[`Long-sword`] = new DR({
    name: `Long-sword`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMartialWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `15 Gp`,
        [`Damage`]: `1D8 Slashing`,
        [`Weight`]: `3 Lbs`,
        [`Properties`]: `Versatile (1D10)`,
    },
})
drs[`Maul`] = new DR({
    name: `Maul`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMartialWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `10 Gp`,
        [`Damage`]: `2D6 Bludgeoning`,
        [`Weight`]: `10 Lbs`,
        [`Properties`]: `Heavy, Two-Handed`,
    },
})
drs[`Morning-star`] = new DR({
    name: `Morning-star`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMartialWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `15 Gp`,
        [`Damage`]: `1D8 Piercing`,
        [`Weight`]: `4 lbs`,
        [`Properties`]: `-`,
    },
})  
drs[`Pike`] = new DR({
    name: `Pike`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMartialWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `5 Gp`,
        [`Damage`]: `1D10 Piercing`,
        [`Weight`]: `18 Lbs`,
        [`Properties`]: `Heavy, Reach, Two-Handed`,
    },
})
drs[`Rapier`] = new DR({
    name: `Rapier`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMartialWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `25 Gp`,
        [`Damage`]: `1D8 Piercing`,
        [`Weight`]: `2 Lbs`,
        [`Properties`]: `Finesse`,
    },
})
drs[`Scimitar`] = new DR({
    name: `Scimitar`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMartialWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `25 Gp`,
        [`Damage`]: `1D6 Slashing`,
        [`Weight`]: `3 Lbs`,
        [`Properties`]: `Finesse, Light`,
    },
})
drs[`Short-sword`] = new DR({
    name: `Short-sword`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMartialWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `10 Gp`,
        [`Damage`]: `1D6 Piercing`,
        [`Weight`]: `2 Lbs`,
        [`Properties`]: `Finesse, Light`,
    },
})
drs[`Trident`] = new DR({
    name: `Trident`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMartialWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `5 Gp`,
        [`Damage`]: `1D6 Piercing`,
        [`Weight`]: `4 Lbs`,
        [`Properties`]: `Thrown (20/60), Versatile (1D8)`,
    },
})
drs[`War pick`] = new DR({
    name: `War pick`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMartialWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `5 Gp`,
        [`Damage`]: `1D8 Piercing`,
        [`Weight`]: `2 Lbs`,
        [`Properties`]: `-`,
    },
})
drs[`War-hammer`] = new DR({
    name: `War-hammer`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMartialWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `15 Gp`,
        [`Damage`]: `1D8 Bludgeoning`,
        [`Weight`]: `2 Lbs`,
        [`Properties`]: `Versatile (1D10)`,
    },
})
drs[`Whip`] = new DR({
    name: `Whip`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMartialWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `2 Gp`,
        [`Damage`]: `1D4 Slashing`,
        [`Weight`]: `3 Lbs`,
        [`Properties`]: `Finesse, Reach`,
    },
})
dts[`Martial Melee Weapons`] = new DT({
    name: `Martial Melee Weapons`,
    ents: [
        drs[`Battleaxe`],
        drs[`Flail`],
        drs[`Glaive`],
        drs[`Greataxe`],
        drs[`Great-sword`],
        drs[`Halberd`],
        drs[`Lance`],
        drs[`Long-sword`],
        drs[`Maul`],
        drs[`Morning-star`],
        drs[`Pike`],
        drs[`Rapier`],
        drs[`Scimitar`],
        drs[`Short-sword`],
        drs[`Trident`],
        drs[`War pick`],
        drs[`War-hammer`],
        drs[`Whip`],
    ],
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        areMartialMeleeWeapons: true,
    }
})
drs[`Blowgun`] = new DR({
    name: `Blowgun`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMartialRangedWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `10 gp`,
        [`Damage`]: `1 piercing`,
        [`Weight`]: `1 lb.`,
        [`Properties`]: `Ammunition (range 25/100), loading`,
    },
})
drs[`Crossbow, hand`] = new DR({
    name: `Crossbow, hand`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMartialRangedWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `75 gp`,
        [`Damage`]: `1d6 piercing`,
        [`Weight`]: `3 lb.`,
        [`Properties`]: `Ammunition (range 30/120), light, loading`,
    },
})
drs[`Crossbow, heavy`] = new DR({
    name: `Crossbow, heavy`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMartialRangedWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `50 gp`,
        [`Damage`]: `1d10 piercing`,
        [`Weight`]: `18 lb.`,
        [`Properties`]: `Ammunition (range 100/400), heavy, loading, two-handed`,
    },
})
drs[`Longbow`] = new DR({
    name: `Longbow`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMartialRangedWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `50 gp`,
        [`Damage`]: `1d8 piercing`,
        [`Weight`]: `2 lb.`,
        [`Properties`]: `Ammunition (range 150/600), heavy, two-handed`,
    },
})
drs[`Net`] = new DR({
    name: `Net`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isMartialRangedWeapon: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Worth`]: `1 gp`,
        [`Damage`]: `—`,
        [`Weight`]: `3 lb.`,
        [`Properties`]: `Special, thrown (range 5/15)`,
    },
})
drs[`Arrows`] = new DR({
    name: `Arrows`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isAmmunition: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Quantity`]: 20,
        [`Worth`]: `1 gp`,
        [`Weight`]: `1 lb.`,
    },
})
drs[`Blowgun Needles`] = new DR({
    name: `Blowgun Needles`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isAmmunition: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Quantity`]: 50,
        [`Worth`]: `1 gp`,
        [`Weight`]: `1 lb.`,
    },
})
drs[`Crossbow Bolts`] = new DR({
    name: `Crossbow Bolts`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isAmmunition: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Quantity`]: 20,
        [`Worth`]: `1 gp`,
        [`Weight`]: `1.5 lb.`,
    },
})
drs[`Sling Bullets`] = new DR({
    name: `Sling Bullets`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        isAmmunition: true,
    },
    traits: {
        [`Condition`]: dts[`Conditions`],
        [`Quantity`]: 20,
        [`Worth`]: `4 cp`,
        [`Weight`]: `1.5 lb.`,
    },
})
dts[`Ammunition`] = new DT({
    name: `Ammunition`,
    ents: [
        [drs[`Arrows`], .7],
        [drs[`Blowgun Needles`], .1],
        [drs[`Crossbow Bolts`], .1],
        [drs[`Sling Bullets`], .1],
    ],
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        areAmmunition: true,
    },
})
dts[`Martial Ranged Weapons`] = new DT({
    name: `Martial Ranged Weapons`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        areMartialRangedWeapons: true,
    },
    ents: [
        drs[`Blowgun`],
        drs[`Crossbow, hand`],
        drs[`Crossbow, heavy`],
        drs[`Longbow`],
        drs[`Net`],
    ],
})
dts[`Simple Ranged Weapons`] = new DT({
    name: `Simple Ranged Weapons`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        areSimpleRangedWeapons: true,
    },
    ents: [
        [drs[`Shortbow`], .25],
        [drs[`Sling`], .25],
        [drs[`Dart`], .25],
        [drs[`Crossbow, Light`], .25],
    ],
})
dts[`Simple Melee Weapons`] = new DT({
    name: `Simple Melee Weapons`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        areSimpleMeleeWeapons: true,
    },
    ents: [
        [drs[`Club`], .1],
        [drs[`Dagger`], .1],
        [drs[`Greatclub`], .1],
        [drs[`Handaxe`], .1],
        [drs[`Javelin`], .1],
        [drs[`Light Hammer`], .1],
        [drs[`Mace`], .1],
        [drs[`Quarterstaff`], .1],
        [drs[`Sickle`], .1],
        [drs[`Spear`], .1],
    ],
})
dts[`Loot Weapons`] = new DT({
    name: `Loot Weapons`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        areWeapons: true,
    },
    ents: [
        [dts[`Ammunition`], .4],
        [dts[`Simple Melee Weapons`] , .3],
        [dts[`Simple Ranged Weapons`], .25],
        [dts[`Martial Ranged Weapons`], .05],
    ],
})
dts[`Magic Items B`] = new DT({
    name: `Magic Items B`,
    tags: {
        user: null,
        source: {
            name: `D&D 5e`,
            href: null,
        },
        areMagicItems: true,
    },
    ents: [
        [`Potion of greater healing`, 15],
        [`Potion of fire breath`, 7],
        [`Potion of resistance`, 7],
        [`Ammunition, +1`, 5],
        [`Potion of animal friendship`, 5],
        [`Potion of hill giant strength`, 5],
        [`Potion of growth`, 5],
        [`Potion of water breathing`, 5],
        [`Spell scroll (2nd level)`, 5],
        [`Spell scroll (3rd level)`, 5],
        [`Bag of holding`, 3],
        [`Keoghtom's ointment`, 3],
        [`Oil of slipperiness`, 3],
        [`Dust of disappearance`, 2],
        [`Dust of dryness`, 2],
        [`Dust of sneezing and choking`, 2],
        [`Elemental gem`, 2],
        [`Philter of love`, 2],
        [`Alchemy jug`, 1],
        [`Cap of water breathing`, 1],
        [`Cloak of the manta ray`, 1],
        [`Driftglobe`, 1],
        [`Goggles of night`, 1],
        [`Helm of comprehending languages`, 1],
        [`Immovable rod`, 1],
        [`Lantern of revealing`, 1],
        [`Mariner's armor`, 1],
        [`Mithral armor`, 1],
        [`Potion of poison`, 1],
        [`Ring of swimming`, 1],
        [`Robe of useful items`, 1],
        [`Rope of climbing`, 1],
        [`Saddle of the cavalier`, 1],
        [`Wand of magic detection`, 1],
        [`Wand of secrets`, 1],
    ],
})
dts[`Chest`] = new DT({
    name: `Chest`,
    ents: [
        [dts[`Mundane Items`], .46],
        [dts[`Loot Weapons`], .17],
        [dts[`Magic Items A`], .16],
        [dts[`10 GP Gemstones`], .195],
        [dts[`Magic Items B`], .01],
        [`Magic Item C`, .005],
    ],
    tags: {
        user: null,
        source: {
            name: `DungeonTables`,
            href: null,
        },
        areLoot: true,
    },
})
dts[`NPC`] = new DT({
    name: `NPC`,
    ents: [
        [dts[`Mundane Items`], .46],
        [dts[`Magic Items A`], .16],
        [dts[`10 GP Gemstones`], .195],
        [dts[`Magic Items B`], .01],
    ],
    tags: {
        user: null,
        source: {
            name: `DungeonTables`,
            href: null,
        },
        areLoot: true,
    },
})
const loadHeaderAndFooter = () => {
    $(function(){
        $(`#header`).load(`dgt-header.html`); 
        $(`footer`).load(`dgt-footer.html`); 
    });
}
const dspRst = rstPath => {
    const rst = rstPath[rstPath.length - 1];
    ctrs.sdtRowCtr = 0;
    const rstHTML = rtnRstHTML(rst);
    dspRstInRstCont(rstHTML);
    const rstName = rstHTML[0].html();
    dspRstInHistory(rst, rstName);
    hltRstInSDT(rstPath);
}
const hltRstInSDT = rstPath => {
    for (const branch in rstPath) {
        $(`#sdt table tbody tr td.name`).each(function () {
            if (rstPath[branch].name === $(this).html()) {
                highlightEnt($(this).parent());
            }
        })
    }
}
const rtnRstHTML = rst => {
    const rstName = rtnRstName(rst);
    const rstDsc = rtnRstDsc(rst);
    const rstTraitTable = rtnTraitTable(rst);
    return [rstName, rstDsc, rstTraitTable];
}
const dspRstInRstCont = rstHTML => {
    $(`#rst`).html(rstHTML);
}
const dspRstInHistory = (rst, rstName) => {
    const rstEntSpan = $(`<span class="history-ent"></span>`).html(rstName);
    $(`#history`).append(rstEntSpan);
    const rstHTML = rtnRstHTML(rst);
    rstEntSpan.click(function() { dspRstInRstCont(rstHTML); });
    (u.isEven(ctrs.historyCtr)) ? rstEntSpan.addClass(`tr-dark`) : rstEntSpan.addClass(`tr-light`);
    ctrs.historyCtr++;
}
const rtnRstName = rst => {
    let rstName;
    if (u.isStr(rst)) {
        const rstCapitalFirstLetter = u.capitalizeFirstLetter(rst);
        rstName = $(`<h4 id="rst-name" target="_blank"></h4>`).html(rstCapitalFirstLetter);
    } else rstName = $(`<h4 id="rst-name" target="_blank"></h4>`).html(rst.name).attr(`href`, rst.href);
    return rstName;
}
const rtnRstDsc = rst => $(`<p id="rst-dsc"></p>`).html(rst.dsc);
const rtnTraitTable = rst => {
    let traitCtr = 0;
    const rstTraitTable = $(`<table id="trait-table"></table>`);
    for (const trait in rst.traits) {
        const traitRow = $(`<tr></tr>`);
        const traitKey = $(`<th></th>`).html(trait);
        const traitVal = $(`<td class="overflow-wrap-hack"></td>`).html(rst.traits[trait]);
        traitRow.append(traitKey, traitVal);
        (u.isEven(traitCtr)) ? traitRow.addClass(`tr-dark`) : traitRow.addClass(`tr-light`);
        rstTraitTable.append(traitRow);
        traitCtr++;
    }
    return rstTraitTable;
}
const cfgFilterCheckboxes = () => {
    $.each($(`.filter-checkbox`), function() {
        $(this).change(function() {
            genFDTS();
        });
    });
}
const genFDTS = () => {
    const fdts = rtnFDTS(dts);
    const fdtsHTML = asbFDTS(fdts);
    intFDTS(fdtsHTML);
    cfgFDTS();
}
const asbFDTS = fdts => {
    const table = $(`<table></table>`);
    const thead = asbFDTSthead();
    const tbody = asbFDTStbody(fdts);
    const tfoot = asbFDTStfoot();
    table.append(thead, tbody, tfoot);
    return table;
}
const intFDTS = fdtsHTML => $(`#fdts`).html(fdtsHTML);
const cfgFDTS = () => {
    altTRS($(`#fdts table tbody tr`));
    $(`#fdts table tbody tr`).on(`click`, function() { handleRst($(this)); });
}
const rtnFDTS = dts => {
    const dtsCln = u.rtnObjDeepCopy(dts);
    for (const dt in dtsCln) {
        let matches = [];
        let isMatch;
        $(`.filter-checkbox`).each(function() {
            const checkboxVal = $(this).val();
            const isChecked = $(this).is(`:checked`);
            !isChecked || (isChecked && !dtsCln[dt].tags[checkboxVal]) ? isMatch = false : isMatch = true;
            matches = [...matches, isMatch];
        });
        if (!matches.includes(true)) delete dtsCln[dt];
    }
    return dtsCln;
}
const asbFDTSthead = () => {
    const thead = $(`<thead></thead>`);
    const tr = $(`<tr></tr>`);
    const th = $(`<th></th>`).html(`Select a Table`);
    tr.append(th).appendTo(thead);
    return thead;
}
const asbFDTStbody = fdts => {
    const tbody = $(`<tbody></tbody>`);
    for (const fdt in fdts) {
        const tr = $(`<tr></tr>`);
        const th = $(`<th class="fdt-th" id="tr-th"></th>`).html(fdt);
        tr.append(th).appendTo(tbody);
    }
    return tbody;
}
const asbFDTStfoot = () => {
    const tfoot = $(`<tfoot id="fdt-tfoot"></tfoot>`);
    return tfoot;
}
const handleRst = fdtSlct => {
    $(`#selected-table-cont h4`).css(`visibility`, `visible`);
    const sdt = rtnSDTFrmFDTslct(fdtSlct, dts);
    genSDT(sdt);
    const rstPath = sdt.rstPath();
    dspRst(rstPath);
    u.scrollBottom(document.querySelector(`#history`)); 
    hltFDTslct(fdtSlct);
}
const hltFDTslct = fdtSlct => {
    $(`#fdts tr`).removeClass(`selected`);
    fdtSlct.addClass(`selected`);
}
const highlightEnt = ent => {
    $(`#sdt table tbody tr`).removeClass(`selected`);
    ent.addClass(`selected`);
}
const rtnSDTFrmFDTslct = (fdtSlct, dts) => {
    for (const dt in dts) {
        if (fdtSlct.children(`th`).html() !== dt) continue;
        const sdt = dts[dt];
        return sdt;
    }
}
const genSDT = sdt => {
    const sdtHTML = asbDT(sdt);
    intSDT(sdtHTML);
    cfgDT(sdt, genSDT);
}
const intSDT = sdtHTML => $(`#sdt`).html(sdtHTML);
const cfgDT = (dt, genDTfn, genDTfnArg = dt) => {
    altTRS($(`table.dt tbody tr`));
    $(`.tri`).children()
        .hover(function () { $(this).css(`cursor`, `pointer`); })
        .click(function() {
            togDTstr($(this).parent().parent(), dt);
            genDTfn(genDTfnArg);
        });
}
const asbDT = dt => {
    const table = $(`<table class="dt"></table>`);
    const thead = asbDTthead(dt);
    const tbody = asbDTtbody(dt);
    const tfoot = asbDTtfoot();
    table.append(thead, tbody, tfoot);
    return table;
}
const asbDTtbody = (sdt) => {
    const tbody = $(`<tbody></tbody>`);
    const dtTbodyTRS = asbDTtbodyTRS(sdt);
    tbody.append(dtTbodyTRS);
    return tbody;
}
const asbDTthead = sdt => {
    const thead = $(`<thead></thead`);
    const trThead = $(`<tr></tr>`)
    const thName = $(`<th class="name" colspan=2></th>`).html(sdt.name);
    const thPct = $(`<th class="pct"></th>`);
    trThead.append(thName, thPct).appendTo(thead);
    return thead;
}
const asbDTtbodyTRS = (dtObj, dtObjs = []) => {
    if (!dtObjs.length) dtObjs = [...dtObjs, dtObj];
    const indentUnit = 20;
    const indent = indentUnit * (dtObjs.length - 1);
    let trs = [];
    for (const ent in dtObj.ents) {
        let name = dtObj.ents[ent][0].name || dtObj.ents[ent][0];
        const pctDec = dtObj.ents[ent][1];
        const pct = u.rtnPctStrFrmPctDec(pctDec);
        const tr = $(`<tr></tr>`);
        const tdTri = $(`<td class="tri"></td>`);
        const triRt = $(`<div class="rt"></td>`).css(`left`, `${indent}px`);
        const triDn = $(`<div class="dn"></td>`).css(`display`, `none`).css(`left`, `${indent}px`);
        const tdName = $(`<td class="name"></td>`).html(name).css(`text-indent`, `${indent}px`);
        const tdPct = $(`<td class="pct"></td>`).html(pct).css(`text-indent`, `${indent}px`);
        tr.append(tdTri, tdName, tdPct);
        trs = [...trs, tr];
        if (dtMethods.isTable(dtObj.ents[ent][0])) {
            tdTri.append(triRt, triDn);
            if (dts[dtObj.ents[ent][0].name].isExp) {
                triRt.css(`display`, `none`);
                triDn.css(`display`, `inline`);
                dtObjs = [...dtObjs, dts[dtObj.ents[ent][0].name]];
                const expandedTRS = asbDTtbodyTRS(dtObjs[dtObjs.length - 1], dtObjs);
                for (let i = 0; i < expandedTRS.length; i++) trs = [...trs, expandedTRS[i]];
            }
        }
    }
    return trs;
}
const togDTstr = (str) => {
    const dtName = str.children(`.name`).html();
    for (const dt in dts) {
        if (dts[dt].name !== dtName) continue;
        dts[dt].isExp ? dts[dt].isExp = false : dts[dt].isExp = true;
        return;
    }
}
const altTRS = tableRows => {
    let tableRowCtr = 0;
    $(tableRows).each(function() {
        $(this).removeClass(`tr-light`).removeClass(`tr-dark`);
        (u.isEven(tableRowCtr)) ? $(this).addClass(`tr-light`) : $(this).addClass(`tr-dark`);
        tableRowCtr++;
    })
}
const asbDTtfoot = () => {
    const tfoot = $(`<tfoot></tfoot`);
    const tr = $(`<tr></tr>`);
    const td = $(`<td colspan=3></td>`);
    tr.append(td).appendTo(tfoot);
    return tfoot;
}
const genBDTS = (dts) => {
    const bdtsHTML = asbBDTS(dts);
    intBDTS(bdtsHTML);
    cfgDT(dts, genBDTS);
}
const asbBDTS = (dts) => {
    let bdtsTables = [];
    for (const dt in dts) {
        const bdtTable = asbDT(dts[dt]);
        bdtsTables = [...bdtsTables, bdtTable];
    }
    return bdtsTables;
}
const intBDTS = (bdtsHTML) => {
    $(`#bdts`).html(bdtsHTML);
}
$(document).ready(function() {
    loadHeaderAndFooter();
    const currentPage = $(`.current-page`).html();
    if (currentPage === `Random Generator`) {
        genFDTS();
        cfgFilterCheckboxes();
    } else if (currentPage === `Browse Tables`) {
        genBDTS(dts);
    }
});