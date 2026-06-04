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
];
