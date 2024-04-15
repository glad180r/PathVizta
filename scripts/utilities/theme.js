// Set the default theme
let currentTheme = 'light';
// Add the current theme to the DOM
document.documentElement.classList.add(currentTheme);

// Get an accessor to the theme toggle button
const toggleThemeButton = document.getElementById('toggle-theme-btn');
toggleThemeButton.addEventListener('click', () => {
  if(currentTheme === 'dark'){
    currentTheme = 'light';
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add(currentTheme);
  }else{
    currentTheme = 'dark';
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add(currentTheme);
    
  }
})


