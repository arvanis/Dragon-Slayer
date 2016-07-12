$(document).ready(function() {

    
// Postacie i ekwipunek
    
    function character(str, dex, hp, def) {
        this.strength = str;
        this.dexterity = dex;
        this.healthPoints = hp * 10;
        this.defence = def;
    };
    
    
    // Postacie
    
    var barbarian = new character(50, 25, 25, 0),
        knight = new character(35, 25, 40, 5),
        rogue = new character(25, 50, 25, 3),
        dragon = new character(100, 40, 100, 10);
    
    
    
// Wybór postaci
    var hero = $("input[type=radio]"),
        str = 0,
        dex = 0,
        hp = 0,
        def = 0;
    
    hero.on("change", function() {
        var choosenOne = $(this).val();
        console.log(choosenOne);
        
        if ( choosenOne == "barbarian" ) {
            str = barbarian.strength;
            dex = barbarian.dexterity;
            hp = barbarian.healthPoints;
            def = barbarian.defence;
            
            console.log ("brb: " + str + " " + dex + " " + hp + " " + def);
        }
        else if ( choosenOne == "knight" ) {
            str = knight.strength;
            dex = knight.dexterity;
            hp = knight.healthPoints;
            def = knight.defence;
            
            console.log ("knight: " + str + " " + dex + " " + hp + " " + def);
        }
        else if ( choosenOne == "rogue" ) {
            str = rogue.strength;
            dex = rogue.dexterity;
            hp = rogue.healthPoints;
            def = rogue.defence;
            
            console.log ("rogue: " + str + " " + dex + " " + hp + " " + def);
        };
        
    });
    
    
// Silnik walki
    var attack = $(".crosshair"),
        dragonHp = dragon.healthPoints;
    
    attack.on("click", function() {                
        var dexDuel = dex - dragon.dexterity,
            chanceBonus = (dexDuel/100) * $(this).data("chance"),
            hit = chanceBonus + $(this).data("chance");
        
        var luck = Math.random();
        
        console.log (hit + " " + luck + " " + $(this).data("chance"));
        
        if ( hit > luck ) {
            var damage = (str + (Math.floor(luck * 10)) - def) * $(this).data("points");
            
            dragonHp -= damage;    
            console.log("Trafiłeś: " + damage + ". Smokowi zostało jeszcze: " + dragonHp + " punktów życia!");
        }
        else {
            console.log("Nie trafiłeś");
        }
        
    });

    
//    (Math.random() + 
    

    
});