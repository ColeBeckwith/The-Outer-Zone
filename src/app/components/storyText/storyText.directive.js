(function() {
  'use strict';

  angular
    .module('outerZone')
    .directive('storyText', storyText);

  storyText.$inject = ["stateChangeService", "progressTracker"];

  function storyText(stateChangeService, progressTracker) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/storyText/storyText.html',
      controller: storyTextController,
      controllerAs: 'storyText',
      bindToController: true
    };

    return directive;

    function storyTextController() {
      var vm = this;

      vm.storyProgress = progressTracker.getStoryProgress();

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
            " you got by. That's just how it was. Baumville was different though, they didn't want hard workers" +
            " anymore, they wanted smart workers. My family was never known for our brains.",
            "People say Keller's a prophet, they call him 'The Wizard.' His company dominates the technology market. My" +
            " dad said they made cheap pieces of gimmicky crap , but they eventually made one of those cheap pieces of" +
            " gimmicky crap that could make the stuff my dad was making for half the cost in half the time.",
            "Progress doesn't wait for those that don't chase it. My dad left for the countryside a couple years back." +
            " Said the cost of living was too high, and the Outer Zone, the area south of the city where you could" +
            " still make rent with a blue collar salary, was too dangerous. It had been overrun by Frank Taylor and" +
            " his gang. Taylor ran the south and Keller ran the north. The City of Two Franks.",
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
            " life is in danger every time you go in, but no one's trying to kill anyone. I know better than to go" +
            " against what Damien asks though. That's probably how Clive got himself into this situation.",
            "I wrap my hands carefully in the makeshift locker room. Clive doesn't allow for gloves. A lot of people" +
            " think boxers are forced to wear gloves to protect their opponent's head, but it's actually to protect" +
            " your hands. Mine are beat to shit.",
            "I'm worried that if I ever take the wraps off completely there'll be nothing holding my hands together." +
            " They're soaked in sweat and blood and they smell terrible.",
            "I walk into the ring. It's a couple inches of sand surrounded by a concrete wall. A dozen feet up in" +
            " the stands I hear a couple regulars cheer my nickname, 'The Scarecrow'. I don't know how I picked that" +
            " up. Could be the scars on my face, the wraps, probably my wiry frame. Doesn't matter. Damien started" +
            " paying me a lot more once I had a following.",
            "Clive comes in looking like he really wants to win one tonight.",
            "Poor guy..."
          ]
        ],
        [
          ['Wolf'],
          [
            "This is the second part of the story",
            "right here"
          ]
        ],
        [
          ['Third'],
          [
            'This is the third and so on...'
          ]
        ]
      ];

      vm.continue = function() {
        if (vm.storyProgress === 0 || vm.storyProgress === 2) {
          progressTracker.addNewAlly();
          stateChangeService.setPlayerState('characterSelect');
        } else {
          stateChangeService.setPlayerState('prefight');
        }
      }
    }
  }
})();
