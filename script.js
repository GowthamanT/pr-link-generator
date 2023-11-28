function generateLink() {
    // Get input values
    const textToDisplay = document.getElementById('textToDisplay').value;
    const urlLink = document.getElementById('urlLink').value;

    const notificationElement = document.getElementById('notification');

    // Validate inputs
    if (!textToDisplay || !urlLink) {
        notificationElement.innerText = 'Please enter both Text and Url.';

        notificationElement.classList.remove('success');
        notificationElement.classList.add('failure');
        notificationElement.classList.add('notification-active');

        this.hideNotificationBar();

        return;
    }

    // Create link element
    const linkElement = document.createElement('a');
    linkElement.href = urlLink;
    linkElement.textContent = textToDisplay;

    // Create text node for the custom text
    const staticText = document.createTextNode('Please review this PR - ');

    // Create a temporary container
    const tempContainer = document.createElement('div');
    tempContainer.appendChild(staticText);
    tempContainer.appendChild(linkElement);

    // Append container to the DOM
    document.body.appendChild(tempContainer);

    // Select the container content
    const range = document.createRange();
    range.selectNode(tempContainer);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    try {
        // Execute copy command
        document.execCommand('copy');

        notificationElement.innerText = 'Link copied to clipboard!';

        notificationElement.classList.remove('failure');
        notificationElement.classList.add('success');
        notificationElement.classList.add('notification-active');

        this.hideNotificationBar();
    } catch (error) {
        console.error('Copy to clipboard failed:', error);

        notificationElement.innerText =
            'Copy to clipboard failed. See console for more details.';

        notificationElement.classList.remove('success');
        notificationElement.classList.add('failure');
        notificationElement.classList.add('notification-active');

        this.hideNotificationBar();
    }

    // Remove the temporary container
    document.body.removeChild(tempContainer);
}

function hideNotificationBar() {
    const notificationElement = document.getElementById('notification');

    setTimeout(() => {
        notificationElement.classList.remove('notification-active');
    }, 3000);
}
