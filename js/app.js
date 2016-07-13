$(document).ready(function() {

    
    var msg = $("#message"),
        wojownik = $("<p>Wojownik dysponuje ogromną siłą, przez co jego trafienia mogą zadawać większe obrażenia. Nie posiada pancerza, a jego dwuręcznym mieczem niestety nie wyprowadza się zbyt szybkich ataków.</p>"),
        rycerz = $("<p>Rycerz jest silny i wytrzymały, jednak ciężka zbroja znacznie ogranicza jego ruchy.</p>"),
        lowca = $("<p>Łowca, dzięki lekiej zbroi schowanej pod płaszczem, z łatwością porusza się po polu bitwy, wyprowadzając szybkie i celne ataki oraz unikając uderzeń smoka. Niestety, nie jest zbyt silny i wytrzymały.</p>");
    
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
            
            msg.prepend(wojownik);
            console.log ("brb: " + str + " " + dex + " " + hp + " " + def);
        }
        else if ( choosenOne == "knight" ) {
            str = knight.strength;
            dex = knight.dexterity;
            hp = knight.healthPoints;
            def = knight.defence;
            
            msg.prepend(rycerz);
            console.log ("knight: " + str + " " + dex + " " + hp + " " + def);
        }
        else if ( choosenOne == "rogue" ) {
            str = rogue.strength;
            dex = rogue.dexterity;
            hp = rogue.healthPoints;
            def = rogue.defence;
            
            msg.prepend(lowca);
            console.log ("rogue: " + str + " " + dex + " " + hp + " " + def);
        };
    });
    
    
// Silnik walki
    var attack = $(".crosshair"),
        dragonHp = dragon.healthPoints,
        dragonBar = $("#dragonHpLeft");
        
    
    
    // Atak ze strony gracza
    
    var spotHead = $("<p>Są niewielkie szanse, że bohaterowi uda się trafić w głowę smoka, aczkolwiek silne uderzenie mogłoby mu poważnie zaszkodzić.</p>"),
        spotBody = $("<p>Pomiędzy łuskami na brzuchu znajduje się odsłonięte ciało smoka, jednak naprawdę wątpię, by bohater dał radę w nie trafić.</p>"),
        spotHand = $("<p>Myślę, że są duże szanse na trafienie w jego łapę i może go to zaboleć.</p>"),
        spotLeft = $("<p>Niełatwo trafić w trzon jego skrzydła, ale to jeden z jego bardziej czułych punktów.</p>"),
        spotRight = $("<p>Bohater bez problemu trafi w jego skrzydło, ale raczej nie wyrządzi mu tym większej krzywdy.</p>");
    
    

    
    
    
    
    attack.on("click", function() {  
        
        attack.hide();
        console.log("Attack function locked");
        
                   
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
                
                if ( damage <= 20 ) {
                    msg.prepend($("<p>Bohater trafił, ale smok prawie tego nie poczuł.</p>"));
                }
                else if ( (damage > 20) && (damage <= 50) ) {
                    msg.prepend($("<p>Niezły cios!</p>"));
                }
                else if ( (damage > 50) && (damage <= 100) ) {
                    msg.prepend($("<p>To go musiało zaboleć! Potężne trafienie!</p>"));
                }
                else if ( damage > 100 ) {
                    msg.prepend($("<p>Niesamowity atak!</p>"));
                };
            }
            else {
                console.log("Twój bohater trafił, ale nie zadał żadnych obrażeń!");
                msg.prepend($("<p>Twój bohater trafił, ale nie zadał żadnych obrażeń!</p>"));
            };
        }
        else {
            console.log("Nie trafiłeś");
            msg.prepend($("<p>Twój bohater nie trafił!</p>"));
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
            playerBar.width("100%");
            entrance.fadeOut();
            console.log("Twoje aktualne zdrowie " + playerHp + " przy sile: " + str + " przeciwko sile smoka: " + dragon.strength);
            
            var spots = setInterval(attackUnlocked, 3000 - (20 * dex));
            function attackUnlocked() {
                var easy = Math.random();
                
                if ( easy < 0.5 ) {
                    $("#dhand + .crosshair").fadeIn("fast");
                }
                else if ( easy >= 0.5 ) {
                    $("#drightWing + .crosshair").fadeIn("fast");
                };
                
                var hard = Math.random();
                
                if ( hard < 0.3 ) {
                    $("#dbody + .crosshair").fadeIn("fast");
                }
                else if ( (hard >= 0.3) && (hard < 0.6) ) {
                    $("#dhead + .crosshair").fadeIn("fast");
                }
                else if ( hard >= 0.6) {
                    $("#dleftWing + .crosshair").fadeIn("fast");
                };
                
                setTimeout(noSpots, 30 + (10 * dex));
                
                function noSpots() {
                    attack.fadeOut("fast");
                };
            
                console.log("Attack function unlocked");
            };
            
            var dragonFury = setInterval(dragonAttack, 10000);
                
            function dragonAttack() {
                if ( (dragonHp > 0) && (playerHp > 0)) {
                    var dexDuel = dragon.dexterity - dex,
                    chanceBonus = (dexDuel/100) * 0.7,
                    hit = chanceBonus + 0.7;
                    
                    var luck = Math.random();
                    
                    console.log ("Próba smoka: " + hit + " przeciwko Twojemu szczęściu: " + luck);
                    
                    if ( hit > luck ) {
                        var damage = Math.floor(dragon.strength * luck) - def;
                        
                        if ( damage > 0 ) {
                            playerHp -= damage;    
                            console.log("Smok trafił: " + damage + ". Zostało Ci jeszcze: " + playerHp + " punktów życia!");
                            
                            if ( damage <= 20 ) {
                                msg.prepend($("<p>Uderzenie smoka ledwo dosięgło Twojego bohatera, ale zadało mu trochę obrażeń.</p>"));
                            }
                            else if ( (damage > 20) && (damage <= 50) ) {
                                msg.prepend($("<p>Twój bohater otrzymał mocne uderzenie.</p>"));
                            }
                            else if ( (damage > 50) && (damage <= 100) ) {
                                msg.prepend($("<p>Smok zionął ogniem! Straszliwy atak!</p>"));
                            }
                            else if ( damage > 100 ) {
                                msg.prepend($("<p>Smok wzbił się w powietrze i runął całym cielskiem na Twojego bohatera.</p>"));
                            };            
                            
                            
                            var HpValue = (100 * (playerHp / playerInitialHp)) + "%";
                            playerBar.width(HpValue);
                            if ( playerHp <= 0 ) {
                                console.log("Poległeś!");
                                msg.prepend($("<p>Twój śmiałek zginął!</p>"));
                                entrance.fadeIn();
                                
                                $("input[type=radio]:checked").parent().remove();
                                hero.prop('checked', false);
                                
                                function isEmpty(el) {
                                    return !$.trim(el.html())
                                }
                                
                                if (isEmpty($('.fireplace'))) {
                                    call.hide();
                                    msg.prepend($("<p>Wszyscy śmiałkowie zginęli. Być może później będziesz mógł spotkać przy ognisku nowych śmiałków. Tymczasem zmęczony walką smok zasnął w swojej pieczarze i nie zagraża okolicznym krainom.</p>"));
                                }
                                else {
                                    msg.prepend($("<p>Twój śmiałek poległ. Możesz jednak wykorzystać zmęczenie smoka po walce i poprosić kolejnego bohatera, by dokończył dzieła. Udaj się do ogniska.</p>"));
                                }
                                
                                clearInterval(dragonFury);
                                clearInterval(spots);
                            };
                        }
                        else {
                            console.log("Smok trafił, ale nie zadał Ci żadnych poważnych obrażeń!");
                            msg.prepend($("<p>Smok trafił, ale nie zadał Twojemu bohaterowi żadnych poważnych obrażeń!</p>"));
                        }
                    }
                    else {
                        console.log("Smok nie trafił!");
                        msg.prepend($("<p>Twój bohater uchylił się przed atakiem smoka!</p>"));
                    }
                }
                else if ( (dragonHp <= 0) && (playerHp > 0) ) {
                    clearInterval(dragonFury);
                    clearInterval(spots);
                };
            }
        }
        else {
            console.log("Wybierz najpierw śmiałka");
            msg.prepend($("<p>Przed wywołaniem smoka lepiej poproś jakiegoś śmiałka, by wqalczył w Twoim imieniu.</p>"));
        }
        
    });
    

    
    
    
    
// Menu
    
    
    var navButtons = $(".navigation");
    $(".tabs").hide()
    $("#tab_1").fadeIn();
 
    
    navButtons.on("click", function() {
        var i = $(this).data("id");
        $(".tabs").fadeOut();
        setTimeout(tabDisplay, 1000);
        function tabDisplay() {
            var tab = "#tab_" + i;
            $(tab).fadeIn();
            
            msg.prepend(tabsTable[i - 1]);
            
        };
    })
    
    
    
    
// Wiadomości
        
    var tab1 = $("<p>W tym miejscu władca tej krainy obwieszcza swoje najnowsze dokonania.</p>"),
        tab2 = $("<p>Jeden z królewskich skrybów opisał w tym miejscu problem, z jakim przyszło się nam borykać.</p>"),
        tab3 = $("<p>Przy ognisku możesz poprosić jednego ze śmiałków, by walczył w Twoim imieniu ze smokiem.</p>"),
        tab4 = $("<p>W tej jaskini swoje legowisko ma smok. Jeśli jesteś pewien, że chcesz z nim walczyć, wystarczy go zawołać.</p>");
    
    var tabsTable = [tab1, tab2, tab3, tab4];

        
});