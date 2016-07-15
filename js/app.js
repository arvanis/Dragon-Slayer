$(document).ready(function() {

var msg = $("#message");
    
// Postacie i ekwipunek
    
    function character(str, dex, hp, def) {
        this.strength = str;
        this.dexterity = dex;
        this.healthPoints = hp * 10;
        this.defence = def;
    };
    
    
    
    // Postacie
    
    var barbarian = new character(50, 35, 25, 0),
        knight = new character(35, 35, 40, 5),
        rogue = new character(25, 50, 25, 3),
        dragon = new character(100, 40, 100, 10);
    
    
    
    // Ekwipunek
    
                 // Zbroja 1 - id="item_0"
    var items = [new character(0, 0, 0, 5),
                 
                 // Zbroja 2 - id="item_1"
                 new character(0, -5, 0, 15),
                 
                 // Tarcza 1 - id="item_2"
                 new character(0, -5, 0, 7),
                 
                 // Tarcza 2 - id="item_3"
                 new character(1, 0, 0, 3),
                 
                 // Miecz 1 - id="item_4"
                 new character(Math.floor(Math.random()*20), 5, 1, 1),
                 
                 // Miecz 2 - id="item_5"
                 new character(5, -2, 0, 1),
                 
                 // Talizman 1 - id="item_6"
                 new character(Math.floor(Math.random()*15), -10, 20, 5),
                 
                 // Talizman 2 - id="item_7"
                 new character(0, 5, 7, 1),
                 
                 // Miecz 3 - id="item_8"
                 new character(2, 5, 0, 1),
                 
                 // Tarcza 3 - id="item_9"
                 new character(0, 0, 0, 5)];
                               
 
    
    
// Wybór postaci
    
    // Zdefiniowane pola wyboru postaci i początkowe wartości statystyk
    
    var hero = $("input[type=radio]"),
        character = $(".character"),
        str = 0,
        dex = 0,
        hp = 0,
        def = 0;
    
    
// Podświetlenie postaci przy najechaniu myszką
    
    character.on("mouseover", function() {
        $(this).children(".shadow").fadeOut();
    });
    
    
// Wygaśnięcie postaci przy opuszczeniu myszką jej pola
    
    character.on("mouseleave", function() {
        if ( $(this).children("input").is(":checked") ) {
            $(this).children(".shadow").hide();
        }
        else {
            $(this).children(".shadow").fadeIn();
        };
        
    });
    
    
    
// Ikony oraz imiona postaci do wyświetlenia przy pasku zdrowia podczas walki
    
    var bFace = $("#barbIcon"),
        kFace = $("#knightIcon"),
        rFace = $("#rogIcon"),
        heroName = $("#name");;
    
    bFace.hide();
    kFace.hide();
    rFace.hide();
    
    
    
// Event reagujący na wybór lub zmianę postaci
     
    hero.on("change", function() {
        $(".shadow").fadeIn();
        $(this).parent().children(".shadow").hide();
        var choosenOne = $(this).val();
        console.log(choosenOne);
        
        
        // Wojownik
        
        if ( choosenOne == "barbarian" ) {
            str = barbarian.strength;
            dex = barbarian.dexterity;
            hp = barbarian.healthPoints;
            def = barbarian.defence;
            
            kFace.hide();
            rFace.hide();
            bFace.show();
            heroName.text("Wojownik");
            console.log ("brb: " + str + " " + dex + " " + hp + " " + def);
        }
        
        // Rycerz
        
        else if ( choosenOne == "knight" ) {
            str = knight.strength;
            dex = knight.dexterity;
            hp = knight.healthPoints;
            def = knight.defence;
            
            bFace.hide();
            rFace.hide();
            kFace.show();
            heroName.text("Rycerz");
            console.log ("knight: " + str + " " + dex + " " + hp + " " + def);
        }
        
        // Łowca
        
        else if ( choosenOne == "rogue" ) {
            str = rogue.strength;
            dex = rogue.dexterity;
            hp = rogue.healthPoints;
            def = rogue.defence;
            
            bFace.hide();
            kFace.hide();
            rFace.show();
            heroName.text("Łowca");
            console.log ("rogue: " + str + " " + dex + " " + hp + " " + def);
        };
    });
    
    
    
    
// Silnik walki
    
    // Miejsca trafień i pasek zdrowia smoka
    
    var attack = $(".crosshair"),
        dragonHp = dragon.healthPoints,
        dragonBar = $("#dragonHpLeft");
    
    
// Wypełnienie paska zdrowia smoka do 100% na początku gry
    
    dragonBar.width("100%");
        
    
    
// Atak ze strony gracza
    
    attack.on("click", function() {  
        
        
// Ukrycie celowników po uderzeniu smoka
        
        attack.hide();

        
// Obliczenie szansy na trafienie smoka:
// Bonus do szansy na trafienie: 1/100 * Różnica zręczności bohatera i smoka * szansa na trafienie danego celownika
// Bonus może być ujemny, jeśli postać jest mniej zręczna, niż smok
// Ogólna szansa na trafienie to suma bazowej szansy i bonusu
        
        var dexDuel = dex - dragon.dexterity,
            chanceBonus = (dexDuel/100) * $(this).data("chance"),
            hit = chanceBonus + $(this).data("chance");
        
        
// Czynnik losowy
        
        var luck = Math.random();
        
        console.log ("Próba uderzenia: " + hit + " przeciwko " + luck + " z szansą na trafienie: " + $(this).data("chance"));

        
// Trafienie ma miejsce, gdy ogólna szansa na trafienie jest wyższa od wylosowanego czynnika "luck"
        
        if ( hit > luck ) {
            var damage = (str + (Math.floor(luck * 10)) - dragon.defence) * $(this).data("points");
            
// Komunikaty wyświetlane przez asystenta, w zalezności od wysokości trafienia
            
            if ( damage > 0 ) {
                dragonHp -= damage;    
                console.log("Trafiłeś: " + damage + ". Smokowi zostało jeszcze: " + dragonHp + " punktów życia!");
                
                if ( damage <= 20 ) {
                    msg.prepend($("<p class=playerSuccess>Bohater trafił, ale smok prawie tego nie poczuł.</p>"));
                }
                else if ( (damage > 20) && (damage <= 50) ) {
                    msg.prepend($("<p class=playerSuccess>Bohater wykonał niezły cios!</p>"));
                }
                else if ( (damage > 50) && (damage <= 100) ) {
                    msg.prepend($("<p class=playerSuccess>To musiało smoka zaboleć! Potężne trafienie Twojego bohatera!</p>"));
                }
                else if ( damage > 100 ) {
                    msg.prepend($("<p class=playerSuccess>Niesamowity atak Twojego bohatera!</p>"));
                };
            }
            else {
                console.log("Twój bohater trafił, ale nie zadał żadnych obrażeń!");
                msg.prepend($("<p>Twój bohater trafił, ale nie zadał żadnych obrażeń!</p>"));
            };
            
            
// Zabicie smoka
            
            if ( dragonHp <= 0 ) {
                $("#dragon").fadeOut();
                attack.remove();
                msg.prepend($("<p>Twój bohater zabił smoka!</p>"));
            }
        }
        else {
            console.log("Nie trafiłeś");
            msg.prepend($("<p>Twój bohater nie trafił!</p>"));
        };
        
// Animacja paska zdrowia smoka
        
        var HpValue = (100 * (dragonHp / 1000)) + "%";
        dragonBar.width(HpValue);
    });
    
    
    
    
// Atak ze strony smoka
    
// Wywołanie smoka z jaskini - sprawdza, czy został wybrany bohater oraz sumuje statystyki kupionych przedmiotów
    
    var call = $("#callTheDragon");
    call.on("click", function() {
        if ( hero.is(":checked") ) {
            
// Sumowanie statystyk ekwipunku
            
            for ( var i = 0; i < $(".slot").length; i++ ) {
                var item = "item_" + i,
                    itemPath = $("#list2 #item_" + i);

                if ( itemPath.length == 1 ) {
                    str += items[i].strength;
                    dex += items[i].dexterity;
                    hp += items[i].healthPoints;
                    def += items[i].defence;  
                };
            };
            

            
// Przygotowanie pola walki, wyświetlenie smoka i paska zdrowia gracza
                        
            var playerHp = hp,
                playerInitialHp = hp,
                playerBar = $("#playerHpLeft"),
                entrance = $("#entrance");
            playerBar.width("100%");
            entrance.fadeOut();
            console.log("Twoje aktualne zdrowie " + playerHp + " przy sile: " + str + ", zręczności: " + dex + " i obronie: " + def + " przeciwko sile smoka: " + dragon.strength);
            
            
// Częstotliwość wyświetlania celowników w zależności od zręczności gracza
            
            var spots = setInterval(attackUnlocked, 2500 - (20 * dex));
            function attackUnlocked() {  
                
                
                // Łatwe cele
                
                var easy = Math.random();
                
                if ( easy < 0.5 ) {
                    $("#dhand + .crosshair").fadeIn("fast");
                }
                else if ( easy >= 0.5 ) {
                    $("#drightWing + .crosshair").fadeIn("fast");
                };
                
                
                // Trudne cele
                
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
                
                
                // Chowanie celowników
                
                setTimeout(noSpots, 50 + (10 * dex));
                
                function noSpots() {
                    attack.fadeOut("fast");
                };
            };
            
            
// Ataki smoka - co 10 sekund
            
            var dragonFury = setInterval(dragonAttack, 5000);
                
            function dragonAttack() {
                if ( (dragonHp > 0) && (playerHp > 0)) {
                    
                    
// Animacja smoka
                    
                    $("#dhand").addClass("handUp"); 
                    $("#dleftWing").addClass("leftUp");
                    $("#drightWing").addClass("rightUp");
                    setTimeout(allDown, 2000);
                    
                    function allDown() {
                        $("#dhand").removeClass("handUp");
                        $("#dleftWing").removeClass("leftUp");
                        $("#drightWing").removeClass("rightUp");
                    };
                    
                    
// Szansa smoka na trafienie gracza:
// Bonus do szansy na trafienie: Różnica zręczności smoka i gracza * 1/00 razy bazowa szansa na trafienie bohatera
// Bonus może być ujemny, jeśli bohater jest zręczniejszy od smoka
// Ogólna szansa na trafienie: bonus + 0.7 (bazowa szansa)
                    
                    var dexDuel = dragon.dexterity - dex,
                    chanceBonus = (dexDuel/100) * 0.7,
                    hit = chanceBonus + 0.7;

                    
                    // Czynnik losowy
                    
                    var luck = Math.random();
                    
                    console.log ("Próba smoka: " + hit + " przeciwko Twojemu szczęściu: " + luck);
                    

                    // Jeśli ogólna szansa soka na trafienie jest większa od czynnika losowego, smok trafia gracza
                    
                    if ( hit > luck ) {
                        var damage = Math.floor(dragon.strength * luck) - def;
                        
                        if ( damage > 0 ) {
                            playerHp -= damage;    
                            console.log("Smok trafił: " + damage + ". Zostało Ci jeszcze: " + playerHp + " punktów życia!");
                            
                            
                            // Komunikaty wyświetlane przez asystenta
                            
                            if ( damage <= 20 ) {
                                msg.prepend($("<p class=dragonSuccess>Uderzenie smoka ledwo dosięgło Twojego bohatera, ale zadało mu trochę obrażeń.</p>"));
                            }
                            else if ( (damage > 20) && (damage <= 50) ) {
                                msg.prepend($("<p class=dragonSuccess>Twój bohater otrzymał mocne uderzenie.</p>"));
                            }
                            else if ( (damage > 50) && (damage <= 100) ) {
                                msg.prepend($("<p class=dragonSuccess>Smok zionął ogniem! Straszliwy atak!</p>"));
                            }
                            else if ( damage > 100 ) {
                                msg.prepend($("<p class=dragonSuccess>Smok wzbił się w powietrze i runął całym cielskiem na Twojego bohatera.</p>"));
                            };            
                            
                            
                            // Animacja paska zdrowia gracza
                            
                            var HpValue = (100 * (playerHp / playerInitialHp)) + "%";
                            playerBar.width(HpValue);
                            
// Konsekwencje przegranej gracza
                            
                            if ( playerHp <= 0 ) {
                                console.log("Poległeś!");
                                msg.prepend($("<p>Twój śmiałek zginął!</p>"));
                                entrance.fadeIn();
                                
// Usunięcie zabitej postaci sprzed ogniska i jej ekwipunku
                                
                                $("input[type=radio]:checked").parent().remove();
                                $("#list2").children().remove();
                                hero.prop('checked', false);
                                
// Sprawdzenie, czy przy ognisku znajdują się jeszcze jakieś postacie
                                
                                function isEmpty(el) {
                                    return !$.trim(el.html())
                                }
                                
                                
                                // Wszystkie postacie zginęły
                                
                                if (isEmpty($('.fireplace'))) {
                                    call.hide();
                                    msg.prepend($("<p>Wszyscy śmiałkowie zginęli. Być może później będziesz mógł spotkać przy ognisku nowych ochotników. Tymczasem zmęczony walką smok zasnął w swojej pieczarze i nie zagraża okolicznym krainom.</p>"));
                                }
                                
                                
                                // Przy ognisku znajduje się jeszcze przynajmniej jedna postać
                                
                                else {
                                    msg.prepend($("<p>Twój śmiałek poległ. Możesz jednak wykorzystać zmęczenie smoka po walce i poprosić kolejnego bohatera, by dokończył dzieła. Udaj się do ogniska.</p>"));
                                };
                                
                                
                                // Zatrzymaniu ataków i animacji smoka oraz migotania celowników
                                
                                clearInterval(dragonFury);
                                clearInterval(spots);
                                $("#dhand").removeClass("handUp");
                            };
                        }
                        
                        // Trafienie smoka ujemne lub równe 0;
                        
                        else {
                            console.log("Smok trafił, ale nie zadał Ci żadnych poważnych obrażeń!");
                            msg.prepend($("<p>Smok trafił, ale nie zadał Twojemu bohaterowi żadnych poważnych obrażeń!</p>"));
                        };
                    }
                    
                    // Chybienie smoka
                    
                    else {
                        console.log("Smok nie trafił!");
                        msg.prepend($("<p>Twój bohater uchylił się przed atakiem smoka!</p>"));
                    };
                }
                
                // Śmierć smoka: Zatrzymaniu ataków i animacji smoka oraz migotania celowników
                
                else if ( (dragonHp <= 0) && (playerHp > 0) ) {
                    clearInterval(dragonFury);
                    clearInterval(spots);
                    $("#dhand").removeClass("handUp");
                };
            };
        }
        
        
        // Próba wywołania smoka bez uprzedniego wybrania postaci
        
        else {
            console.log("Wybierz najpierw śmiałka");
            msg.prepend($("<p>Przed wywołaniem smoka lepiej poproś jakiegoś śmiałka, by walczył w Twoim imieniu.</p>"));
        };   
    });
    

    
    
    
    
// Nawigacja - przełączanie między zakładkami
    
    
    var navButtons = $(".navigation");
    $(".tabs").hide();
    $("#fade").hide();
    $("#tab_1").fadeIn();
    
//    var tabBckr = [
//        ["0", "0"], 
//        ["0", "-1450px"], 
//        ["-840px", "-650px"], 
//        ["-1360px", "-500px"], 
//        ["-900px","0"]
//    ];
    
//    var tabBckr = [
//        ["0", "0", "", ""], 
//        ["0", "0"], 
//        ["0", "0", "0", "0"], 
//        ["-500px", "0"], 
//        ["0", "0", "0"]
//    ];
    
        
 
    
    navButtons.on("click", function() {
        var i = $(this).data("id");
        $(".tabs").fadeOut();
        $("#fade").fadeOut();
        
        var x = window.innerWidth,
            y = window.innerHeight,
            mapX = 3264,
            pos3 = ((-mapX + x)/2) + "px",
            pos4 = (-mapX + x) + "px",
            pos5 = ((-mapX + x)/2) + "px";
        
        console.log(x, pos3, pos4, pos5);
            
        var tabBckr = [
            ["0", "0"], 
            ["0", "-1450px"], 
            [ pos3, "-650px"], 
            [ pos4, "-430px"], 
            [ pos5,"0"]
        ];
            

        
        
        $("body").animate({
            backgroundPositionX: tabBckr[i-1][0],
            backgroundPositionY: tabBckr[i-1][1],           
//            backgroundPosition: "-100px -100px"
                },
                         2000);

        setTimeout(tabDisplay, 2000);
        function tabDisplay() {
            var tab = "#tab_" + i;
            $(tab).fadeIn();
            
            if ( (i == 3) || (i == 4) ) {
                $("#fade").fadeIn();
            };
        };
    });
    
 
    
    
// Kuźnia 
   
    var buttons = $(".moveBtn"),
        list1 = $("#list1"),
        list2 = $("#list2"),
        msgSmith = $("#messageSmith");;
    
    
// Zakup/sprzedaż ekwipunku

    var gold = 1500,
        pocket = $("#money");
    buttons.on("click", function(event) {
        
// Kupno
        
        if ( $(this).parent().parent().prop("id") == "list1" ) {
            var dataType = $(this).parent().data("type");
           
            // Ograniczenie do możliwości zakupu tylko jednego egzemplarza danego rodzaju ekwipunku
            
            if ( $("#list2 ." + dataType).length == 1 ) {
                msgSmith.prepend("<p>Nie możesz jednocześnie posiadać dwóch przedmiotów tego samego rodzaju. Pomyśl o innych klientach!</p>");
            }
            else if ( gold < $(this).parent().data("price") ) {
                msgSmith.prepend("<p>Masz za mało złota, żeby zapłacić za ten przedmiot.</p>");
            }
            else {
                list2.append($(this).parent());
                gold -= $(this).parent().data("price");
                $(this).text("Sprzedaj"); 
                pocket.text(gold);
            };
        }
        
// Sprzedaż
        
        else if ( $(this).parent().parent().prop("id") == "list2" ) {
            
            // Blokada sprzedaży przedmiotu o id="item_6" ze względu na klątwę
            
            if ( $(this).parent().prop("id") == "item_6" ) {
                msgSmith.prepend("<p>Mam nadzieję, że to nie popsuje naszych relacji i pozostaniesz moim klientem, ale wolałbym żebyś zatrzymał ten amulet u siebie.</p>");
            }
            else {
                list1.append($(this).parent());
                gold += $(this).parent().data("price");
                $(this).text("Kup");
                pocket.text(gold);
            };
        };
    });
    
    
// Wyświetlenie informacji o przedmiocie po najechanu myszą
    
    $(".slot img").on("mouseenter", function(e){         
        $(this).siblings(".description").show();         
        $(this).siblings(".description").css({             
            top: "120px",             
            left: 0         
        });     
    });  
    
    $(".slot img").on("mouseout", function(e){         
        $(this).siblings(".description").hide();     
    });   
});