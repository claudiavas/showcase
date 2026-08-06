document.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(() => {
        document.querySelector("#load-iframe-map").innerHTML = 
            `<iframe class="contact__iframe" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6289.262078960476!2d-1.1262886570953055!3d37.985739006659415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2ses!4v1699999323167!5m2!1ses-419!2ses" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
    }, 200);
});
