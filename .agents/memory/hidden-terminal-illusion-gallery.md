---
    name: hidden-terminal-illusion-gallery
    description: Pattern used for a hidden bottom-of-site command terminal that unlocks a full-screen optical-illusion gallery via a secret command.
    ---

    ## Hidden terminal + secret-command gallery pattern

    When building a "secret console" easter egg (bottom-tab command terminal that
    performs real in-app actions, plus a special command unlocking a themed
    gallery of many distinct visual pieces):

    - Split content authoring from visual implementation: each gallery item is a
    pure, self-contained visual component (props-only, no copy baked in);
    bilingual titles/instructions live in one central registry file the main
    agent owns. This lets parallel subagents build the visuals without touching
    shared files or inventing incompatible copy/state.
    - Mount the console once at the page-shell level (inside whatever
    lang/theme/mode providers exist), not per-route, so it persists across
    in-app mode switches.
    - Give the gallery a strictly higher z-index than any full-screen transition
    overlay already in the app, and the terminal panel a z-index above normal
    content but below the gallery.

    **Why:** avoids duplicate/incompatible shared code from parallel builders
    (see parallel-design-subagents.md) and prevents the easter egg from being
    visually clipped by existing full-screen transition effects.

    **How to apply:** reuse this split (contract file + central registry +
    independent visual files) any time a request asks for "many different X,
    each behaving differently" behind one trigger.
    