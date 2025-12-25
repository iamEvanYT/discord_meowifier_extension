(() => {
  if (!location.hostname.endsWith("discord.com")) return;

  const processed = new WeakSet();

  const hackSpan = (span) => {
    if (processed.has(span)) return;

    const cls = span.classList;

    if (cls.contains("mention")) {
      span.textContent = "@kitty :3";
    } else if (cls.contains("_752971923a1e6683-roleMention")) {
      span.textContent = "@kittens <3";
    } else if (cls.contains("_75abce0dd8453367-emojiContainerClickable")) {
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
      .querySelectorAll(
        "._752971923a1e6683-markup.c19a557985eb7793-messageContent"
      )
      .forEach(hackMessage);

    /* react to new messages from here on */
    new MutationObserver((muts) => {
      for (const mut of muts) {
        for (const node of mut.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (
            node.matches?.(
              "._752971923a1e6683-markup.c19a557985eb7793-messageContent"
            )
          ) {
            hackMessage(node);
          } else {
            node
              .querySelectorAll?.(
                "._752971923a1e6683-markup.c19a557985eb7793-messageContent"
              )
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
