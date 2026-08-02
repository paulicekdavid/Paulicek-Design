var cursor = document.getElementById('cursor');


let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;


document.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});




function animateCursor() {

  const speed = 0.50; 
  

  cursorX += (mouseX - cursorX) * speed;
  cursorY += (mouseY - cursorY) * speed;
  

  cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
  

  cursor.style.transform = `translate(-50%, -50%) translate3d(${cursorX}px, ${cursorY}px, 0)`;
  
  requestAnimationFrame(animateCursor);
}

animateCursor();






var textElements = document.querySelectorAll('a, button');
textElements.forEach(elem => {
  elem.addEventListener('mouseenter', function() {
    cursor.classList.add('hover-cursor');
  });
  elem.addEventListener('mouseleave', function () {
    cursor.classList.remove('hover-cursor');
  });
});



var projectCards = document.querySelectorAll('.project-card-wrapper');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    cursor.classList.add('project-hover');
  });
  card.addEventListener('mouseleave', function () {
    cursor.classList.remove('project-hover');
  });
}); 


document.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  

  cursor.style.opacity = "1"; 
});




const body = document.body;
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;


  if (currentScroll <= 0) {
    body.classList.remove("scroll-down");
    return;
  }


  if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {

    body.classList.remove("scroll-up");
    body.classList.add("scroll-down");
  } else if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {

    body.classList.remove("scroll-down");
    body.classList.add("scroll-up");
  }
  
  lastScroll = currentScroll;
});

















document.querySelectorAll('.scramble-button').forEach(button => {

  const originalText = button.textContent.trim();
  let isAnimating = false;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  button.addEventListener('mouseenter', () => {
    if (isAnimating) return;
    isAnimating = true;

    const letters = originalText.split('');
    button.innerHTML = ''; 


    const spanElements = letters.map(letter => {
      const span = document.createElement('span');
      span.textContent = letter === ' ' ? '\u00A0' : letter;
      button.appendChild(span);
      return {
        element: span,
        original: letter,
        totalRounds: Math.floor(Math.random() * 4) + 4,
        currentRound: 0
      };
    });

    const intervalTime = 50; 

    const interval = setInterval(() => {
      let allDone = true;

      spanElements.forEach(item => {
        if (item.original === ' ') return;

        if (item.currentRound < item.totalRounds) {
          allDone = false;
          item.element.textContent = chars[Math.floor(Math.random() * chars.length)];
          item.currentRound++;
        } else {
          item.element.textContent = item.original;
        }
      });

      if (allDone) {
        clearInterval(interval);
        isAnimating = false;
      }
    }, intervalTime);
  });
});










  document.addEventListener('DOMContentLoaded', () => {
      const menuBtn = document.querySelector('.nav-menu-btn');
      const navText = document.querySelector('.nav-text');


      menuBtn.addEventListener('click', () => {
          navText.classList.toggle('active');
          menuBtn.classList.toggle('active-btn');
      });


      const navLinks = document.querySelectorAll('.nav-text a');
      navLinks.forEach(link => {
          link.addEventListener('click', () => {
              navText.classList.remove('active');
              menuBtn.classList.remove('active-btn');
          });
      });
  });


    






document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  const submitBtn = document.querySelector('.submit-btn');

  if (!form || !submitBtn) return;

  function scrambleToText(button, newText) {
    return new Promise((resolve) => {

      button.style.width = `${button.offsetWidth}px`;

      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const letters = newText.split('');
      button.innerHTML = '';

      const spanElements = letters.map(letter => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        button.appendChild(span);
        return {
          element: span,
          original: letter,
          totalRounds: Math.floor(Math.random() * 4) + 4,
          currentRound: 0
        };
      });

      const interval = setInterval(() => {
        let allDone = true;

        spanElements.forEach(item => {
          if (item.original === ' ') return;

          if (item.currentRound < item.totalRounds) {
            allDone = false;
            item.element.textContent = chars[Math.floor(Math.random() * chars.length)];
            item.currentRound++;
          } else {
            item.element.textContent = item.original;
          }
        });

        if (allDone) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  }

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  form.addEventListener('submit', async function(e) {
    e.preventDefault(); 
    submitBtn.disabled = true;

  
    await scrambleToText(submitBtn, 'OFF IT GOES');


    const formData = new FormData(form);
    const jsonPayload = JSON.stringify(Object.fromEntries(formData));

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: jsonPayload
      });

      const result = await response.json();

      if (result.success) {

        await sleep(1000);
        await scrambleToText(submitBtn, 'TALK TO YOU SOON');
        form.reset();
      } else {
        await sleep(500);
        await scrambleToText(submitBtn, 'FAILED. TRY AGAIN');
        submitBtn.disabled = false;
      }
    } catch (error) {
      console.error('Submission error:', error);
      await sleep(500);
      await scrambleToText(submitBtn, 'ERROR! TRY AGAIN');
      submitBtn.disabled = false;
    }
  });
});


function scrambleToText(button, newText) {
  return new Promise((resolve) => {
    button.style.width = `${button.offsetWidth}px`;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letters = newText.split('');
    button.innerHTML = '';

    const spanElements = letters.map(letter => {
      const span = document.createElement('span');
      span.textContent = letter === ' ' ? '\u00A0' : letter;
      button.appendChild(span);
      return {
        element: span,
        original: letter,
        totalRounds: Math.floor(Math.random() * 4) + 4,
        currentRound: 0
      };
    });

    const interval = setInterval(() => {
      let allDone = true;

      spanElements.forEach(item => {
        if (item.original === ' ') return;

        if (item.currentRound < item.totalRounds) {
          allDone = false;
          item.element.textContent = chars[Math.floor(Math.random() * chars.length)];
          item.currentRound++;
        } else {
          item.element.textContent = item.original;
        }
      });

      if (allDone) {
        clearInterval(interval);
        button.style.width = '';
        resolve();
      }
    }, 50);
  });
}





const lenis = new Lenis({
  autoRaf: true
})