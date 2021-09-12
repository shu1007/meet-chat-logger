export {};
const MESSAGE_CLASS_NAME = "oIy2qc";
const PARENT_CLASS_NAME = "GDhqjd";

const time = new Date().getTime();
const meetId =
    window.location.href
        .split("/")
        .pop()
        ?.match(/[^\?]+/)?.[0] ?? "no chat Id";
const messageBlocks: MessageBlock[] = [];

const updateStorage = () => {
    let obj: any = {};
    obj[time] = {
        time: time,
        meetId: meetId,
        messageBlocks: messageBlocks
    } as Chat;
    chrome.storage.local.set(obj);
    console.log("update");
};

const config = {
    attributes: true,
    subtree: true,
    childList: true,
    characterData: true
};

const observer = new MutationObserver((mutationList) => {
    mutationList
        .filter((mutation) => mutation.type == "childList")
        .forEach((mutation) => {
            if (mutation.addedNodes.length == 0) return;

            const addedNode = mutation.addedNodes[0];
            if (addedNode instanceof HTMLElement) {
                if (
                    addedNode.dataset.formattedTimestamp != "" &&
                    addedNode.className == PARENT_CLASS_NAME
                ) {
                    messageBlocks.push({
                        sender: addedNode.dataset.senderName ?? "no_name",
                        timeStamp: addedNode.dataset.formattedTimestamp ?? "",
                        messages: [
                            (addedNode.childNodes[1] as HTMLElement).innerText
                        ]
                    });
                    updateStorage();
                } else if (
                    addedNode.dataset.formattedTimestamp != "" &&
                    addedNode.className == MESSAGE_CLASS_NAME
                ) {
                    // 連投でメッセージのみ増えたケース
                    messageBlocks[messageBlocks.length - 1].messages.push(
                        addedNode.innerText
                    );
                    updateStorage();
                }
            }
        });
});

const interval = setInterval(() => {
    const chatDom = document.getElementsByClassName("z38b6")[0];
    if (chatDom) {
        observer.observe(chatDom, config);
        clearInterval(interval);
    }
}, 300);
