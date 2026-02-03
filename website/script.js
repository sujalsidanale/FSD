// Initialize EmailJS
emailjs.init("6jcNfWOTEYLIpBc4-");

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    emailjs.sendForm(
        'service_c418jys',
        'template_izy6mhl', // <-- your real template ID
        this
    ).then(() => {
        alert('Your message has been sent successfully!');
        this.reset();
    }).catch((error) => {
        console.error('FAILED...', error);
        alert('Failed to send message. Please try again later.');
    });
});
