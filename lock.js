/**
 * lock.js - Client-Side Source Protection
 * Add this to the <head> or at the end of the <body> of any HTML file:
 * <script src="lock.js"></script>
 */

(function () {
  "use strict";

  // 1. Disable Right-Click (Context Menu)
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  // 2. Disable Dragging and Text Selection
  document.addEventListener("dragstart", function (e) {
    e.preventDefault();
  });
  document.addEventListener("selectstart", function (e) {
    e.preventDefault();
  });

  // 3. Disable Keyboard Shortcuts
  document.addEventListener(
    "keydown",
    function (e) {
      // Prevent F12
      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Prevent Ctrl+Shift+I, J, C (Windows/Linux Dev Tools)
      if (
        e.ctrlKey &&
        e.shiftKey &&
        (e.key === "I" ||
          e.key === "J" ||
          e.key === "C" ||
          e.key === "i" ||
          e.key === "j" ||
          e.key === "c")
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Prevent Cmd+Option+I, J, C (Mac Dev Tools)
      if (
        e.metaKey &&
        e.altKey &&
        (e.key === "I" ||
          e.key === "J" ||
          e.key === "C" ||
          e.key === "i" ||
          e.key === "j" ||
          e.key === "c")
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Prevent Ctrl+U / Cmd+U (View Source) and Ctrl+S / Cmd+S (Save Page)
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "U" || e.key === "u" || e.key === "S" || e.key === "s")
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    },
    true,
  );

  // 4. Anti-Debugger Loop
  // This constantly triggers the debugger. If DevTools is open, the browser will freeze here.
  setInterval(function () {
    const start = performance.now();
    debugger; // This keyword pauses execution ONLY if DevTools is open
    const end = performance.now();

    // If it took longer than 100ms to execute, it means the debugger was triggered
    if (end - start > 100) {
      // Optional: Punish the user by clearing the screen if they bypass the keyboard blocks
      document.body.innerHTML = `
                <div style="display:flex; justify-content:center; align-items:center; height:100vh; background:#000; color:#ff3333; font-family:monospace; text-align:center; flex-direction:column;">
                    <h1 style="font-size:2rem; margin-bottom:10px;">ACCESS DENIED</h1>
                    <p>Inspection tools detected. Refresh to reset.</p>
                </div>
            `;
    }
  }, 1000);
})();
