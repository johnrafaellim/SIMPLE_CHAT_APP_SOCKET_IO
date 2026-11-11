const buildMessageHtml = (messageObj) => {
    console.log("builtMessageHtml", userName);
    // Format the date/time nicely
    const timeString = new Date(messageObj.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Check if the message is from receiver 'a'
    const isReceiver = messageObj.userName !== userName;

    if (isReceiver) {
        // RECEIVER LAYOUT (Left Aligned)
        return `
            <li class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                    <img src="${messageObj.avatar}" alt="Receiver avatar" class="w-8 h-8 rounded-full" />
                </div>
                <div class="flex-1 min-w-0">
                    <div class="text-sm font-semibold text-gray-900">
                        ${messageObj.userName} <span class="ml-1 text-xs font-normal text-gray-500">${timeString}</span>
                    </div>
                    <div class="inline-block p-3 rounded-2xl bg-gray-100 text-gray-800 text-sm mt-1">
                        ${messageObj.newMessage}
                    </div>
                </div>
            </li>
        `;
    } else {
        // SENDER LAYOUT (Right Aligned)
        return `
            <li class="flex items-start justify-end space-x-3 space-x-reverse">
                <div class="flex-1 min-w-0 text-right">
                    <div class="text-sm font-semibold text-gray-900">
                        <span class="mr-1 text-xs font-normal text-gray-500">${timeString}</span> ${messageObj.userName}
                    </div>
                    <div class="inline-block p-3 rounded-2xl bg-blue-600 text-white text-sm mt-1 text-left">
                        ${messageObj.newMessage}
                    </div>
                </div>
                <div class="flex-shrink-0">
                    <img src="${messageObj.avatar}" alt="Sender avatar" class="w-8 h-8 rounded-full" />
                </div>
            </li>
        `;
    }
}