(() => {
  if (!location.hostname.endsWith("discord.com")) return;

  const processed = new WeakSet();

  const hackSpan = (span) => {
    if (processed.has(span)) return;

    const cls = span.classList;

    if (cls.contains("mention")) {
      span.textContent = "@kitty :3";
    } else if (cls.contains("roleMention__75297")) {
      span.textContent = "@kittens <3";
    } else if (cls.contains("emojiContainerClickable__75abc")) {
      const img = span.querySelector("img");
      if (img) img.src = "/assets/80d98aa027a3ee75.svg";
    } else {
      const txt = span.textContent;
      const lead = txt.match(/^\s*/)?.[0] ?? "";
      const trail = txt.match(/\s*$/)?.[0] ?? "";
      const core = txt.slice(lead.length, txt.length - trail.length);

      const meowed = core
        .split(/\s+/)
        .map((word) => {
          const m = word.match(/^([A-Za-z]+)([^A-Za-z]*)$/);
          if (!m) return "meow";
          const [, base, punc] = m;
          const isUpper = base === base.toUpperCase();
          return (isUpper ? "MEOW" : "meow") + punc;
        })
        .join(" ");

      span.textContent = lead + meowed + trail;
    }

    processed.add(span);
  };

  const hackMessage = (msg) => msg.querySelectorAll("span").forEach(hackSpan);

  const start = () => {
    /* first pass on what’s already rendered */
    document
      .querySelectorAll(".markup__75297.messageContent_c19a55")
      .forEach(hackMessage);

    /* react to new messages from here on */
    new MutationObserver((muts) => {
      for (const mut of muts) {
        for (const node of mut.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (node.matches?.(".markup__75297.messageContent_c19a55")) {
            hackMessage(node);
          } else {
            node
              .querySelectorAll?.(".markup__75297.messageContent_c19a55")
              .forEach(hackMessage);
          }
        }
      }
    }).observe(document.body, { childList: true, subtree: true });
  };

  if (document.body) {
    start();
  } else {
    window.addEventListener("DOMContentLoaded", start);
  }
})();
