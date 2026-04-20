import type { World } from "./types";

// ─── World 1: Python Village ─────────────────────────────────

export const WORLDS: World[] = [
  {
    id: "world1",
    number: 1,
    title: "Python Village",
    subtitle: "Learn to speak the language of science",
    emoji: "🏘️",
    color: "#F59E0B",
    colorDark: "#B45309",
    totalXP: 280,
    quests: [
      // ── Quest 1.1 — What is Python? ────────────────────────
      {
        id: "w1q1",
        worldId: "world1",
        number: 1,
        title: "What is Python?",
        description: "Meet Python — the language neuroscientists love",
        totalXP: 25,
        lessons: [
          {
            id: "w1q1l1",
            questId: "w1q1",
            worldId: "world1",
            title: "Python: The Language of Science",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 3,
            concept: [
              {
                type: "highlight",
                content: "Python is the #1 language used in computational neuroscience, machine learning, and data science.",
              },
              {
                type: "text",
                content: "Think of Python as a very smart calculator that can remember things, follow instructions, and do millions of calculations per second.",
              },
              {
                type: "text",
                content: "At Neuromatch Academy, EVERY tutorial is written in Python. By the time you finish NeuroQuest, writing Python will feel natural.",
              },
              {
                type: "highlight",
                content: "🦌 Ilya says: NMA uses Python with numpy, scipy, and matplotlib. We'll master all three.",
              },
              {
                type: "code",
                content: "# This is Python!\nprint('Hello, Neuromatch!')\n# Output: Hello, Neuromatch!",
                caption: "Your first Python code. The # means 'comment' — Python ignores it.",
              },
            ],
          },
          {
            id: "w1q1l2",
            questId: "w1q1",
            worldId: "world1",
            title: "Variables: Storing Information",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 3,
            concept: [
              {
                type: "text",
                content: "A **variable** is like a labeled box. You put something inside it and give it a name so you can use it later.",
              },
              {
                type: "code",
                content: "membrane_voltage = -70  # millivolts (resting potential!)\nspike_threshold = -55\nneuron_name = 'Pyramidal Cell'\nis_firing = False",
                caption: "Variables store numbers, text, or true/false values.",
              },
              {
                type: "text",
                content: "Notice how variable names describe what they store. `membrane_voltage = -70` means 'the membrane voltage is -70 millivolts.' This is exactly how NMA code is written.",
              },
              {
                type: "highlight",
                content: "In Python, you don't need to declare a type — just write name = value.",
              },
            ],
          },
          {
            id: "w1q1l3",
            questId: "w1q1",
            worldId: "world1",
            title: "Quiz: Python Basics",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 15,
            estimatedMinutes: 4,
            questions: [
              {
                id: "w1q1l3q1",
                text: "What does this code do?\n\nspike_count = 42",
                options: [
                  "Deletes the number 42",
                  "Creates a variable named spike_count and stores the value 42",
                  "Prints the number 42 to the screen",
                  "Creates a function called spike_count",
                ],
                correctIndex: 1,
                explanation: "This creates a variable called spike_count and stores the number 42 inside it. You can use spike_count later in your code.",
                neuroConnection: "In NMA, you'll often store things like 'n_neurons = 100' or 'dt = 0.001' (time step in seconds).",
              },
              {
                id: "w1q1l3q2",
                text: "Which of these is a valid Python variable name?",
                options: [
                  "2spike_count",
                  "spike count",
                  "spike_count",
                  "spike-count",
                ],
                correctIndex: 2,
                explanation: "Variable names can't start with a number, can't have spaces, and can't use hyphens. Underscores (spike_count) are the way to go.",
                neuroConnection: "NMA uses variable names like membrane_potential, firing_rate, and time_step.",
              },
              {
                id: "w1q1l3q3",
                text: "What is a comment in Python?",
                options: [
                  "A line that the computer executes",
                  "A line starting with # that Python ignores — just for humans to read",
                  "A type of variable",
                  "A way to import libraries",
                ],
                correctIndex: 1,
                explanation: "Comments (lines starting with #) are notes for humans. Python skips them completely. Good comments make code understandable.",
                neuroConnection: "NMA code is full of comments explaining the neuroscience behind each step.",
              },
            ],
          },
        ],
      },

      // ── Quest 1.2 — Data Types ─────────────────────────────
      {
        id: "w1q2",
        worldId: "world1",
        number: 2,
        title: "Numbers, Text & Truth",
        description: "The three basic types of data in Python",
        totalXP: 30,
        lessons: [
          {
            id: "w1q2l1",
            questId: "w1q2",
            worldId: "world1",
            title: "Numbers: int and float",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 3,
            concept: [
              {
                type: "text",
                content: "Python has two types of numbers:\n• **int** — whole numbers: 1, 42, -70\n• **float** — decimal numbers: 3.14, -70.5, 0.001",
              },
              {
                type: "code",
                content: "n_neurons = 100        # int — whole number\ndt = 0.001             # float — time step (1 ms)\nV_rest = -70.0         # float — resting potential in mV\n\nprint(type(n_neurons)) # <class 'int'>\nprint(type(dt))        # <class 'float'>",
                caption: "In NMA, you'll use floats for most neuroscience values (voltages, times, rates).",
              },
              {
                type: "text",
                content: "Math works exactly as you'd expect:\n```\n2 + 3    → 5    (addition)\n10 - 4   → 6    (subtraction)\n3 * 4    → 12   (multiplication)\n10 / 3   → 3.33 (division — always gives float)\n10 ** 2  → 100  (power: 10 squared)\n```",
              },
              {
                type: "highlight",
                content: "Pro tip: In Python, 10 / 3 = 3.333... (not 3). For whole-number division use 10 // 3 = 3.",
              },
            ],
          },
          {
            id: "w1q2l2",
            questId: "w1q2",
            worldId: "world1",
            title: "Strings and Booleans",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 3,
            concept: [
              {
                type: "text",
                content: "**Strings** are text — wrapped in quotes. **Booleans** are True or False.",
              },
              {
                type: "code",
                content: "neuron_type = 'excitatory'  # string\nbrain_region = \"hippocampus\"  # also string — both ' and \" work\n\nis_refractory = True   # boolean — neuron is in refractory period\nis_spiking = False     # boolean — not currently firing",
                caption: "Strings hold text. Booleans hold yes/no values.",
              },
              {
                type: "text",
                content: "Booleans come from comparisons:\n```python\n5 > 3    → True\n10 == 10 → True   (== means 'equal to')\n7 != 7   → False  (!= means 'not equal to')\nV > -55  → True if voltage is above threshold\n```",
              },
              {
                type: "highlight",
                content: "= means 'assign'. == means 'compare'. Common mistake: `if x = 5` is wrong. Use `if x == 5`.",
              },
            ],
          },
          {
            id: "w1q2l3",
            questId: "w1q2",
            worldId: "world1",
            title: "Flashcards: Data Types",
            type: "flashcard",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 4,
            cards: [
              {
                id: "w1q2l3c1",
                front: "What Python type stores whole numbers like 42 or -70?",
                back: "int (integer)\n\nExample: n_spikes = 42",
              },
              {
                id: "w1q2l3c2",
                front: "What Python type stores decimal numbers like 3.14 or -70.5?",
                back: "float\n\nExample: membrane_voltage = -70.5",
              },
              {
                id: "w1q2l3c3",
                front: "What are the only two values a boolean can have?",
                back: "True and False (capital T and F!)\n\nExample: is_spiking = False",
              },
              {
                id: "w1q2l3c4",
                front: "What is the difference between = and == in Python?",
                back: "= assigns a value: x = 5\n== compares values: x == 5 → True or False",
              },
              {
                id: "w1q2l3c5",
                front: "In Python, what does 10 / 3 give you?",
                back: "3.3333... (a float, not 3)\n\nFor whole number division: 10 // 3 → 3",
              },
            ],
          },
        ],
      },

      // ── Quest 1.3 — Lists ──────────────────────────────────
      {
        id: "w1q3",
        worldId: "world1",
        number: 3,
        title: "Lists: Collections of Data",
        description: "Store many values in one place — like a spike train",
        totalXP: 30,
        lessons: [
          {
            id: "w1q3l1",
            questId: "w1q3",
            worldId: "world1",
            title: "What is a List?",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 3,
            concept: [
              {
                type: "text",
                content: "A **list** stores many values in order, in a single variable. In neuroscience, think of it like a **spike train** — a sequence of spike times.",
              },
              {
                type: "code",
                content: "# A spike train: times when a neuron fired (in ms)\nspike_times = [10, 25, 42, 67, 89, 103]\n\n# A list can hold any type\nneuron_ids = [0, 1, 2, 3, 4]\nbrain_regions = ['V1', 'V2', 'PFC', 'hippocampus']\nvoltages = [-70.0, -68.5, -55.0, 20.0, -70.0]",
                caption: "Lists use square brackets [ ] and commas between items.",
              },
              {
                type: "text",
                content: "**Indexing** — accessing items by position (starting from 0!):\n```python\nspike_times = [10, 25, 42, 67]\nspike_times[0]  → 10   # first item\nspike_times[1]  → 25   # second item\nspike_times[-1] → 67   # last item\n```",
              },
              {
                type: "highlight",
                content: "Python counts from 0, not 1! This trips up beginners. The first item is at index [0].",
              },
            ],
          },
          {
            id: "w1q3l2",
            questId: "w1q3",
            worldId: "world1",
            title: "List Operations",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 3,
            concept: [
              {
                type: "text",
                content: "Useful things you can do with lists:",
              },
              {
                type: "code",
                content: "spikes = [10, 25, 42]\n\n# How long is the list?\nlen(spikes)        # → 3\n\n# Add a new spike time\nspikes.append(67)  # spikes is now [10, 25, 42, 67]\n\n# Slicing: get a portion\nspikes[1:3]        # → [25, 42]  (items at index 1 and 2)\n\n# Get the max and min\nmax(spikes)        # → 67\nmin(spikes)        # → 10",
                caption: "len(), append(), and slicing are used constantly in NMA.",
              },
              {
                type: "highlight",
                content: "Slicing [start:end] includes start but excludes end. So [1:3] gives items at index 1 and 2, not 3.",
              },
            ],
          },
          {
            id: "w1q3l3",
            questId: "w1q3",
            worldId: "world1",
            title: "Quiz: Lists",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 4,
            questions: [
              {
                id: "w1q3l3q1",
                text: "What is the output of this code?\n\nspikes = [10, 25, 42, 67]\nprint(spikes[0])",
                options: ["25", "10", "1", "42"],
                correctIndex: 1,
                explanation: "Python indexing starts at 0. spikes[0] gives the first element, which is 10.",
                neuroConnection: "When you have a list of spike times, spike_times[0] gives you the first spike time — the moment the neuron first fired.",
              },
              {
                id: "w1q3l3q2",
                text: "What does len([5, 10, 15, 20]) return?",
                options: ["20", "3", "4", "15"],
                correctIndex: 2,
                explanation: "len() counts how many items are in the list. There are 4 items: 5, 10, 15, 20.",
                neuroConnection: "len(spike_times) tells you how many times a neuron fired — its total spike count.",
              },
              {
                id: "w1q3l3q3",
                text: "After running:\nspikes = [10, 25, 42]\nspikes.append(67)\n\nWhat is spikes?",
                options: [
                  "[67, 10, 25, 42]",
                  "[10, 25, 42]",
                  "[10, 25, 42, 67]",
                  "Error",
                ],
                correctIndex: 2,
                explanation: "append() adds an item to the END of a list. So spikes becomes [10, 25, 42, 67].",
                neuroConnection: "In a neural simulation, you'd do spike_times.append(t) every time the neuron crosses threshold.",
              },
            ],
          },
        ],
      },

      // ── Quest 1.4 — Loops ──────────────────────────────────
      {
        id: "w1q4",
        worldId: "world1",
        number: 4,
        title: "For Loops",
        description: "Do the same thing many times — simulate 1000 neurons",
        totalXP: 80,
        lessons: [
          {
            id: "w1q4l0",
            questId: "w1q4",
            worldId: "world1",
            title: "F-Strings: Talking to Python",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 3,
            concept: [
              {
                type: "text",
                content: "Before we get to loops, you need to know one small trick that will appear everywhere: **f-strings**.\n\nAn f-string lets you plug a variable directly into a piece of text. You put an `f` before the quote marks, then wrap any variable in `{curly braces}`.",
              },
              {
                type: "code",
                content: "t = 10\n\n# Without f — Python treats {t} as plain text\nprint('Spike at {t} ms')   # Spike at {t} ms\n\n# With f — Python replaces {t} with the actual value\nprint(f'Spike at {t} ms')  # Spike at 10 ms",
                caption: "The f activates the slots. Without it, {t} is just four characters on screen.",
              },
              {
                type: "text",
                content: "Think of it like a **Mad Libs template**. The `f` turns on the blanks, and `{variable}` marks where each value goes.\n\nYou can put any variable — or even a calculation — inside the curly braces:",
              },
              {
                type: "code",
                content: "voltage = -52.3\nneuron_id = 7\n\nprint(f'Neuron {neuron_id} voltage: {voltage} mV')\n# Neuron 7 voltage: -52.3 mV\n\nprint(f'Double the voltage: {voltage * 2} mV')\n# Double the voltage: -104.6 mV",
                caption: "You can do math right inside the curly braces. Python evaluates it first, then slots the result in.",
              },
              {
                type: "highlight",
                content: "F-strings are used everywhere in NMA notebooks — any time a result gets printed, it almost always uses this pattern. Now you'll know exactly what that f means.",
              },
            ],
          },
          {
            id: "w1q4l0q",
            questId: "w1q4",
            worldId: "world1",
            title: "Check: F-Strings",
            type: "fillin",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 2,
            fillQuestions: [
              {
                id: "w1q4l0q1",
                prompt: "Add the missing letter to make this print the actual value of voltage:",
                codeTemplate: "voltage = -52\nprint(___'Voltage: {voltage} mV')",
                answer: "f",
                explanation: "The f before the quote activates f-string mode. Without it, {voltage} is printed as plain text instead of the actual value.",
              },
              {
                id: "w1q4l0q2",
                prompt: "Complete the f-string so it prints: 'Neuron 3 fired!'",
                codeTemplate: "n = 3\nprint(f'Neuron ___ fired!')",
                answer: "{n}",
                explanation: "Curly braces {} around a variable name tell Python to insert the variable's value at that spot in the string.",
              },
              {
                id: "w1q4l0q3",
                prompt: "What goes inside the curly braces to print the spike time?",
                codeTemplate: "t = 42\nprint(f'Spike at {___} ms')",
                answer: "t",
                explanation: "You put the variable name inside the curly braces. Python looks up the value of t (which is 42) and slots it in — printing 'Spike at 42 ms'.",
              },
            ],
          },
          {
            id: "w1q4l1",
            questId: "w1q4",
            worldId: "world1",
            title: "The For Loop",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 3,
            concept: [
              {
                type: "text",
                content: "A **for loop** says: *do this thing for every item in a list, one at a time.*\n\nInstead of writing the same line of code over and over, you write it once — and Python repeats it automatically for each item.",
              },
              {
                type: "code",
                content: "# Loop over a spike train\nspike_times = [10, 25, 42, 67]\nfor t in spike_times:\n    print(f'Spike at {t} ms')\n\n# Output:\n# Spike at 10 ms\n# Spike at 25 ms\n# Spike at 42 ms\n# Spike at 67 ms",
                caption: "Each time through the loop, t takes the next value from the list. It runs 4 times — once for t=10, once for t=25, and so on.",
              },
              {
                type: "text",
                content: "**range()** is a shortcut for generating a sequence of numbers. Instead of writing out `[0, 1, 2, 3, 4]` by hand, you just write `range(5)` and Python creates it for you.",
              },
              {
                type: "code",
                content: "for i in range(5):\n    print(i)\n# prints: 0, 1, 2, 3, 4",
                caption: "range(5) starts at 0 and stops before 5. It gives you exactly 5 numbers.",
              },
              {
                type: "text",
                content: "**Why do neuroscientists love for loops?**\n\nThe brain doesn't work all at once — it works step by step through time. Every millisecond, billions of neurons update their voltage, check if they should fire, and send signals.\n\nWhen you build a neuron model in NMA, you simulate this exact process. You loop over every millisecond of time, and at each step you ask: *did the neuron fire?*",
              },
              {
                type: "code",
                content: "# Simulate a neuron for 1 second (1000 ms)\nfor t in range(1000):\n    # at each millisecond:\n    # - update membrane voltage\n    # - check if it crossed the threshold\n    # - if yes, record a spike\n    pass",
                caption: "Every NMA neuron model you'll see is built around a loop like this. The loop IS the simulation.",
              },
              {
                type: "highlight",
                content: "Indentation matters in Python! Code inside a loop MUST be indented (4 spaces or 1 tab). It tells Python what's 'inside' the loop and what runs after it finishes.",
              },
            ],
          },
          {
            id: "w1q4l1q",
            questId: "w1q4",
            worldId: "world1",
            title: "Check: For Loops",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 3,
            questions: [
              {
                id: "w1q4l1q1",
                text: "How many times does this loop run?\n\nspike_times = [10, 25, 42]\nfor t in spike_times:\n    print(t)",
                options: ["1 time", "2 times", "3 times", "42 times"],
                correctIndex: 2,
                explanation: "The loop runs once for each item in the list. spike_times has 3 items — so it runs 3 times, printing 10, then 25, then 42.",
              },
              {
                id: "w1q4l1q2",
                text: "What does range(5) produce?",
                options: ["1, 2, 3, 4, 5", "0, 1, 2, 3, 4", "0, 1, 2, 3, 4, 5", "5"],
                correctIndex: 1,
                explanation: "range(5) starts at 0 and stops before 5 — giving you exactly 5 numbers: 0, 1, 2, 3, 4.",
                neuroConnection: "range(1000) gives you 1000 time steps — one for each millisecond in a 1-second neuron simulation.",
              },
              {
                id: "w1q4l1q3",
                text: "Which of these will cause an error?",
                options: [
                  "for t in range(3):\n    print(t)",
                  "for t in range(3):\nprint(t)",
                  "for t in [1, 2, 3]:\n    print(t)",
                  "for t in range(1000):\n    pass",
                ],
                correctIndex: 1,
                explanation: "The second option is missing indentation. Python requires that code inside a loop is indented — otherwise you get an IndentationError.",
              },
            ],
          },
          {
            id: "w1q4l1f",
            questId: "w1q4",
            worldId: "world1",
            title: "Type It: For Loops",
            type: "fillin",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 3,
            fillQuestions: [
              {
                id: "w1q4l1f1",
                prompt: "Complete the loop so it repeats for each item in spike_times:",
                codeTemplate: "spike_times = [10, 25, 42]\n___ t in spike_times:\n    print(t)",
                answer: "for",
                explanation: "The for keyword starts the loop. It tells Python: go through each item in the list, one at a time.",
              },
              {
                id: "w1q4l1f2",
                prompt: "Fill in the blank to loop over 1000 time steps (0 to 999):\n\n💡 Note: pass is a Python keyword that means 'do nothing' — it's a placeholder. You use it when you need a statement but haven't written the real code yet. Later, you'd replace pass with actual code like voltage = calculate_voltage(t).",
                codeTemplate: "for t in ___(1000):\n    pass  # simulate neuron at time t",
                answer: "range",
                explanation: "range(1000) generates the numbers 0, 1, 2, ... 999 — giving you 1000 time steps without writing them all out by hand.",
              },
              {
                id: "w1q4l1f3",
                prompt: "This loop should print each spike time. What variable goes in the f-string?",
                codeTemplate: "for t in [10, 25, 42]:\n    print(f'Spike at {___} ms')",
                answer: "t",
                explanation: "t is the loop variable — it takes a new value from the list on each iteration. So {t} in the f-string prints 10, then 25, then 42.",
              },
            ],
          },
          {
            id: "w1q4l2",
            questId: "w1q4",
            worldId: "world1",
            title: "If Statements",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 4,
            concept: [
              {
                type: "text",
                content: "An **if statement** makes a decision. It runs a block of code only when a condition is True — and skips it when the condition is False.\n\nHere is the structure:",
              },
              {
                type: "code",
                content: "if CONDITION:\n    # code that runs when condition is True\nelse:\n    # code that runs when condition is False",
                caption: "The colon : after the condition is required. The indented lines below it are what gets run.",
              },
              {
                type: "text",
                content: "A simple example — checking if a number is positive:",
              },
              {
                type: "code",
                content: "x = 10\n\nif x > 0:\n    print('positive')\nelse:\n    print('not positive')\n\n# prints: positive",
                caption: "x > 0 is the condition. Python checks if it's True or False, then runs the matching block.",
              },
              {
                type: "text",
                content: "**Now the neuroscience part.**\n\nNeurons have a membrane voltage (think of it as electrical pressure inside the cell). When that voltage rises above a threshold — around −55 mV — the neuron fires an **action potential**, also called a spike.\n\nBelow the threshold: silence. Above it: fire.",
              },
              {
                type: "code",
                content: "V = -52          # current membrane voltage (mV)\nthreshold = -55  # firing threshold (mV)\n\nif V > threshold:\n    print('Neuron fires!')\nelse:\n    print('Neuron is silent')\n\n# -52 > -55 is True (less negative = higher voltage)\n# prints: Neuron fires!",
                caption: "−52 is higher than −55 on the number line, so the condition is True and the neuron fires.",
              },
              {
                type: "text",
                content: "**What is .append()?**\n\nWhen a neuron fires, you want to *remember when it happened*. `.append()` adds a new item to the end of a list — like writing a new entry in a diary.\n\n`spike_times` is a list that collects every moment the neuron fires.",
              },
              {
                type: "code",
                content: "spike_times = []  # start with empty list\n\nt = 42  # current time in ms\nspike_times.append(t)  # add 42 to the list\n\nt = 67\nspike_times.append(t)  # add 67 to the list\n\nprint(spike_times)  # [42, 67]",
                caption: ".append(t) means: add the current time t to the end of the spike_times list.",
              },
              {
                type: "text",
                content: "**Putting it all together** — this is almost exactly how NMA simulates a neuron:",
              },
              {
                type: "code",
                content: "spike_times = []\n\nfor t in range(1000):                      # loop over each ms\n    # Voltage changes based on input stimulus over time\n    if 200 <= t < 700:                      # stimulus arrives from t=200 to t=700\n        V = -50                              # voltage rises when stimulus is present\n    else:\n        V = -65                              # resting voltage\n    \n    threshold = -55\n    \n    if V > threshold:                       # did the neuron fire?\n        spike_times.append(t)                # yes — record the time\n\nprint(f'Total spikes: {len(spike_times)}')",
                caption: "Now V depends on t! When stimulus is present (t=200–700), voltage rises above threshold and the neuron fires. This is how real neurons work: they respond to input that changes over time.",
              },
              {
                type: "highlight",
                content: "The pattern loop + if + append is the skeleton of almost every neuron simulation you will see in NMA. Master this and the rest will feel familiar.",
              },
            ],
          },
          {
            id: "w1q4l3",
            questId: "w1q4",
            worldId: "world1",
            title: "Quiz: Loops & Conditionals",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 4,
            questions: [
              {
                id: "w1q4l3q1",
                text: "What does range(4) produce?",
                options: [
                  "1, 2, 3, 4",
                  "0, 1, 2, 3",
                  "0, 1, 2, 3, 4",
                  "4",
                ],
                correctIndex: 1,
                explanation: "range(4) produces 0, 1, 2, 3. It starts at 0 and stops before 4 — giving 4 numbers total.",
                neuroConnection: "range(T) is used in NMA to simulate T milliseconds of neural activity.",
              },
              {
                id: "w1q4l3q2",
                text: "What happens if the indentation is missing?\n\nfor t in range(3):\nprint(t)",
                options: [
                  "It prints 0, 1, 2",
                  "It prints nothing",
                  "It causes a syntax error",
                  "It prints t three times",
                ],
                correctIndex: 2,
                explanation: "Python requires indentation to show what's 'inside' the loop. Missing it causes an IndentationError.",
              },
              {
                id: "w1q4l3q3",
                text: "V = -52; threshold = -55\nif V > threshold:\n    print('spike')\n\nWhat prints?",
                options: [
                  "Nothing — V is less than threshold",
                  "spike",
                  "Error",
                  "False",
                ],
                correctIndex: 1,
                explanation: "-52 > -55 is True (less negative = higher voltage). So 'spike' is printed.",
                neuroConnection: "The spike threshold in neurons is typically around -55 mV. When voltage exceeds this, the neuron fires an action potential.",
              },
            ],
          },
        ],
      },

      // ── Quest 1.5 — Functions ──────────────────────────────
      {
        id: "w1q5",
        worldId: "world1",
        number: 5,
        title: "Functions",
        description: "Write reusable code — your first neuron model",
        totalXP: 35,
        lessons: [
          {
            id: "w1q5l1",
            questId: "w1q5",
            worldId: "world1",
            title: "Defining Functions",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 3,
            concept: [
              {
                type: "text",
                content: "A **function** is a named block of code you can run any time, with different inputs. In NMA, almost every computation is a function.",
              },
              {
                type: "code",
                content: "# Define a function\ndef firing_rate(n_spikes, duration_ms):\n    \"\"\"Calculate mean firing rate in Hz.\"\"\"\n    return (n_spikes / duration_ms) * 1000\n\n# Call the function\nrate = firing_rate(42, 1000)  # 42 spikes in 1 second\nprint(f'Firing rate: {rate} Hz')  # 42.0 Hz",
                caption: "def starts a function. Parameters go in parentheses. return sends back the result.",
              },
              {
                type: "text",
                content: "Functions can have **default parameters** — values used if you don't provide them. They also have a **docstring** (triple quotes) that explains what they do:",
              },
              {
                type: "code",
                content: "def lif_neuron(I, R=10, V_rest=-70, threshold=-55):\n    \"\"\"Simple model of a neuron firing.\n    \n    Think of it like this: a neuron sits at rest, gets stimulated by input,\n    and if it gets stimulated enough, it fires a spike.\n    \n    Parameters (inputs you provide):\n        I: input current — how much stimulation the neuron gets (YOU change this)\n        R: resistance — how the neuron's biology responds (preset: 10)\n        V_rest: resting voltage — voltage when neuron is relaxed (preset: -70 mV)\n        threshold: spike threshold — voltage needed to fire (preset: -55 mV)\n    \n    Returns:\n        True if neuron fires (voltage crosses threshold)\n        False if neuron stays quiet (voltage below threshold)\n    \"\"\"\n    # Calculate the neuron's voltage based on input\n    V = V_rest + I * R        # voltage = rest + (stimulation × resistance)\n    \n    # Check: did this voltage cross the threshold?\n    return V > threshold       # Returns True or False (not the voltage itself)",
                caption: "The docstring explains what the function does in plain English. Only I (input) usually changes — the rest are preset based on the neuron's biology.",
              },
              {
                type: "highlight",
                content: "Always write a docstring for your functions! It tells other scientists (and future you) what the code does. In NMA notebooks, you'll see this pattern constantly.",
              },
            ],
          },
          {
            id: "w1q5l2",
            questId: "w1q5",
            worldId: "world1",
            title: "Return vs Print: Critical for NMA",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 5,
            concept: [
              {
                type: "highlight",
                content: "🚨 This is THE most important concept about functions. Getting this wrong will break your neural simulations!",
              },
              {
                type: "heading",
                content: "Two Types of Functions: Return vs Do Something",
              },
              {
                type: "text",
                content: "Not every function needs return. It depends on what you want to do with the result.",
              },
              {
                type: "heading",
                content: "Type 1: Functions that RETURN a value",
              },
              {
                type: "code",
                content: "def firing_rate(n_spikes, duration):\n    \"\"\"Calculate firing rate in Hz.\"\"\"\n    rate = n_spikes / duration\n    return rate  # ← Gives the value back to use it\n\n# Use the returned value\nmy_rate = firing_rate(42, 1)  # my_rate = 42.0\nprint(f'Rate is {my_rate} Hz')  # Now I can USE it",
                caption: "Use RETURN when: You need the result to use in your code (like computing voltage, spike rate, etc.)",
              },
              {
                type: "heading",
                content: "Type 2: Functions that just DO something",
              },
              {
                type: "code",
                content: "def print_greeting(name):\n    \"\"\"Print a greeting message.\"\"\"\n    print(f\"Hello {name}!\")\n    # No return - just performs an action\n\n# Call it\nprint_greeting('Alice')  # Prints: Hello Alice!\n# But you get nothing back to use",
                caption: "Use NO RETURN when: The function just needs to print, save, or modify something",
              },
              {
                type: "heading",
                content: "🧠 Mental Model: Restaurant Analogy",
              },
              {
                type: "highlight",
                content: "• `print(answer)` = Waiter SHOUTS the answer to the whole restaurant (everyone hears it, but you get nothing)\n• `return answer` = Waiter HANDS YOU the plate (you can keep it and use it)",
              },
              {
                type: "heading",
                content: "Why This MATTERS for NMA",
              },
              {
                type: "text",
                content: "In neural simulations, you MUST use return because you're building a chain of computations:",
              },
              {
                type: "text",
                content: "1. **Compute firing rate** → need to RETURN it → use it in next calculation\n2. **Calculate voltage** → need to RETURN it → use it to check for spikes\n3. **Simulate one time step** → need to RETURN state → use it in next iteration",
              },
              {
                type: "code",
                content: "# NMA example: LIF Neuron simulation\ndef lif_step(V, I, dt, tau=20, V_rest=-70, R=10):\n    \"\"\"Simulate one time step of a neuron.\n    \n    Must RETURN the new voltage because the next iteration needs it!\n    \"\"\"\n    dV = (-(V - V_rest) + R * I) / tau  # change in voltage\n    V_new = V + dV * dt                  # new voltage\n    return V_new  # ← CRITICAL! Next iteration uses this\n\n# Use it in a loop\nV = -70  # start at rest\nfor t in range(1000):\n    V = lif_step(V, I=2, dt=0.1)  # ← MUST return V for next iteration\n    if V > -55:  # threshold\n        print(f'Spike at t={t}')",
                caption: "If lif_step didn't return V, the loop would break! Each step needs the previous step's result.",
              },
              {
                type: "heading",
                content: "Quick Rule of Thumb",
              },
              {
                type: "highlight",
                content: "❓ **Computing something?** → Use `return`\n❓ **Just doing something?** → Don't need `return`\n\nIf you're building a chain of calculations (like neural simulation), **always return**.",
              },
            ],
          },
          {
            id: "w1q5l3",
            questId: "w1q5",
            worldId: "world1",
            title: "Quiz: Functions",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 3,
            questions: [
              {
                id: "w1q5l2q1",
                text: "What keyword starts a function definition in Python?",
                options: ["function", "define", "def", "fn"],
                correctIndex: 2,
                explanation: "'def' starts a function in Python. Example: def my_function():",
              },
              {
                id: "w1q5l2q2",
                text: "What does 'return' do in a function?",
                options: [
                  "Prints a value to the screen",
                  "Ends the program",
                  "Sends a value back to whoever called the function",
                  "Stores a value in a variable",
                ],
                correctIndex: 2,
                explanation: "return sends a value back. Without it, the function returns None. Most useful functions return something.",
                neuroConnection: "In NMA: def membrane_voltage(I): return V_rest + I * R_m — the function returns the computed voltage.",
              },
              {
                id: "w1q5l2q3",
                text: "def add(a, b):\n    return a + b\n\nWhat does add(3, 4) return?",
                options: ["34", "7", "a + b", "Error"],
                correctIndex: 1,
                explanation: "a=3, b=4, so a + b = 7. The function returns 7.",
              },
            ],
          },
          {
            id: "w1q5l4",
            questId: "w1q5",
            worldId: "world1",
            title: "Coding Mission: Your First Neuron",
            type: "coding",
            deviceRequired: "laptop",
            xpReward: 25,
            estimatedMinutes: 15,
            codingMission: {
              id: "cm-w1q5",
              title: "Your First Neuron Function",
              description:
                "Write a Python function that computes whether a neuron fires, given an input current.\n\nA neuron fires when its membrane voltage exceeds -55 mV.\n\nThe voltage is: V = V_rest + I × R\n• V_rest = -70 mV (resting potential)\n• R = 10 MΩ (membrane resistance)\n• I = input current (in nA)\n\nReturn True if the neuron fires, False if it doesn't.",
              starterCode: `def does_neuron_fire(I):
    """
    Determine if a neuron fires given input current I (in nA).

    Parameters
    ----------
    I : float
        Input current in nanoamps (nA)

    Returns
    -------
    bool
        True if the neuron fires, False otherwise
    """
    V_rest = -70       # resting potential (mV)
    R = 10             # membrane resistance (MΩ)
    threshold = -55    # spike threshold (mV)

    # TODO: Compute the membrane voltage
    V = ???

    # TODO: Return True if V exceeds threshold
    return ???

# Test your function
print(does_neuron_fire(I=2))   # Should print True  (V = -70 + 2*10 = -50 > -55)
print(does_neuron_fire(I=1))   # Should print False (V = -70 + 1*10 = -60 < -55)
print(does_neuron_fire(I=1.5)) # Should print True  (V = -70 + 1.5*10 = -55 = threshold)
`,
              solution: `def does_neuron_fire(I):
    V_rest = -70
    R = 10
    threshold = -55
    V = V_rest + I * R
    return V >= threshold

print(does_neuron_fire(I=2))    # True
print(does_neuron_fire(I=1))    # False
print(does_neuron_fire(I=1.5))  # True
`,
              testCode: `
assert does_neuron_fire(2) == True, "I=2 should fire"
assert does_neuron_fire(1) == False, "I=1 should not fire"
assert does_neuron_fire(1.5) == True, "I=1.5 should fire (at threshold)"
print("✅ All tests passed! +25 XP")
`,
              hints: [
                "V = V_rest + I * R. In Python: V = V_rest + I * R",
                "To check if V exceeds threshold: V >= threshold",
                "return V >= threshold gives you True or False automatically",
              ],
              xpReward: 25,
            },
          },
        ],
      },

      // ── Quest 1.6 — Numpy Intro ────────────────────────────
      {
        id: "w1q6",
        worldId: "world1",
        number: 6,
        title: "NumPy: Fast Arrays",
        description: "The power tool of scientific Python",
        totalXP: 35,
        lessons: [
          {
            id: "w1q6l1",
            questId: "w1q6",
            worldId: "world1",
            title: "Why NumPy?",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 3,
            concept: [
              {
                type: "text",
                content: "**NumPy** (Numerical Python) is the foundation of all scientific Python. It makes working with large arrays of numbers incredibly fast.",
              },
              {
                type: "text",
                content: "Python lists are flexible but slow. NumPy arrays are:\n• **100–1000x faster** for math operations\n• Can do math on the whole array at once\n• Used by scipy, matplotlib, pandas — everything NMA uses",
              },
              {
                type: "code",
                content: "import numpy as np  # always import numpy as np\n\n# Create an array of 1000 time steps (0 to 999 ms)\nt = np.arange(0, 1000)  # [0, 1, 2, ..., 999]\n\n# Create an array of 100 neurons, all at rest (-70 mV)\nV = np.full(100, -70.0)  # [-70. -70. -70. ... -70.]\n\nprint(t.shape)   # (1000,) — 1000 elements\nprint(V.shape)   # (100,)  — 100 elements",
                caption: "import numpy as np is the first line of almost every NMA notebook.",
              },
              {
                type: "highlight",
                content: "NMA fact: Every tutorial starts with 'import numpy as np'. You'll type this thousands of times.",
              },
            ],
          },
          {
            id: "w1q6l2",
            questId: "w1q6",
            worldId: "world1",
            title: "NumPy Operations",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 3,
            concept: [
              {
                type: "text",
                content: "The magic of NumPy: math on the whole array at once — no for loop needed.",
              },
              {
                type: "code",
                content: "import numpy as np\n\nV = np.array([-70.0, -68.5, -55.0, 20.0, -70.0])  # voltages\n\n# Math applies to EVERY element:\nV + 10         # [-60.  -58.5  -45.   30.  -60. ]\nV * 2          # [-140.  -137.  -110.   40.  -140.]\n\n# Statistics:\nnp.mean(V)     # mean voltage\nnp.std(V)      # standard deviation\nnp.max(V)      # peak voltage (spike!)\n\n# Boolean indexing — find spikes:\nspike_mask = V > -55              # [False False False True False]\n                                  # Check each voltage: above threshold?\nspike_V = V[spike_mask]           # [20.0]\n                                  # Give me only the voltages where mask is True",
                caption: "Boolean indexing is a filter. V[spike_mask] means: 'Extract only the elements where spike_mask is True'. This is how you find spikes in NMA — it's used constantly.",
              },
              {
                type: "highlight",
                content: "np.linspace(0, 1, 100) creates 100 evenly spaced points from 0 to 1. You'll use this for time arrays.",
              },
            ],
          },
          {
            id: "w1q6l3",
            questId: "w1q6",
            worldId: "world1",
            title: "Quiz: NumPy",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 15,
            estimatedMinutes: 4,
            questions: [
              {
                id: "w1q6l3q1",
                text: "How do you import NumPy correctly (the NMA standard way)?",
                options: [
                  "import NumPy",
                  "import numpy as np",
                  "from numpy import *",
                  "include numpy",
                ],
                correctIndex: 1,
                explanation: "'import numpy as np' is the universal convention. All NMA code uses 'np' as the shorthand.",
              },
              {
                id: "w1q6l3q2",
                text: "import numpy as np\na = np.array([1, 2, 3])\nprint(a * 2)",
                options: [
                  "[1, 2, 3, 1, 2, 3]",
                  "[2, 4, 6]",
                  "Error",
                  "6",
                ],
                correctIndex: 1,
                explanation: "NumPy multiplies EVERY element by 2. So [1, 2, 3] * 2 = [2, 4, 6]. No loop needed!",
                neuroConnection: "This is how you'd scale all firing rates by a factor: rates * 2 doubles every neuron's rate.",
              },
              {
                id: "w1q6l3q3",
                text: "What does np.arange(0, 5) produce?",
                options: [
                  "[1, 2, 3, 4, 5]",
                  "[0, 1, 2, 3, 4, 5]",
                  "[0, 1, 2, 3, 4]",
                  "[5]",
                ],
                correctIndex: 2,
                explanation: "np.arange(0, 5) creates [0, 1, 2, 3, 4] — starts at 0, stops before 5.",
                neuroConnection: "t = np.arange(0, 1000) creates a time array for a 1-second simulation in 1ms steps.",
              },
            ],
          },
        ],
      },

      // ── Quest 1.7 — Boss Battle ────────────────────────────
      {
        id: "w1q7",
        worldId: "world1",
        number: 7,
        title: "Boss Battle: Debug the Broken Neuron",
        description: "Fix the broken simulation code to defeat this world!",
        totalXP: 50,
        isBoss: true,
        lessons: [
          {
            id: "w1q7l1",
            questId: "w1q7",
            worldId: "world1",
            title: "Boss: Debug the Broken Neuron",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 50,
            estimatedMinutes: 10,
            questions: [
              {
                id: "w1q7l1q1",
                text: "The code below has a bug. Find it!\n\nspike_times = [10, 25, 42]\nprint(spike_times[3])",
                options: [
                  "No bug — it prints 42",
                  "Bug: IndexError — there is no index 3 (last index is 2)",
                  "Bug: should use spike_times(3)",
                  "Bug: spike_times should be a numpy array",
                ],
                correctIndex: 1,
                explanation: "📍 PYTHON COUNTS FROM 0!\n\nYour list: [10, 25, 42]\nIndices:     0   1   2\n\nspike_times[0]  → 10 ✓\nspike_times[1]  → 25 ✓\nspike_times[2]  → 42 ✓\nspike_times[3]  → ERROR! Doesn't exist\n\n━━━ WHY INDEXERROR? ━━━\nYou have 3 items (indices 0, 1, 2).\nThere is NO index 3.\n\n━━━ TRICK FOR LAST ITEM ━━━\nspike_times[-1]  → 42 (last item)\nspike_times[-2]  → 25 (second to last)\n\nNo counting needed! -1 always means \"last\".\n\n💡 Remember: Python starts at 0, not 1!",
              },
              {
                id: "w1q7l1q2",
                text: "This function has a bug:\n\ndef firing_rate(n_spikes, duration):\n    rate = n_spikes / duration\n    print(rate)\n\nresult = firing_rate(42, 1000)\nprint(result)",
                options: [
                  "Prints: 0.042 then 0.042",
                  "Prints: 0.042 then None",
                  "Error: can't divide",
                  "Prints: None then 0.042",
                ],
                correctIndex: 1,
                explanation: "📍 THE CORE DIFFERENCE:\n\nprint(x) = Shows x on screen (for you to read)\nreturn x = Gives x to the code (for you to USE)\n\n━━━ EXAMPLE ━━━\nresult = firing_rate(42, 1000)\n\nIF the function has print(rate):\n  → Screen shows: 0.042\n  → result = None (you got nothing!)\n\nIF the function has return rate:\n  → result = 0.042 (you can USE it!)\n  → Screen shows nothing\n\n━━━ SIMPLE RULE ━━━\n❓ Do you need the answer to use in your code?\n  → Use return\n\n❓ Do you just want to see it on screen?\n  → Use print\n\n━━━ FOR NMA ━━━\nNeural simulations MUST use return.\nYou compute voltage, then USE it in the next step:\n\nV_new = V + dV * dt  ← Needs the value\nif V > threshold:    ← Needs the value\n\nWithout return, this breaks!",
              },
              {
                id: "w1q7l1q3",
                text: "What's wrong with this loop?\n\nfor i in range(5)\n    print(i)",
                options: [
                  "range(5) should be range(0, 5)",
                  "Missing colon (:) after range(5)",
                  "print should be Print",
                  "Nothing is wrong",
                ],
                correctIndex: 1,
                explanation: "📍 THE COLON (:) RULE:\n\nColon = \"Start a block\"\n\n━━━ CORRECT ━━━\nfor i in range(5):\n    print(i)  ← Indented = INSIDE the for loop\n\n━━━ WRONG ━━━  \nfor i in range(5)\n    print(i)  ← SyntaxError! Missing colon\n\nPython needs the colon to know where the block starts.\n\n━━━ ALWAYS NEED COLON AFTER ━━━\nfor x in ...:     ← Loop\nif condition:     ← If statement\ndef function():   ← Function\n\nSIMPLE: Colon + indent = code block",
              },
              {
                id: "w1q7l1q4",
                text: "V = -70\nif V = -55:\n    print('threshold!')",
                options: [
                  "Prints: threshold!",
                  "Prints nothing (V isn't -55)",
                  "SyntaxError: use == for comparison, not =",
                  "Sets V to -55",
                ],
                correctIndex: 2,
                explanation: "📍 = vs == — ONE CHARACTER CHANGES EVERYTHING:\n\n= stores a value\n== checks if values match\n\n━━━ EXAMPLE ━━━\nV = -55      ← Puts -55 into V\n\nif V == -55:   ← Asks: \"Is V equal to -55?\" YES!\nif V = -55:    ← ERROR! Can't store in an if!\n\n━━━ SIMPLE ━━━\nUse =  for: V = 10  (storing)\nUse == for: if V == 10:  (checking)\n\nThat's it. Two different jobs, two different operators.",
              },
              {
                id: "w1q7l1q5",
                text: "import numpy as np\na = np.array([1, 2, 3])\nb = [4, 5, 6]\nprint(a + b)",
                options: [
                  "[1, 2, 3, 4, 5, 6]",
                  "[5, 7, 9]",
                  "Error: can't add array and list",
                  "[4, 10, 18]",
                ],
                correctIndex: 1,
                explanation: "📍 NUMPY ADDS ELEMENT-BY-ELEMENT:\n\nPython list:\n[1, 2, 3] + [4, 5, 6]  → [1, 2, 3, 4, 5, 6] (joins them)\n\nNumPy array:\nnp.array([1, 2, 3]) + [4, 5, 6]  → [5, 7, 9] (adds each pair!)\n\n━━━ WHY THIS IS A SUPERPOWER ━━━\nSimulating 100 neurons:\n\nWITHOUT NumPy:\nfor i in range(100):\n    V[i] = V[i] + dV_dt[i] * dt  ← Slow, 100 loops\n\nWITH NumPy:\nV = V + dV_dt * dt  ← Fast, one line does all 100!\n\nThat's it. That's why neuroscience uses NumPy.",
              },
            ],
          },
        ],
      },

      // ── Quest 1.8 — Matplotlib ─────────────────────────────
      {
        id: "w1q8",
        worldId: "world1",
        number: 8,
        title: "Matplotlib: Plot Like a Neuroscientist",
        description: "Visualize data the way NMA does",
        totalXP: 40,
        lessons: [
          {
            id: "w1q8l1",
            questId: "w1q8",
            worldId: "world1",
            title: "Why Plot? The Story Neurons Tell",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 4,
            concept: [
              {
                type: "text",
                content: "A neuron's story is told through plots. Raw numbers are meaningless — but a plot of voltage over time shows the entire action potential, spike pattern, and response to stimulation.\n\nMatplotlib is the tool neuroscientists use to turn data into stories.",
              },
              {
                type: "code",
                content: "import matplotlib.pyplot as plt\nimport numpy as np\n\n# Time and voltage data from a neuron simulation\nt = np.linspace(0, 1000, 1000)  # 1000 ms\nV = -70 + 20*np.sin(t/100)  # simplified oscillating voltage\n\nplt.figure(figsize=(10, 4))\nplt.plot(t, V, label='Membrane Voltage')\nplt.axhline(y=-55, color='r', linestyle='--', label='Threshold')\nplt.xlabel('Time (ms)')\nplt.ylabel('Voltage (mV)')\nplt.title('Neuron Dynamics Over Time')\nplt.legend()\nplt.show()",
                caption: "This is the template for EVERY neuron visualization in NMA. You'll modify it for each project, but the structure stays the same.",
              },
              {
                type: "text",
                content: "**Why neuroscientists care:**\n• **Debugging**: A plot reveals if your simulation is realistic. Bad math = obvious weird pattern.\n• **Intuition**: Equations are abstract. Plots show you what's actually happening.\n• **Communication**: When you present results to advisors, they ask 'show me a plot'. A good plot says in one image what 1000 words can't.",
              },
              {
                type: "highlight",
                content: "NMA Week 1: Your first project outputs will be plots. Week 2-4: You'll generate 10+ plots per project. Master plotting now and you're unstoppable.",
              },
            ],
          },
          {
            id: "w1q8l2",
            questId: "w1q8",
            worldId: "world1",
            title: "Building Your First Plot",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 4,
            concept: [
              {
                type: "text",
                content: "The anatomy of a matplotlib plot:",
              },
              {
                type: "code",
                content: "import matplotlib.pyplot as plt\n\n# Step 1: Create figure and axes\nfig, ax = plt.subplots(figsize=(8, 5))\n\n# Step 2: Plot data (ax.plot, ax.scatter, ax.hist, etc.)\nax.plot([1, 2, 3], [10, 20, 15], 'o-', color='blue', linewidth=2, label='Neuron A')\nax.plot([1, 2, 3], [12, 18, 19], 's-', color='red', linewidth=2, label='Neuron B')\n\n# Step 3: Labels and titles\nax.set_xlabel('Time (ms)', fontsize=12)\nax.set_ylabel('Firing Rate (Hz)', fontsize=12)\nax.set_title('Two Neurons Responding to the Same Stimulus', fontsize=14)\n\n# Step 4: Legend and cleanup\nax.legend(loc='best')\nax.grid(True, alpha=0.3)\n\nplt.tight_layout()\nplt.show()",
                caption: "This is the professional structure. fig/ax style scales to complex multi-panel figures. All NMA code uses this pattern.",
              },
              {
                type: "text",
                content: "**Plot types you'll use in NMA:**\n• `plot()` — line plots (voltage vs time)\n• `scatter()` — spike raster (when did neurons fire?)\n• `hist()` — distribution (how many spikes at each time?)\n• `imshow()` — heatmaps (population firing rates across time)\n• `errorbar()` — mean ± std (uncertainty in measurements)",
              },
              {
                type: "highlight",
                content: "Every plot needs: x-label, y-label, title, and legend (if multiple lines). Missing these = instant feedback from NMA instructors. These three lines keep you safe:\nax.set_xlabel(...)\nax.set_ylabel(...)\nax.set_title(...)",
              },
            ],
          },
          {
            id: "w1q8l3",
            questId: "w1q8",
            worldId: "world1",
            title: "Coding Mission: Plot a Neuron's Spike Train",
            type: "coding",
            deviceRequired: "laptop",
            xpReward: 20,
            estimatedMinutes: 12,
            codingMission: {
              id: "cm-w1q8",
              title: "Visualize a Neuron's Spike Train",
              description:
                "Write code that:\n1. Generates a list of spike times (when a neuron fired)\n2. Creates a scatter plot of spike times\n3. Properly labels and styles the plot like an NMA figure",
              starterCode: `import matplotlib.pyplot as plt\nimport numpy as np\n\n# Simulated spike times (milliseconds)\nspike_times = [10, 25, 42, 67, 89, 103, 125, 156, 178, 201]\n\n# Create figure\nfig, ax = plt.subplots(figsize=(10, 3))\n\n# TODO: Plot spike times on y-axis = 1, x-axis = spike_times\n# Use scatter() with marker='|', markersize=20\nax.scatter(???)\n\n# TODO: Set labels\nax.set_xlabel('???')\nax.set_ylabel('???')\nax.set_title('???')\n\n# TODO: Set y-axis limits so spike times look like a raster\nax.set_ylim(0.5, 1.5)\nax.set_yticks([])\n\nplt.tight_layout()\nplt.show()`,
              solution: `import matplotlib.pyplot as plt\nimport numpy as np\n\nspike_times = [10, 25, 42, 67, 89, 103, 125, 156, 178, 201]\n\nfig, ax = plt.subplots(figsize=(10, 3))\nax.scatter(spike_times, [1]*len(spike_times), marker='|', markersize=20, color='black')\n\nax.set_xlabel('Time (ms)', fontsize=12)\nax.set_ylabel('Neuron', fontsize=12)\nax.set_title('Spike Raster: When Did the Neuron Fire?', fontsize=14)\nax.set_ylim(0.5, 1.5)\nax.set_yticks([])\nax.grid(True, alpha=0.2, axis='x')\n\nplt.tight_layout()\nplt.show()`,
              testCode: `
import matplotlib.pyplot as plt
import numpy as np

spike_times = [10, 25, 42, 67, 89, 103, 125, 156, 178, 201]

# Check that code runs without error
try:
    fig, ax = plt.subplots(figsize=(10, 3))
    ax.scatter(spike_times, [1]*len(spike_times), marker='|', markersize=20, color='black')
    ax.set_xlabel('Time (ms)', fontsize=12)
    ax.set_ylabel('Neuron', fontsize=12)
    ax.set_title('Spike Raster: When Did the Neuron Fire?', fontsize=14)
    ax.set_ylim(0.5, 1.5)
    ax.set_yticks([])
    print("✅ Plot generated successfully! +20 XP")
except Exception as e:
    print(f"❌ Error: {e}")
`,
              hints: [
                "scatter(x_values, y_values, ...) plots dots. Use spike_times for x and [1]*len(spike_times) for y.",
                "set_xlabel(), set_ylabel(), set_title() label your axes",
                "A spike raster shows spikes as vertical lines. Use marker='|' to make them look like raster marks.",
              ],
              xpReward: 20,
            },
          },
        ],
      },

      // ── Quest 1.9 — 2D Arrays ──────────────────────────────
      {
        id: "w1q9",
        worldId: "world1",
        number: 9,
        title: "2D Arrays: Populations of Neurons",
        description: "From one neuron to 100. From 100 to 10,000.",
        totalXP: 45,
        lessons: [
          {
            id: "w1q9l1",
            questId: "w1q9",
            worldId: "world1",
            title: "From Single Neuron to Population",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 4,
            concept: [
              {
                type: "text",
                content: "So far you've simulated one neuron. But the brain has billions. How do you handle that in code?\n\nWith 2D arrays — a grid of numbers, like a spreadsheet. Each row is a neuron. Each column is a time step.",
              },
              {
                type: "code",
                content: "import numpy as np\n\n# Simulate 100 neurons for 1000 ms\nV = np.random.normal(-70, 5, size=(100, 1000))\n# V.shape = (100, 1000)\n# Row 0: voltage of neuron 0 over all times\n# Row 1: voltage of neuron 1 over all times\n# Column j: voltage of all neurons at time j\n\nprint(V[0, 0])      # voltage of neuron 0 at time 0\nprint(V[0, :])      # voltage of neuron 0 across ALL times (spike train)\nprint(V[:, 100])    # voltage of ALL neurons at time 100\nprint(V.shape)      # (100, 1000)",
                caption: "A 2D array is indexed [neuron_index, time_index]. Use : to mean 'all'.",
              },
              {
                type: "text",
                content: "**Why neuroscientists care:**\n\nIn NMA, you often have population recordings — many neurons measured simultaneously. A calcium imaging video has 10,000 neurons × 10,000 time frames. How do you analyze it? With 2D arrays and vectorized operations.",
              },
              {
                type: "code",
                content: "# Real NMA example: calcium imaging data\n# Shape: (n_neurons, n_time_frames)\nF = calcium_recording  # shape (1000, 5000) — 1000 neurons, 5000 frames\n\n# Find peak calcium (max response) for each neuron\npeak_response = F.max(axis=1)  # max along time axis → (1000,)\n\n# Find mean baseline (resting calcium) for each neuron\nbaseline = F.mean(axis=1)  # mean along time axis → (1000,)\n\n# Compute stimulus-evoked response\nresponse = peak_response - baseline  # (1000,)\n\nprint(f'Average response across population: {response.mean()}')",
                caption: "axis=0 means collapse down columns (operate per-neuron). axis=1 means collapse across rows (operate per-time).",
              },
            ],
          },
          {
            id: "w1q9l2",
            questId: "w1q9",
            worldId: "world1",
            title: "Array Operations on 2D Data",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 4,
            concept: [
              {
                type: "text",
                content: "The power of NumPy: do calculations across rows or columns without loops.",
              },
              {
                type: "code",
                content: "import numpy as np\n\n# Population voltage data\nV = np.array([\n    [-70, -60, -50, 20],   # neuron 0\n    [-65, -55, 10, 15],    # neuron 1\n    [-68, -62, -45, -40],  # neuron 2\n])\n# shape: (3 neurons, 4 time steps)\n\n# Along time (axis=1): get mean voltage for each neuron\nmean_V = V.mean(axis=1)  # → [-40, -8.75, -53.75]\n\n# Along neurons (axis=0): get mean voltage at each time\nmean_V_time = V.mean(axis=0)  # → [-67.67, -59, -28.33, -8.33]\n\n# Find spikes: voltage > -55 for each neuron\nthreshold = -55\nspikes = V > threshold  # boolean array, same shape as V\nprint(spikes)\n# [[False False False True]\n#  [False False True True]\n#  [False False False False]]\n\n# Count spikes per neuron\nspike_count = (V > threshold).sum(axis=1)  # → [1, 2, 0]\nprint(f'Neuron spike counts: {spike_count}')",
                caption: "Boolean indexing works on 2D arrays. axis=0 is down the rows. axis=1 is across columns.",
              },
              {
                type: "highlight",
                content: "The formula for working with 2D data: (data > threshold).sum(axis=X) counts how many elements exceed threshold for each row (axis=1) or column (axis=0). This pattern appears in almost every NMA analysis.",
              },
            ],
          },
          {
            id: "w1q9l3",
            questId: "w1q9",
            worldId: "world1",
            title: "Quiz: 2D Arrays",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 3,
            questions: [
              {
                id: "w1q9l3q1",
                text: "V.shape = (50, 1000). What does V[0, :] represent?",
                options: [
                  "The first column (first time step for all neurons)",
                  "The first row (all time steps for neuron 0)",
                  "The first element",
                  "All data",
                ],
                correctIndex: 1,
                explanation: "V[0, :] means 'row 0, all columns'. In neuron data, that's neuron 0 across all time.",
                neuroConnection: "V[i, :] is the spike train of neuron i — a vector of voltages over time.",
              },
              {
                id: "w1q9l3q2",
                text: "V = np.array([[1, 2], [3, 4]])\nV.sum(axis=1) = ?",
                options: ["[3, 7]", "[4, 6]", "[1, 3, 2, 4]", "10"],
                correctIndex: 0,
                explanation: "axis=1 means sum across columns. Row 1: 1+2=3. Row 2: 3+4=7. Result: [3, 7].",
                neuroConnection: "Fire _count = (V > threshold).sum(axis=1) sums spikes across time for each neuron.",
              },
              {
                id: "w1q9l3q3",
                text: "Which indexes the column (time step) in a 2D array?",
                options: [
                  "First index",
                  "Second index",
                  ".shape[0]",
                  ".shape[1]",
                ],
                correctIndex: 1,
                explanation: "In (n_neurons, n_time), the second index is time. V[:, t] gives all neurons at time t.",
              },
            ],
          },
          {
            id: "w1q9l4",
            questId: "w1q9",
            worldId: "world1",
            title: "Coding Mission: Analyze a Population",
            type: "coding",
            deviceRequired: "laptop",
            xpReward: 25,
            estimatedMinutes: 15,
            codingMission: {
              id: "cm-w1q9",
              title: "Analyze Neural Population Activity",
              description:
                "Given a 2D array of 50 neurons recorded over 100 time steps:\n1. Find neurons that fired (peak voltage > -55 mV)\n2. Compute mean firing response per neuron\n3. Find which neuron responded most strongly",
              starterCode: `import numpy as np\n\n# Simulated population recording: 50 neurons, 100 time steps\nnp.random.seed(42)\nV = np.random.normal(-70, 10, size=(50, 100))\n# Add some stimulus response at t=50-75\nV[:, 50:75] += np.random.normal(15, 5, size=(50, 25))\n\nthreshold = -55\n\n# TODO 1: Find neurons that spiked (max voltage > threshold)\nspiking_neurons = ???\nprint(f'Spiking neurons: {spiking_neurons.sum()} out of 50')\n\n# TODO 2: Compute peak response (max voltage - baseline) for each neuron\nbaseline = V[:, :50].mean(axis=1)  # mean before stimulus\npeak = V[:, 50:75].max(axis=1)     # max during stimulus\nresponse = peak - baseline\n\n# TODO 3: Find most responsive neuron\nmost_responsive = ???\nprint(f'Most responsive neuron: {most_responsive} with response {response[most_responsive]:.1f} mV')`,
              solution: `import numpy as np\n\nnp.random.seed(42)\nV = np.random.normal(-70, 10, size=(50, 100))\nV[:, 50:75] += np.random.normal(15, 5, size=(50, 25))\n\nthreshold = -55\n\n# Find neurons that spiked\nspiking_neurons = V.max(axis=1) > threshold\nprint(f'Spiking neurons: {spiking_neurons.sum()} out of 50')\n\n# Compute response\nbaseline = V[:, :50].mean(axis=1)\npeak = V[:, 50:75].max(axis=1)\nresponse = peak - baseline\n\n# Find most responsive\nmost_responsive = response.argmax()\nprint(f'Most responsive neuron: {most_responsive} with response {response[most_responsive]:.1f} mV')`,
              testCode: `
import numpy as np

np.random.seed(42)
V = np.random.normal(-70, 10, size=(50, 100))
V[:, 50:75] += np.random.normal(15, 5, size=(50, 25))

threshold = -55
spiking_neurons = V.max(axis=1) > threshold
baseline = V[:, :50].mean(axis=1)
peak = V[:, 50:75].max(axis=1)
response = peak - baseline
most_responsive = response.argmax()

assert spiking_neurons.sum() > 0, "Some neurons should spike"
assert response.argmax() == most_responsive, "Most responsive computed correctly"
print("✅ Population analysis complete! +25 XP")
`,
              hints: [
                "V.max(axis=1) gives the peak voltage for each neuron (reduces time dimension)",
                "response.argmax() returns the index of the maximum value",
                "Boolean indexing: (V > threshold) creates a boolean array where True = spiked",
              ],
              xpReward: 25,
            },
          },
        ],
      },

      // ── Quest 1.10 — Statistics ────────────────────────────
      {
        id: "w1q10",
        worldId: "world1",
        number: 10,
        title: "Statistics & Ensemble Analysis",
        description: "From individual neurons to population properties",
        totalXP: 45,
        lessons: [
          {
            id: "w1q10l1",
            questId: "w1q10",
            worldId: "world1",
            title: "Why Neuroscientists Love Statistics",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 4,
            concept: [
              {
                type: "text",
                content: "Neuroscience is noisy. A single spike time tells you almost nothing — it could be random noise. But look at 1000 spikes from the same neuron under the same stimulus? That's signal.",
              },
              {
                type: "text",
                content: "**The ensemble principle**: Average across many trials, many neurons, or many conditions. The noise cancels out. The real signal emerges.\n\nThis is why NMA spends entire weeks on statistics. Understanding distributions, variance, and confidence intervals is how you separate the brain's true logic from measurement noise.",
              },
              {
                type: "code",
                content: "import numpy as np\nimport matplotlib.pyplot as plt\n\n# Simulate 1000 presentations of the same stimulus\n# Each time, neuron fires some number of spikes (noisy)\nspike_counts = np.random.poisson(lam=15, size=1000)  # mean 15 spikes per trial\n\nprint(f'Mean spikes per trial: {spike_counts.mean():.1f}')\nprint(f'Std dev: {spike_counts.std():.1f}')\nprint(f'Min: {spike_counts.min()}, Max: {spike_counts.max()}')\n\n# Plot distribution\nplt.hist(spike_counts, bins=20, edgecolor='black')\nplt.xlabel('Spikes per trial')\nplt.ylabel('Count')\nplt.title('Distribution of spike counts across 1000 trials')\nplt.show()\n\n# The mean and std tell you everything\nprint(f'Neuron fires {spike_counts.mean():.1f} ± {spike_counts.std():.1f} spikes')",
                caption: "Mean and std dev are two numbers that characterize an entire distribution of noisy measurements.",
              },
            ],
          },
          {
            id: "w1q10l2",
            questId: "w1q10",
            worldId: "world1",
            title: "Mean, Variance, and Standard Deviation",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 4,
            concept: [
              {
                type: "text",
                content: "Three numbers that characterize any noisy measurement:",
              },
              {
                type: "code",
                content: "import numpy as np\n\n# Simulated firing rates (Hz) from a neuron\nrates = np.array([12, 14, 11, 15, 13, 12, 14, 16, 11, 13])\n\n# Mean — the average\nmean_rate = np.mean(rates)  # or rates.mean()\n# = (12+14+11+15+13+12+14+16+11+13) / 10 = 131 / 10 = 13.1 Hz\n\n# Variance — average of squared deviations\n# Variance = mean((x - mean)^2)\nvariance = np.var(rates)  # = 2.29\n\n# Standard deviation — square root of variance (same units as data)\nstd_dev = np.std(rates)  # = sqrt(2.29) = 1.51 Hz\n\nprint(f'Mean firing rate: {mean_rate:.1f} Hz')\nprint(f'Standard deviation: {std_dev:.1f} Hz')\nprint(f'Firing rate: {mean_rate:.1f} ± {std_dev:.1f} Hz')",
                caption: "np.mean(), np.var(), np.std() are the three most important statistics functions.",
              },
              {
                type: "text",
                content: "**Interpreting std dev:**\n\nFor a normal distribution:\n• Within 1 std dev of mean: ~68% of data\n• Within 2 std dev: ~95% of data\n• Within 3 std dev: ~99.7% of data\n\nSo if firing_rate = 13.1 ± 1.5 Hz, most of the time the neuron fires between 11.6 and 14.6 Hz. Occasionally (rare) it fires at 10 or 16 Hz.",
              },
              {
                type: "highlight",
                content: "In NMA, when they say 'population firing rate', they mean the mean ± std across neurons. This two-number summary is incredibly powerful.",
              },
            ],
          },
          {
            id: "w1q10l3",
            questId: "w1q10",
            worldId: "world1",
            title: "Coding Mission: Ensemble Statistics",
            type: "coding",
            deviceRequired: "laptop",
            xpReward: 25,
            estimatedMinutes: 15,
            codingMission: {
              id: "cm-w1q10",
              title: "Compute Population Statistics",
              description:
                "Given spike counts from 100 neurons responding to a visual stimulus:\n1. Compute mean, std, and variance of spike counts\n2. Find neurons in the top 10% (most responsive)\n3. Compare response during stimulus vs baseline",
              starterCode: `import numpy as np\n\n# Simulated spike counts: 100 neurons, each tested 50 times\nnp.random.seed(42)\nspike_counts = np.random.poisson(lam=5, size=(100, 50))  # baseline\nspike_counts[:, 25:50] += np.random.poisson(lam=8, size=(100, 25))  # add stimulus\n\n# TODO 1: Compute baseline stats (first 25 trials)\nbaseline_spikes = spike_counts[:, :25]\nmean_baseline = ???\nstd_baseline = ???\n\nprint(f'Baseline firing: {mean_baseline:.1f} ± {std_baseline:.1f} spikes/trial')\n\n# TODO 2: Compute stimulus response stats (trials 25-50)\nstimulus_spikes = spike_counts[:, 25:50]\nmean_stimulus = ???\nstd_stimulus = ???\n\nprint(f'Stimulus response: {mean_stimulus:.1f} ± {std_stimulus:.1f} spikes/trial')\n\n# TODO 3: Find top 10% most responsive neurons (highest mean during stimulus)\nresponse_per_neuron = stimulus_spikes.mean(axis=1)\ntop_10_percent = response_per_neuron > ???\nprint(f'Top 10% neurons: {top_10_percent.sum()} neurons out of 100')`,
              solution: `import numpy as np\n\nnp.random.seed(42)\nspike_counts = np.random.poisson(lam=5, size=(100, 50))\nspike_counts[:, 25:50] += np.random.poisson(lam=8, size=(100, 25))\n\nbaseline_spikes = spike_counts[:, :25]\nmean_baseline = baseline_spikes.mean()\nstd_baseline = baseline_spikes.std()\n\nprint(f'Baseline firing: {mean_baseline:.1f} ± {std_baseline:.1f} spikes/trial')\n\nstimulus_spikes = spike_counts[:, 25:50]\nmean_stimulus = stimulus_spikes.mean()\nstd_stimulus = stimulus_spikes.std()\n\nprint(f'Stimulus response: {mean_stimulus:.1f} ± {std_stimulus:.1f} spikes/trial')\n\nresponse_per_neuron = stimulus_spikes.mean(axis=1)\ntop_10_percent_threshold = np.percentile(response_per_neuron, 90)\ntop_10_percent = response_per_neuron > top_10_percent_threshold\nprint(f'Top 10% neurons: {top_10_percent.sum()} neurons out of 100')`,
              testCode: `
import numpy as np

np.random.seed(42)
spike_counts = np.random.poisson(lam=5, size=(100, 50))
spike_counts[:, 25:50] += np.random.poisson(lam=8, size=(100, 25))

baseline_spikes = spike_counts[:, :25]
mean_baseline = baseline_spikes.mean()
std_baseline = baseline_spikes.std()

stimulus_spikes = spike_counts[:, 25:50]
mean_stimulus = stimulus_spikes.mean()
std_stimulus = stimulus_spikes.std()

response_per_neuron = stimulus_spikes.mean(axis=1)
top_10_percent_threshold = np.percentile(response_per_neuron, 90)
top_10_percent = response_per_neuron > top_10_percent_threshold

assert mean_stimulus > mean_baseline, "Stimulus should increase firing"
assert top_10_percent.sum() >= 9 and top_10_percent.sum() <= 11, "Top 10% should be ~10 neurons"
print("✅ Ensemble statistics computed! +25 XP")
`,
              hints: [
                ".mean() computes mean across all elements. Use axis=0 or axis=1 to compute per-row or per-column",
                "np.percentile(data, 90) finds the 90th percentile — the value where 90% of data falls below",
                ".std() computes standard deviation. np.var() computes variance (std squared)",
              ],
              xpReward: 25,
            },
          },
        ],
      },

      // ── Quest 1.11 — Integration ───────────────────────────
      {
        id: "w1q11",
        worldId: "world1",
        number: 11,
        title: "Simulation: Integration & Time Steps",
        description: "Turn equations into code — Euler's method",
        totalXP: 50,
        lessons: [
          {
            id: "w1q11l1",
            questId: "w1q11",
            worldId: "world1",
            title: "From Equations to Code",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 4,
            concept: [
              {
                type: "text",
                content: "Neuroscience talks in differential equations. Calculus textbooks are full of them. But you can't run calculus on a computer — calculus is continuous, computers work with discrete time steps.\n\nSo how do you simulate a neuron? You approximate. You take tiny time steps (dt = 0.001 seconds) and update the voltage in small chunks.",
              },
              {
                type: "code",
                content: "# Differential equation (continuous time):\n# dV/dt = (-(V - V_rest) + R*I) / tau_m\n#\n# This says: the voltage changes at a rate proportional to the difference between current and rest potential.\n\n# Approximation (discrete time, Euler method):\n# V_new = V_old + (dV/dt) * dt\n#\n# In code:\nfor t in range(1000):  # loop over time\n    # Compute the rate of change\n    dV_dt = (-(V[t] - V_rest) + R * I[t]) / tau_m\n    \n    # Take one small step\n    V[t+1] = V[t] + dV_dt * dt\n    \n    # If crossed threshold, record spike and reset\n    if V[t+1] > threshold:\n        spikes.append(t+1)\n        V[t+1] = V_rest",
                caption: "This is the skeleton of EVERY neuron simulation in NMA. You'll write variations of this hundreds of times.",
              },
              {
                type: "text",
                content: "**Why Euler's method?**\n\nIt's the simplest: V_new = V_old + slope * dt. You step forward in time, updating based on the current slope. Smaller dt = more accurate. Typical choice: dt = 0.0001 to 0.001 seconds.",
              },
              {
                type: "highlight",
                content: "NMA fact: Week 2-3 is all about this. You'll implement LIF, Hodgkin-Huxley, and other models. All of them use Euler's method or a variant.",
              },
            ],
          },
          {
            id: "w1q11l2",
            questId: "w1q11",
            worldId: "world1",
            title: "Time Steps and Stability",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 3,
            concept: [
              {
                type: "text",
                content: "How small should dt be?\n\nToo large (dt = 1): you overshoot and miss dynamics\nToo small (dt = 0.00001): you're wasting computation for no extra accuracy\n\nRule of thumb: dt << tau (the neuron's time constant). For a neuron with tau_m = 10 ms, use dt ≤ 1 ms.",
              },
              {
                type: "code",
                content: "import numpy as np\nimport matplotlib.pyplot as plt\n\n# Simple exponential decay: dV/dt = -V / tau\nV_rest = 0\ntau = 10  # ms\nV_init = 1\n\n# Test different time steps\nfor dt in [0.1, 1, 5]:  # too big, good, too big\n    t_max = 50\n    t = np.arange(0, t_max, dt)\n    V = np.zeros_like(t)\n    V[0] = V_init\n    \n    for i in range(len(t)-1):\n        dV_dt = -V[i] / tau\n        V[i+1] = V[i] + dV_dt * dt\n    \n    # Plot\n    plt.plot(t, V, 'o-', label=f'dt={dt}', markersize=3)\n\n# Analytical solution (true answer)\nt_exact = np.linspace(0, 50, 1000)\nV_exact = V_init * np.exp(-t_exact / tau)\nplt.plot(t_exact, V_exact, 'k--', linewidth=2, label='Analytical')\n\nplt.legend()\nplt.xlabel('Time (ms)')\nplt.ylabel('Voltage (mV)')\nplt.title('Euler Method: Effect of Time Step Size')\nplt.show()",
                caption: "Smaller dt follows the true curve more closely. But dt=1 ms is usually good enough for neuron models.",
              },
            ],
          },
          {
            id: "w1q11l3",
            questId: "w1q11",
            worldId: "world1",
            title: "Coding Mission: Simulate a Time-Varying Input",
            type: "coding",
            deviceRequired: "laptop",
            xpReward: 25,
            estimatedMinutes: 15,
            codingMission: {
              id: "cm-w1q11",
              title: "Simulate Neuron Response to Changing Input",
              description:
                "Implement Euler's method for the leaky neuron equation:\nτ dV/dt = -(V - V_rest) + R·I(t)\n\nWhere I(t) changes over time — ramps up at t=50ms, ramps down at t=500ms.\nPlot voltage and input current over time.",
              starterCode: `import numpy as np\nimport matplotlib.pyplot as plt\n\n# Parameters\ntau = 10        # membrane time constant (ms)\nV_rest = -70    # resting potential (mV)\nR = 10          # resistance (MOhm)\nthreshold = -55 # spike threshold (mV)\ndt = 0.1        # time step (ms)\n\nt_max = 1000    # simulate 1 second\nt = np.arange(0, t_max, dt)\nn_steps = len(t)\n\n# Initialize\nV = np.zeros(n_steps)\nV[0] = V_rest\nspike_times = []\n\n# Time-varying input current\nI = np.zeros(n_steps)\n# Ramp up from t=50 to t=100\nramp_up = np.where((t >= 50) & (t < 100))[0]\nI[ramp_up] = 2 * (t[ramp_up] - 50) / 50  # goes from 0 to 2 nA\n# Plateau from t=100 to t=500\nI[(t >= 100) & (t < 500)] = 2\n# Ramp down from t=500 to t=550  \nramp_down = np.where((t >= 500) & (t < 550))[0]\nI[ramp_down] = 2 * (1 - (t[ramp_down] - 500) / 50)  # goes from 2 to 0\n\n# TODO: Implement Euler's method\nfor i in range(n_steps - 1):\n    # Compute dV/dt\n    dV_dt = (-(V[i] - V_rest) + R * I[i]) / tau\n    \n    # TODO: Update voltage using Euler's method\n    V[i+1] = ???\n    \n    # TODO: Detect spikes (crossing threshold) and reset\n    if V[i+1] > threshold:\n        spikes.append(t[i+1])\n        V[i+1] = V_rest\n\n# Plot results\nfig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 6))\n\nax1.plot(t, V)\nax1.axhline(y=threshold, color='r', linestyle='--', label='Threshold')\nax1.set_ylabel('Voltage (mV)')\nax1.set_title('Neuron Response to Time-Varying Input')\nax1.legend()\nax1.grid(True, alpha=0.3)\n\nax2.plot(t, I, color='green')\nax2.set_xlabel('Time (ms)')\nax2.set_ylabel('Input Current (nA)')\nax2.set_title('Input Current Profile')\nax2.grid(True, alpha=0.3)\n\nplt.tight_layout()\nplt.show()\n\nprint(f'Neuron fired {len(spike_times)} spikes')`,
              solution: `import numpy as np\nimport matplotlib.pyplot as plt\n\ntau = 10\nV_rest = -70\nR = 10\nthreshold = -55\ndt = 0.1\n\nt_max = 1000\nt = np.arange(0, t_max, dt)\nn_steps = len(t)\n\nV = np.zeros(n_steps)\nV[0] = V_rest\nspike_times = []\n\nI = np.zeros(n_steps)\nramp_up = np.where((t >= 50) & (t < 100))[0]\nI[ramp_up] = 2 * (t[ramp_up] - 50) / 50\nI[(t >= 100) & (t < 500)] = 2\nramp_down = np.where((t >= 500) & (t < 550))[0]\nI[ramp_down] = 2 * (1 - (t[ramp_down] - 500) / 50)\n\nfor i in range(n_steps - 1):\n    dV_dt = (-(V[i] - V_rest) + R * I[i]) / tau\n    V[i+1] = V[i] + dV_dt * dt\n    \n    if V[i+1] > threshold:\n        spike_times.append(t[i+1])\n        V[i+1] = V_rest\n\nfig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 6))\nax1.plot(t, V)\nax1.axhline(y=threshold, color='r', linestyle='--', label='Threshold')\nax1.set_ylabel('Voltage (mV)')\nax1.set_title('Neuron Response to Time-Varying Input')\nax1.legend()\nax1.grid(True, alpha=0.3)\n\nax2.plot(t, I, color='green')\nax2.set_xlabel('Time (ms)')\nax2.set_ylabel('Input Current (nA)')\nax2.set_title('Input Current Profile')\nax2.grid(True, alpha=0.3)\n\nplt.tight_layout()\nplt.show()\n\nprint(f'Neuron fired {len(spike_times)} spikes')`,
              testCode: `
import numpy as np

tau = 10
V_rest = -70
R = 10
threshold = -55
dt = 0.1

t_max = 1000
t = np.arange(0, t_max, dt)
n_steps = len(t)

V = np.zeros(n_steps)
V[0] = V_rest
spike_times = []

I = np.zeros(n_steps)
ramp_up = np.where((t >= 50) & (t < 100))[0]
I[ramp_up] = 2 * (t[ramp_up] - 50) / 50
I[(t >= 100) & (t < 500)] = 2
ramp_down = np.where((t >= 500) & (t < 550))[0]
I[ramp_down] = 2 * (1 - (t[ramp_down] - 500) / 50)

for i in range(n_steps - 1):
    dV_dt = (-(V[i] - V_rest) + R * I[i]) / tau
    V[i+1] = V[i] + dV_dt * dt
    if V[i+1] > threshold:
        spike_times.append(t[i+1])
        V[i+1] = V_rest

assert len(spike_times) > 0, "Neuron should fire when current is applied"
assert V.max() < 50, "Voltage should not go to infinity"
assert len(V) == n_steps, "Simulation should complete all timesteps"
print(f"✅ Simulation complete: {len(spike_times)} spikes fired! +25 XP")
`,
              hints: [
                "V[i+1] = V[i] + dV_dt * dt is Euler's method: new = old + slope * step",
                "Spike detection: if V > threshold, record time and reset V to V_rest",
                "Time-varying input I(t) is already computed for you — just use it in dV/dt",
              ],
              xpReward: 25,
            },
          },
        ],
      },

      // ── Quest 1.12 — Random Numbers ───────────────────────
      {
        id: "w1q12",
        worldId: "world1",
        number: 12,
        title: "Stochasticity: Random Inputs & Noise",
        description: "The brain is noisy — and that's a feature",
        totalXP: 45,
        lessons: [
          {
            id: "w1q12l1",
            questId: "w1q12",
            worldId: "world1",
            title: "Noise Is Real",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 4,
            concept: [
              {
                type: "text",
                content: "The brain is not a deterministic machine. When a neuron receives the same input stimulus twice, it doesn't fire the exact same spikes. There's randomness from synaptic noise, stochastic channel opening/closing, and random thermal fluctuations.\n\nHow do you model this in code? With random numbers.",
              },
              {
                type: "text",
                content: "**Why neuroscientists care:**\n\nIgnoring noise = building unrealistic models. Real neurons are probabilistic. A neuron with mean firing rate 50 Hz doesn't fire at exactly 50 Hz every second — it fires ~50, or 48, or 52. The exact number is random, following a Poisson distribution.",
              },
              {
                type: "code",
                content: "import numpy as np\nimport matplotlib.pyplot as plt\n\n# Generate random spike counts (Poisson distribution)\n# Poisson with lambda=50 Hz\nspike_counts = np.random.poisson(lam=50, size=1000)  # 1000 trials\n\nplt.hist(spike_counts, bins=30, edgecolor='black', alpha=0.7)\nplt.axvline(x=spike_counts.mean(), color='r', linewidth=2, label=f'Mean = {spike_counts.mean():.1f}')\nplt.xlabel('Spikes per second')\nplt.ylabel('Count across 1000 trials')\nplt.title('Random Spike Counts Follow Poisson Distribution')\nplt.legend()\nplt.show()\n\nprint(f'Mean: {spike_counts.mean():.1f}')\nprint(f'Std Dev: {spike_counts.std():.1f}')",
                caption: "Poisson(λ) models event counts when events arrive independently at rate λ. For spike trains, λ = firing rate.",
              },
            ],
          },
          {
            id: "w1q12l2",
            questId: "w1q12",
            worldId: "world1",
            title: "Common Distributions in Neuroscience",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 3,
            concept: [
              {
                type: "text",
                content: "NumPy has a whole module of random number generators. The most common in neuroscience:",
              },
              {
                type: "code",
                content: "import numpy as np\n\n# Poisson: discrete spike counts\nspikes = np.random.poisson(lam=20, size=100)  # 100 samples from Poisson(20)\n\n# Normal (Gaussian): continuous values (voltages, currents, signals)\nvoltage_noise = np.random.normal(loc=-70, scale=5, size=100)  # mean -70, std 5\n\n# Uniform: random values in a range\ninput_currents = np.random.uniform(low=0, high=2, size=100)  # random current 0-2 nA\n\n# Exponential: intervals between events (waiting times until next spike)\ninter_spike_intervals = np.random.exponential(scale=50, size=100)  # mean 50 ms\n\nprint(f'Poisson mean: {spikes.mean()}')\nprint(f'Normal mean: {voltage_noise.mean():.1f}, std: {voltage_noise.std():.1f}')\nprint(f'Uniform mean: {input_currents.mean():.1f} (should be 1.0)')",
                caption: "These are the four distributions you'll see constantly in NMA.",
              },
              {
                type: "highlight",
                content: "Always check: np.random.seed(42) at the start if you want reproducible randomness. With the same seed, you get the same 'random' numbers every time.",
              },
            ],
          },
          {
            id: "w1q12l3",
            questId: "w1q12",
            worldId: "world1",
            title: "Coding Mission: Stochastic Neuron Simulation",
            type: "coding",
            deviceRequired: "laptop",
            xpReward: 25,
            estimatedMinutes: 15,
            codingMission: {
              id: "cm-w1q12",
              title: "Add Noise to Neural Simulation",
              description:
                "Take the deterministic LIF neuron and add two sources of noise:\n1. Gaussian noise in the input current\n2. Stochastic reset (occasional failed spikes)\nRun 10 trials and compare spike reliability.",
              starterCode: `import numpy as np\nimport matplotlib.pyplot as plt\n\nnp.random.seed(42)\n\n# Parameters\ntau = 10\nV_rest = -70\nR = 10\nthreshold = -55\ndt = 0.1\nI_mean = 1.5  # input current (nA)\n\nt_max = 1000\nt = np.arange(0, t_max, dt)\nn_steps = len(t)\n\n# Run 10 trials with different random inputs\nall_spikes = []\nfig, axes = plt.subplots(2, 5, figsize=(15, 6))\naxes = axes.flatten()\n\nfor trial in range(10):\n    # Initialize\n    V = np.zeros(n_steps)\n    V[0] = V_rest\n    spikes = []\n    \n    for i in range(n_steps - 1):\n        # TODO: Add Gaussian noise to input (mean=0, std=0.2)\n        noise = ???\n        I = I_mean + noise\n        \n        # Compute and update\n        dV_dt = (-(V[i] - V_rest) + R * I) / tau\n        V[i+1] = V[i] + dV_dt * dt\n        \n        # Spike detection\n        if V[i+1] > threshold:\n            spikes.append(t[i+1])\n            V[i+1] = V_rest\n    \n    all_spikes.append(spikes)\n    \n    # Plot\n    axes[trial].plot(t, V, linewidth=0.5)\n    axes[trial].axhline(y=threshold, color='r', linestyle='--', alpha=0.5)\n    axes[trial].set_title(f'Trial {trial+1}: {len(spikes)} spikes')\n    axes[trial].set_xlim([0, 1000])\n    axes[trial].set_ylim([-80, 20])\n\nplt.tight_layout()\nplt.show()\n\n# Compute spike reliability\nspike_counts = np.array([len(s) for s in all_spikes])\nprint(f'Spike counts: {spike_counts}')\nprint(f'Mean: {spike_counts.mean():.1f}, Std: {spike_counts.std():.1f}')`,
              solution: `import numpy as np\nimport matplotlib.pyplot as plt\n\nnp.random.seed(42)\n\ntau = 10\nV_rest = -70\nR = 10\nthreshold = -55\ndt = 0.1\nI_mean = 1.5\n\nt_max = 1000\nt = np.arange(0, t_max, dt)\nn_steps = len(t)\n\nall_spikes = []\nfig, axes = plt.subplots(2, 5, figsize=(15, 6))\naxes = axes.flatten()\n\nfor trial in range(10):\n    V = np.zeros(n_steps)\n    V[0] = V_rest\n    spikes = []\n    \n    for i in range(n_steps - 1):\n        noise = np.random.normal(loc=0, scale=0.2)\n        I = I_mean + noise\n        \n        dV_dt = (-(V[i] - V_rest) + R * I) / tau\n        V[i+1] = V[i] + dV_dt * dt\n        \n        if V[i+1] > threshold:\n            spikes.append(t[i+1])\n            V[i+1] = V_rest\n    \n    all_spikes.append(spikes)\n    axes[trial].plot(t, V, linewidth=0.5)\n    axes[trial].axhline(y=threshold, color='r', linestyle='--', alpha=0.5)\n    axes[trial].set_title(f'Trial {trial+1}: {len(spikes)} spikes')\n    axes[trial].set_xlim([0, 1000])\n    axes[trial].set_ylim([-80, 20])\n\nplt.tight_layout()\nplt.show()\n\nspike_counts = np.array([len(s) for s in all_spikes])\nprint(f'Spike counts: {spike_counts}')\nprint(f'Mean: {spike_counts.mean():.1f}, Std: {spike_counts.std():.1f}')`,
              testCode: `
import numpy as np

np.random.seed(42)

tau = 10
V_rest = -70
R = 10
threshold = -55
dt = 0.1
I_mean = 1.5

t_max = 1000
t = np.arange(0, t_max, dt)
n_steps = len(t)

spike_counts_list = []

for trial in range(10):
    V = np.zeros(n_steps)
    V[0] = V_rest
    spikes = []

    for i in range(n_steps - 1):
        noise = np.random.normal(loc=0, scale=0.2)
        I = I_mean + noise

        dV_dt = (-(V[i] - V_rest) + R * I) / tau
        V[i+1] = V[i] + dV_dt * dt

        if V[i+1] > threshold:
            spikes.append(t[i+1])
            V[i+1] = V_rest

    spike_counts_list.append(len(spikes))

spike_counts = np.array(spike_counts_list)

# Check that we have variability across trials (noise is working)
assert spike_counts.std() > 0, "Spike counts should vary across trials"
# But mean should still be reasonable
assert 5 < spike_counts.mean() < 50, "Mean spike count should be reasonable"

print(f"✅ Stochastic simulation complete! Mean: {spike_counts.mean():.1f} ± {spike_counts.std():.1f} +25 XP")
`,
              hints: [
                "np.random.normal(loc=0, scale=0.2) generates Gaussian noise",
                "The noise gets added to the input current: I = I_mean + noise",
                "Comparing spike counts across trials shows how noise affects reliability",
              ],
              xpReward: 25,
            },
          },
        ],
      },

      // ── Quest 1.13 — LIF Capstone ──────────────────────────
      {
        id: "w1q13",
        worldId: "world1",
        number: 13,
        title: "Capstone: Full LIF Neuron Project",
        description: "Combine everything — build a complete neuron model",
        totalXP: 50,
        lessons: [
          {
            id: "w1q13l1",
            questId: "w1q13",
            worldId: "world1",
            title: "Capstone: LIF Neuron with Population & Analysis",
            type: "coding",
            deviceRequired: "laptop",
            xpReward: 50,
            estimatedMinutes: 30,
            codingMission: {
              id: "cm-w1q13",
              title: "Complete LIF Neuron Model: Implementation & Analysis",
              description:
                "Implement a full leaky integrate-and-fire neuron model:\n1. Simulate 10 neurons with different properties\n2. Apply time-varying stimulus\n3. Detect and record spikes\n4. Analyze population response with statistics\n5. Create publication-quality plots\n\nThis combines everything from quests 1.1-1.12 into one capstone project.",
              starterCode: `import numpy as np\nimport matplotlib.pyplot as plt\n\nnp.random.seed(42)\n\n# Neuron parameters (vary slightly per neuron)\nn_neurons = 10\ntau = np.random.normal(10, 1, n_neurons)  # time constant: 9-11 ms\nV_rest = -70 * np.ones(n_neurons)\nR = np.random.normal(10, 1, n_neurons)  # resistance: 9-11 MOhm\nthreshold = -55 * np.ones(n_neurons)\n\n# Simulation parameters\ndt = 0.1  # ms\nt_max = 1000  # ms\nt = np.arange(0, t_max, dt)\nn_steps = len(t)\n\n# Initialize\nV = np.random.normal(-70, 2, (n_neurons, n_steps))  # voltage per neuron per time\nspike_raster = []  # list of spike times per neuron\n\n# Create time-varying stimulus\nI_baseline = 1.0  # nA\nI = I_baseline * np.ones(n_steps)\nI[(t >= 200) & (t < 700)] += np.sin((t[(t >= 200) & (t < 700)] - 200) / 100) * 0.5\n\n# TODO 1: Simulate all neurons\nfor neuron in range(n_neurons):\n    spikes = []\n    for i in range(n_steps - 1):\n        # Add noise\n        noise = np.random.normal(0, 0.1)\n        \n        # Compute dV/dt\n        dV_dt = (-(V[neuron, i] - V_rest[neuron]) + R[neuron] * (I[i] + noise)) / tau[neuron]\n        \n        # Update voltage\n        V[neuron, i+1] = V[neuron, i] + dV_dt * dt\n        \n        # Spike detection\n        if V[neuron, i+1] > threshold[neuron]:\n            spikes.append(t[i+1])\n            V[neuron, i+1] = V_rest[neuron]\n    \n    spike_raster.append(spikes)\n\n# TODO 2: Compute population statistics\nspike_counts = np.array([len(s) for s in spike_raster])\nmean_firing = spike_counts.mean() / (t_max / 1000)  # convert to Hz\nstd_firing = spike_counts.std() / (t_max / 1000)\n\nprint(f'Population firing rate: {mean_firing:.1f} ± {std_firing:.1f} Hz')\nprint(f'Range: {spike_counts.min()}-{spike_counts.max()} spikes')\n\n# TODO 3: Create plots (multi-panel figure)\nfig = plt.figure(figsize=(14, 10))\ngs = fig.add_gridspec(3, 2, hspace=0.3, wspace=0.3)\n\n# Panel 1: Voltage traces (top 3 neurons)\nax1 = fig.add_subplot(gs[0, :])\nfor i in range(3):\n    ax1.plot(t, V[i, :], alpha=0.7, label=f'Neuron {i}')\nax1.axhline(y=-55, color='r', linestyle='--', alpha=0.3, label='Threshold')\nax1.set_ylabel('Voltage (mV)')\nax1.set_title('Sample Neuron Voltage Traces')\nax1.legend(loc='upper right')\nax1.grid(True, alpha=0.2)\n\n# Panel 2: Spike raster\nax2 = fig.add_subplot(gs[1, 0])\nfor neuron in range(n_neurons):\n    for spike_time in spike_raster[neuron]:\n        ax2.vlines(spike_time, neuron - 0.4, neuron + 0.4, colors='black', linewidth=1)\nax2.set_ylabel('Neuron ID')\nax2.set_xlabel('Time (ms)')\nax2.set_title('Spike Raster: Population Firing Pattern')\nax2.set_ylim([-0.5, n_neurons - 0.5])\nax2.set_xlim([0, t_max])\nax2.grid(True, alpha=0.2, axis='x')\n\n# Panel 3: Spike count distribution\nax3 = fig.add_subplot(gs[1, 1])\nax3.bar(range(n_neurons), spike_counts, color='steelblue', edgecolor='black')\nax3.axhline(y=spike_counts.mean(), color='r', linestyle='--', linewidth=2, label=f'Mean = {spike_counts.mean():.1f}')\nax3.set_xlabel('Neuron ID')\nax3.set_ylabel('Spike Count')\nax3.set_title('Variability in Spike Counts')\nax3.legend()\nax3.grid(True, alpha=0.2, axis='y')\n\n# Panel 4: Input stimulus\nax4 = fig.add_subplot(gs[2, 0])\nax4.plot(t, I, color='green', linewidth=1.5)\nax4.fill_between(t, I_baseline, I, alpha=0.3, color='green')\nax4.set_xlabel('Time (ms)')\nax4.set_ylabel('Input Current (nA)')\nax4.set_title('Stimulus Profile')\nax4.grid(True, alpha=0.2)\n\n# Panel 5: Population firing rate over time (PSTH)\nax5 = fig.add_subplot(gs[2, 1])\nbin_size = 50  # ms\nbins = np.arange(0, t_max, bin_size)\npsth = np.zeros(len(bins) - 1)\nfor neuron in range(n_neurons):\n    hist, _ = np.histogram(spike_raster[neuron], bins=bins)\n    psth += hist\npsth = psth / (n_neurons * bin_size / 1000)  # convert to Hz\nbin_centers = (bins[:-1] + bins[1:]) / 2\nax5.bar(bin_centers, psth, width=bin_size * 0.8, edgecolor='black', color='darkorange')\nax5.set_xlabel('Time (ms)')\nax5.set_ylabel('Population Firing Rate (Hz)')\nax5.set_title('Peri-Stimulus Time Histogram (PSTH)')\nax5.grid(True, alpha=0.2, axis='y')\n\nplt.suptitle('LIF Neuron Population: Capstone Project', fontsize=16, fontweight='bold')\nplt.show()\n\nprint('\\n✅ Capstone project complete!')`,
              solution: `import numpy as np\nimport matplotlib.pyplot as plt\n\nnp.random.seed(42)\n\nn_neurons = 10\ntau = np.random.normal(10, 1, n_neurons)\nV_rest = -70 * np.ones(n_neurons)\nR = np.random.normal(10, 1, n_neurons)\nthreshold = -55 * np.ones(n_neurons)\n\ndt = 0.1\nt_max = 1000\nt = np.arange(0, t_max, dt)\nn_steps = len(t)\n\nV = np.random.normal(-70, 2, (n_neurons, n_steps))\nspike_raster = []\n\nI_baseline = 1.0\nI = I_baseline * np.ones(n_steps)\nI[(t >= 200) & (t < 700)] += np.sin((t[(t >= 200) & (t < 700)] - 200) / 100) * 0.5\n\nfor neuron in range(n_neurons):\n    spikes = []\n    for i in range(n_steps - 1):\n        noise = np.random.normal(0, 0.1)\n        dV_dt = (-(V[neuron, i] - V_rest[neuron]) + R[neuron] * (I[i] + noise)) / tau[neuron]\n        V[neuron, i+1] = V[neuron, i] + dV_dt * dt\n        \n        if V[neuron, i+1] > threshold[neuron]:\n            spikes.append(t[i+1])\n            V[neuron, i+1] = V_rest[neuron]\n    \n    spike_raster.append(spikes)\n\nspike_counts = np.array([len(s) for s in spike_raster])\nmean_firing = spike_counts.mean() / (t_max / 1000)\nstd_firing = spike_counts.std() / (t_max / 1000)\n\nprint(f'Population firing rate: {mean_firing:.1f} ± {std_firing:.1f} Hz')\nprint(f'Range: {spike_counts.min()}-{spike_counts.max()} spikes')\n\nfig = plt.figure(figsize=(14, 10))\ngs = fig.add_gridspec(3, 2, hspace=0.3, wspace=0.3)\n\nax1 = fig.add_subplot(gs[0, :])\nfor i in range(3):\n    ax1.plot(t, V[i, :], alpha=0.7, label=f'Neuron {i}')\nax1.axhline(y=-55, color='r', linestyle='--', alpha=0.3, label='Threshold')\nax1.set_ylabel('Voltage (mV)')\nax1.set_title('Sample Neuron Voltage Traces')\nax1.legend(loc='upper right')\nax1.grid(True, alpha=0.2)\n\nax2 = fig.add_subplot(gs[1, 0])\nfor neuron in range(n_neurons):\n    for spike_time in spike_raster[neuron]:\n        ax2.vlines(spike_time, neuron - 0.4, neuron + 0.4, colors='black', linewidth=1)\nax2.set_ylabel('Neuron ID')\nax2.set_xlabel('Time (ms)')\nax2.set_title('Spike Raster: Population Firing Pattern')\nax2.set_ylim([-0.5, n_neurons - 0.5])\nax2.set_xlim([0, t_max])\nax2.grid(True, alpha=0.2, axis='x')\n\nax3 = fig.add_subplot(gs[1, 1])\nax3.bar(range(n_neurons), spike_counts, color='steelblue', edgecolor='black')\nax3.axhline(y=spike_counts.mean(), color='r', linestyle='--', linewidth=2, label=f'Mean = {spike_counts.mean():.1f}')\nax3.set_xlabel('Neuron ID')\nax3.set_ylabel('Spike Count')\nax3.set_title('Variability in Spike Counts')\nax3.legend()\nax3.grid(True, alpha=0.2, axis='y')\n\nax4 = fig.add_subplot(gs[2, 0])\nax4.plot(t, I, color='green', linewidth=1.5)\nax4.fill_between(t, I_baseline, I, alpha=0.3, color='green')\nax4.set_xlabel('Time (ms)')\nax4.set_ylabel('Input Current (nA)')\nax4.set_title('Stimulus Profile')\nax4.grid(True, alpha=0.2)\n\nax5 = fig.add_subplot(gs[2, 1])\nbin_size = 50\nbins = np.arange(0, t_max, bin_size)\npsth = np.zeros(len(bins) - 1)\nfor neuron in range(n_neurons):\n    hist, _ = np.histogram(spike_raster[neuron], bins=bins)\n    psth += hist\npsth = psth / (n_neurons * bin_size / 1000)\nbin_centers = (bins[:-1] + bins[1:]) / 2\nax5.bar(bin_centers, psth, width=bin_size * 0.8, edgecolor='black', color='darkorange')\nax5.set_xlabel('Time (ms)')\nax5.set_ylabel('Population Firing Rate (Hz)')\nax5.set_title('Peri-Stimulus Time Histogram (PSTH)')\nax5.grid(True, alpha=0.2, axis='y')\n\nplt.suptitle('LIF Neuron Population: Capstone Project', fontsize=16, fontweight='bold')\nplt.show()\n\nprint('\\n✅ Capstone project complete!')`,
              testCode: `
import numpy as np

np.random.seed(42)

n_neurons = 10
tau = np.random.normal(10, 1, n_neurons)
V_rest = -70 * np.ones(n_neurons)
R = np.random.normal(10, 1, n_neurons)
threshold = -55 * np.ones(n_neurons)

dt = 0.1
t_max = 1000
t = np.arange(0, t_max, dt)
n_steps = len(t)

V = np.random.normal(-70, 2, (n_neurons, n_steps))
spike_raster = []

I_baseline = 1.0
I = I_baseline * np.ones(n_steps)
I[(t >= 200) & (t < 700)] += np.sin((t[(t >= 200) & (t < 700)] - 200) / 100) * 0.5

for neuron in range(n_neurons):
    spikes = []
    for i in range(n_steps - 1):
        noise = np.random.normal(0, 0.1)
        dV_dt = (-(V[neuron, i] - V_rest[neuron]) + R[neuron] * (I[i] + noise)) / tau[neuron]
        V[neuron, i+1] = V[neuron, i] + dV_dt * dt

        if V[neuron, i+1] > threshold[neuron]:
            spikes.append(t[i+1])
            V[neuron, i+1] = V_rest[neuron]

    spike_raster.append(spikes)

spike_counts = np.array([len(s) for s in spike_raster])

# Validation checks
assert len(spike_raster) == n_neurons, "Should have spike data for all neurons"
assert spike_counts.sum() > 0, "Population should fire at least some spikes"
assert V.shape == (n_neurons, n_steps), "Voltage array shape should be (neurons, timesteps)"

print(f"✅ Capstone Complete! Population: {len(spike_raster)} neurons, {spike_counts.sum():.0f} total spikes +50 XP")
`,
              hints: [
                "This project combines: 1D/2D arrays, loops, if statements, functions, matplotlib plotting, statistics, random numbers, and integration",
                "Multi-panel figures use plt.figure() + add_gridspec() for professional layouts",
                "Spike raster: vertical lines at spike times for each neuron",
                "PSTH (Peri-Stimulus Time Histogram): bin spike counts across time to see population response",
              ],
              xpReward: 50,
            },
          },
        ],
      },

      // ── Quest 1.14 — Final Boss ────────────────────────────
      {
        id: "w1q14",
        worldId: "world1",
        number: 14,
        title: "FINAL BOSS: Master the LIF Neuron",
        description: "Prove you're NMA-ready with a comprehensive challenge",
        totalXP: 70,
        isBoss: true,
        lessons: [
          {
            id: "w1q14l1",
            questId: "w1q14",
            worldId: "world1",
            title: "Boss Battle: Multi-Neuron Decoding Challenge",
            type: "coding",
            deviceRequired: "laptop",
            xpReward: 70,
            estimatedMinutes: 45,
            codingMission: {
              id: "cm-w1q14-boss",
              title: "FINAL BOSS: Decode Neural Population Activity",
              description:
                "Simulate a neural population responding to two stimuli (A and B).\nUse population statistics and boolean indexing to classify:\n• Which stimulus was presented based on spike counts?\n• Can you decode stimulus from neural activity with >70% accuracy?\n\nThis combines everything: LIF simulation, 2D arrays, statistics, random numbers, and analysis.",
              starterCode: `import numpy as np\nimport matplotlib.pyplot as plt\n\nnp.random.seed(42)\n\n# Simulate neural population: 50 neurons responding to 100 trials of stimulus A or B\nn_neurons = 50\nn_trials = 100\ntau = 10\nV_rest = -70\nR = 10\nthreshold = -55\ndt = 0.1\nt_max = 500  # ms per trial\nt = np.arange(0, t_max, dt)\nn_steps = len(t)\n\n# Stimulus labels (random order)\nstimulus = np.random.choice(['A', 'B'], size=n_trials)\n\n# Store spike counts\nspike_counts = np.zeros((n_trials, n_neurons))\n\nfor trial in range(n_trials):\n    # Set stimulus-dependent input\n    if stimulus[trial] == 'A':\n        I_base = 0.5  # weaker for A\n    else:\n        I_base = 1.5  # stronger for B\n    \n    I = I_base * np.ones(n_steps)\n    \n    # Simulate each neuron\n    for neuron in range(n_neurons):\n        V = V_rest * np.ones(n_steps)\n        spikes = 0\n        \n        for i in range(n_steps - 1):\n            noise = np.random.normal(0, 0.1)\n            dV_dt = (-(V[i] - V_rest) + R * (I[i] + noise)) / tau\n            V[i+1] = V[i] + dV_dt * dt\n            \n            if V[i+1] > threshold:\n                spikes += 1\n                V[i+1] = V_rest\n        \n        spike_counts[trial, neuron] = spikes\n\n# TODO 1: Compute mean spike count per neuron for each stimulus\nA_trials = stimulus == 'A'\nB_trials = stimulus == 'B'\n\nmean_response_A = ???\nmean_response_B = ???\n\nprint(f'Stimulus A response: {mean_response_A.mean():.1f} ± {mean_response_A.std():.1f} spikes')\nprint(f'Stimulus B response: {mean_response_B.mean():.1f} ± {mean_response_B.std():.1f} spikes')\n\n# TODO 2: Find neurons that discriminate between A and B\n# Discriminative neurons: large difference in mean response\ndiscrimination_index = np.abs(mean_response_A - mean_response_B)\ntop_neurons = discrimination_index.argsort()[-10:]  # top 10\n\nprint(f'\\nTop 10 discriminative neurons: {top_neurons}')\n\n# TODO 3: Simple decoder: use population response to predict stimulus\n# Prediction: if total population spikes > threshold, predict B\npopulation_spikes = spike_counts.sum(axis=1)\nthreshold_decode = np.median(population_spikes)\nprediction = population_spikes > threshold_decode\nprediction_label = np.array(['B' if p else 'A' for p in prediction])\n\n# Accuracy\naccuracy = (prediction_label == stimulus).mean()\nprint(f'\\nDecoding accuracy: {accuracy*100:.1f}%')\n\n# TODO 4: Plots\nfig, axes = plt.subplots(2, 2, figsize=(12, 8))\n\n# Panel 1: Mean response per neuron\nax = axes[0, 0]\nax.plot(mean_response_A, label='Stimulus A', alpha=0.7)\nax.plot(mean_response_B, label='Stimulus B', alpha=0.7)\nax.scatter(top_neurons, mean_response_B[top_neurons], color='red', s=100, marker='o', zorder=5, label='Top discriminative')\nax.set_xlabel('Neuron ID')\nax.set_ylabel('Mean Spike Count')\nax.set_title('Population Response to Stimuli')\nax.legend()\nax.grid(True, alpha=0.2)\n\n# Panel 2: Discrimination index\nax = axes[0, 1]\nax.bar(range(n_neurons), discrimination_index, edgecolor='black')\nax.set_xlabel('Neuron ID')\nax.set_ylabel('Discrimination Index')\nax.set_title('Which Neurons Distinguish A from B?')\nax.grid(True, alpha=0.2, axis='y')\n\n# Panel 3: Population response distribution\nax = axes[1, 0]\nA_spikes = population_spikes[A_trials]\nB_spikes = population_spikes[B_trials]\nax.hist(A_spikes, bins=15, alpha=0.6, label='Stimulus A', edgecolor='black')\nax.hist(B_spikes, bins=15, alpha=0.6, label='Stimulus B', edgecolor='black')\nax.axvline(x=threshold_decode, color='r', linestyle='--', linewidth=2, label='Decode threshold')\nax.set_xlabel('Population Spike Count')\nax.set_ylabel('Count')\nax.set_title('Population Activity Distributions')\nax.legend()\nax.grid(True, alpha=0.2, axis='y')\n\n# Panel 4: Confusion matrix\nax = axes[1, 1]\ncorrect_A = (prediction_label == 'A').sum() & (stimulus == 'A').sum()\ncorrect_B = (prediction_label == 'B').sum() & (stimulus == 'B').sum()\nwrong_A_as_B = (prediction_label == 'B').sum() & (stimulus == 'A').sum()\nwrong_B_as_A = (prediction_label == 'A').sum() & (stimulus == 'B').sum()\n\nconfusion = np.array([\n    [(stimulus == 'A').sum() - wrong_B_as_A, wrong_B_as_A],\n    [wrong_A_as_B, (stimulus == 'B').sum() - wrong_A_as_B]\n])\n\nim = ax.imshow(confusion, cmap='Blues', aspect='auto')\nax.set_xticks([0, 1])\nax.set_yticks([0, 1])\nax.set_xticklabels(['Predicted A', 'Predicted B'])\nax.set_yticklabels(['True A', 'True B'])\nax.set_title(f'Decoding Accuracy: {accuracy*100:.1f}%')\n\nfor i in range(2):\n    for j in range(2):\n        ax.text(j, i, str(confusion[i, j]), ha='center', va='center', color='white', fontsize=14, fontweight='bold')\n\nplt.colorbar(im, ax=ax)\nplt.suptitle('FINAL BOSS: Neural Decoding Challenge', fontsize=14, fontweight='bold')\nplt.tight_layout()\nplt.show()\n\nprint('\\n✅ BOSS DEFEATED! You are ready for NMA!')`,
              solution: `import numpy as np\nimport matplotlib.pyplot as plt\n\nnp.random.seed(42)\n\nn_neurons = 50\nn_trials = 100\ntau = 10\nV_rest = -70\nR = 10\nthreshold = -55\ndt = 0.1\nt_max = 500\nt = np.arange(0, t_max, dt)\nn_steps = len(t)\n\nstimulus = np.random.choice(['A', 'B'], size=n_trials)\nspike_counts = np.zeros((n_trials, n_neurons))\n\nfor trial in range(n_trials):\n    I_base = 0.5 if stimulus[trial] == 'A' else 1.5\n    I = I_base * np.ones(n_steps)\n    \n    for neuron in range(n_neurons):\n        V = V_rest * np.ones(n_steps)\n        spikes = 0\n        \n        for i in range(n_steps - 1):\n            noise = np.random.normal(0, 0.1)\n            dV_dt = (-(V[i] - V_rest) + R * (I[i] + noise)) / tau\n            V[i+1] = V[i] + dV_dt * dt\n            \n            if V[i+1] > threshold:\n                spikes += 1\n                V[i+1] = V_rest\n        \n        spike_counts[trial, neuron] = spikes\n\nA_trials = stimulus == 'A'\nB_trials = stimulus == 'B'\n\nmean_response_A = spike_counts[A_trials, :].mean(axis=0)\nmean_response_B = spike_counts[B_trials, :].mean(axis=0)\n\nprint(f'Stimulus A response: {mean_response_A.mean():.1f} ± {mean_response_A.std():.1f} spikes')\nprint(f'Stimulus B response: {mean_response_B.mean():.1f} ± {mean_response_B.std():.1f} spikes')\n\ndiscrimination_index = np.abs(mean_response_A - mean_response_B)\ntop_neurons = discrimination_index.argsort()[-10:]\n\nprint(f'\\nTop 10 discriminative neurons: {top_neurons}')\n\npopulation_spikes = spike_counts.sum(axis=1)\nthreshold_decode = np.median(population_spikes)\nprediction = population_spikes > threshold_decode\nprediction_label = np.array(['B' if p else 'A' for p in prediction])\n\naccuracy = (prediction_label == stimulus).mean()\nprint(f'\\nDecoding accuracy: {accuracy*100:.1f}%')\n\nfig, axes = plt.subplots(2, 2, figsize=(12, 8))\n\nax = axes[0, 0]\nax.plot(mean_response_A, label='Stimulus A', alpha=0.7)\nax.plot(mean_response_B, label='Stimulus B', alpha=0.7)\nax.scatter(top_neurons, mean_response_B[top_neurons], color='red', s=100, marker='o', zorder=5, label='Top discriminative')\nax.set_xlabel('Neuron ID')\nax.set_ylabel('Mean Spike Count')\nax.set_title('Population Response to Stimuli')\nax.legend()\nax.grid(True, alpha=0.2)\n\nax = axes[0, 1]\nax.bar(range(n_neurons), discrimination_index, edgecolor='black')\nax.set_xlabel('Neuron ID')\nax.set_ylabel('Discrimination Index')\nax.set_title('Which Neurons Distinguish A from B?')\nax.grid(True, alpha=0.2, axis='y')\n\nax = axes[1, 0]\nA_spikes = population_spikes[A_trials]\nB_spikes = population_spikes[B_trials]\nax.hist(A_spikes, bins=15, alpha=0.6, label='Stimulus A', edgecolor='black')\nax.hist(B_spikes, bins=15, alpha=0.6, label='Stimulus B', edgecolor='black')\nax.axvline(x=threshold_decode, color='r', linestyle='--', linewidth=2, label='Decode threshold')\nax.set_xlabel('Population Spike Count')\nax.set_ylabel('Count')\nax.set_title('Population Activity Distributions')\nax.legend()\nax.grid(True, alpha=0.2, axis='y')\n\nax = axes[1, 1]\nconf_a_correct = ((prediction_label == 'A') & (stimulus == 'A')).sum()\nconf_b_correct = ((prediction_label == 'B') & (stimulus == 'B')).sum()\nconf_a_as_b = ((prediction_label == 'B') & (stimulus == 'A')).sum()\nconf_b_as_a = ((prediction_label == 'A') & (stimulus == 'B')).sum()\n\nconfusion = np.array([[conf_a_correct, conf_a_as_b], [conf_b_as_a, conf_b_correct]])\nim = ax.imshow(confusion, cmap='Blues', aspect='auto')\nax.set_xticks([0, 1])\nax.set_yticks([0, 1])\nax.set_xticklabels(['Predicted A', 'Predicted B'])\nax.set_yticklabels(['True A', 'True B'])\nax.set_title(f'Decoding Accuracy: {accuracy*100:.1f}%')\n\nfor i in range(2):\n    for j in range(2):\n        ax.text(j, i, str(confusion[i, j]), ha='center', va='center', color='white', fontsize=14, fontweight='bold')\n\nplt.colorbar(im, ax=ax)\nplt.suptitle('FINAL BOSS: Neural Decoding Challenge', fontsize=14, fontweight='bold')\nplt.tight_layout()\nplt.show()\n\nprint('\\n✅ BOSS DEFEATED! You are ready for NMA!')`,
              testCode: `
import numpy as np

np.random.seed(42)

n_neurons = 50
n_trials = 100
tau = 10
V_rest = -70
R = 10
threshold = -55
dt = 0.1
t_max = 500
t = np.arange(0, t_max, dt)
n_steps = len(t)

stimulus = np.random.choice(['A', 'B'], size=n_trials)
spike_counts = np.zeros((n_trials, n_neurons))

for trial in range(n_trials):
    I_base = 0.5 if stimulus[trial] == 'A' else 1.5
    I = I_base * np.ones(n_steps)

    for neuron in range(n_neurons):
        V = V_rest * np.ones(n_steps)
        spikes = 0

        for i in range(n_steps - 1):
            noise = np.random.normal(0, 0.1)
            dV_dt = (-(V[i] - V_rest) + R * (I[i] + noise)) / tau
            V[i+1] = V[i] + dV_dt * dt

            if V[i+1] > threshold:
                spikes += 1
                V[i+1] = V_rest

        spike_counts[trial, neuron] = spikes

A_trials = stimulus == 'A'
B_trials = stimulus == 'B'
mean_response_A = spike_counts[A_trials, :].mean(axis=0)
mean_response_B = spike_counts[B_trials, :].mean(axis=0)

population_spikes = spike_counts.sum(axis=1)
threshold_decode = np.median(population_spikes)
prediction = population_spikes > threshold_decode
prediction_label = np.array(['B' if p else 'A' for p in prediction])

accuracy = (prediction_label == stimulus).mean()

# Validation
assert accuracy > 0.5, "Decoder should do better than random (>50%)"
assert population_spikes.sum() > 0, "Population should fire"
assert spike_counts.shape == (n_trials, n_neurons), "Data shape should be (trials, neurons)"

print(f"🏆 BOSS DEFEATED! Accuracy: {accuracy*100:.1f}% - Welcome to NMA! +70 XP")
`,
              hints: [
                "Boolean indexing: A_trials = (stimulus == 'A') to get indices of A trials",
                "Mean per stimulus: spike_counts[A_trials, :].mean(axis=0) for mean per neuron",
                "Population decoder: sum spikes across neurons, compare to threshold",
                "Confusion matrix: rows=truth, columns=prediction. Diagonal = correct.",
              ],
              xpReward: 70,
            },
          },
        ],
      },
    ],
  },

  // ─── World 2: Math Mountains ──────────────────────────────
  {
    id: "world2",
    number: 2,
    title: "Math Mountains",
    subtitle: "Linear algebra & calculus — the language of models",
    emoji: "⛰️",
    color: "#6366F1",
    colorDark: "#4338CA",
    totalXP: 350,
    quests: [
      // ── Quest 2.1 — Vectors ────────────────────────────────
      {
        id: "w2q1",
        worldId: "world2",
        number: 1,
        title: "Vectors — Arrows of Math",
        description: "Understand what vectors are and why NMA uses them everywhere",
        totalXP: 30,
        lessons: [
          {
            id: "w2q1l1",
            questId: "w2q1",
            worldId: "world2",
            title: "What Is a Vector?",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 3,
            concept: [
              {
                type: "highlight",
                content: "A vector is a list of numbers that describes a direction and a magnitude — like an arrow in space.",
              },
              {
                type: "text",
                content: "In Python, a vector is just a 1-D numpy array. When NMA says 'firing rate vector', they mean an array of firing rates — one number per neuron.",
              },
              {
                type: "code",
                content: "import numpy as np\n\n# A neuron's response across 3 conditions\nfiring_rates = np.array([12.0, 45.0, 8.0])\nprint(firing_rates.shape)  # (3,)",
                caption: "shape (3,) means a 1-D vector with 3 elements.",
              },
              {
                type: "text",
                content: "You can **add** vectors element-by-element and **scale** them by multiplying with a number. NMA does this constantly when combining neural signals.",
              },
              {
                type: "code",
                content: "a = np.array([1.0, 2.0, 3.0])\nb = np.array([4.0, 5.0, 6.0])\n\nprint(a + b)   # [5. 7. 9.]\nprint(2 * a)   # [2. 4. 6.]",
                caption: "Vector addition and scalar multiplication.",
              },
              {
                type: "highlight",
                content: "🦌 Ilya says: At NMA, almost every piece of data is a vector or matrix. Comfort here = confidence on Day 1.",
              },
            ],
          },
          {
            id: "w2q1l2",
            questId: "w2q1",
            worldId: "world2",
            title: "Quiz: Vectors",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 15,
            estimatedMinutes: 4,
            questions: [
              {
                id: "w2q1l2_q1",
                text: "In numpy, what does `np.array([1, 2, 3]).shape` return?",
                options: ["(1, 3)", "(3,)", "[3]", "(3, 1)"],
                correctIndex: 1,
                explanation: "`shape` returns a tuple. A 1-D array of 3 elements has shape `(3,)` — one dimension, size 3.",
                neuroConnection: "At NMA, you'll constantly check `.shape` to make sure your neuron data arrays are the right dimensions.",
              },
              {
                id: "w2q1l2_q2",
                text: "What does `2 * np.array([3, 6, 9])` produce?",
                options: ["[6, 12, 18]", "[5, 8, 11]", "[1.5, 3, 4.5]", "Error"],
                correctIndex: 0,
                explanation: "Multiplying a vector by a scalar scales every element. 2 × [3,6,9] = [6,12,18].",
                neuroConnection: "Scaling is used in NMA when converting raw spike counts to firing rates (dividing by time window).",
              },
              {
                id: "w2q1l2_q3",
                text: "You have `a = np.array([10, 20])` and `b = np.array([3, 4])`. What is `a - b`?",
                options: ["[7, 16]", "[13, 24]", "[30, 80]", "[7, 16, 0]"],
                correctIndex: 0,
                explanation: "Vector subtraction is element-wise: [10-3, 20-4] = [7, 16].",
                neuroConnection: "Subtracting a baseline firing rate from a response vector is a common normalization in neural data analysis.",
              },
            ],
          },
        ],
      },

      // ── Quest 2.2 — Dot Product ───────────────────────────
      {
        id: "w2q2",
        worldId: "world2",
        number: 2,
        title: "The Dot Product",
        description: "The most-used operation in all of neuroscience modelling",
        totalXP: 35,
        lessons: [
          {
            id: "w2q2l1",
            questId: "w2q2",
            worldId: "world2",
            title: "Dot Product: Similarity in Numbers",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 3,
            concept: [
              {
                type: "highlight",
                content: "The dot product multiplies matching elements of two vectors, then sums everything. It measures how similar two vectors are.",
              },
              {
                type: "formula",
                content: "a · b = a₀b₀ + a₁b₁ + ... + aₙbₙ",
                caption: "Multiply matching pairs, then add them all up.",
              },
              {
                type: "code",
                content: "import numpy as np\n\nweights = np.array([0.5, 1.0, -0.3])\ninputs  = np.array([2.0, 1.0,  4.0])\n\noutput = np.dot(weights, inputs)\nprint(output)  # 0.5*2 + 1.0*1 + (-0.3)*4 = -0.2",
                caption: "This is exactly how a neuron sums its weighted inputs!",
              },
              {
                type: "text",
                content: "A **positive** dot product means vectors point in the same direction. **Zero** means they're perpendicular. **Negative** means opposite directions.",
              },
              {
                type: "highlight",
                content: "🦌 Ilya says: The weighted sum of a neuron's inputs IS the dot product. Every linear neuron model uses np.dot().",
              },
            ],
          },
          {
            id: "w2q2l2",
            questId: "w2q2",
            worldId: "world2",
            title: "Quiz: Dot Product",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 15,
            estimatedMinutes: 3,
            questions: [
              {
                id: "w2q2l2_q1",
                text: "What is `np.dot([1, 2, 3], [4, 5, 6])`?",
                options: ["[4, 10, 18]", "32", "15", "21"],
                correctIndex: 1,
                explanation: "1×4 + 2×5 + 3×6 = 4 + 10 + 18 = 32. The dot product is a single number, not an array.",
                neuroConnection: "A single neuron's output is one number — the dot product of its weight vector with its input vector.",
              },
              {
                id: "w2q2l2_q2",
                text: "If `np.dot(a, b) == 0`, the two vectors are…",
                options: ["parallel", "identical", "perpendicular (orthogonal)", "opposite"],
                correctIndex: 2,
                explanation: "Zero dot product means the vectors are orthogonal — they share no common direction component.",
                neuroConnection: "Orthogonal neural representations are ideal because neurons encode independent information — no redundancy.",
              },
            ],
          },
        ],
      },

      // ── Quest 2.3 — Matrices ──────────────────────────────
      {
        id: "w2q3",
        worldId: "world2",
        number: 3,
        title: "Matrices",
        description: "Grids of numbers that transform data",
        totalXP: 40,
        lessons: [
          {
            id: "w2q3l1",
            questId: "w2q3",
            worldId: "world2",
            title: "Matrices: Grids of Data",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 4,
            concept: [
              {
                type: "highlight",
                content: "A matrix is a 2-D array. In NMA, matrices store data where rows are often observations (trials) and columns are features (neurons).",
              },
              {
                type: "code",
                content: "import numpy as np\n\n# 3 trials × 4 neurons spike count matrix\ndata = np.array([\n  [5, 12, 0, 8],\n  [3, 15, 2, 6],\n  [9,  7, 1, 4]\n])\nprint(data.shape)  # (3, 4)",
                caption: "Shape (3, 4) = 3 rows (trials), 4 columns (neurons).",
              },
              {
                type: "text",
                content: "**Matrix multiplication** (`@` operator or `np.dot`) combines two matrices. If A is (m×n) and B is (n×p), then A @ B gives (m×p). The inner dimensions must match.",
              },
              {
                type: "code",
                content: "W = np.random.randn(4, 2)  # 4 neurons → 2 outputs\nX = np.array([[1.0, 2.0, 0.5, 3.0]])  # 1 trial\n\noutput = X @ W   # (1, 4) @ (4, 2) = (1, 2)\nprint(output.shape)  # (1, 2)",
                caption: "Matrix multiply: inner dims must match. (1,4)@(4,2)=(1,2).",
              },
              {
                type: "highlight",
                content: "🦌 Ilya says: Check .shape before every matrix multiply. Most NMA errors are shape mismatches!",
              },
            ],
          },
          {
            id: "w2q3l2",
            questId: "w2q3",
            worldId: "world2",
            title: "Quiz: Matrices",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 15,
            estimatedMinutes: 4,
            questions: [
              {
                id: "w2q3l2_q1",
                text: "An NMA dataset has 100 trials and 50 neurons. What shape is the data matrix?",
                options: ["(50, 100)", "(100, 50)", "(100,)", "(50,)"],
                correctIndex: 1,
                explanation: "Convention: rows = trials (observations), columns = neurons (features). So (100, 50).",
                neuroConnection: "NMA data is almost always shaped (n_trials, n_neurons) or (n_timepoints, n_neurons).",
              },
              {
                id: "w2q3l2_q2",
                text: "Matrix A has shape (5, 3) and B has shape (3, 7). What is the shape of A @ B?",
                options: ["(5, 7)", "(3, 3)", "(5, 3, 7)", "Error — shapes don't match"],
                correctIndex: 0,
                explanation: "The inner dims (3 and 3) match, giving output shape (5, 7) — the outer dims.",
                neuroConnection: "Transforming 5 trials from 3-neuron space to 7-feature space is a standard dimensionality change in NMA.",
              },
              {
                id: "w2q3l2_q3",
                text: "What does `data.T` do to a matrix of shape (100, 50)?",
                options: ["Converts to (50, 100)", "Flattens to (5000,)", "Sums all elements", "Raises an error"],
                correctIndex: 0,
                explanation: "`.T` transposes: rows become columns. (100, 50) becomes (50, 100).",
                neuroConnection: "Transpose is used in NMA when you need to switch between trial-by-neuron and neuron-by-trial formats.",
              },
            ],
          },
        ],
      },

      // ── Quest 2.4 — Derivatives ───────────────────────────
      {
        id: "w2q4",
        worldId: "world2",
        number: 4,
        title: "Derivatives & Gradients",
        description: "How things change — the engine of learning",
        totalXP: 40,
        lessons: [
          {
            id: "w2q4l1",
            questId: "w2q4",
            worldId: "world2",
            title: "Derivatives: The Rate of Change",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 4,
            concept: [
              {
                type: "highlight",
                content: "A derivative measures how fast a function's output changes when its input changes — it's the slope at any point.",
              },
              {
                type: "formula",
                content: "df/dx = lim(Δx→0) [f(x+Δx) - f(x)] / Δx",
                caption: "The derivative is the limit of the slope as the step size goes to zero.",
              },
              {
                type: "text",
                content: "Key rules you'll see in NMA:\n• **Constant rule**: d(c)/dx = 0\n• **Power rule**: d(xⁿ)/dx = n·xⁿ⁻¹\n• **Chain rule**: d(f(g(x)))/dx = f'(g(x)) · g'(x)",
              },
              {
                type: "code",
                content: "import numpy as np\n\n# Numerical derivative (what NMA often uses)\nx = np.linspace(0, 2*np.pi, 1000)\ny = np.sin(x)\n\n# np.gradient approximates the derivative\ndydx = np.gradient(y, x)\n# dydx ≈ cos(x)",
                caption: "np.gradient() numerically approximates derivatives — no calculus required!",
              },
              {
                type: "highlight",
                content: "🦌 Ilya says: Gradient descent — the core of all learning algorithms — is just following the negative gradient downhill.",
              },
            ],
          },
          {
            id: "w2q4l2",
            questId: "w2q4",
            worldId: "world2",
            title: "Quiz: Derivatives",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 15,
            estimatedMinutes: 3,
            questions: [
              {
                id: "w2q4l2_q1",
                text: "What is the derivative of f(x) = x² ?",
                options: ["x", "2x", "2", "x²/2"],
                correctIndex: 1,
                explanation: "Power rule: d(x²)/dx = 2x¹ = 2x. The slope of the parabola at any point x is 2x.",
                neuroConnection: "Squared error loss (the most common NMA loss function) has derivative 2·error — pointing uphill.",
              },
              {
                id: "w2q4l2_q2",
                text: "What does it mean when the derivative equals zero?",
                options: ["The function is constant everywhere", "We're at a peak or valley (critical point)", "The function is undefined", "The input is zero"],
                correctIndex: 1,
                explanation: "Derivative = 0 means the slope is flat — we're at a local minimum, maximum, or saddle point.",
                neuroConnection: "Gradient descent stops when the gradient ≈ 0, meaning the model has found a (local) minimum of the loss.",
              },
            ],
          },
        ],
      },

      // ── Quest 2.5 — Boss Battle ───────────────────────────
      {
        id: "w2q5",
        worldId: "world2",
        number: 5,
        title: "Boss Battle: Matrix Mind",
        description: "Apply linear algebra to a real neural data problem",
        totalXP: 50,
        lessons: [
          {
            id: "w2q5l1",
            questId: "w2q5",
            worldId: "world2",
            title: "Boss: Decode the Neural Matrix",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 25,
            estimatedMinutes: 6,
            questions: [
              {
                id: "w2q5l1_q1",
                text: "You have neural data shaped (200, 64) — 200 trials, 64 neurons. You want to project it to 2D. What operation gives shape (200, 2)?",
                options: [
                  "data @ W where W is (64, 2)",
                  "data @ W where W is (2, 64)",
                  "W @ data where W is (64, 2)",
                  "data.T @ W where W is (200, 2)",
                ],
                correctIndex: 0,
                explanation: "(200, 64) @ (64, 2) = (200, 2). Inner dims (64 and 64) match. This is exactly how PCA projection works!",
                neuroConnection: "Projecting 64-neuron population vectors into 2D is the first step of dimensionality reduction at NMA.",
              },
              {
                id: "w2q5l1_q2",
                text: "A neuron's weight vector is [2, -1, 0.5] and input is [3, 4, 2]. What is its output (using dot product)?",
                options: ["8", "3", "3.0", "2"],
                correctIndex: 2,
                explanation: "2×3 + (-1)×4 + 0.5×2 = 6 - 4 + 1 = 3.0. This is the neuron's weighted sum before applying an activation.",
                neuroConnection: "Every integrate-and-fire neuron computes this dot product at each timestep in NMA simulations.",
              },
              {
                id: "w2q5l1_q3",
                text: "You computed gradient = 0.4 and learning rate = 0.1. What is the parameter update in gradient descent?",
                options: ["parameter += 0.4", "parameter -= 0.04", "parameter += 0.04", "parameter *= 0.1"],
                correctIndex: 1,
                explanation: "Gradient descent: parameter -= learning_rate × gradient = 0.1 × 0.4 = 0.04. We subtract to go downhill.",
                neuroConnection: "NMA Model Fitting tutorials use exactly this formula to fit linear models to neural data.",
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── World 3: Stats Swamps ─────────────────────────────────
  {
    id: "world3",
    number: 3,
    title: "Stats Swamps",
    subtitle: "Probability, distributions, and inference",
    emoji: "🌿",
    color: "#14B8A6",
    colorDark: "#0F766E",
    totalXP: 320,
    quests: [
      // ── Quest 3.1 — Probability Basics ────────────────────
      {
        id: "w3q1",
        worldId: "world3",
        number: 1,
        title: "Probability Basics",
        description: "The math of uncertainty — essential for all NMA analyses",
        totalXP: 30,
        lessons: [
          {
            id: "w3q1l1",
            questId: "w3q1",
            worldId: "world3",
            title: "What Is Probability?",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 3,
            concept: [
              {
                type: "highlight",
                content: "Probability is a number between 0 and 1 measuring how likely an event is. 0 = impossible, 1 = certain.",
              },
              {
                type: "text",
                content: "At NMA, probability appears everywhere: a neuron fires with probability p, a trial belongs to stimulus A with probability q, model parameters are drawn from a distribution.",
              },
              {
                type: "text",
                content: "Key rules:\n• **P(A or B)** = P(A) + P(B) - P(A and B)\n• **P(A and B)** = P(A) × P(B) if A and B are independent\n• All probabilities of all outcomes sum to 1",
              },
              {
                type: "code",
                content: "import numpy as np\n\n# Simulate 1000 coin flips\nflips = np.random.choice(['H', 'T'], size=1000)\np_heads = np.mean(flips == 'H')\nprint(f'P(heads) ≈ {p_heads:.3f}')  # ≈ 0.500",
                caption: "Law of large numbers: more trials → probability converges to truth.",
              },
              {
                type: "highlight",
                content: "🦌 Ilya says: NMA uses probability to describe UNCERTAINTY about neural responses. Neurons are noisy — stats handles that.",
              },
            ],
          },
          {
            id: "w3q1l2",
            questId: "w3q1",
            worldId: "world3",
            title: "Quiz: Probability",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 15,
            estimatedMinutes: 3,
            questions: [
              {
                id: "w3q1l2_q1",
                text: "A neuron fires on 30% of trials. What is P(does NOT fire)?",
                options: ["0.7", "0.3", "0.6", "0.15"],
                correctIndex: 0,
                explanation: "P(not A) = 1 - P(A) = 1 - 0.3 = 0.7. Complementary events always sum to 1.",
                neuroConnection: "Computing P(no spike) is used when calculating the reliability of a neuron's response in NMA.",
              },
              {
                id: "w3q1l2_q2",
                text: "Two independent neurons each fire with P=0.4. What is P(both fire)?",
                options: ["0.8", "0.16", "0.4", "0.04"],
                correctIndex: 1,
                explanation: "Independent events: P(A and B) = P(A) × P(B) = 0.4 × 0.4 = 0.16.",
                neuroConnection: "Independence assumption is used in population coding models at NMA — though real neurons are often correlated!",
              },
            ],
          },
        ],
      },

      // ── Quest 3.2 — Distributions ─────────────────────────
      {
        id: "w3q2",
        worldId: "world3",
        number: 2,
        title: "The Normal Distribution",
        description: "The bell curve that describes almost everything",
        totalXP: 35,
        lessons: [
          {
            id: "w3q2l1",
            questId: "w3q2",
            worldId: "world3",
            title: "Mean, Variance & the Bell Curve",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 4,
            concept: [
              {
                type: "highlight",
                content: "The Normal (Gaussian) distribution is defined by two numbers: mean μ (center) and variance σ² (spread). It's the most important distribution in neuroscience.",
              },
              {
                type: "formula",
                content: "68% of data falls within 1σ of the mean\n95% within 2σ, 99.7% within 3σ",
                caption: "The 68-95-99.7 rule — memorize this!",
              },
              {
                type: "code",
                content: "import numpy as np\n\n# Simulate noisy neuron firing rates\nmean_rate = 20.0   # Hz\nstd_dev   = 5.0    # Hz\nn_trials  = 1000\n\nrates = np.random.normal(mean_rate, std_dev, n_trials)\nprint(f'Mean: {rates.mean():.1f}')\nprint(f'Std:  {rates.std():.1f}')",
                caption: "np.random.normal(mean, std, size) generates Gaussian samples.",
              },
              {
                type: "text",
                content: "The **mean** `np.mean(data)` is the average. The **standard deviation** `np.std(data)` measures spread — how much data varies around the mean.",
              },
              {
                type: "highlight",
                content: "🦌 Ilya says: Measurement noise in NMA experiments is nearly always modelled as Gaussian. Knowing this distribution = 30% of NMA stats done!",
              },
            ],
          },
          {
            id: "w3q2l2",
            questId: "w3q2",
            worldId: "world3",
            title: "Quiz: Distributions",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 15,
            estimatedMinutes: 3,
            questions: [
              {
                id: "w3q2l2_q1",
                text: "A neuron's firing rate is normally distributed: mean=20 Hz, std=4 Hz. ~95% of trials fall between…",
                options: ["16–24 Hz", "12–28 Hz", "18–22 Hz", "8–32 Hz"],
                correctIndex: 1,
                explanation: "95% falls within 2 standard deviations: 20 ± 2×4 = 20 ± 8 = [12, 28] Hz.",
                neuroConnection: "This is how NMA researchers report confidence intervals on neural tuning curves.",
              },
              {
                id: "w3q2l2_q2",
                text: "Which numpy function computes the standard deviation?",
                options: ["np.mean()", "np.std()", "np.var()", "np.norm()"],
                correctIndex: 1,
                explanation: "np.std() computes standard deviation. np.var() gives variance (= std²). np.norm() doesn't exist for this purpose.",
                neuroConnection: "np.std() is used constantly in NMA to characterize trial-to-trial variability in neural responses.",
              },
            ],
          },
        ],
      },

      // ── Quest 3.3 — Hypothesis Testing ────────────────────
      {
        id: "w3q3",
        worldId: "world3",
        number: 3,
        title: "Hypothesis Testing",
        description: "Is this result real or just noise?",
        totalXP: 35,
        lessons: [
          {
            id: "w3q3l1",
            questId: "w3q3",
            worldId: "world3",
            title: "p-values & Statistical Significance",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 4,
            concept: [
              {
                type: "highlight",
                content: "A p-value answers: 'If there were NO real effect, how likely would I see data this extreme?' Small p-value (< 0.05) → reject the null hypothesis.",
              },
              {
                type: "text",
                content: "The **null hypothesis (H₀)** is your boring assumption — usually 'no difference' or 'no effect'. The **alternative (H₁)** is what you hope to prove.",
              },
              {
                type: "code",
                content: "from scipy import stats\nimport numpy as np\n\n# Did the neuron respond to stimulus A vs baseline?\nbaseline = np.random.normal(5, 2, 50)   # 50 baseline trials\nstimulus = np.random.normal(8, 2, 50)   # 50 stimulus trials\n\nt_stat, p_value = stats.ttest_ind(baseline, stimulus)\nprint(f'p = {p_value:.4f}')\nif p_value < 0.05:\n    print('Significant response!')",
                caption: "scipy.stats.ttest_ind: the standard NMA significance test.",
              },
              {
                type: "highlight",
                content: "🦌 Ilya says: NMA uses p < 0.05 as a threshold, but always think about effect size too — a tiny but 'significant' effect may not matter biologically.",
              },
            ],
          },
          {
            id: "w3q3l2",
            questId: "w3q3",
            worldId: "world3",
            title: "Quiz: Hypothesis Testing",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 15,
            estimatedMinutes: 3,
            questions: [
              {
                id: "w3q3l2_q1",
                text: "You get p = 0.002. What should you conclude?",
                options: [
                  "There is definitely a real effect",
                  "There is strong evidence against the null hypothesis",
                  "The effect size is large",
                  "The experiment should be repeated",
                ],
                correctIndex: 1,
                explanation: "p = 0.002 means only 0.2% chance of seeing this data if H₀ were true — strong evidence against H₀. But it doesn't tell us how big the effect is.",
                neuroConnection: "NMA researchers always report both p-values and effect sizes when claiming a neuron is 'selective' for a stimulus.",
              },
              {
                id: "w3q3l2_q2",
                text: "Which scipy function runs a two-sample t-test?",
                options: ["stats.ttest_1samp()", "stats.ttest_ind()", "stats.norm.cdf()", "stats.anova()"],
                correctIndex: 1,
                explanation: "stats.ttest_ind() tests whether two independent groups have different means. stats.ttest_1samp() compares one group to a fixed value.",
                neuroConnection: "Used in NMA to test whether a neuron's response to stimulus A differs significantly from stimulus B.",
              },
            ],
          },
        ],
      },

      // ── Quest 3.4 — Boss Battle ───────────────────────────
      {
        id: "w3q4",
        worldId: "world3",
        number: 4,
        title: "Boss Battle: Stats Slam",
        description: "Prove your stats chops with real neuroscience scenarios",
        totalXP: 50,
        lessons: [
          {
            id: "w3q4l1",
            questId: "w3q4",
            worldId: "world3",
            title: "Boss: Stats in the Wild",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 25,
            estimatedMinutes: 6,
            questions: [
              {
                id: "w3q4l1_q1",
                text: "You measure firing rates from 40 neurons. Mean = 15 Hz, std = 6 Hz. What is the standard error of the mean (SEM)?",
                options: ["6 Hz", "0.15 Hz", "0.95 Hz", "1.5 Hz"],
                correctIndex: 2,
                explanation: "SEM = std / √n = 6 / √40 ≈ 0.95 Hz. SEM shrinks as you collect more neurons.",
                neuroConnection: "NMA plots always show error bars as SEM (±1 SEM) to show how precisely the mean was estimated.",
              },
              {
                id: "w3q4l1_q2",
                text: "You run 100 statistical tests and use p < 0.05 as threshold. How many false positives do you expect by chance?",
                options: ["0", "1", "5", "50"],
                correctIndex: 2,
                explanation: "With α = 0.05, each test has a 5% false positive rate. 100 × 0.05 = 5 expected false positives — this is why multiple comparison correction matters!",
                neuroConnection: "NMA tutorials explicitly cover Bonferroni correction and FDR for neural population analyses with many neurons.",
              },
              {
                id: "w3q4l1_q3",
                text: "A distribution has mean=0 and variance=1. What is its standard deviation?",
                options: ["0", "0.5", "1", "2"],
                correctIndex: 2,
                explanation: "Standard deviation = √variance = √1 = 1. The standard normal distribution N(0,1) has mean 0, variance 1, std 1.",
                neuroConnection: "Z-scoring neural data (subtracting mean, dividing by std) converts to N(0,1) units for comparing neurons.",
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── World 4: Neuro Jungle ─────────────────────────────────
  {
    id: "world4",
    number: 4,
    title: "Neuro Jungle",
    subtitle: "Neurons, spikes, and brain signals",
    emoji: "🌴",
    color: "#22C55E",
    colorDark: "#15803D",
    totalXP: 300,
    quests: [
      // ── Quest 4.1 — The Neuron ────────────────────────────
      {
        id: "w4q1",
        worldId: "world4",
        number: 1,
        title: "The Neuron",
        description: "Biology first — what you're modelling",
        totalXP: 30,
        lessons: [
          {
            id: "w4q1l1",
            questId: "w4q1",
            worldId: "world4",
            title: "Anatomy of a Neuron",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 3,
            concept: [
              {
                type: "highlight",
                content: "A neuron receives signals through dendrites, integrates them in the cell body (soma), and sends an output spike down the axon.",
              },
              {
                type: "text",
                content: "The key parts:\n• **Dendrites** — branches that receive inputs from other neurons\n• **Soma** — the cell body that sums all inputs\n• **Axon** — the long cable that sends the output\n• **Synapse** — the gap between neurons where signals transfer",
              },
              {
                type: "text",
                content: "The **resting membrane potential** is about **–70 mV**. When enough excitatory inputs arrive, the membrane depolarizes toward the **threshold** of about –55 mV, triggering an action potential (spike).",
              },
              {
                type: "formula",
                content: "V_rest ≈ –70 mV    V_threshold ≈ –55 mV\nV_peak ≈ +40 mV",
                caption: "Key voltages every computational neuroscientist knows.",
              },
              {
                type: "highlight",
                content: "🦌 Ilya says: NMA models neurons as voltage variables. Knowing the biology makes the math intuitive — V is always the membrane potential.",
              },
            ],
          },
          {
            id: "w4q1l2",
            questId: "w4q1",
            worldId: "world4",
            title: "Quiz: Neuron Anatomy",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 15,
            estimatedMinutes: 3,
            questions: [
              {
                id: "w4q1l2_q1",
                text: "What is the approximate resting membrane potential of a neuron?",
                options: ["0 mV", "+40 mV", "–70 mV", "–55 mV"],
                correctIndex: 2,
                explanation: "Resting potential is ~–70 mV. Threshold is ~–55 mV. Peak of action potential is ~+40 mV.",
                neuroConnection: "NMA LIF models always initialize voltage at V_rest = –70 mV before the simulation begins.",
              },
              {
                id: "w4q1l2_q2",
                text: "Which part of the neuron SENDS the output signal?",
                options: ["Dendrite", "Soma", "Axon", "Synapse"],
                correctIndex: 2,
                explanation: "The axon carries the action potential away from the soma to downstream neurons. Dendrites receive; axons send.",
                neuroConnection: "In NMA network models, 'connections' are axonal projections — the weight matrix represents axon → dendrite strength.",
              },
            ],
          },
        ],
      },

      // ── Quest 4.2 — Action Potentials ─────────────────────
      {
        id: "w4q2",
        worldId: "world4",
        number: 2,
        title: "Action Potentials",
        description: "The spike — a neuron's only output",
        totalXP: 35,
        lessons: [
          {
            id: "w4q2l1",
            questId: "w4q2",
            worldId: "world4",
            title: "The Action Potential",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 3,
            concept: [
              {
                type: "highlight",
                content: "An action potential (spike) is an all-or-none electrical signal. The neuron either fires fully or not at all — there's no 'half spike'.",
              },
              {
                type: "text",
                content: "Sequence of events:\n1. Voltage rises to threshold (–55 mV)\n2. Na⁺ channels open → rapid **depolarization** to +40 mV\n3. K⁺ channels open → rapid **repolarization** back to –70 mV\n4. Brief **hyperpolarization** (refractory period: ~2 ms)\n5. Return to rest — ready to fire again",
              },
              {
                type: "text",
                content: "The **refractory period** limits how fast a neuron can fire — maximum ~500 Hz, but typical rates are 1–100 Hz. Information is encoded in the **timing** and **rate** of spikes.",
              },
              {
                type: "highlight",
                content: "🦌 Ilya says: NMA records spikes as 0/1 arrays — 1 means a spike occurred in that millisecond bin. You'll process millions of these!",
              },
            ],
          },
          {
            id: "w4q2l2",
            questId: "w4q2",
            worldId: "world4",
            title: "Spike Trains & Firing Rates",
            type: "concept",
            deviceRequired: "any",
            xpReward: 15,
            estimatedMinutes: 4,
            concept: [
              {
                type: "highlight",
                content: "A spike train is a time series of 0s and 1s. The firing rate is the average number of spikes per second (Hz).",
              },
              {
                type: "code",
                content: "import numpy as np\n\n# Spike train: 1 second, 1ms bins\ndt = 0.001        # 1 ms time step\nt  = np.arange(0, 1.0, dt)   # 1000 time bins\n\n# Poisson neuron at 40 Hz\nfiring_rate = 40  # Hz\nspikes = np.random.poisson(firing_rate * dt, len(t))\n\nprint(f'Total spikes: {spikes.sum()}')  # ≈ 40\nprint(f'Firing rate: {spikes.sum() / 1.0:.1f} Hz')",
                caption: "Poisson spike train — the standard NMA neural noise model.",
              },
              {
                type: "text",
                content: "To estimate firing rate from spikes, use a **sliding window** (bin the spikes and divide by the window size). Wider windows → smoother rate, less temporal precision.",
              },
              {
                type: "highlight",
                content: "🦌 Ilya says: The Poisson process is the standard model for spike generation in NMA. Spikes are random — the rate parameter carries the signal.",
              },
            ],
          },
        ],
      },

      // ── Quest 4.3 — LIF Neuron Model ──────────────────────
      {
        id: "w4q3",
        worldId: "world4",
        number: 3,
        title: "The LIF Neuron Model",
        description: "Simulate a real neuron with 10 lines of Python",
        totalXP: 45,
        lessons: [
          {
            id: "w4q3l1",
            questId: "w4q3",
            worldId: "world4",
            title: "Leaky Integrate-and-Fire",
            type: "concept",
            deviceRequired: "any",
            xpReward: 15,
            estimatedMinutes: 5,
            concept: [
              {
                type: "highlight",
                content: "The Leaky Integrate-and-Fire (LIF) model is the workhorse of NMA. It integrates inputs, leaks voltage back to rest, and fires when threshold is crossed.",
              },
              {
                type: "formula",
                content: "τ_m · dV/dt = -(V - V_rest) + R·I(t)",
                caption: "τ_m = membrane time constant (~10ms), R = resistance, I = input current.",
              },
              {
                type: "code",
                content: "import numpy as np\n\n# LIF parameters\ndt     = 0.001    # 1 ms time step\nV_rest = -0.070   # –70 mV\nV_thr  = -0.055   # –55 mV\ntau_m  = 0.010    # 10 ms time constant\nR      = 10e6     # 10 MΩ resistance\nI_ext  = 3e-9     # 3 nA input current\n\nV = V_rest        # start at rest\nspikes = []\n\nfor t in np.arange(0, 0.5, dt):\n    dV = dt/tau_m * (-(V - V_rest) + R*I_ext)\n    V += dV\n    if V >= V_thr:\n        spikes.append(t)\n        V = V_rest   # reset after spike\n\nprint(f'{len(spikes)} spikes in 500 ms')",
                caption: "Full LIF simulation — this exact code appears in NMA tutorials!",
              },
              {
                type: "highlight",
                content: "🦌 Ilya says: This is THE model in NMA Week 1. When you see it in the tutorial, you'll think 'I already know this!'",
              },
            ],
          },
          {
            id: "w4q3l2",
            questId: "w4q3",
            worldId: "world4",
            title: "Quiz: LIF Model",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 20,
            estimatedMinutes: 4,
            questions: [
              {
                id: "w4q3l2_q1",
                text: "In the LIF model, what happens to voltage V after a spike?",
                options: ["It continues rising", "It resets to V_rest", "It stays at threshold", "It goes to zero"],
                correctIndex: 1,
                explanation: "After a spike, V resets to V_rest (–70 mV). This simulates the after-hyperpolarization.",
                neuroConnection: "Every NMA LIF simulation has `if V >= V_thr: V = V_rest` — the reset condition.",
              },
              {
                id: "w4q3l2_q2",
                text: "The 'leaky' in LIF means:",
                options: [
                  "The neuron occasionally fires without input",
                  "Voltage naturally decays toward V_rest when there's no input",
                  "Some input current is lost",
                  "The threshold slowly decreases over time",
                ],
                correctIndex: 1,
                explanation: "The -(V - V_rest) term pulls voltage back to rest. Without input, V leaks back to V_rest exponentially.",
                neuroConnection: "The leak is the τ_m term. Longer τ_m = slower leak = better memory of past inputs. This tunes neuron sensitivity.",
              },
              {
                id: "w4q3l2_q3",
                text: "Doubling the input current I_ext will:",
                options: [
                  "Double the firing rate exactly",
                  "Increase the firing rate (not necessarily double)",
                  "Have no effect on firing rate",
                  "Stop the neuron from firing",
                ],
                correctIndex: 1,
                explanation: "More current → faster charging → reaches threshold sooner → higher rate. But the relationship isn't always linear due to the leak.",
                neuroConnection: "The I-F (current-frequency) curve is a fundamental NMA plot — it shows how input current drives firing rate.",
              },
            ],
          },
        ],
      },

      // ── Quest 4.4 — Boss Battle ───────────────────────────
      {
        id: "w4q4",
        worldId: "world4",
        number: 4,
        title: "Boss Battle: Build a Neuron",
        description: "Prove you can think like a computational neuroscientist",
        totalXP: 50,
        lessons: [
          {
            id: "w4q4l1",
            questId: "w4q4",
            worldId: "world4",
            title: "Boss: Neuron Mastery",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 25,
            estimatedMinutes: 6,
            questions: [
              {
                id: "w4q4l1_q1",
                text: "A Poisson neuron fires at 50 Hz. In a 100 ms window (dt=1ms), how many spikes do you expect?",
                options: ["50", "0.5", "5", "500"],
                correctIndex: 2,
                explanation: "50 spikes/sec × 0.1 sec = 5 expected spikes. Or: 50 Hz × 0.001 s/bin × 100 bins = 5.",
                neuroConnection: "Computing expected spike counts per trial is the first step of every NMA firing rate analysis.",
              },
              {
                id: "w4q4l1_q2",
                text: "A neuron's spike train is [0,0,1,0,1,1,0,0,0,1] (10 ms window). What is its firing rate?",
                options: ["40 Hz", "400 Hz", "4 Hz", "0.4 Hz"],
                correctIndex: 1,
                explanation: "4 spikes in 10 ms = 4 / 0.010 s = 400 Hz. Spike rate = count / window_duration.",
                neuroConnection: "This exact calculation — spikes.sum() / window_duration — computes instantaneous firing rate in NMA.",
              },
              {
                id: "w4q4l1_q3",
                text: "Membrane time constant τ_m = 10 ms. If I turn off all input, how long until V decays to ~37% of its initial deviation from rest?",
                options: ["1 ms", "10 ms", "37 ms", "100 ms"],
                correctIndex: 1,
                explanation: "τ_m is the time constant of exponential decay. After 1τ, the voltage decays to 1/e ≈ 37% of its starting value.",
                neuroConnection: "Understanding τ_m helps predict how long a neuron 'remembers' a brief input — crucial for NMA temporal dynamics.",
              },
            ],
          },
        ],
      },
    ],
  },

  // ─── World 5: Computation Caves ───────────────────────────
  {
    id: "world5",
    number: 5,
    title: "Computation Caves",
    subtitle: "Models, simulations, and NMA prep",
    emoji: "🪨",
    color: "#A855F7",
    colorDark: "#7E22CE",
    totalXP: 400,
    quests: [
      // ── Quest 5.1 — Linear Regression ─────────────────────
      {
        id: "w5q1",
        worldId: "world5",
        number: 1,
        title: "Linear Regression",
        description: "Fit a line through neural data",
        totalXP: 40,
        lessons: [
          {
            id: "w5q1l1",
            questId: "w5q1",
            worldId: "world5",
            title: "Fitting Lines to Data",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 4,
            concept: [
              {
                type: "highlight",
                content: "Linear regression finds the best straight-line fit through data by minimizing the sum of squared errors.",
              },
              {
                type: "formula",
                content: "y = β₀ + β₁x + ε\nLoss = Σ(y_true - y_pred)²",
                caption: "β₀ = intercept, β₁ = slope, ε = noise.",
              },
              {
                type: "code",
                content: "import numpy as np\n\n# Stimulus intensity → firing rate data\nx = np.array([0, 1, 2, 3, 4, 5])   # stimulus\ny = np.array([5, 12, 18, 27, 35, 41])  # firing rate\n\n# Least-squares fit (analytical solution)\nX = np.column_stack([np.ones_like(x), x])\nbeta = np.linalg.lstsq(X, y, rcond=None)[0]\nprint(f'Intercept: {beta[0]:.2f}')\nprint(f'Slope: {beta[1]:.2f}')",
                caption: "np.linalg.lstsq — the NMA analytical regression solver.",
              },
              {
                type: "text",
                content: "The **R²** (coefficient of determination) measures how much variance in y your model explains. R² = 1 means perfect fit; R² = 0 means the model is no better than just guessing the mean.",
              },
              {
                type: "highlight",
                content: "🦌 Ilya says: NMA Tutorial W1D3 is entirely about linear regression on neural data. This IS the tutorial.",
              },
            ],
          },
          {
            id: "w5q1l2",
            questId: "w5q1",
            worldId: "world5",
            title: "Quiz: Linear Regression",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 15,
            estimatedMinutes: 3,
            questions: [
              {
                id: "w5q1l2_q1",
                text: "You fit a linear model: firing_rate = 5 + 7 × stimulus_intensity. For stimulus = 3, the predicted rate is:",
                options: ["15 Hz", "21 Hz", "26 Hz", "35 Hz"],
                correctIndex: 2,
                explanation: "5 + 7 × 3 = 5 + 21 = 26 Hz. Plug x=3 into the equation.",
                neuroConnection: "NMA uses this to predict neural responses to new stimuli the neuron wasn't tested on.",
              },
              {
                id: "w5q1l2_q2",
                text: "Linear regression minimizes:",
                options: ["Sum of errors", "Sum of absolute errors", "Sum of squared errors", "Maximum error"],
                correctIndex: 2,
                explanation: "Ordinary least squares minimizes Σ(y_true - y_pred)². Squaring penalizes large errors more.",
                neuroConnection: "MSE (mean squared error) is the standard loss function in all NMA model fitting tutorials.",
              },
            ],
          },
        ],
      },

      // ── Quest 5.2 — Gradient Descent ──────────────────────
      {
        id: "w5q2",
        worldId: "world5",
        number: 2,
        title: "Gradient Descent",
        description: "How machines learn by going downhill",
        totalXP: 45,
        lessons: [
          {
            id: "w5q2l1",
            questId: "w5q2",
            worldId: "world5",
            title: "Learning by Following the Slope",
            type: "concept",
            deviceRequired: "any",
            xpReward: 15,
            estimatedMinutes: 5,
            concept: [
              {
                type: "highlight",
                content: "Gradient descent finds the minimum of a loss function by taking small steps in the direction opposite to the gradient (slope).",
              },
              {
                type: "formula",
                content: "θ ← θ − α · ∂L/∂θ",
                caption: "θ = parameter, α = learning rate, ∂L/∂θ = gradient of loss.",
              },
              {
                type: "code",
                content: "import numpy as np\n\n# Fit y = w*x using gradient descent\nx = np.array([1., 2., 3., 4., 5.])\ny = np.array([2., 4., 6., 8., 10.])  # true: w=2\n\nw = 0.0          # start with w=0\nalpha = 0.01     # learning rate\n\nfor step in range(100):\n    y_pred = w * x\n    loss = np.mean((y - y_pred)**2)\n    grad = -2 * np.mean((y - y_pred) * x)\n    w -= alpha * grad\n\nprint(f'w = {w:.4f}')  # ≈ 2.0",
                caption: "100 steps of gradient descent learning w=2.",
              },
              {
                type: "text",
                content: "The **learning rate α** is crucial. Too large → overshoots the minimum, oscillates or diverges. Too small → learns too slowly. NMA tutorials explore this tradeoff directly.",
              },
              {
                type: "highlight",
                content: "🦌 Ilya says: Every deep learning model you'll encounter at NMA uses gradient descent. Mastering this is mastering modern ML.",
              },
            ],
          },
          {
            id: "w5q2l2",
            questId: "w5q2",
            worldId: "world5",
            title: "Quiz: Gradient Descent",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 20,
            estimatedMinutes: 4,
            questions: [
              {
                id: "w5q2l2_q1",
                text: "If the gradient of the loss with respect to weight w is +0.8 and learning rate α=0.1, the new weight is:",
                options: ["w + 0.08", "w − 0.08", "w + 0.8", "w − 0.1"],
                correctIndex: 1,
                explanation: "w ← w - α·grad = w - 0.1×0.8 = w - 0.08. We subtract the gradient to go downhill.",
                neuroConnection: "This exact update rule is used in every NMA gradient descent exercise — just scale by learning rate and subtract.",
              },
              {
                id: "w5q2l2_q2",
                text: "Learning rate is too large. What symptom do you see?",
                options: [
                  "Loss decreases very slowly",
                  "Loss oscillates or increases",
                  "The model ignores training data",
                  "Gradient becomes negative",
                ],
                correctIndex: 1,
                explanation: "Too large learning rate → gradient steps overshoot the minimum → loss bounces up and down or diverges.",
                neuroConnection: "NMA W1D5 has you tune learning rate and watch the loss curve — you'll recognize this symptom immediately.",
              },
            ],
          },
        ],
      },

      // ── Quest 5.3 — PCA ───────────────────────────────────
      {
        id: "w5q3",
        worldId: "world5",
        number: 3,
        title: "Dimensionality Reduction & PCA",
        description: "Find the signal hiding in high-dimensional neural data",
        totalXP: 45,
        lessons: [
          {
            id: "w5q3l1",
            questId: "w5q3",
            worldId: "world5",
            title: "PCA: Finding the Signal",
            type: "concept",
            deviceRequired: "any",
            xpReward: 15,
            estimatedMinutes: 5,
            concept: [
              {
                type: "highlight",
                content: "PCA (Principal Component Analysis) finds the directions of maximum variance in high-dimensional data, letting you visualize 100 neurons in just 2 dimensions.",
              },
              {
                type: "text",
                content: "The key idea: neurons are correlated. 100 neurons don't give 100 independent dimensions of information. PCA finds the **few directions that explain most of the variance** — these are the principal components.",
              },
              {
                type: "code",
                content: "import numpy as np\nfrom sklearn.decomposition import PCA\n\n# Neural data: 200 trials × 100 neurons\ndata = np.random.randn(200, 100)\n\n# Reduce to 2 dimensions\npca = PCA(n_components=2)\ndata_2d = pca.fit_transform(data)\n\nprint(data_2d.shape)  # (200, 2)\nprint(pca.explained_variance_ratio_)  # % variance each PC captures",
                caption: "sklearn PCA — the NMA way to visualize neural population activity.",
              },
              {
                type: "text",
                content: "**Explained variance** tells you how much information each PC captures. If PC1 explains 40% of variance and PC2 explains 25%, your 2D plot captures 65% of the signal.",
              },
              {
                type: "highlight",
                content: "🦌 Ilya says: NMA W1D4 is all about PCA on neural data. You'll make the exact plots that appear in top neuroscience papers!",
              },
            ],
          },
          {
            id: "w5q3l2",
            questId: "w5q3",
            worldId: "world5",
            title: "Quiz: PCA",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 20,
            estimatedMinutes: 3,
            questions: [
              {
                id: "w5q3l2_q1",
                text: "You apply PCA to (500 trials, 64 neurons) data with n_components=3. What is the output shape?",
                options: ["(64, 3)", "(500, 3)", "(3, 64)", "(500, 64)"],
                correctIndex: 1,
                explanation: "PCA transforms each trial from 64D to 3D. 500 trials × 3 PCs = output shape (500, 3).",
                neuroConnection: "This 3D output is what NMA uses to plot neural trajectories in PC space — the 'neural manifold'.",
              },
              {
                id: "w5q3l2_q2",
                text: "pca.explained_variance_ratio_ = [0.45, 0.25, 0.10]. How much variance do the first 2 PCs capture?",
                options: ["45%", "70%", "80%", "25%"],
                correctIndex: 1,
                explanation: "First 2 PCs: 0.45 + 0.25 = 0.70 = 70% of total variance explained.",
                neuroConnection: "NMA scree plots show explained variance — you pick n_components where the 'elbow' occurs in the curve.",
              },
            ],
          },
        ],
      },

      // ── Quest 5.4 — NMA Day 1 Prep ────────────────────────
      {
        id: "w5q4",
        worldId: "world5",
        number: 4,
        title: "NMA Day 1 Prep",
        description: "Everything to feel confident walking in the door",
        totalXP: 40,
        lessons: [
          {
            id: "w5q4l1",
            questId: "w5q4",
            worldId: "world5",
            title: "What to Expect at NMA",
            type: "concept",
            deviceRequired: "any",
            xpReward: 10,
            estimatedMinutes: 4,
            concept: [
              {
                type: "highlight",
                content: "NMA tutorials use Jupyter notebooks. Each day has a morning tutorial (2-3 hours) and afternoon projects. Python comfort = more time for the cool science.",
              },
              {
                type: "text",
                content: "**The NMA stack you'll use:**\n• `numpy` — arrays and math (you know this!)\n• `matplotlib` — plotting data and results\n• `scipy` — statistics and signal processing\n• `sklearn` — machine learning (PCA, regression, decoding)\n• `torch` — deep learning (Week 3 onwards)",
              },
              {
                type: "code",
                content: "# The NMA notebook import block — you'll see this every day\nimport numpy as np\nimport matplotlib.pyplot as plt\nfrom scipy import stats\nfrom sklearn.decomposition import PCA\nfrom sklearn.linear_model import LinearRegression\n\nprint('Ready for NMA!')",
                caption: "Copy-paste this at the top of any NMA notebook.",
              },
              {
                type: "text",
                content: "**Your strengths going in:**\n✓ Python basics and numpy fluency\n✓ Vectors, matrices, dot products\n✓ Normal distribution, p-values\n✓ LIF neuron model intuition\n✓ Linear regression and gradient descent\n✓ PCA for neural data",
              },
              {
                type: "highlight",
                content: "🦌 Ilya says: You've completed NeuroQuest. You are READY. NMA will push you hard — but now you have the foundation. Go be brilliant!",
              },
            ],
          },
          {
            id: "w5q4l2",
            questId: "w5q4",
            worldId: "world5",
            title: "Final Boss: NMA Ready",
            type: "mcq",
            deviceRequired: "any",
            xpReward: 25,
            estimatedMinutes: 8,
            questions: [
              {
                id: "w5q4l2_q1",
                text: "At NMA, you have neural data: 1000 trials × 128 neurons. You want to run PCA and then do linear regression on the 2D projections. What's the order?",
                options: [
                  "Regression first, then PCA on residuals",
                  "PCA to get (1000, 2), then regression on the 2D data",
                  "Average across neurons first, then PCA",
                  "Normalize to zero mean, skip PCA, go straight to regression",
                ],
                correctIndex: 1,
                explanation: "PCA projects (1000, 128) → (1000, 2). Then regression fits a line through the 2D projections. This is the standard decode pipeline.",
                neuroConnection: "This is literally Tutorial W1D4 → W1D3 at NMA: reduce dimensions, then decode behavior from neural population.",
              },
              {
                id: "w5q4l2_q2",
                text: "Your loss during gradient descent looks like: 100 → 50 → 25 → 25 → 25. What happened?",
                options: [
                  "Learning rate is too large",
                  "The model converged to a minimum",
                  "Overfitting to training data",
                  "The gradient became NaN",
                ],
                correctIndex: 1,
                explanation: "Loss stabilized at 25 — the model converged. Further steps don't reduce loss because we're at (or near) the minimum.",
                neuroConnection: "Recognizing convergence from loss curves is the key skill in NMA model fitting diagnostics.",
              },
              {
                id: "w5q4l2_q3",
                text: "A neuron fires at 20 Hz baseline. During stimulus presentation it fires at 50 Hz. What is the d-prime (signal-to-noise ratio)?",
                options: [
                  "30 (just the difference)",
                  "2.5 (difference / baseline)",
                  "Depends on the trial-to-trial variability",
                  "1.5",
                ],
                correctIndex: 2,
                explanation: "d' = (mean₁ - mean₀) / pooled_std. You need the standard deviation of each condition — the variability matters as much as the mean difference.",
                neuroConnection: "d-prime is the core measure of neural discriminability in NMA — a 30 Hz difference means nothing if the neuron is also very noisy.",
              },
              {
                id: "w5q4l2_q4",
                text: "Which code correctly z-scores a neural data matrix along the neuron axis?",
                options: [
                  "data / np.std(data)",
                  "(data - data.mean(axis=0)) / data.std(axis=0)",
                  "(data - data.mean()) / data.std()",
                  "data - np.mean(data, axis=1)",
                ],
                correctIndex: 1,
                explanation: "axis=0 means operate across rows (trials), computing per-neuron mean and std. This z-scores each neuron independently.",
                neuroConnection: "Z-scoring by neuron (axis=0) is the standard NMA preprocessing step before PCA or decoding analyses.",
              },
            ],
          },
        ],
      },

      // ── Quest 5.5 — Grand Boss ────────────────────────────
      {
        id: "w5q5",
        worldId: "world5",
        number: 5,
        title: "Grand Boss: NMA Champion",
        description: "The ultimate challenge — prove you're ready for Day 1",
        totalXP: 60,
        lessons: [
          {
            id: "w5q5l1",
            questId: "w5q5",
            worldId: "world5",
            title: "Grand Boss: Full Pipeline",
            type: "flashcard",
            deviceRequired: "any",
            xpReward: 30,
            estimatedMinutes: 8,
            cards: [
              {
                id: "w5q5l1_c1",
                front: "What does np.linalg.lstsq(X, y) return?",
                back: "The least-squares solution β that minimizes ||Xβ - y||². Returns (solution, residuals, rank, singular_values). Use solution[0] for β.",
              },
              {
                id: "w5q5l1_c2",
                front: "What is a Poisson process and why do neurons follow it?",
                back: "A Poisson process generates events at a fixed average rate λ, independently in each time bin. Neurons approximately follow it because spike timing has randomness (synaptic noise, stochastic channels). np.random.poisson(λ·dt, n_bins).",
              },
              {
                id: "w5q5l1_c3",
                front: "The LIF voltage update equation (Euler method)",
                back: "dV = (dt / tau_m) * (-(V - V_rest) + R * I)\nV += dV\nif V >= V_thr: V = V_rest; record spike",
              },
              {
                id: "w5q5l1_c4",
                front: "How do you compute explained variance ratio after PCA?",
                back: "pca.explained_variance_ratio_ gives an array where each element is the fraction of variance explained by that PC. np.cumsum() gives the cumulative explained variance.",
              },
              {
                id: "w5q5l1_c5",
                front: "Formula for d-prime (sensitivity index)",
                back: "d' = (μ₁ - μ₀) / σ_pooled\nwhere σ_pooled = sqrt((σ₁² + σ₀²) / 2)\nHigh d' = neuron reliably distinguishes the two conditions.",
              },
              {
                id: "w5q5l1_c6",
                front: "What does z-scoring neural data do and why?",
                back: "Subtracts each neuron's mean and divides by its std: z = (x - μ) / σ. Makes all neurons comparable in scale (mean=0, std=1). Essential before PCA so high-firing neurons don't dominate the first PC.",
              },
            ],
          },
        ],
      },
    ],
  },
];

export function getWorld(id: string): World | undefined {
  return WORLDS.find((w) => w.id === id);
}

export function getQuest(worldId: string, questId: string) {
  return getWorld(worldId)?.quests.find((q) => q.id === questId);
}

export function getLesson(worldId: string, questId: string, lessonId: string) {
  return getQuest(worldId, questId)?.lessons.find((l) => l.id === lessonId);
}

export function getNextQuest(worldId: string, questId: string) {
  const world = getWorld(worldId);
  if (!world) return null;
  const idx = world.quests.findIndex((q) => q.id === questId);
  if (idx === -1 || idx === world.quests.length - 1) return null;
  return world.quests[idx + 1];
}

export function getAllSRCards() {
  const cards: { cardId: string; front: string; back: string }[] = [];
  for (const world of WORLDS) {
    for (const quest of world.quests) {
      for (const lesson of quest.lessons) {
        if (lesson.cards) {
          for (const card of lesson.cards) {
            cards.push({ cardId: card.id, front: card.front, back: card.back });
          }
        }
        if (lesson.questions) {
          for (const q of lesson.questions) {
            cards.push({
              cardId: q.id,
              front: q.text,
              back: q.options[q.correctIndex] + "\n\n" + q.explanation,
            });
          }
        }
      }
    }
  }
  return cards;
}
