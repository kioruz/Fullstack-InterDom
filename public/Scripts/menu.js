//////////////      DDL      ///////////////
console.log("El archivo JavaScript se está cargando correctamente.");
/*const dropdowns = document.querySelectorAll('.dropdown');
//Loop
dropdowns.forEach((dropdown) => {
  //elementos
  const select = dropdown.querySelector('.select');
  const caret = dropdown.querySelector('.caret');
  const menu = dropdown.querySelector('.menu');
  const options = dropdown.querySelectorAll('.menu li');
  const selected = dropdown.querySelector('.selected');

  //clic event
  select.addEventListener('click', () => {
      //mostrar menu
      menu.classList.toggle('select-clicked');
      caret.classList.toggle('caret-rotate');
      menu.classList.toggle('menu-open');
  });

  //loop
 /* options.forEach((option) => {
      option.addEventListener('click', () => {
          //limpiar menu
          selected.innerText = option.innerText;
          select.classList.remove('select-clicked');
          caret.classList.remove('caret-rotate');
          menu.classList.remove('menu-open');

          option.forEach((option) => {
              option.classList.remove('active');
      });
      option.classList.add('active');
      });
  });
});*/
// ...
/*
options.forEach((option) => {
    option.addEventListener('click', () => {
        // Limpiar la clase 'active' de todas las opciones
        options.forEach((o) => {
            o.classList.remove('active');
        });

        // Agregar la clase 'active' a la opción seleccionada
        option.classList.add('active');

        // Actualizar el texto del elemento seleccionado y cerrar el menú
        selected.innerText = option.innerText;
        select.classList.remove('select-clicked');
        caret.classList.remove('caret-rotate');
        menu.classList.remove('menu-open');
    });
});
});


*/
document.addEventListener('DOMContentLoaded', function() {
    var dropdownMenuButton = document.getElementById('dropdownMenuButton');
    var dropdownMenu = document.getElementById('dropdownMenu');
    // Toggle dropdown menu
    dropdownMenuButton.addEventListener('click', function(event) {
      event.stopPropagation();
      dropdownMenu.classList.toggle('show');
    });
    // Close the dropdown if the user clicks outside of it
    window.addEventListener('click', function() {
      if (dropdownMenu.classList.contains('show')) {
        dropdownMenu.classList.remove('show');
      }
    });
    // Update the selected item and close the menu
    dropdownMenu.querySelectorAll('li').forEach(function(item) {
      item.addEventListener('click', function() {
        dropdownMenuButton.querySelector('.selected').textContent = this.textContent;
        dropdownMenu.classList.remove('show');
      });
    });
  });