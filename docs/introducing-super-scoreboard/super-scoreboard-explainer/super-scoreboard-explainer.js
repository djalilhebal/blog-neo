// Animation script for super-scoreboard-explainer.svg

/**
 * Key to SVG/Inkscape label
 * @enum
 */
const things = {
    
    // Messages
    MOUSE_TO_WINDOWS: 'mouse-signals',
    OVERLAY_TO_WINDOWS_IGNORE: 'ignore-events',
    OVERLAY_TO_WINDOWS_INFORM: 'request-events-info',
    WINDOWS_FORWARD_TO_LEAGUE: 'forward-to-league',
    WINDOWS_FORWARD_TO_OVERLAY: 'forward-to-overlay',
    WINDOWS_INFORM_OVERLAY: 'inform-about-events',
    OVERLAY_FORWARD_TO_SELF: 'forward-to-self',

    // ---

    // Objects

    DARKNESS: 'darkness',

    CURSOR: 'cursor',

    WINDOWS: 'windows',
    LEAGUE: 'league',
    OVERLAY: 'overlay',
    ELECTRON: 'electron',
}

/**
 * When we name things in Inkscape, we are actually setting labels, not changing ids.
 * IDs are normally random.
 * 
 * @param {string} x Label
 */
function el(x) {
    // HACK: For some reason, `document.querySelector('[inkscape\\:label="mouse-signals"]') === null`
    //const found = document.querySelector(`[inkscape\\:label="${label}"]`);
    const found = [...document.children[0].querySelectorAll('*')].find((el) =>  el.getAttribute('inkscape:label') === x);
    if (!found) {
        throw new Error(`Inkscape label not found: ${x}`);
    }
    return found;
}

function glow(x) {
    el(x).classList.remove('dimmed');
    el(x).classList.add('glowing');
}

function dim(x) {
    el(x).classList.add('dimmed');
    el(x).classList.remove('glowing');
}

function show(x) {
    el(x).classList.remove('invisible');
    el(x).classList.add('visible');
}

function hide(x) {
    el(x).classList.add('invisible');
    el(x).classList.remove('visible');
}

function say(text) {
    console.log(text);
}

/**
 * To use `currentcolor` when implementing the glow effect.
 * For example `<g><rect inkscape:label="overlay" style="stroke: purple;">`
 * becomes `<g style="color: purple;"><rect inkscape:label="overlay" style="stroke: purple;">`
 *
 * @param {string} x Label
 */
function copyColor(x) {
    const target = el(x);
    const color = target.querySelector('rect').style.stroke;
    target.style.color = color;
}

function next() {
    return new Promise((resolve, _reject) => {
        window.addEventListener('click', resolve, {
            once: true,
        });
    });
}

function fin() {
    return next();
}

async function main() {
    // Init
    Object.values(things).forEach(hide);
    [things.LEAGUE, things.WINDOWS, things.OVERLAY].forEach(copyColor);

    show(things.DARKNESS);
    say("In the beginning, there was darkness...");
    await next();

    say("Suddenly, a burst of light!");
    hide(things.DARKNESS);
    await next();
    show(things.WINDOWS);
    say("Someone boots up their Windows PC.");
    await next();

    say("The user interacts with the system using a mouse.");
    show(things.CURSOR);
    await next();

    say("The mouse sends electrical signals to the system");
    show(things.MOUSE_TO_WINDOWS);
    await next();

    say("The system processes them; look at how it glows!");
    glow(things.WINDOWS);
    say("It forwards mouse events to the topmost window for further processing.");
    await next();

    //say("They succumb to the allure of League of Legends.");
    say("League is open. Events are forwarded to it.");
    show(things.LEAGUE);
    show(things.WINDOWS_FORWARD_TO_LEAGUE);
    glow(things.LEAGUE);
    await next();

    say("An overlay is opened. Events are forwarded to it.");
    show(things.OVERLAY);
    show(things.WINDOWS_FORWARD_TO_OVERLAY);
    glow(things.OVERLAY);
    say("League does not receive events. Sad.");
    hide(things.WINDOWS_FORWARD_TO_LEAGUE);
    dim(things.LEAGUE);
    await next();

    say("Overlay tells Windows to not forward mouse events.");
    show(things.OVERLAY_TO_WINDOWS_IGNORE);
    say("Overlay does not receive events. Sad again.");
    hide(things.WINDOWS_FORWARD_TO_OVERLAY);
    dim(things.OVERLAY);
    show(things.WINDOWS_FORWARD_TO_LEAGUE);
    glow(things.LEAGUE);
    await next();

    say("Overlay requests global mouse events from Windows.");
    show(things.OVERLAY_TO_WINDOWS_INFORM);
    show(things.WINDOWS_INFORM_OVERLAY);
    await next();

    say("Overlay forwards global mouse events to itself.");
    show(things.OVERLAY_FORWARD_TO_SELF);
    say("It processes them as if they were forwarded directly to it.");
    glow(things.LEAGUE);
    glow(things.OVERLAY);
    await next();

    say("Now, both League and the overlay independently process the same click events.");
    say("Meaning, the user performs actions in both the game (like pinging via the in-game scoreboard) and the overlay (like tracking with Super Scoreboard) simultaneously.");
    say("Cool.");
    await fin();
}

main();
