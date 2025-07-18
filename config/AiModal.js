
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
   export const chatsession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: `

category
"Non-Friction"
(string)



chapters
(array)



0
(map)


chapterNumber
1
(number)


content
"Agent X, codenamed 'Seraph,' enjoyed the quiet hum of his office. Sunlight streamed through the large window, illuminating dust motes dancing in the air. It was a stark contrast to the usual chaos of his missions. This assignment was different. It felt routine, almost mundane. He was tasked with retrieving a stolen data chip, a simple pick-up from a seemingly harmless individual. Seraph, known for his meticulous planning and flawless execution, found the simplicity almost unsettling. He liked challenges, the thrill of the hunt, the satisfaction of solving complex puzzles. This task, however, lacked that edge. The Agency briefing had been brief, lacking the usual sense of urgency. The target, a low-level tech worker named Marcus Bellweather, posed no significant threat. There was no indication of backup, no mention of armed security. The intel was clean, precise, and completely devoid of any unexpected variables. Seraph found himself meticulously double-checking his equipment, an unusual amount of preparation for such a trivial task. He organized his tools, each in its designated place, a comforting ritual. The lack of friction made him slightly uneasy. He had always thrived in high-pressure situations, where every decision could mean the difference between life and death. The calm before the storm felt strange, alien, and frankly, dull. He reviewed the target's profile, noting the man's predictable routine: a morning commute, a predictable lunch break, and an equally predictable evening walk. Seraph preferred the unexpected, the chaotic, the unpredictable. This mission, however, seemed designed to be precisely the opposite. As he prepared to depart, Seraph felt a sense of unease. It wasn’t the mission itself that bothered him, but the absence of any real challenge. He wondered if this was a test, a deliberate attempt to assess his ability to handle the mundane. Or perhaps, something else entirely was at play. He adjusted his coat, a subtle movement that belied the inner turmoil he felt. His usual sense of anticipation was absent, replaced by a disquieting calm. He felt an echo of the silence from the briefing, a blankness that was far more unnerving than any outright danger. The mission began, but the quiet unease remained. He felt a deep-seated anticipation of the unexpected, which this operation seemed to actively avoid. It was the lack of pressure, the very absence of friction, that created a strange tension in the air. The mission could be over, he thought, in minutes, yet he continued his preparations without haste. This sense of unease was far more uncomfortable than any physical danger. He felt a strange sense of foreboding that went beyond the typical risk associated with any mission."
(string)


title
"A Routine Assignment"
(string)



1
(map)


chapterNumber
2
(number)


content
"Seraph arrived at Bellweather's apartment building. The building itself was unremarkable, a typical residential structure in a quiet suburb. There was no sign of increased security. There were no ominous shadows lurking in the alleys, no sense of foreboding. Just ordinary, quiet suburban life. He waited, watching Bellweather leave for his usual lunch break. The quiet, predictable rhythm of the day continued without a single hitch. There was no hint of tension, no unexpected events, no sudden changes in the pattern. This was far more unsettling than any ambush or sudden attack. As he followed Bellweather, Seraph noticed a young woman approach the target, their interaction seemingly amicable. The two chatted for a few minutes before Bellweather handed over a small package. This was not part of his briefing; the Agency had provided no details about a meeting with a third party. The lack of prior knowledge created a sense of uncertainty. This deviation from the expected plan was a shock, a small crack in the otherwise predictable facade of the mission. Seraph observed the woman’s features: an athletic build, sharp eyes, and a confident stride. Her demeanor was calm, almost nonchalant, yet Seraph felt a distinct air of professionalism about her. The encounter between Bellweather and the woman suggested a level of cooperation that was not anticipated. This slight deviation from the plan, though seemingly minor, introduced an element of uncertainty, a slight disruption in the otherwise smooth rhythm of his mission. The lack of immediate action gave him a moment to observe, to analyze. He noted the woman’s subtle movements, the way she held her bag, the slight twitch of her lip when Bellweather walked away. Every detail, however insignificant it may seem, could be a piece to the overall puzzle. Seraph realized this mission was not as straightforward as he initially thought. The encounter left him with more questions than answers, which wasn't usual in the world of covert operations. The predictable had become unexpected, and the calm had become subtly disruptive. He felt the need to recalibrate his strategy, to account for this new variable. It was not an increase in tension, but a shift in the status quo, a subtle yet significant alteration to the original mission parameters. The encounter was just the beginning. This was not the routine assignment he had expected."
(string)


title
"The Unexpected Encounter"
(string)



2
(map)


chapterNumber
3
(number)


content
"Seraph discreetly followed the woman, maintaining a safe distance. He had no idea who she was, nor her involvement in the operation. He found himself fascinated by the way she moved, as if always aware of her surroundings. Her instincts were sharp, her movements deliberate and practiced. The lack of overt friction between them was surprisingly calming. There was no sense of hostility, only a mutual awareness of each other's presence. They moved through the city with an almost balletic grace, their movements synchronized yet independent. Seraph marvelled at her composure; she was clearly an experienced professional, a formidable operative. The way she blended into the crowd was remarkable; she was practically invisible. He followed her trail, carefully watching as she approached a high-end technology firm. The shift from Bellweather's humble apartment to this upscale business indicated a significant shift in the operation's scale and complexity. The lack of direct confrontation was fascinating. This was not the typical chase scene, the typical high-stakes confrontation. There was a subtle rhythm to their movements, a harmony in their seemingly disparate actions. The woman's actions seemed deliberate, measured, almost contemplative. There was an elegance to her movements, a grace that was unexpected in the often brutal world of espionage. She seemed to move effortlessly through the crowd, always staying one step ahead. It was almost as if she knew she was being followed. There was no resistance, no tension, just a quiet, almost respectful observation. Seraph realized that he was not merely observing the mission but also, in some way, participating in a silent dance. She displayed an unusual calm, an almost complete absence of tension. The lack of conflict was a stark contrast to the norm, making this operation unique. He wondered about her motivations, her objective, and her connection to Bellweather. The quiet pursuit, void of friction, allowed him to appreciate the elegance of her movements, her calculated strategy, and her undeniable skill."
(string)


title
"Following the Trail"
(string)



3
(map)


chapterNumber
4
(number)


content
"Seraph discovered the woman was not working against him, but with him. She was an Agency operative, and the data chip wasn't stolen, but a carefully orchestrated piece of a larger mission. The apparent simplicity of retrieving the chip was a clever ruse, a well-laid trap for a far more significant threat. The lack of friction wasn't due to the ease of the task, but because they were both working towards the same goal, albeit unknowingly. The quiet calm he had felt initially was not dullness, but the quiet confidence of a perfectly executed plan. This unexpected revelation removed the sense of unease he felt at the beginning. The 'routine assignment' wasn't routine at all. The operation was not about recovering a stolen data chip; it was about uncovering a far more significant threat operating within the Agency itself. The apparent lack of conflict, the seamless coordination, was the hallmark of a meticulously planned operation. He and the woman, code-named 'Whisper,' had been working together, unknowingly, all along. The absence of friction was a testament to their shared skill and their mutual dedication to the Agency. They were both masters of their craft, both highly skilled and highly proficient, blending seamlessly into their surroundings. The realization was like a revelation, a sudden shift in perspective. The simplicity of the initial objective served as a perfect distraction, masking the true depth and complexity of the mission. The lack of outward conflict was not due to a simple task, but a well-orchestrated maneuver, a brilliant example of strategic deception. The shared understanding, the lack of friction between them, allowed them to work in perfect harmony, with an almost intuitive comprehension of each other's intentions. The mystery wasn't the missing chip, but the inner workings of the operation, the elaborate game of deception and counter-deception. The apparent tranquility concealed a complex network of intrigue, betrayal, and hidden agendas."
(string)


title
"Unraveling the Mystery"
(string)



4
(map)


chapterNumber
5
(number)


content
"Seraph and Whisper discovered a mole within their own organization. The mole was not only sabotaging missions but also leaking classified information to a rival agency. The lack of initial friction between them—the surprisingly harmonious nature of their initial assignment—was now a source of profound concern. It raised the question of how deeply rooted the mole's influence was within the Agency. How could such a significant threat have gone unnoticed for so long? The revelation plunged Seraph and Whisper into a world of deceit and betrayal. The atmosphere of trust and cooperation they had initially shared was shattered. Every colleague, every interaction, became suspect. They felt a cold dread creep into their hearts, realizing just how much they didn't know. The sense of ease that had initially characterized their mission was replaced with a deep sense of uncertainty. The mole's actions presented a significant threat not only to ongoing operations but also to the Agency's national security. This mole was more than a simple insider, a corrupt officer; this mole was a master of deception, capable of planting false clues, creating false leads, and sowing seeds of doubt and distrust. The revelation presented a challenge far greater than the initial retrieval of the data chip. The lack of outward friction, the initial harmony between Seraph and Whisper, was now a critical factor. It highlighted the depth of the infiltration, the masterful skill of the mole in creating an atmosphere of trust and security while simultaneously undermining the agency from within. The seemingly routine assignment served as a perfect camouflage for their true mission: exposing the mole and restoring the integrity of the Agency."
(string)


title
"The Double Agent"
(string)



5
(map)


chapterNumber
6
(number)


content
"Seraph and Whisper embarked on a covert operation to expose the mole. They moved with caution, relying on their combined skills and experience to track the mole's movements and uncover their connections. There was a sense of quiet determination, not the adrenaline-fueled chaos of past missions, but a deliberate, strategic approach. They worked in tandem, complementing each other's strengths, sharing information seamlessly, a quiet partnership born from shared understanding and mutual respect. They used their skills of observation, deception, and infiltration to penetrate the mole’s network. The quiet efficiency of their teamwork was impressive. It was a calculated dance of stealth and precision, a symphony of covert operations conducted with minimal friction. Their partnership had been unexpected, yet it was proving to be exceptionally effective. They moved through the shadows, unnoticed and unseen. The absence of obvious friction, the seamless coordination, allowed them to move with a grace and precision few could match. Every step was carefully calculated, every move perfectly synchronized. They collected evidence, piecing together a picture of the mole's actions, their motivations, and their network of contacts. There was no need for grand gestures, no need for flashy displays of force. Their pursuit was a quiet ballet of espionage. The absence of unnecessary tension, the smooth execution of their plan, was a testament to their experience and shared understanding. They worked as one, their movements fluid and coordinated, their actions complementing each other perfectly. Every piece of information they uncovered seemed to fit precisely into place, as if their actions had been preordained, a testament to their skill and intuition. The pursuit was a silent dance of cooperation and shared purpose, a silent ballet of covert operations."
(string)


title
"The Pursuit"
(string)



6
(map)


chapterNumber
7
(number)


content
"Seraph and Whisper successfully exposed the mole, bringing their operation to a successful conclusion. The mole was apprehended, the leak was stopped, and the Agency’s integrity restored. There was a quiet sense of satisfaction, not the triumphant roar of victory, but the quiet hum of a job well done. The lack of overt friction throughout the entire operation was striking. From the initial 'routine assignment' to the final capture, the mission had unfolded with surprising ease and efficiency. It was a testament to their planning, their skill, and their teamwork. The mole's apprehension brought a sense of closure, but also a reflection on the nature of their work. They had worked in harmony, a silent partnership based on shared understanding and mutual respect. The lack of friction in their collaboration had been essential to their success. Their combined expertise had been crucial in exposing the mole, restoring the agency’s integrity, and preventing further damage. The mission was not just about apprehending the mole; it was about restoring trust and faith within the Agency. The successful completion of the mission underscored the importance of trust and cooperation, even in the face of unexpected challenges. The ending was not a dramatic climax, but a quiet affirmation of their skills, their teamwork, and their shared commitment to the agency. The quiet resolution, however, was far from anticlimactic. It was a testament to their skill and preparation, a quiet triumph that spoke volumes about their dedication and efficiency. Their success was not marked by noise and fanfare, but by the silent, efficient restoration of order and stability."
(string)


title
"Resolution"
(string)


title
"Agent X"
(string)


coverImage



email



id



novelCategory
"Non-friction"



novelName
"Agent x"



userImage
"https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yckZQcG9xQ0N2cFBEaW5vVGZsNEpXbk5qS3AifQ"
(string)


username
"G-253 Viral makwana" always give in this format dont change the format of the generated contents`},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "##Haunted Adeline\n\n**Chapter 1: The Static of Silence**\n\nAdeline clutched the worn leather-bound journal, its pages brittle with age.  The air in the attic hung thick and heavy, a palpable silence punctuated only by the rhythmic creak of the old house settling around her. Dust motes danced in the single shaft of moonlight slicing through the grimy windowpane, illuminating the faded script within: \"The whispers began the night Papa died….\"\n\nAdeline’s breath hitched. Papa.  The memory – a blurry kaleidoscope of grief and a suffocating sense of…wrongness – felt as distant and unreal as the dusty landscape painted on the attic’s far wall.  She’d inherited Blackwood Manor, along with its secrets and its spectral resident, only a week ago.  The lawyer’s words echoed in her mind: “A peculiar clause in the will, Miss Adeline.  You must remain within the house’s boundaries for a full year, or forfeit your inheritance.”\n\nHer inheritance – a crumbling gothic monstrosity teeming with shadows and whispers, a place that felt less like a home and more like a cage.  And the whispers... they were real.\n\nThe journal chronicled her great-grandmother’s descent into madness, a chilling account of escalating paranoia, unsettling visions, and a growing obsession with a presence she called “the Static.”  The Static, the journal claimed, was a being that fed on silence, on the absence of human connection, twisting loneliness into a suffocating entity. It was a force, a feeling, a haunting that existed not in the tangible world but in the space between words, between heartbeats, between people.\n\nAdeline shivered, not from the cold, but from the unsettling familiarity of the journal’s descriptions.  She’d felt it too, this gnawing emptiness, this oppressive stillness that seeped into her bones, suffocating her joy, draining the colour from her world. Since arriving at Blackwood Manor, the silence was almost tangible; an oppressive blanket woven from cobwebs and forgotten memories.\n\n**Chapter 2: Echoes in the Walls**\n\nDays bled into weeks.  Adeline’s attempts to connect with the outside world were thwarted by a bizarre series of inconveniences – dead phone lines, undelivered mail, cars mysteriously breaking down on the long, winding drive leading to the manor.  The isolation was deliberate, as if some unseen force was actively keeping her confined within Blackwood s walls.\n\nShe tried to fight back.  She attempted to write, to paint, to fill the oppressive silence with creative expression, but the words felt flat, the colours dull, her inspiration choked by the pervasive presence of the Static.  Even her memories seemed to fade, replaced by a chilling emptiness.\n\nShe began to see things.  Flickering shadows in her peripheral vision, whispers just beyond hearing, the faint scent of decaying roses that seemed to appear and disappear without explanation. The house itself felt alive, its timbers groaning, its walls whispering secrets she couldn t quite grasp.  She found scratches on her bedroom door, inexplicable stains on her clothes, and objects moving on their own.\n\nThe friction wasn’t just between Adeline and the house; it was a friction within her own mind, a battle between sanity and the encroaching dread of the Static.\n\n**Chapter 3: The Mirror s Reflection**\n\nOne night, drawn by an irresistible compulsion, Adeline found herself standing before a tarnished antique mirror in the manor s grand hall.  As she stared into its clouded surface, the reflection rippled.  Not a physical distortion, but a distortion of her very being.  The reflection showed her, but older, wearier, her eyes hollowed, her expression haunted by an unbearable sorrow.\n\nThen, the reflection spoke, its voice a chilling echo of her own, yet tinged with despair so profound it brought her to her knees.  \"Don t fight it, Adeline.  Embrace the silence.  Let the Static consume you.  It s the only way…\"\n\nThe words resonated with a terrifying familiarity.  It was the voice of her great-grandmother, trapped within the mirror, a prisoner of the Static.  The reflection showed the end result of surrender.\n\n**[The novel would continue, exploring Adeline s struggle against the Static, her unraveling sanity, her attempts to break free from the house and the cyclical nature of the haunting.  The climax would involve a confrontation with the Static, perhaps revealed to be a manifestation of inherited trauma and isolation, and Adeline s ultimate choice: surrender to the silence or fight for her life, her sanity, and her inheritance.]**\n\n**[The ending would hinge on the friction between Adeline s will to survive and the relentless pressure of the Static, creating a sense of unease and ambiguity, leaving the reader questioning the true nature of the haunting and Adeline s ultimate fate. all the chapter must be more than 50 lines ]**\n"},
          ],
        },
      ],
    });
  
    