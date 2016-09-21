(function () {
  'use strict';

  angular
    .module('outerZone')
    .service('storyService', storyService);

  storyService.$inject = ["progressTracker"];

  function storyService(progressTracker) {
    var vm = this;

    vm.getTitle = function() {
      return vm.storyTexts[progressTracker.storyProgress][0][0];
    };

    vm.storyTexts = [
      [
        ["The City of Two Franks"],
        [
          "Welcome to Baumville.",
          "I've lived here my whole life, but it wasn't always called Baumville. Used to be called Gallow Falls. It" +
          " was a big town then, lot of manufacturing, but nothing compared to what it is now. Around the time" +
          " I was ten years old a guy by the name of Frank Keller moved his company, Singularity, twenty miles" +
          " north to Baumville, which was considered a suburb of Gallow Falls at the time.",
          "In less than five years the company had grown so large, the city of Baumville stretched south and" +
          " swallowed Gallow Falls up. My dad lost his job about the same time. If you worked hard in Gallow Falls," +
          " you got by. That's just how it was. Baumville was different. They didn't want hard workers, they" +
          " wanted smart workers, they didn't want my dad and I.",
          "People say Keller's a prophet, they call him 'The Wizard.' His company has come to dominate every" +
          " corner of the technology market. My dad said they made cheap pieces of gimmicky crap, but they" +
          " eventually made one of those cheap pieces of gimmicky crap that could make the stuff my dad was making" +
          " for half the cost in half the time.",
          "Progress doesn't wait for those that don't chase it. My dad left for greener pastures a couple years" +
          " back. Said the cost of living was too high, and the Outer Zone, the area south of the city where you" +
          " could still make rent with a blue collar salary, was too dangerous. It had been overrun by Frank" +
          " Taylor and his gang. Taylor ran the south and Keller ran the north. The City of Two Franks.",
          "I didn't want to leave Baumville. Even if the name had changed, I'd still grown up here. So I figured" +
          " out what I was good at, and I figured out how to get paid for it. Turns out that's fighting, and it" +
          " turns out there's a bunch of folks up north who are willing to pay a whole lot to watch two guys beat" +
          " each other to a pulp in the basement of an abandoned Outer Zone warehouse. I don't get it, but I'm not" +
          " complaining.",
          "Clive and I are fighting tonight. Like I said, I'm no Einstein, but Clive sure makes me look like one." +
          " We've fought before. No question about who will win. He's built like a fucking brick, but he doesn't" +
          " move around too well.",
          "Damien pulls me aside before the match. He tells me he's got some special guests in the crowd tonight" +
          " and he needs a big show for them.",
          "He asks me to 'finish off' Clive.",
          "I tell him that I always do.",
          "He says, 'No, I really want you to finish him off.'",
          "I ask him once more to clarify.",
          "This is a brutal sport, but I always felt like there was a sense of brotherhood to it. You know your" +
          " life is in danger every time you go in, but no one sets out to kill anyone. I know better than to go" +
          " against what Damien asks though. That's probably how Clive got himself into this situation.",
          "I wrap my hands carefully in the makeshift locker room. Clive doesn't allow for gloves. A lot of people" +
          " think boxers are forced to wear gloves to protect their opponent's head, but it's actually to protect" +
          " your hands. Mine are beat to shit.",
          "I'm worried that if I ever take the wraps off completely there'll be nothing holding my hands together.",
          "I walk into the ring. It's a couple inches of sand surrounded by a concrete wall. A dozen feet up in" +
          " the stands I hear a couple regulars cheer my nickname, 'The Scarecrow'. I don't know how I picked that" +
          " up. Could be the scars on my face, the wraps, probably my wiry frame. Doesn't matter. Damien started" +
          " paying me a lot more once I had a following.",
          "Clive comes in looking like he really wants to win one tonight.",
          "Poor guy..."
        ]
      ],
      [
        ["Wolf Like Me"],
        [
          "Clive slipped in and out of consciousness. He should have been out cold, but he knew something was" +
          " wrong. The fight should have been over by now, or at least I should have been slowing down. I could" +
          " feel the roars from the crowd growing to a fever pitch. They knew what was coming.",
          "But I couldn't do it. He was fighting too hard, and it wasn't against me. As dumb as he was, he knew" +
          " that Damien had put me up to it. He was just trying to get away, but where was he going to go? They" +
          " locked the doors behind us when we went into the ring. Even if he made it out of the ring and out of" +
          " the warehouse, Damien would find him. I was doing him a favor if I ended it here.",
          "Who was I kidding? I was doing myself a favor, because if I didn't finish him, I'd be in his shoes. I" +
          " stopped pulling the punches. Lights out for Clive. Everything past this point was guess work. If I" +
          " stopped too far short, Damien would know, if I took it too far, Clive would die.",
          "The crowd was loving it.",
          "I got off of him. I was careful not to look into the crowd. If Damien saw me looking for a reaction," +
          " he'd know.",
          "An alarm went off signifying that the doors had been unlocked. I went back into the locker room. A few" +
          " of the other fighters were gathered there. I got my stuff together and left. Same as I always did.",
          "I went back to my house. A small storage unit near the lake. It's not glamorous, but it's safe. I've got" +
          " everything I need. A cot in the corner, punching bag strung from the rafters. I pay a little extra for" +
          " the staff to look the other way. Still a lot cheaper than anything else in the area.",
          "I'm not sure what happened to Clive. I don't sleep well.",
          ". . .",
          "I wake up the next day with a text from Damien. 'nice job last night. come in tonight. ive got some quick" +
          " cash for you.' I'm relieved and shocked at the same time.",
          "I get to the warehouse around eleven. Everyone is looking at me funny. I keep my head down. Then I see" +
          " Damien come in with Clive. He's alive, but barely recognizable. He's pleading with Damien for a night" +
          " off. His face is swollen and purple. Damien insists that he fight. His fight is up next. Damien pushes" +
          " him towards the doors.",
          "It's funny to watch such a little guy push around a behemoth of a man. If any of us had a brain, we'd" +
          " kill Damien and take this place over, but we're a bunch of brutes, so I guess this is our place.",
          "Damien walks over to me. I'm trembling.",
          "'I'm sorry Damien, I thought for sure--'",
          "'We all did, guys a fighter... You and I are a lot alike. You're a wolf like me.'",
          "There's something wrong with the way he smiles. He pulls me up off the bench and slaps my back.",
          "'He's not going to last long tonight, you better get ready.'",
          "'Who you got for me tonight?'",
          "'It's a surprise'",
          "I stand behind the door wrapping my hands. The buzzer goes off. I wait for Clive to walk through the" +
          " door. He doesn't.",
          "I walk into the pit. The door slams behind me and locks. In the middle of the ring four wolves are working" +
          " on what's left of Clive..."
        ]
      ],
      [
        ["A Dog in the Race"],
        [
          "My arms and legs were mangled, but I'd managed to keep my neck intact. I'd survive... if I could get out" +
          " of here. The walls were twice my height, but time had made cracks in the concrete. I tried to find a" +
          " lip to grab onto, but my hands were swollen and slippery with sweat.",
          "It was clear that Damien wanted me gone. The only advantage I had was that he wouldn't have accounted for" +
          " me handling the wolves. It was a small window.",
          "I leapt up and grabbed onto an inch of protruding concrete. I jumped from there into the stands. The" +
          " audience scattered. They weren't used to participating directly. I tore through the warehouse and out" +
          " into the street.",
          "I made it back to the storage unit. I hadn't expected to make it this far. I was careful to never let" +
          " anyone know where I lived, I'd be safe here for a while. In the morning, I'd have to think about getting" +
          " out of Baumville. Steal a car... I was too tired to think. I crashed on the cot.",
          ". . .",
          "I woke up to banging on the aluminum door of the storage unit. I rolled off the cot and shuffled under it." +
          "I kept a handgun strapped to the bottom. I grabbed it and aimed it at the door.",
          "'I've got a gun' I said.",
          "...'Yea... me too.'",
          "'What do you want?'",
          "'Are you Tommy Harding?'",
          "'No'",
          "'My name is D, my brother sent me, Frank Taylor.'",
          "I opened up the door. It was early morning. A young black woman was standing there.",
          "'You're Frank Taylor's sister?",
          "'Yes. You're Tommy Harding?'",
          "'Yes.'",
          "'My brother recommended I come see you.'",
          "'I don't know your brother.'",
          "'He doesn't know you, but we need someone without a dog in the race.'",
          "'For what?'",
          "'Protection. He seemed to think you'd be good at that.'",
          "I didn't want to be on Damien's bad side, but outside of Baumville, he didn't have much influence. Frank" +
          " Taylor could have a man killed anywhere in the country. I rode with her back to her apartment up north." +
          " Frank still lived in the Outer Zone for business reasons, but he got his family out.",
          "Her proposal was pretty simple. There was unrest with the gangs in the south, no surprise there, and" +
          " Frank didn't trust anyone within his organization. They would pay me to hang around. Mostly as a" +
          " deterrent. I didn't bother explaining that I was more in need of protection that she was, but once word" +
          " got out that I was on Frank Taylor's payroll, Damien would probably cut his losses. If your interests" +
          " conflicted with Frank Taylor's, you simply changed your interests.",
          "I went everywhere with D. She was studying at Emerald U, biology or mechanical engineering, the classes" +
          " may as well have been taught in French. It was a pretty good gig. They were paying me more than Damien" +
          " was and I wasn't really doing anything but scaring all of D's classmates. My hands were even starting to" +
          " heal.",
          "Then about two weeks in, I'm sleeping on the couch in D's apartment and two guys bust down the door..."
        ]
      ],
      [
        ["Shook Up"],
        [
          "Frank came over immediately with his entourage. It was the first time I'd met him. He didn't talk to" +
          " me much.",
          "D kept insisting that they were sent by a guy by the name of Alex Wright. Someone high up in the" +
          " organization who was eyeing Frank's throne. Frank wrote it off as a random burglary. I'll admit, it" +
          " didn't seem likely in this part of town, but my job was to be seen and not heard.",
          "Frank spent the night in the lobby of the apartment with a couple of his guys. D couldn't sleep, she kept" +
          " pacing back and forth in the kitchen.",
          "'Relax, your brother's downstairs, I'm up here, nothing is going to happen.'",
          "'I'm not worried, I'm angry'",
          "'Nothing you can do about it, let your brother handle it.'",
          "'I recognized those guys, they hang out with Alex. This was him. I'm sure of it.'",
          "'Maybe.'",
          "'Tomorrow I'm going to take care of it.'",
          "'You and what army?'",
          "'The one that sleeps on my couch.'",
          ". . .",
          "I knew it was a bad idea, but my life depended on staying in D's good graces not Frank's, and what did I" +
          " know about good ideas?",
          "We pulled up in front of a nightclub. Alex was inside.",
          "'Wait here.'",
          "I walked toward the front door of the club. I knew the bouncer. He had fought at Damien's for a while.",
          "'What's going on?' He pulled the rope aside and ushered me in.",
          "'Whoa, hold on,' He grabbed my arm and pulled me back, 'I can't let you in with that.",
          "He was talking about the handgun in my waistband.",
          "I looked back at the car. D was standing outside with a gun pointed across the parking lot. I followed" +
          " her aim to what must have been Alex with a posse surrounding him. I pulled my gun and rushed towards" +
          " them..."
        ]
      ],
      [
        ["Franz Ferdinand"],
        [
          "D held a gun over Alex. Police sirens were growing closer, but she wanted some answers.",
          "He admitted to sending the men to her place. He'd sent men after Frank that night too, they hadn't made" +
          " it very far, but Frank hid that from D. It was getting worse than he had led her to believe. The entire" +
          " Outer Zone which was already in disarray was heading for collapse.",
          "We got in the car and took off just before the police arrived.",
          "If I could have predicted the chain reaction that night set into motion, I could have saved myself a lot" +
          " of trouble.",
          "Tim Woodman, the Baumville PD Captain, got on the news the next morning and set forth his plan to clean" +
          " up the Outer Zone.",
          "Less than 24 hours later, Frank Taylor was killed. There was surveillance footage of the shooting. A man" +
          " covered head to toe in some kind of metallic suit. People called him 'The Tin Man'. Some people thought" +
          " it was Frank Keller in a suit he'd designed in the Singularity labs. There didn't seem to be a lot of" +
          " investigation.",
          "D was understandably upset, but she knew the nature of Frank's work and that it was more of a when than" +
          " if. When Frank's accounts were frozen, the trusts he'd set up for D were frozen as well. Her tuition" +
          " checks bounced and she was forcibly un-enrolled at Emerald U. The university, city and banks were" +
          " all unsympathetic when they learned where the money had been coming from. Frank owned the apartment" +
          " complex she was living in and fortunately they couldn't evict her without evicting all the tenants, but" +
          " nevertheless there was a target on her back.",
          "It wasn't hard to find dirty cash in every nook and cranny that Frank touched, so my paycheck never" +
          " stopped coming, but with Frank out of the picture, I started to worry about Damien. I explained it to D." +
          " I couldn't watch her back when I was always looking over my own shoulder.",
          "She agreed. So we went to go take care of Damien..."
        ]
      ],
      [
        ["Damien's End"],
        [
          "D could actually hold her own against these guys. Perks of an older brother.",
          "They all fought for Damien. He was the only thing keeping a bunch of goons like us alive in Baumville.",
          "Even if I was going to die in this warehouse, it felt good to finally be going against his wishes.",
          "Then some of them started backing away. Some were even pulling guys off of D and I.",
          "Eventually it was just me, Damien and Nix. Nix was the only guy at Damien's that I'd never beaten in the" +
          " pit. He could be any kind of fighter he wanted. If his opponent came out strong, he played it cool, if" +
          " they played defense he would pummel them until they broke.",
          "He was Damien's favorite. He only fought when he wanted and he never fought anyone he didn't want to." +
          " Each time we'd gone into the pit it had been days after my previous fight and a month since his. Not" +
          " that anyone was really keeping track of the wins. It was just bloodsport."
        ]
      ]

    ];

  }

})();
