export interface Fact {
  id: string;
  emoji: string;
  text: string;
  category: string;
  color: string; // accent colour for the card
}

export const FACTS: Fact[] = [
  {
    id: "f1",
    emoji: "🔥",
    text: "The brain uses ~20% of your body's oxygen despite being only 2% of your body weight — making it by far the most metabolically expensive organ you own.",
    category: "Brain basics",
    color: "#FF6B35",
  },
  {
    id: "f2",
    emoji: "😨",
    text: "Ever wake from a nightmare feeling like the danger was real? Your amygdala — the brain's fear alarm — can stay activated after you wake up. Journaling helps because naming the fear recruits your prefrontal cortex, which calms the alarm.",
    category: "Emotions",
    color: "#9B59B6",
  },
  {
    id: "f3",
    emoji: "🦛",
    text: "The hippocampus is named after the Greek word for seahorse — because in cross-section, that's exactly what it looks like under a microscope.",
    category: "Brain anatomy",
    color: "#1CB0F6",
  },
  {
    id: "f4",
    emoji: "🎨",
    text: "Santiago Ramón y Cajal drew every neuron he discovered by hand in the 1880s — before practical photography existed. His artwork is still reproduced in neuroscience textbooks today, over 130 years later.",
    category: "History",
    color: "#FF9500",
  },
  {
    id: "f5",
    emoji: "🚕",
    text: "London taxi drivers must memorise thousands of streets in a feat called 'the Knowledge.' MRI scans found their hippocampus grew measurably larger after training — direct proof that sustained practice physically reshapes your brain.",
    category: "Neuroplasticity",
    color: "#58CC02",
  },
  {
    id: "f6",
    emoji: "👗",
    text: "Remember 'The Dress' — blue/black or white/gold? People who assumed daylight saw it as white/gold. People who assumed artificial light saw blue/black. Same pixels, completely different perception. Your brain isn't a camera — it's an interpreter.",
    category: "Perception",
    color: "#00DCFF",
  },
  {
    id: "f7",
    emoji: "🏂",
    text: "Olympic champion Eileen Gu treats her own brain like athletic equipment — she actively analyses her thought patterns and 'modifies' them as part of training. At 22, she said neuroplasticity was 'on her side.' The science agrees: brains keep rewiring throughout life.",
    category: "Neuroplasticity",
    color: "#FF4B4B",
  },
  {
    id: "f8",
    emoji: "🪱",
    text: "C. elegans — a tiny worm — has only 302 neurons. We've mapped every single connection it has. Yet it can navigate, find food, and avoid danger. A full human brain has 86 billion neurons. We've mapped almost none of it.",
    category: "Brain basics",
    color: "#58CC02",
  },
  {
    id: "f9",
    emoji: "🚽",
    text: "Action potentials are all-or-nothing — like flushing a toilet. Push gently: nothing. Push hard enough: full flush every time, same amount of water, regardless of how hard you pushed. Your neurons work exactly the same way.",
    category: "Neurons",
    color: "#FF9500",
  },
  {
    id: "f10",
    emoji: "👆",
    text: "There's a maximum speed at which you can wiggle your fingers — not because your muscles are slow, but because neurons have a refractory period: a mandatory pause between each spike. Your nerves physically cannot send signals faster than a certain rate.",
    category: "Neurons",
    color: "#9B59B6",
  },
  {
    id: "f11",
    emoji: "🌀",
    text: "Déjà vu happens because the hippocampus uses pattern-matching to recognise familiar situations. Sometimes it fires 'I've seen this before' even when you haven't — a false positive from a system that normally helps you navigate the world from memory.",
    category: "Memory",
    color: "#1CB0F6",
  },
  {
    id: "f12",
    emoji: "🐘",
    text: "Elephants have more neurons than humans — over 256 billion compared to our 86 billion. Yet we build cities and they don't. It's not neuron count that matters. It's how they're connected.",
    category: "Brain basics",
    color: "#FF6B35",
  },
  {
    id: "f13",
    emoji: "🧱",
    text: "The neocortex repeats the same 6-layer circuit over and over — from the visual cortex to the language areas. The same basic wiring motif underlies everything from seeing colours to reading this sentence.",
    category: "Brain anatomy",
    color: "#00DCFF",
  },
  {
    id: "f14",
    emoji: "🧬",
    text: "The large-scale wiring map of your brain is largely written in your DNA before you're born. Identical twins have strikingly similar connectivity patterns. Fraternal twins, much less so. Your genes build the roads. Experience writes the traffic.",
    category: "Development",
    color: "#FF4B4B",
  },
  {
    id: "f15",
    emoji: "🔋",
    text: "Every neuron is either excitatory (pushes other neurons toward firing) or inhibitory (pulls them away). This is Dale's Dogma — a neuron picks a side and sticks with it for life. The balance between these two forces is what keeps the brain from seizing or going silent.",
    category: "Neurons",
    color: "#58CC02",
  },
  {
    id: "f16",
    emoji: "🎾",
    text: "2026 Roland Garros final. Zverev's best — maybe only — real shot at his first Grand Slam. He's a nervous wreck. Four sets in, two all, he starts cramping.\n\nIn the post-match interview he said the cramping actually helped. Here's why.\n\nYour anterior cingulate cortex (ACC) receives inputs from two sources simultaneously: fear signals from the amygdala and pain signals from your body. Like any neuron, it computes a weighted sum of everything coming in. When his muscles started cramping, nociceptive signals flooded the ACC with such intensity that they dominated the sum — crowding out the anxiety signals from the amygdala.\n\nHe didn't calm down. His ACC just had a louder input to deal with. The cramps didn't distract him from the pressure. They gave his nervous system a problem it actually knew how to solve.",
    category: "Neuro in sports",
    color: "#FF6B35",
  },
  {
    id: "f17",
    emoji: "📉",
    text: "Why does everyone — whether they're training GPT or modeling a brain — obsess over derivatives? Because the derivative is the heart of gradient descent, the way essentially every model learns.\n\nTake GPT. You train it by shrinking its error — the gap between what it predicts and what's actually true. Show it 'the cat sat on the ___,' it guesses 'dog,' that's wrong, and you get an error.\n\nTo shrink that error, you tweak the model's parameters one by one, little by little — each time nudging them in the direction that lowers the error. That direction is exactly what the derivative tells you. And the smallest error sits where the derivative hits zero, the point where the slope flips its sign. Find that, and the model has learned.",
    category: "AI & the brain",
    color: "#7C82F8",
  },
  {
    id: "f18",
    emoji: "🎹",
    text: "Here's the wild part: scientists think your brain learns in a strikingly similar way to how AI does.\n\nPractice a tricky piano passage and hit a wrong note. Your brain registers an error signal — that's not what I meant to play — and quietly adjusts the strengths of the synapses involved, so next time you're a little closer.\n\nDo it a hundred times and the passage flows. It's not identical to the math an AI uses, but the principle is the same: use the error to nudge the knobs in the right direction. One idea — follow the slope downhill — may sit underneath AI, neuroscience models, and the way you learn anything at all.",
    category: "AI & the brain",
    color: "#1CB0F6",
  },
];
