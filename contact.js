const contactForm=document.getElementById("contactForm");
const destinationEmail="firjatullahnabil@gmail.com";
contactForm.addEventListener("submit",function(event){
event.preventDefault();
const name=document.getElementById("name").value.trim();
const email=document.getElementById("email").value.trim();
const message=document.getElementById("message").value.trim();
const subject=`Portfolio Contact from ${name}`;
const body=`Hello Firjatullah Nabil,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
window.location.href=`mailto:${destinationEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});