import {u} from "../eartrainplus.net/utils.js";

$(document).ready(function() {
    dTables.gemstoneSizes = {
        name:  `Gemstone Sizes`,
        ents: [
            `marble`,
            `golfball`,
            `baseball`,
        ],
    };
    dTables.colors = {
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
    };
    dTables.spellScrollsCantrip = {
        name: `Spell Scrolls Cantrip`,
        ents: [
            eqps.spellScrollCantripAcidSplash,
            eqps.spellScrollCantripBladeWard,
            eqps.spellScrollCantripChillTouch,
            eqps.spellScrollCantripDancingLights,
            eqps.spellScrollCantripDruidcraft,
            eqps.spellScrollCantripEldritchBlast,
            eqps.spellScrollCantripFireBolt,
            eqps.spellScrollCantripFriends,
            eqps.spellScrollCantripGuidance,
            eqps.spellScrollCantripLight,
            eqps.spellScrollCantripMageHand,
            eqps.spellScrollCantripMending,
            eqps.spellScrollCantripMessage,
            eqps.spellScrollCantripMinorIllusion,
            eqps.spellScrollCantripPoisonSpray,
            eqps.spellScrollCantripPrestidigitation,
            eqps.spellScrollCantripProduceFlame,
            eqps.spellScrollCantripRayOfFrost,
            eqps.spellScrollCantripResistance,
            eqps.spellScrollCantripSacredFlame,
            eqps.spellScrollCantripShillelagh,
            eqps.spellScrollCantripShockingGrasp,
            eqps.spellScrollCantripSpareTheDying,
            eqps.spellScrollCantripThaumaturgy,
            eqps.spellScrollCantripThornWhip,
            eqps.spellScrollCantripTrueStrike,
            eqps.spellScrollCantripViciousMockery,
        ],
    };
    dTables.magicItemsA = {
        name: `Magic Items A`,
        ents: [
            [eqps.potionOfHealing, .5],
            [eqps.potionOfClimbing, .1],
            [dTables.spellScrollsCantrip, .1],
            [eqps.spellScrollLvl1, .2],
            [eqps.spellScrollLvl2, .04],
            [eqps.potionOfGreaterHealing, .04],
            [eqps.bagOfHolding, .01],
            [eqps.driftGlobe, .01],
        ],
    };
    dTables.gemstones10Gp = {
        name: `10 GP Gemstones`,
        ents: [
            eqps.azurite,
            eqps.bandedAgate,
            eqps.blueQuartz,
            eqps.eyeAgate,
            eqps.hematite,
            eqps.lapisLazuli,
            eqps.malachite,
            eqps.mossAgate,
            eqps.obsidian,
            eqps.rhodochrosite,
            eqps.tigerEye,
            eqps.turquoise,
        ],
    };
    loadHeaderAndFooter();
    const currentPage = $(`h2`).html();
    if (currentPage === `Loot Generator`) {
        cfgLootGenerator();
    }
});
const dTables = {};
const cfgLootGenerator = () => {
    u.popSelectFieldFromObjWithNamedEnts($('#select-srcs'), srcs);
    cfgGenLootBtn();
}
const loadHeaderAndFooter = () => {
    $(function(){
        $(`#header`).load(`dgt-header.html`); 
        $(`#footer`).load(`dgt-footer.html`); 
    });
}
const cfgGenLootBtn = () => {
    $(`#generate-loot`).click(function() {
        for (const src in srcs) {
            if ($(`#select-srcs`).val() !== src) continue;
            const loot = rtnLootFrmSrc(srcs[src], dTables);
            genLoot(loot);
            u.scrollBottom(document.querySelector(`#loot-log`));
        }
    });
}
const genLoot = loot => {
    console.log(loot);
    $(`#loot`).html(loot.name).attr(`href`, loot.href);
    genLootDescription(loot);
    genLootAtrs(loot);
    $(`#loot-log`)
        .append(
            $(`<a id="loot-ent" target="_blank"></a>`).html(loot.name).attr(`href`, loot.href)
            ).append(`<br>`);
    }
    const genLootDescription = loot => {
        $(`#description`).html(loot.description);
    }
    const genLootAtrs = loot => {
    for (const atr in loot.atrs) {
        $(`#atrs`)
            .html(
                $(`<p id="atr-key"></p>`).html(atr)
            ).append(
                $(`<p id="atr-val"></p>`).html(loot.atrs[atr])
            );
    }
}
const eqps = {
    potionOfHealing: {
        name: `Potion of Healing`,
        href: `https://www.aidedd.org/dnd/om.php?vo=potion-of-healing`,
    },
    potionOfClimbing: {
        name: `Potion of Climbing`,
        href: `https://www.aidedd.org/dnd/om.php?vo=potion-of-climbing`,
    },
    spellScrollCantripAcidSplash: {
        name: `Spell Scroll Cantrip: Acid Splash`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripBladeWard: {
        name: `Spell Scroll Cantrip: Blade Ward`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripChillTouch: {
        name: `Spell Scroll Cantrip: Chill Touch`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripDancingLights: {
        name: `Spell Scroll Cantrip: Dancing Lights`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripDruidcraft: {
        name: `Spell Scroll Cantrip: Druidcraft`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripEldritchBlast: {
        name: `Spell Scroll Cantrip: Eldritch Blast`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripFireBolt: {
        name: `Spell Scroll Cantrip: Fire Bolt`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripFriends: {
        name: `Spell Scroll Cantrip: Friends`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripGuidance: {
        name: `Spell Scroll Cantrip: Guidance`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripLight: {
        name: `Spell Scroll Cantrip: Light`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripMageHand: {
        name: `Spell Scroll Cantrip: Mage Hand`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripMending: {
        name: `Spell Scroll Cantrip: Mending`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripMessage: {
        name: `Spell Scroll Cantrip: Message`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripMinorIllusion: {
        name: `Spell Scroll Cantrip: Minor Illusion`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripPoisonSpray: {
        name: `Spell Scroll Cantrip: Poison Spray`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripPrestidigitation: {
        name: `Spell Scroll Cantrip: Prestidigitation`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripProduceFlame: {
        name: `Spell Scroll Cantrip: Produce Flame`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripRayOfFrost: {
        name: `Spell Scroll Cantrip: Ray of Frost`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripResistance: {
        name: `Spell Scroll Cantrip: Resistance`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripSacredFlame: {
        name: `Spell Scroll Cantrip: Sacred Flame`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripShillelagh: {
        name: `Spell Scroll Cantrip: Shillelagh`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripShockingGrasp: {
        name: `Spell Scroll Cantrip: Shocking Grasp`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripSpareTheDying: {
        name: `Spell Scroll Cantrip: Spare the Dying`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripThaumaturgy: {
        name: `Spell Scroll Cantrip: Thaumaturgy`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripThornWhip: {
        name: `Spell Scroll Cantrip: Thorn Whip`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripTrueStrike: {
        name: `Spell Scroll Cantrip: True Strike`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollCantripViciousMockery: {
        name: `Spell Scroll Cantrip: Vicious Mockery`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollLvl1: {
        name: `Spell Scroll Lvl 1`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    spellScrollLvl2: {
        name: `Spell Scroll Lvl 2`,
        href: `https://www.aidedd.org/dnd/om.php?vo=spell-scroll`,
    },
    potionOfGreaterHealing: {
        name: `Potion of Greater Healing`,
        href: `https://www.aidedd.org/dnd/om.php?vo=potion-of-healing`,
    },
    bagOfHolding: {
        name: `Bag of Holding`,
        href: `https://www.aidedd.org/dnd/om.php?vo=bag-of-holding`,
    },
    driftGlobe: {
        name: `Drift Globe`,
        href: `https://www.aidedd.org/dnd/om.php?vo=driftglobe`,
    },
    azurite: {
        name: `Azurite`,
        href: `https://dungeonmastertools.github.io/treasure.html`,
        atrs: {
            worth: 10,
            size: dTables.gemstoneSizes,
        },
        description: `opaque mottled deep blue`,
    },
    bandedAgate: {
        name: `Banded Agate`,
        href: `https://dungeonmastertools.github.io/treasure.html`,
        atrs: {
            worth: 10,
            color: {
                name: `Banded Agate Colors`,
                ents: [`Brown`, `Blue`, `White`, `Red`, ],
            },
            size: dTables.gemstoneSizes,
        },
        description: `translucent striped color`,
    },
    blueQuartz: {
        name: `Blue Quartz`,
        href: `https://dungeonmastertools.github.io/treasure.html`,
        atrs: {
            worth: 10,
            size: dTables.gemstoneSizes,
        },
        description: `transparent pale blue`,
    },
    eyeAgate: {
        name: `Eye Agate`,
        href: `https://dungeonmastertools.github.io/treasure.html`,
        atrs: {
            worth: 10,
            size: dTables.gemstoneSizes,
            color: {
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
        description: `translucent circles of gray, white, brown, blue, or green`,
    },
    hematite: {
        name: `Hematite`,
        href: `https://dungeonmastertools.github.io/treasure.html`,
        atrs: {
            worth: 10,
            size: dTables.gemstoneSizes,
        },
        description: `opaque gray-black`,
    },
    lapisLazuli: {
        name: `Lapis Lazuli`,
        href: `https://dungeonmastertools.github.io/treasure.html`,
        atrs: {
            worth: 10,
            size: dTables.gemstoneSizes,
        },
        description: `opaque light and dark blue with yellow flecks`,
    },
    malachite: {
        name: `Malachite`,
        href: `https://dungeonmastertools.github.io/treasure.html`,
        atrs: {
            worth: 10,
            size: dTables.gemstoneSizes,
        },
        description: `opaque striated light and dark green`,
    },
    mossAgate: {
        name: `Moss Agate`,
        href: `https://dungeonmastertools.github.io/treasure.html`,
        atrs: {
            worth: 10,
            size: dTables.gemstoneSizes,
            color: {
                name: `Moss Agate Colors`,
                ents: [
                    `Pink`,
                    `Mossy Gray`,
                ],
            },
            markings: {
                name: `Moss Agate Markings`,
                ents: [
                    `Mossy Gray`,
                    `Mossy Green`,
                ],
            },
        },
        description: `translucent pink or yellow-white with mossy gray or green markings`,
    },
    obsidian: {
        name: `Obsidian`,
        href: `https://dungeonmastertools.github.io/treasure.html`,
        atrs: {
            worth: 10,
            size: dTables.gemstoneSizes,
        },
        description: `opaque black`,
    },
    rhodochrosite: {
        name: `Rhodochrosite`,
        href: `https://dungeonmastertools.github.io/treasure.html`,
        atrs: {
            worth: 10,
            size: dTables.gemstoneSizes,
        },
        description: `opaque light pink`,
    },
    tigerEye: {
        name: `Tiger Eye`,
        href: `https://dungeonmastertools.github.io/treasure.html`,
        atrs: {
            worth: 10,
            size: dTables.gemstoneSizes,
        },
        description: `translucent brown with golden center`,
    },
    turquoise: {
        name: `Turquoise `,
        href: `https://dungeonmastertools.github.io/treasure.html`,
        atrs: {
            worth: 10,
            size: dTables.gemstoneSizes,
        },
        description: `opaque light blue-green`,
    },
}
const srcs = {
    barrel: {
        name: `Barrel`,
        dTable: `gemstones10Gp`, // placeholder
    },
    chest: {
        name: `Chest`,
        dTable: `magicItemsA`, // placeholder
    },
    cupboard: {
        name: `Cupboard`,
        dTable: `magicItemsA`, // placeholder
    },
    gemstones10GP: {
        name: `Box of 10 GP Gemstones`,
        dTable: `gemstones10Gp`,
    },
}
const rtnLootFrmSrc = (src, pools) => {
    for (const pool in pools) {
        if (pool !== src.dTable) continue;
        const ent = u.rtnEntFrmNestedPools(pools[pool]);
        const entCopy = u.rtnObjDeepCopy(ent);
        const loot = u.rtnEntWithRndAtrs(entCopy);
        return loot;
    }
}

// notes: