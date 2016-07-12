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
        dragonHp = dragon.healthPoints,
        dragonBar = $("#dragonHpLeft");
        
    // Atak ze strony gracza
    
    attack.on("click", function() {  
        attack.hide();
        console.log("Attack function locked");
        setTimeout(attackUnlocked, 4000 - (40 * dex));
        function attackUnlocked() {
            attack.fadeIn();
            console.log("Attack function unlocked");
        };
        
                   
        var dexDuel = dex - dragon.dexterity,
            chanceBonus = (dexDuel/100) * $(this).data("chance"),
            hit = chanceBonus + $(this).data("chance");
        
        var luck = Math.random();
        
        console.log ("Próba uderzenia: " + hit + " przeciwko " + luck + " z szansą na trafienie: " + $(this).data("chance"));
        
        if ( hit > luck ) {
            var damage = (str + (Math.floor(luck * 10)) - dragon.defence) * $(this).data("points");
            
            if ( damage > 0 ) {
                dragonHp -= damage;    
                console.log("Trafiłeś: " + damage + ". Smokowi zostało jeszcze: " + dragonHp + " punktów życia!");
            }
            else {
                console.log("Trafiłeś, ale nie zadałeś żadnych obrażeń!");
            }
        }
        else {
            console.log("Nie trafiłeś");
        }
        var HpValue = (100 * (dragonHp / 1000)) + "%";
        dragonBar.width(HpValue);
    });
    
    
    // Atak ze strony smoka
    
    var call = $("#callTheDragon");
    call.on("click", function() {
        if ( hero.is(":checked") ) {
            var playerHp = hp,
                playerInitialHp = hp,
                playerBar = $("#playerHpLeft"),
                entrance = $("#entrance");
            entrance.fadeOut();
            console.log("Twoje aktualne zdrowie " + playerHp + " przy sile: " + str + " przeciwko sile smoka: " + dragon.strength);
            var dragonFury = setInterval(dragonAttack, 10000);
                
            function dragonAttack() {
                if ( (dragonHp > 0) && (playerHp > 0)) {
                    var dexDuel = dragon.dexterity - dex,
                    chanceBonus = (dexDuel/100) * 0.7,
                    hit = chanceBonus + 0.7;
                    
                    var luck = Math.random();
                    
                    console.log ("Próba smoka: " + hit + " przeciwko Twojemu szczęsciu: " + luck);
                    
                    if ( hit > luck ) {
                        var damage = Math.floor(dragon.strength * luck) - def;
                        
                        if ( damage > 0 ) {
                            playerHp -= damage;    
                            console.log("Smok trafił: " + damage + ". Zostało Ci jeszcze: " + playerHp + " punktów życia!");
                            var HpValue = (100 * (playerHp / playerInitialHp)) + "%";
                            playerBar.width(HpValue);
                            if ( playerHp <= 0 ) {
                                console.log("Poległeś!");
                                entrance.fadeIn();
                                
                                $("input[type=radio]:checked").parent().remove();
                                hero.prop('checked', false);
                                
                                if ( hero == null ) {
                                    call.hide();
                                    $("#allDead").fadeIn();
                                }
                                else {
                                    $("#playerDead").fadeIn();
                                }
                            };
                        }
                        else {
                            console.log("Smok trafił, ale nie zadał Ci żadnych poważnych obrażeń!");
                        }
                    }
                    else {
                        console.log("Smok nie trafił!");
                    }
                }
                else if ( (dragonHp <= 0) && (playerHp > 0) ) {
                    clearInterval(dragonFury);
                };
            }
        }
        else {
            console.log("Wybierz najpierw śmiałka");
        }
        
    });
    

    
    
    
    
// Menu
    
    
    var navButtons = $(".navigation");
    $(".tabs").fadeOut();
    $("#tab_1").fadeIn();
    
    navButtons.on("click", function() {
        var i = $(this).data("id");
        $(".tabs").fadeOut();
        setTimeout(tabDisplay, 1000);
        function tabDisplay() {
            var tab = "#tab_" + i;
            $(tab).fadeIn();
        };
    })
});