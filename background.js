
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (details.method !== "POST" || !details.requestBody?.raw) {
      return;
    }

    const allowedInitiators = [
      "https://docs.google.com",
      "https://slides.google.com"
    ];

    if (!allowedInitiators.includes(details.initiator)) {
      return;
    }

    const decoder = new TextDecoder();

    const body = details.requestBody.raw
      .map(part => part.bytes ? decoder.decode(part.bytes) : "")
      .join("");

    if (body.includes("punch-insert-video")) {
      return { cancel: true };
    }
  },
  {
    urls: [
      "https://docs.google.com/picker/v2/query*"
    ]
  },
  [
    "blocking",
    "requestBody"
  ]
);
